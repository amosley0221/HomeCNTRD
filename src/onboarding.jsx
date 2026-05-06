// onboarding.jsx — "Connect Home Assistant" screen.
//
// Shown after Supabase auth when the user's profile has no ha_url yet. Asks
// for the HA URL + a long-lived access token, validates by attempting a
// REST call to /api/, and on success persists to the profile and triggers
// HA WebSocket setup.

import { setupHAClient } from './lib/ha.js';

const ConnectHomeAssistant = ({ onConnect, busy, err, setErr, defaultUrl, defaultToken }) => {
  const [url, setUrl] = React.useState(defaultUrl || 'https://homeassistant.tailcc60a4.ts.net');
  const [token, setToken] = React.useState(defaultToken || '');
  const [showToken, setShowToken] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    onConnect({ url: url.trim().replace(/\/$/, ''), token: token.trim() });
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
      <div style={{
        position:'relative', width:'min(480px, 100%)',
        background: surface2, border:`.5px solid ${border}`, borderRadius:20,
        padding:'34px 32px 28px', boxShadow:'0 32px 80px rgba(0,0,0,.55)',
      }}>
        <div style={{textAlign:'center', marginBottom:20}}>
          <div style={{fontFamily:display, fontSize:30, color:accent, fontStyle:'italic', lineHeight:1}}>Connect your Home</div>
          <div style={{fontSize:12, color:fg3, marginTop:8, letterSpacing:'.04em', lineHeight:1.6}}>
            Point HomeCNTRD at your Home Assistant.<br/>Make sure your device is on the same Tailnet.
          </div>
        </div>

        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:14}}>
          <label style={{display:'flex', flexDirection:'column', gap:5}}>
            <span style={{fontSize:11, color:fg3, letterSpacing:'.06em', textTransform:'uppercase'}}>Home Assistant URL</span>
            <input value={url} onChange={e => setUrl(e.target.value)}
              placeholder="https://homeassistant.tailXXXX.ts.net"
              style={{
                width:'100%', padding:'11px 12px', borderRadius:9, border:`.5px solid ${border2}`,
                background: surface, color: fg, fontSize:14, fontFamily: body, outline:'none',
              }}
              autoComplete="url" required />
          </label>

          <label style={{display:'flex', flexDirection:'column', gap:5}}>
            <span style={{fontSize:11, color:fg3, letterSpacing:'.06em', textTransform:'uppercase'}}>Long-lived access token</span>
            <div style={{position:'relative'}}>
              <input type={showToken ? 'text' : 'password'} value={token} onChange={e => setToken(e.target.value)}
                placeholder="eyJhbGciOiJI..."
                style={{
                  width:'100%', padding:'11px 12px', paddingRight:64, borderRadius:9, border:`.5px solid ${border2}`,
                  background: surface, color: fg, fontSize:14, fontFamily: body, outline:'none',
                }}
                autoComplete="off" required />
              <button type="button" onClick={() => setShowToken(s => !s)} style={{
                position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
                padding:'4px 8px', borderRadius:6, border:0, background:'transparent', color:fg2, fontSize:11, cursor:'pointer'
              }}>{showToken ? 'Hide' : 'Show'}</button>
            </div>
          </label>

          <div style={{padding:'10px 12px', borderRadius:9, background:surface, border:`.5px solid ${border}`, fontSize:11.5, color:fg2, lineHeight:1.6}}>
            <div style={{fontSize:10.5, color:fg3, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6}}>How to get your token</div>
            In Home Assistant: bottom-left avatar → <em>Security</em> tab → scroll to <em>Long-Lived Access Tokens</em> → <em>Create Token</em>. Copy it — HA only shows it once.
          </div>

          {err && (
            <div style={{padding:'9px 12px', borderRadius:8, background:'rgba(217,100,80,.16)', border:'.5px solid rgba(217,100,80,.4)', color:'#ec8b78', fontSize:12}}>
              {err}
            </div>
          )}

          <button type="submit" disabled={busy} style={{
            padding:'12px 0', borderRadius:10, border:0, background: accent, color:'#fff',
            fontSize:14, fontWeight:500, cursor: busy ? 'wait' : 'pointer', fontFamily:body,
            opacity: busy ? 0.6 : 1, marginTop:4,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            {busy && <span style={{width:14, height:14, border:'2px solid rgba(255,255,255,.5)', borderTopColor:'#fff', borderRadius:'50%', animation:'authSpin 0.8s linear infinite'}}/>}
            {busy ? 'Connecting…' : 'Connect'}
          </button>
        </form>

        <div style={{textAlign:'center', fontSize:10.5, color:fg3, marginTop:18, lineHeight:1.6}}>
          Your URL + token are stored in your account so they sync across devices.
        </div>
      </div>

      <style>{`@keyframes authSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

// Validate a URL + token by issuing a single REST call. HA's /api/ endpoint
// returns {message:"API running."} when the token is valid.
async function validateHA({ url, token }) {
  const u = (url || '').trim().replace(/\/$/, '');
  const t = (token || '').trim();
  if (!u || !t) throw new Error('URL and token are both required');
  if (!/^https?:\/\//.test(u)) throw new Error('URL should start with https:// or http://');
  let r;
  try {
    r = await fetch(u + '/api/', { headers: { Authorization: `Bearer ${t}` } });
  } catch (e) {
    throw new Error('Could not reach Home Assistant. Is your device on the Tailnet?');
  }
  if (r.status === 401) throw new Error('Token rejected. Generate a fresh long-lived access token in HA.');
  if (!r.ok) throw new Error(`Home Assistant returned ${r.status}`);
}

// Hook that drives the screen above. Persists URL/token to the user's profile
// via patchUser, then sets up the singleton HA WebSocket client.
function useHomeAssistantConnect(user, patchUser) {
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const onConnect = async ({ url, token }) => {
    setBusy(true); setErr(null);
    try {
      await validateHA({ url, token });
      patchUser(u => ({ ...u, ha_url: url, ha_token: token }));
      setupHAClient({ url, token });
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return { busy, err, setErr, onConnect };
}

if (typeof window !== 'undefined') {
  Object.assign(window, { ConnectHomeAssistant, useHomeAssistantConnect, validateHA });
}
