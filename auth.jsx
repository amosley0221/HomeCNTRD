// auth.jsx — Mock cloud account + email/password signup/login.
// Persists in localStorage under 'homecntrd_account_v1'. The "cloud" is
// simulated — we treat localStorage as the source of truth for the user's
// profile, integrations, layout preferences, and connected sessions.

const ACCOUNT_KEY = 'homecntrd_account_v1';
const SESSION_KEY = 'homecntrd_session_v1';

function loadAccount() {
  try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY) || 'null'); } catch { return null; }
}
function saveAccount(a) { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(a)); }
function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}
function saveSession(s) { s ? localStorage.setItem(SESSION_KEY, JSON.stringify(s)) : localStorage.removeItem(SESSION_KEY); }

// Validation rule per user spec
function validatePassword(pw) {
  const errs = [];
  if (pw.length < 8) errs.push('At least 8 characters');
  if (!/[A-Z]/.test(pw)) errs.push('One capital letter');
  if (!/[0-9]/.test(pw)) errs.push('One number');
  if (!/[^A-Za-z0-9]/.test(pw)) errs.push('One special character');
  return errs;
}
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

// Demo account so we have something to show
function ensureDemoAccount() {
  const a = loadAccount();
  if (a && a.users) return a;
  const demo = {
    users: {
      'frances@home.com': {
        firstName: 'Frances',
        email: 'frances@home.com',
        password: 'Hearth1!',          // demo only — never do this in real apps
        createdAt: '2024-05-12',
        plan: 'plus-annual',
        layout: null,                  // home tile layout (set by app)
        integrations: null,            // (set by app — mirrors registry)
        sessions: [
          { id:'s1', device:'iPhone 16 Pro', os:'iOS 18.2', loc:'Bernal Heights, SF', ip:'73.140.•.•',  last:'now',          current:true  },
          { id:'s2', device:'MacBook Pro',   os:'macOS 15.1', loc:'Bernal Heights, SF', ip:'73.140.•.•', last:'2 hours ago',  current:false },
          { id:'s3', device:'Living Room display', os:'HomeCNTRD Hub', loc:'Willowbrook', ip:'192.168.•.•', last:'always',  current:false },
          { id:'s4', device:'iPad Air',      os:'iPadOS 18',  loc:'Bernal Heights, SF', ip:'73.140.•.•', last:'yesterday',   current:false },
        ],
        members: [
          { name:'Jamie Willows',  role:'Member',     email:'jamie.w@willowstudio.com',  perms:'Full access' },
          { name:'Mateo Willows',  role:'Member',     email:'mateo.w@willowstudio.com',  perms:'Lights & music · no cameras' },
          { name:'Cleaner · Guest', role:'Guest',     email:'temp · door code 4821',     perms:'Tue 9–11 AM only' },
        ],
        privacy: {
          cameraIndoorRecording: false,
          shareWithApple:        true,
          shareWithGoogle:       false,
          analytics:             true,
          voiceTraining:         false,
        },
      },
    },
  };
  saveAccount(demo);
  return demo;
}

// Simulated network latency for that "cloud sync" feel
const fakeDelay = (ms = 600) => new Promise(r => setTimeout(r, ms));

async function signup({ firstName, email, password }) {
  await fakeDelay(900);
  ensureDemoAccount();
  const a = loadAccount();
  if (!firstName || !firstName.trim()) throw new Error('First name is required');
  if (!validateEmail(email)) throw new Error('That email looks off — try again');
  const pwErrs = validatePassword(password);
  if (pwErrs.length) throw new Error('Password needs: ' + pwErrs.join(', '));
  const norm = email.trim().toLowerCase();
  if (a.users[norm]) throw new Error('An account already exists for that email');
  a.users[norm] = {
    firstName: firstName.trim(),
    email: norm,
    password,
    createdAt: new Date().toISOString().slice(0,10),
    plan: 'free',
    layout: null,
    integrations: null,
    sessions: [{ id:'s1', device: detectDevice(), os: detectOS(), loc:'Current location', ip:'·.·.·.·', last:'now', current:true }],
    members: [],
    privacy: { cameraIndoorRecording: false, shareWithApple: false, shareWithGoogle: false, analytics: true, voiceTraining: false },
  };
  saveAccount(a);
  saveSession({ email: norm, since: Date.now() });
  return a.users[norm];
}

async function login({ email, password }) {
  await fakeDelay(700);
  ensureDemoAccount();
  const a = loadAccount();
  const norm = (email || '').trim().toLowerCase();
  const u = a.users[norm];
  if (!u) throw new Error("We couldn't find an account for that email");
  if (u.password !== password) throw new Error('That password doesn\'t match');
  saveSession({ email: norm, since: Date.now() });
  return u;
}

function logout() { saveSession(null); }

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
  if (/Mac OS X (\d+[._]\d+)/.test(ua)) return 'macOS';
  if (/Windows NT/.test(ua)) return 'Windows';
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone OS|iPad/.test(ua)) return 'iOS';
  return 'Web';
}

// React hook the app uses to gate the shell
function useAuth() {
  const [user, setUser] = React.useState(() => {
    const s = loadSession();
    if (!s) return null;
    const a = loadAccount() || ensureDemoAccount();
    return a.users[s.email] || null;
  });
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const doSignup = async (data) => { setBusy(true); setErr(null); try { const u = await signup(data); setUser(u); } catch(e){ setErr(e.message); } finally { setBusy(false); } };
  const doLogin  = async (data) => { setBusy(true); setErr(null); try { const u = await login(data);  setUser(u); } catch(e){ setErr(e.message); } finally { setBusy(false); } };
  const doLogout = () => { logout(); setUser(null); };

  // Patch the user record (and persist) — used by all of the rest of the app
  // for layout, integrations, members, privacy etc.
  const patchUser = (patch) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      const a = loadAccount();
      a.users[next.email] = next;
      saveAccount(a);
      return next;
    });
  };

  return { user, busy, err, doSignup, doLogin, doLogout, patchUser, setErr };
}

// ── AUTH SCREEN ─────────────────────────────────────────────────────────
const AuthScreen = ({ onSignup, onLogin, busy, err, setErr }) => {
  const [mode, setMode] = React.useState('login');   // login | signup
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

  // Hardcoded warm tangerine palette (no shell yet)
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
      {/* Ambient dots */}
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

        {/* Tabs */}
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

          {mode === 'login' && (
            <div style={{textAlign:'center', fontSize:11, color:fg3, marginTop:4, lineHeight:1.6}}>
              Demo · sign in with <span style={{color:fg2}}>frances@home.com</span> / <span style={{color:fg2}}>Hearth1!</span>
            </div>
          )}
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
