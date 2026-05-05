// garage-view.jsx — MyQ doors + history

const GarageView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const toggleDoor = (id) => setState(s => ({
    ...s, garage: { ...s.garage, doors: s.garage.doors.map(d => d.id === id ? { ...d, open: !d.open, lastChanged: 'now' } : d) }
  }));

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="MyQ · Willowbrook"
        title="Garage"
        sub={`${state.garage.doors.filter(d => d.open).length} open · ${state.garage.doors.length} doors`}
      />

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:dens.gap}}>
        {state.garage.doors.map(d => (
          <window.Card key={d.id} p={p} style={{padding:0, overflow:'hidden'}}>
            <div style={{position:'relative', height:240, background:p.dark ? '#1c1814' : '#efe7d8', display:'grid', placeItems:'center', overflow:'hidden'}}>
              <svg viewBox="0 0 240 200" style={{width:'80%'}}>
                {/* house frame */}
                <rect x="20" y="60" width="200" height="120" fill={p.dark ? '#28221b' : '#dfd2bd'} stroke={p.border2}/>
                {/* roof */}
                <path d="M 10 60 L 120 15 L 230 60 Z" fill={p.dark ? '#1f1a14' : '#cdbfa6'} stroke={p.border2}/>
                {/* garage frame */}
                <rect x="50" y="80" width="140" height="100" fill={p.dark ? '#15110c' : '#fffaf0'} stroke={p.border2} strokeWidth=".8"/>
                {/* door slats — animate based on open state */}
                {Array.from({length:7}).map((_, i) => (
                  <rect key={i} x="54" y={86 + i*13} width="132" height="11" rx="2"
                    fill={p.dark ? '#3a3024' : '#e8d9bd'} stroke={p.border} strokeWidth=".5"
                    style={{
                      transform: d.open ? `translateY(-${(i+1)*8}px)` : 'translateY(0)',
                      opacity: d.open ? Math.max(0, 1 - (i * 0.18)) : 1,
                      transition:'all .6s cubic-bezier(.5,0,.2,1)',
                      transformOrigin:'center'
                    }}/>
                ))}
                {/* dark interior visible when open */}
                {d.open && <rect x="54" y="86" width="132" height="14" fill="#0a0805" opacity="0.6"/>}
              </svg>
              <div style={{position:'absolute', top:14, left:14, padding:'4px 9px', borderRadius:999, fontSize:11, fontWeight:500, letterSpacing:'.05em',
                background: d.open ? p.accent : 'oklch(60% 0.14 145)', color:'#fff'}}>
                {d.open ? 'OPEN' : 'CLOSED'}
              </div>
              <div style={{position:'absolute', top:14, right:14, fontSize:11, color:p.fg3, fontVariantNumeric:'tabular-nums'}}>{d.lastChanged}</div>
            </div>

            <div style={{padding:18}}>
              <div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, fontWeight:500}}>{d.name}</div>
              <div style={{fontSize:12, color:p.fg3, marginTop:4}}>Last {d.open ? 'opened' : 'closed'} {d.lastChanged}</div>
              <div style={{display:'flex', gap:8, marginTop:14}}>
                <button onClick={() => toggleDoor(d.id)} style={{
                  flex:1, padding:'10px 0', borderRadius:9, border:0, cursor:'pointer', fontSize:13, fontFamily:fonts.body, fontWeight:500,
                  background: d.open ? p.surface : p.accent, color: d.open ? p.fg : '#fff',
                  border: d.open ? `.5px solid ${p.border2}` : 'none',
                }}>
                  {d.open ? 'Close door' : 'Open door'}
                </button>
                <button style={{padding:'10px 14px', borderRadius:9, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:12, fontFamily:fonts.body, cursor:'pointer'}}>
                  Auto-close
                </button>
              </div>
            </div>
          </window.Card>
        ))}
      </div>

      <window.Card p={p} style={{padding:18}}>
        <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:12}}>Activity · last 24 hours</div>
        {state.garage.history.map((h, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding:'10px 0', borderTop: i ? `.5px solid ${p.border}` : 'none', fontSize:13}}>
            <div style={{width:60, color:p.fg3, fontVariantNumeric:'tabular-nums'}}>{h.t}</div>
            <div style={{width:6, height:6, borderRadius:'50%', background: h.action === 'opened' ? p.accent : 'oklch(60% 0.14 145)'}}/>
            <div style={{flex:1, color:p.fg}}>
              <b style={{fontWeight:500}}>{h.door}</b> <span style={{color:p.fg2}}>{h.action}</span>
            </div>
            <div style={{fontSize:11, color:p.fg3, fontStyle:'italic', fontFamily:fonts.display}}>{h.who}</div>
          </div>
        ))}
      </window.Card>
      <div style={{height:60}}/>
    </>
  );
};

window.GarageView = GarageView;
