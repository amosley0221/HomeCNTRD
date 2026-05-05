// auth.jsx — Real Supabase-backed auth with offline-first profile sync.
//
// Public surface (unchanged from the prototype, so view files keep working):
//   window.useAuth()            → { user, busy, err, doSignup, doLogin,
//                                   doLogout, patchUser, setErr }
//   window.AuthScreen           → React component
//   window.validatePassword(pw) → string[] of unmet requirements
//   window.validateEmail(s)     → boolean
//
// Storage:
//   - Supabase Auth handles session tokens (persisted in localStorage under
//     'homecntrd_supabase_auth' — see lib/supabase.js).
//   - The profile row (firstName, plan, layout, integrations, members,
//     sessions, privacy) lives in the public.profiles table and is mirrored
//     into IndexedDB via lib/sync.js so the PWA boots offline and queues
//     writes for replay when the network returns.

import { supabase } from './lib/supabase.js';
import {
  readCache, writeCache, clearCache,
  fetchProfile, upsertProfile, drainQueue,
} from './lib/sync.js';

// ── Validation ──────────────────────────────────────────────────────────────

function validatePassword(pw) {
  const errs = [];
  if (pw.length < 8) errs.push('At least 8 characters');
  if (!/[A-Z]/.test(pw)) errs.push('One capital letter');
  if (!/[0-9]/.test(pw)) errs.push('One number');
  if (!/[^A-Za-z0-9]/.test(pw)) errs.push('One special character');
  return errs;
}
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

// ── Device detection (used to label the current session entry) ────────────

function detectDevice() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua))   return 'iPad';
  if (/Android/.test(ua))return 'Android phone';
  if (/Macintosh/.test(ua)) return 'Mac';
  if (/Windows/.test(ua))   return 'Windows PC';
  return 'Web browser';
}
function detectOS() {
  const ua = navigator.userAgent;
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Windows NT/.test(ua)) return 'Windows';
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone OS|iPad/.test(ua)) return 'iOS';
  return 'Web';
}

// View code reads `user.firstName`, `user.layout`, etc. Supabase rows use
// snake_case. profileToUser/userToProfile bridge the two so views are
// untouched.
function profileToUser(profile, authEmail) {
  return {
    email: authEmail,
    firstName: profile.first_name ?? '',
    plan: profile.plan ?? 'free',
    layout: profile.layout ?? null,
    integrations: profile.integrations ?? null,
    members: profile.members ?? [],
    sessions: profile.sessions ?? [],
    privacy: profile.privacy ?? {
      cameraIndoorRecording: false, shareWithApple: false,
      shareWithGoogle: false, analytics: true, voiceTraining: false,
    },
    createdAt: (profile.created_at || '').slice(0, 10),
  };
}
function userToProfile(user) {
  return {
    first_name: user.firstName ?? '',
    plan: user.plan ?? 'free',
    layout: user.layout ?? null,
    integrations: user.integrations ?? null,
    members: user.members ?? [],
    sessions: user.sessions ?? [],
    privacy: user.privacy ?? {},
  };
}

// Stamp this device into the user's "trusted devices" list on login. These
// are advisory entries the Settings view lists/revokes — distinct from
// Supabase's own session tokens.
function withCurrentSession(user) {
  const me = {
    id: `s-${Date.now().toString(36)}`,
    device: detectDevice(),
    os: detectOS(),
    loc: 'Current location',
    ip: '·.·.·.·',
    last: 'now',
    current: true,
  };
  const others = (user.sessions || []).map(s => ({ ...s, current: false }));
  return { ...user, sessions: [me, ...others] };
}

function humanizeAuthError(e) {
  const m = (e?.message || '').toLowerCase();
  if (m.includes('invalid login')) return "We couldn't sign you in — check your email and password";
  if (m.includes('user already registered')) return 'An account already exists for that email';
  if (m.includes('email not confirmed')) return 'Check your inbox to confirm your email, then sign in';
  if (m.includes('email rate limit')) return 'Too many attempts — try again in a minute';
  return e?.message || 'Something went wrong';
}

// ── React hook ──────────────────────────────────────────────────────────────

