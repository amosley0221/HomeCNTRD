// cameras-view.jsx — Cameras tab

const HIDDEN_CAMERAS_KEY = 'homecntrd:cameras-hidden';
const HIDDEN_RING_KEY = 'homecntrd:ring-alarm-hidden';

const loadStringSet = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch { return new Set(); }
};
const saveStringSet = (key, set) => {
  try { localStorage.setItem(key, JSON.stringify([...set])); } catch {}
};

const CamerasView = ({ ctx }) => {
  const { p, fonts, dens, state, narrow } = ctx;
  // Manage mode lets the user hide cameras (e.g. a Nest Hub Max that
  // negotiates WebRTC but never delivers frames) and the Ring Alarm
  // panel (when their Ring setup doesn't include an Alarm Pro / Base
  // Station and the alarm_control_panel entity is just dead weight).
  // Hidden state persists in localStorage; see ring/* equivalents in
  // the music view's `hidden` set for the same pattern.
  const [hidden, setHiddenRaw] = React.useState(() => loadStringSet(HIDDEN_CAMERAS_KEY));
  const setHidden = (updater) => setHiddenRaw(prev => {
    const next = typeof updater === 'function' ? updater(prev) : updater;
    saveStringSet(HIDDEN_CAMERAS_KEY, next);
    return next;
  });
  const [ringHidden, setRingHiddenRaw] = React.useState(() => {
    try { return localStorage.getItem(HIDDEN_RING_KEY) === '1'; } catch { return false; }
  });
  const setRingHidden = (v) => {
    setRingHiddenRaw(v);
    try { localStorage.setItem(HIDDEN_RING_KEY, v ? '1' : '0'); } catch {}
  };
  const [manage, setManage] = React.useState(false);

  const visible = state.cameras.filter(c => !hidden.has(c.id));
  // While managing, surface every camera (including hidden ones, with
  // a visual override) so the user can un-hide them. Outside manage,
  // hidden cameras are gone from the page.
  const list = manage ? state.cameras : visible;

  // Auto-pick a sensible hero on load and after the user hides the
  // current hero. Only used when not managing — manage mode keeps the
  // current hero so toggles don't shift the layout.
  const [heroId, setHeroId] = React.useState(() => visible[0]?.id || state.cameras[0]?.id);
  React.useEffect(() => {
    if (!visible.length) { setHeroId(null); return; }
    if (!visible.find(c => c.id === heroId)) setHeroId(visible[0].id);
  }, [visible, heroId]);
  const heroCam = list.find(c => c.id === heroId) || list[0];

  const [heroLive, setHeroLive] = React.useState(true);
  const [thumbsLive, setThumbsLive] = React.useState(false);

  const showRing = state.ring?.id && !ringHidden;

  if (!state.cameras.length) {
    return (
      <window.PageHead ctx={ctx} eyebrow="Cameras" title="No cameras yet"
        sub="Add Ring, Nest, Reolink, or another camera integration in HA."/>
    );
  }

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Ring · live"
        title="Around the house"
        sub={`${visible.filter(c => c.online).length} live · ${visible.filter(c => c.motion).length} with motion${hidden.size ? ` · ${hidden.size} hidden` : ''}`}
        right={
          <div style={{display:'flex', gap:8}}>
            <button
              onClick={() => setManage(v => !v)}
              style={{
                padding:'8px 14px', borderRadius:9,
                border:`.5px solid ${manage ? p.accent : p.border2}`,
                background: manage ? p.accentSoft : 'transparent',
                color: manage ? p.accent : p.fg,
                fontSize:12, cursor:'pointer', fontFamily:fonts.body,
              }}>
              {manage ? 'Done' : 'Manage'}
            </button>
            <button
              onClick={() => setThumbsLive(v => !v)}
              style={{
                padding:'8px 14px', borderRadius:9,
                border:`.5px solid ${thumbsLive ? p.accent : p.border2}`,
                background: thumbsLive ? p.accentSoft : 'transparent',
                color: thumbsLive ? p.accent : p.fg,
                fontSize:12, cursor:'pointer', fontFamily:fonts.body,
                display:'inline-flex', alignItems:'center', gap:6,
              }}>
              <span style={{width:6, height:6, borderRadius:'50%', background: thumbsLive ? p.accent : p.fg3, animation: thumbsLive ? 'pulse 1.6s ease-in-out infinite' : 'none'}}/>
              {thumbsLive ? 'All live' : 'Live thumbs'}
            </button>
          </div>
        }
      />

      {!visible.length && !manage && (
        <div style={{
          padding:'40px 20px', textAlign:'center', color:p.fg3,
          border:`.5px dashed ${p.border2}`, borderRadius:12, background:p.surface,
          marginBottom: dens.gap,
        }}>
          All cameras are hidden. Tap Manage to bring some back.
        </div>
      )}

      <div style={{display:'grid', gridTemplateColumns: narrow ? 'minmax(0, 1fr)' : '1.6fr 1fr', gap:dens.gap}}>
        <div>
          {heroCam && (
            <>
              <div style={{aspectRatio:'16/9', borderRadius:14, overflow:'hidden', position:'relative'}}>
                <window.CamThumb c={heroCam} ctx={ctx} live={heroLive}/>
                <button
                  onClick={() => setHeroLive(v => !v)}
                  aria-label={heroLive ? 'Pause live' : 'Resume live'}
                  style={{
                    position:'absolute', top:10, right:10, zIndex:2,
                    padding:'5px 10px', borderRadius:999,
                    background:'rgba(0,0,0,0.55)', border:`.5px solid rgba(255,255,255,0.18)`,
                    color:'#fff', fontSize:10, cursor:'pointer', fontFamily:fonts.body,
                    letterSpacing:'.04em', textTransform:'uppercase',
                  }}>
                  {heroLive ? 'Pause' : 'Live'}
                </button>
              </div>
              <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
                {['Talk','Snapshot','Save clip','Mute alerts','Spotlight'].map(b => (
                  <button key={b} style={{padding:'8px 14px', borderRadius:8, border:`.5px solid ${p.border2}`, background:p.surface2, color:p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body}}>{b}</button>
                ))}
              </div>
            </>
          )}

          {/* Ring Alarm panel: only render when HA actually exposes an
              alarm_control_panel AND the user hasn't hidden it. The
              user can re-show it via Manage mode. */}
          {showRing && (
            <div style={{marginTop:12}}>
              <window.RingModeSwitcher ctx={ctx}/>
            </div>
          )}

          {manage && state.ring?.id && (
            <div style={{
              marginTop:12, padding:'12px 14px', borderRadius:10,
              border:`.5px dashed ${p.border2}`, background:p.surface,
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{flex:1}}>
                <div style={{fontSize:13, color:p.fg, fontWeight:500}}>Ring Alarm panel</div>
                <div style={{fontSize:11, color:p.fg3, marginTop:2}}>
                  Sourced from {state.ring.id}.
                </div>
              </div>
              <button onClick={() => setRingHidden(!ringHidden)} style={{
                padding:'6px 12px', borderRadius:7,
                border:`.5px solid ${p.border2}`,
                background: ringHidden ? p.accentSoft : 'transparent',
                color: ringHidden ? p.accent : p.fg2,
                fontSize:11, cursor:'pointer', fontFamily:fonts.body,
              }}>
                {ringHidden ? 'Hidden — show' : 'Hide'}
              </button>
            </div>
          )}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'minmax(0, 1fr) minmax(0, 1fr)', gap:10, alignContent:'start'}}>
          {list.map(c => {
            const isHidden = hidden.has(c.id);
            return (
              <div key={c.id} style={{position:'relative'}}>
                <button
                  onClick={() => { if (!manage) { setHeroId(c.id); setHeroLive(true); } }}
                  disabled={manage}
                  style={{
                    width:'100%', padding:0,
                    border:`.5px solid ${c.id===heroId && !manage ? p.accent : 'transparent'}`,
                    borderRadius:11, background:'transparent',
                    cursor: manage ? 'default' : 'pointer',
                    opacity: isHidden ? 0.45 : 1,
                  }}>
                  <window.CamThumb c={c} ctx={ctx} live={thumbsLive && c.online && !manage}/>
                </button>
                {manage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHidden(prev => {
                        const n = new Set(prev);
                        if (n.has(c.id)) n.delete(c.id); else n.add(c.id);
                        return n;
                      });
                    }}
                    style={{
                      position:'absolute', top:6, right:6, zIndex:3,
                      padding:'4px 10px', borderRadius:999,
                      background: isHidden ? p.accent : 'rgba(0,0,0,0.65)',
                      border: `.5px solid ${isHidden ? p.accent : 'rgba(255,255,255,0.22)'}`,
                      color:'#fff', fontSize:10, cursor:'pointer',
                      fontFamily:fonts.body, fontWeight:500,
                      letterSpacing:'.04em', textTransform:'uppercase',
                    }}>
                    {isHidden ? 'Show' : 'Hide'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>
      <div style={{height:60}}/>
    </>
  );
};

window.CamerasView = CamerasView;
