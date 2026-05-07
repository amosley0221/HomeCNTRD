// cameras-view.jsx — Cameras tab

const CamerasView = ({ ctx }) => {
  const { p, fonts, dens, state } = ctx;
  const [hero, setHero] = React.useState(state.cameras[0].id);
  const heroCam = state.cameras.find(c => c.id === hero) || state.cameras[0];
  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Ring · live"
        title="Around the house"
        sub={`${state.cameras.filter(c => c.online).length} live · ${state.cameras.filter(c => c.motion).length} with motion`}
      />
      <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:dens.gap}}>
        <div>
          <div style={{aspectRatio:'16/9', borderRadius:14, overflow:'hidden', position:'relative'}}>
            <window.CamThumb c={heroCam} ctx={ctx} big/>
          </div>
          <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
            {['Talk','Snapshot','Save clip','Mute alerts','Spotlight'].map(b => (
              <button key={b} style={{padding:'8px 14px', borderRadius:8, border:`.5px solid ${p.border2}`, background:p.surface2, color:p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body}}>{b}</button>
            ))}
          </div>
          <div style={{marginTop:12}}>
            <window.RingModeSwitcher ctx={ctx}/>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, alignContent:'start'}}>
          {state.cameras.map(c => (
            <button key={c.id} onClick={() => setHero(c.id)} style={{padding:0, border:`.5px solid ${c.id===hero ? p.accent : 'transparent'}`, borderRadius:11, background:'transparent', cursor:'pointer'}}>
              <window.CamThumb c={c} ctx={ctx}/>
            </button>
          ))}
        </div>
      </div>
      {/* Recent activity is sourced from HA's logbook — coming soon.
          Until that's wired in, motion state is shown live on each thumb
          via the MOTION pill (cross-linked from binary_sensor.*_motion). */}
      <div style={{height:60}}/>
    </>
  );
};

window.CamerasView = CamerasView;