function useAuth() {
  const [user, setUser] = React.useState(null);
  const [busy, setBusy] = React.useState(false);     // an action is in flight
  const [loading, setLoading] = React.useState(true); // initial session hydrate
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    let alive = true;

    async function hydrate(session) {
      if (!session?.user) {
        if (alive) { setUser(null); setLoading(false); }
        return;
      }
      const authUser = session.user;

      // Show cached profile immediately so an offline boot has something
      // to render.
      const cached = await readCache(authUser.id);
      if (alive && cached) setUser(profileToUser(cached, authUser.email));

      // Replay any patches captured while offline before reload.
      drainQueue();

      // Refresh from Supabase if online.
      if (navigator.onLine !== false) {
        try {
          let profile = await fetchProfile(authUser.id);
          if (!profile) {
            const { data, error } = await supabase
              .from('profiles')
              .insert({ id: authUser.id, first_name: authUser.user_metadata?.first_name || '' })
              .select()
              .single();
            if (error) throw error;
            profile = data;
          }
          await writeCache(authUser.id, profile);
          if (alive) {
            const u = withCurrentSession(profileToUser(profile, authUser.email));
            setUser(u);
            // Persist the freshly stamped current-session entry.
            upsertProfile(authUser.id, { sessions: u.sessions });
          }
        } catch (e) {
          if (!cached) setErr(e.message || 'Could not load your profile');
        }
      }

      if (alive) setLoading(false);
    }

    supabase.auth.getSession().then(({ data }) => hydrate(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => hydrate(session));
    return () => { alive = false; sub?.subscription?.unsubscribe?.(); };
  }, []);

  const doSignup = async ({ firstName, email, password }) => {
    setBusy(true); setErr(null);
    try {
      if (!firstName || !firstName.trim()) throw new Error('First name is required');
      if (!validateEmail(email)) throw new Error('That email looks off — try again');
      const pwErrs = validatePassword(password);
      if (pwErrs.length) throw new Error('Password needs: ' + pwErrs.join(', '));

      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { first_name: firstName.trim() } },
      });
      if (error) throw error;
      // onAuthStateChange will hydrate. If email confirmation is on, the
      // user lands back on the auth screen until they confirm.
    } catch (e) {
      setErr(humanizeAuthError(e));
    } finally {
      setBusy(false);
    }
  };

  const doLogin = async ({ email, password }) => {
    setBusy(true); setErr(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: (email || '').trim().toLowerCase(),
        password,
      });
      if (error) throw error;
    } catch (e) {
      setErr(humanizeAuthError(e));
    } finally {
      setBusy(false);
    }
  };

  const doLogout = async () => {
    const { data } = await supabase.auth.getUser();
    const id = data.user?.id;
    await supabase.auth.signOut();
    if (id) clearCache(id);
    setUser(null);
  };

  // Optimistic patch: update React state immediately, mirror to IDB cache,
  // queue an upsert to Supabase. Same call signature as the prototype.
  const patchUser = (patch) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      supabase.auth.getUser().then(({ data }) => {
        const id = data.user?.id;
        if (!id) return;
        writeCache(id, { id, ...userToProfile(next), created_at: prev.createdAt });
        upsertProfile(id, userToProfile(next));
      });
      return next;
    });
  };

  return { user, busy, loading, err, doSignup, doLogin, doLogout, patchUser, setErr };
}

// ── AUTH SCREEN (UI unchanged from the prototype) ──────────────────────────

