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
      <window.Section title="Recent activity" p={p} fonts={fonts}>
        {[
          { t:'7:38 PM', cam:'Front Door', what:'Person at front door · package delivered', dot:p.accent },
          { t:'5:14 PM', cam:'Driveway', what:"Vehicle pulled in · Frances's Subaru", dot:'oklch(60% 0.13 145)' },
          { t:'2:02 PM', cam:'Back Yard', what:'Motion · likely a deer', dot:p.fg3 },
          { t:'12:38 PM', cam:'Garage', what:'Door opened · Frances', dot:'oklch(60% 0.13 145)' },
        ].map((row,i) => (
          <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderRadius:10, background:p.surface2, border:`.5px solid ${p.border}`, marginBottom:8}}>
            <div style={{width:60, fontSize:12, color:p.fg2, fontVariantNumeric:'tabular-nums'}}>{row.t}</div>
            <div style={{width:6, height:6, borderRadius:'50%', background:row.dot}}/>
            <div style={{flex:1, fontSize:13, color:p.fg}}>{row.what}</div>
            <div style={{fontSize:11, color:p.fg3, fontStyle:'italic'}}>{row.cam}</div>
          </div>
        ))}
      </window.Section>
      <div style={{height:60}}/>
    </>
  );
};

window.CamerasView = CamerasView;
