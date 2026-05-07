// cameras-view.jsx — Cameras tab

const CamerasView = ({ ctx }) => {
  const { p, fonts, dens, state, narrow } = ctx;
  if (!state.cameras.length) {
    return (
      <>
        <window.PageHead ctx={ctx} eyebrow="Cameras" title="No cameras yet"
          sub="Add Ring, Nest, Reolink, or another camera integration in HA."/>
      </>
    );
  }
  const [hero, setHero] = React.useState(state.cameras[0].id);
  const heroCam = state.cameras.find(c => c.id === hero) || state.cameras[0];
  // Live mode for the hero is on by default — the user is actively
  // looking at it, so we want full motion. Thumbnails default to
  // snapshot-only to keep bandwidth and CPU sane; the toggle lets the
  // user opt all of them in.
  const [heroLive, setHeroLive] = React.useState(true);
  const [thumbsLive, setThumbsLive] = React.useState(false);

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Ring · live"
        title="Around the house"
        sub={`${state.cameras.filter(c => c.online).length} live · ${state.cameras.filter(c => c.motion).length} with motion`}
        right={
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
        }
      />
      <div style={{display:'grid', gridTemplateColumns: narrow ? '1fr' : '1.6fr 1fr', gap:dens.gap}}>
        <div>
          <div style={{aspectRatio:'16/9', borderRadius:14, overflow:'hidden', position:'relative'}}>
            <window.CamThumb c={heroCam} ctx={ctx} live={heroLive}/>
            {/* Pause/resume the live stream on the hero so the user can
                drop back to a still without leaving the page. */}
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
          {/* Only show the alarm switcher when HA actually exposes a Ring
              Alarm panel — Ring camera/doorbell setups without the Alarm
              Pro / Base Station won't have an alarm_control_panel entity. */}
          {state.ring?.id && (
            <div style={{marginTop:12}}>
              <window.RingModeSwitcher ctx={ctx}/>
            </div>
          )}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, alignContent:'start'}}>
          {state.cameras.map(c => (
            <button
              key={c.id}
              onClick={() => { setHero(c.id); setHeroLive(true); }}
              style={{padding:0, border:`.5px solid ${c.id===hero ? p.accent : 'transparent'}`, borderRadius:11, background:'transparent', cursor:'pointer'}}>
              <window.CamThumb c={c} ctx={ctx} live={thumbsLive && c.online}/>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>
      {/* Recent activity is sourced from HA's logbook — coming soon.
          Until that's wired in, motion state is shown live on each thumb
          via the MOTION pill (cross-linked from binary_sensor.*_motion). */}
      <div style={{height:60}}/>
    </>
  );
};

window.CamerasView = CamerasView;