const AuthScreen = ({ onSignup, onLogin, busy, err, setErr }) => {
  const [mode, setMode] = React.useState('login');
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);

  const pwErrs = mode === 'signup' && password ? validatePassword(password) : [];
  const pwReqs = [
    { ok: password.length >= 8,        label: 'At least 8 characters' },
    { ok: /[A-Z]/.test(password),      label: 'One capital letter' },
    { ok: /[0-9]/.test(password),      label: 'One number' },
    { ok: /[^A-Za-z0-9]/.test(password), label: 'One special character' },
  ];

  const submit = (e) => {
    e.preventDefault();
    if (mode === 'signup') onSignup({ firstName, email, password });
    else onLogin({ email, password });
  };

  const accent = '#e87f4a';
  const bg = '#161310', surface = '#1f1b16', surface2 = '#27221c';
  const fg = '#f1ead9', fg2 = 'rgba(241,234,217,0.7)', fg3 = 'rgba(241,234,217,0.42)';
  const border = 'rgba(241,234,217,0.12)', border2 = 'rgba(241,234,217,0.22)';
  const display = '"Newsreader", "Iowan Old Style", Georgia, serif';
  const body = '"Inter", system-ui, sans-serif';

  return (
    <div style={{
      width:'100%', height:'100%', minHeight:'100vh',
      background: `radial-gradient(ellipse at 80% 20%, oklch(36% 0.08 30 / 0.6), ${bg} 60%), ${bg}`,
      color: fg, fontFamily: body, display:'grid', placeItems:'center', padding:24, position:'relative', overflow:'hidden',
    }}>
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:.4, pointerEvents:'none'}}>
        <defs>
          <radialGradient id="g1"><stop offset="0%" stopColor={accent} stopOpacity=".4"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
        </defs>
        <circle cx="80%" cy="15%" r="240" fill="url(#g1)"/>
        <circle cx="10%" cy="85%" r="180" fill="url(#g1)" opacity=".5"/>
      </svg>

      <div style={{
        position:'relative', width:'min(420px, 100%)',
        background: surface2, border:`.5px solid ${border}`, borderRadius:20,
        padding:'34px 32px 28px', boxShadow:'0 32px 80px rgba(0,0,0,.55)',
      }}>
        <div style={{textAlign:'center', marginBottom:24}}>
          <div style={{fontFamily:display, fontSize:30, color:accent, fontStyle:'italic', lineHeight:1}}>HomeCNTRD</div>
          <div style={{fontSize:12, color:fg3, marginTop:8, letterSpacing:'.06em'}}>YOUR HOME · EVERYWHERE YOU ARE</div>
        </div>

        <div style={{display:'flex', background:surface, borderRadius:10, padding:3, marginBottom:22, border:`.5px solid ${border}`}}>
          {[{id:'login', label:'Sign in'}, {id:'signup', label:'Create account'}].map(tab => (
            <button key={tab.id} type="button" onClick={() => { setMode(tab.id); setErr(null); }} style={{
              flex:1, padding:'9px 0', borderRadius:8, border:0, cursor:'pointer', fontFamily:body, fontSize:13,
              background: mode === tab.id ? accent : 'transparent',
              color:    mode === tab.id ? '#fff' : fg2,
              fontWeight: mode === tab.id ? 500 : 400,
            }}>{tab.label}</button>
          ))}
        </div>

        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:14}}>
          {mode === 'signup' && (
            <Field label="First name" body={body} fg={fg} fg3={fg3} border2={border2} surface={surface}>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Frances"
                style={inputStyle(surface, fg, border2, body)} autoComplete="given-name" required/>
            </Field>
          )}
          <Field label="Email" body={body} fg={fg} fg3={fg3} border2={border2} surface={surface}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@home.com"
              style={inputStyle(surface, fg, border2, body)} autoComplete="email" required/>
          </Field>
          <Field label="Password" body={body} fg={fg} fg3={fg3} border2={border2} surface={surface}>
            <div style={{position:'relative'}}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Create a strong one' : 'Your password'}
                style={{...inputStyle(surface, fg, border2, body), paddingRight:64}}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required/>
              <button type="button" onClick={() => setShowPw(s => !s)} style={{
                position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
                padding:'4px 8px', borderRadius:6, border:0, background:'transparent', color:fg2, fontSize:11, cursor:'pointer'
              }}>{showPw ? 'Hide' : 'Show'}</button>
            </div>
          </Field>

          {mode === 'signup' && (
            <div style={{padding:'10px 12px', borderRadius:9, background:surface, border:`.5px solid ${border}`}}>
              <div style={{fontSize:11, color:fg3, marginBottom:6, letterSpacing:'.04em', textTransform:'uppercase'}}>Password requirements</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 14px'}}>
                {pwReqs.map(r => (
                  <div key={r.label} style={{display:'flex', alignItems:'center', gap:6, fontSize:11.5, color: r.ok ? '#7ed3a3' : fg3}}>
                    <span style={{width:14, height:14, borderRadius:'50%', background: r.ok ? '#7ed3a3' : 'transparent', border:`.5px solid ${r.ok ? '#7ed3a3' : border2}`, display:'grid', placeItems:'center', flex:'none', color:'#161310', fontSize:9, fontWeight:700}}>{r.ok ? '✓' : ''}</span>
                    {r.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {err && (
            <div style={{padding:'9px 12px', borderRadius:8, background:'rgba(217,100,80,.16)', border:'.5px solid rgba(217,100,80,.4)', color:'#ec8b78', fontSize:12}}>
              {err}
            </div>
          )}

          <button type="submit" disabled={busy || (mode === 'signup' && pwErrs.length > 0)} style={{
            padding:'12px 0', borderRadius:10, border:0, background: accent, color:'#fff',
            fontSize:14, fontWeight:500, cursor: busy ? 'wait' : 'pointer', fontFamily:body,
            opacity: (busy || (mode === 'signup' && pwErrs.length > 0)) ? 0.6 : 1,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:4,
          }}>
            {busy && <span style={{width:14, height:14, border:'2px solid rgba(255,255,255,.5)', borderTopColor:'#fff', borderRadius:'50%', animation:'authSpin 0.8s linear infinite'}}/>}
            {busy ? (mode === 'signup' ? 'Creating account…' : 'Signing in…') : (mode === 'signup' ? 'Create account' : 'Sign in')}
          </button>
        </form>

        <div style={{textAlign:'center', fontSize:10.5, color:fg3, marginTop:22, lineHeight:1.6}}>
          Your home, your sessions, your integrations — synced to your account so they follow you everywhere.
        </div>
      </div>

      <style>{`@keyframes authSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

const Field = ({ label, children, body, fg, fg3, border2, surface }) => (
  <label style={{display:'flex', flexDirection:'column', gap:5, fontFamily:body}}>
    <span style={{fontSize:11, color:fg3, letterSpacing:'.06em', textTransform:'uppercase'}}>{label}</span>
    {children}
  </label>
);
function inputStyle(surface, fg, border2, body) {
  return {
    width:'100%', padding:'11px 12px', borderRadius:9, border:`.5px solid ${border2}`,
    background: surface, color: fg, fontSize:14, fontFamily: body, outline:'none',
    transition:'border-color .15s',
  };
}

Object.assign(window, { useAuth, AuthScreen, validatePassword, validateEmail });
