// car-view.jsx — Tesla Model 3

const CarView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const t = state.tesla;
  const set = (k, v) => setState(s => ({...s, tesla: {...s.tesla, [k]: v}}));

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Tesla · Model 3"
        title={t.name}
        sub={`${t.location} · software ${t.software} · ${t.odometer.toLocaleString()} mi`}
        right={<div style={{display:'flex', gap:8}}>
          <window.PillBtn p={p} fonts={fonts} active={t.locked} onClick={() => set('locked', !t.locked)}
            style={{display:'inline-flex', alignItems:'center', gap:6}}>
            <window.Icon name="lock" size={12}/> {t.locked ? 'Locked' : 'Unlocked'}
          </window.PillBtn>
          <window.PillBtn p={p} fonts={fonts} active={t.sentry} onClick={() => set('sentry', !t.sentry)}
            style={{display:'inline-flex', alignItems:'center', gap:6}}>
            <window.Icon name="shield" size={12}/> Sentry {t.sentry ? 'on' : 'off'}
          </window.PillBtn>
        </div>}
      />

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:dens.gap, alignItems:'start'}}>
        {/* Left: hero card */}
        <window.Card p={p} style={{padding:0, overflow:'hidden'}}>
          <div style={{position:'relative', height:280, background:`linear-gradient(180deg, ${p.dark ? '#1a1a1f' : '#e6e3dd'} 0%, ${p.surface2} 100%)`, overflow:'hidden'}}>
            {/* Tesla side silhouette */}
            <svg viewBox="0 0 400 160" style={{position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%)', width:'82%', height:'auto', filter: p.dark ? 'drop-shadow(0 8px 24px rgba(0,0,0,.5))' : 'drop-shadow(0 8px 18px rgba(0,0,0,.18))'}}>
              {/* body */}
              <path d="M 30 110 Q 60 70, 130 60 Q 180 35, 240 38 Q 290 40, 330 60 Q 360 78, 380 105 L 380 120 Q 370 130, 350 130 L 50 130 Q 30 130, 30 120 Z"
                    fill={p.dark ? '#3a3a40' : '#cfcdc7'} stroke={p.border2} strokeWidth=".8"/>
              {/* roof glass */}
              <path d="M 130 60 Q 180 35, 240 38 Q 280 40, 310 56 L 290 80 L 150 80 Z" fill={p.dark ? '#1a1d22' : '#7d8896'} opacity=".85"/>
              {/* highlight */}
              <path d="M 60 90 Q 130 78, 200 78 Q 280 78, 360 95" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
              {/* wheels */}
              <circle cx="110" cy="130" r="22" fill={p.dark ? '#0e0e10' : '#2a2622'}/>
              <circle cx="110" cy="130" r="14" fill={p.dark ? '#2a2a2e' : '#65605a'}/>
              <circle cx="110" cy="130" r="5"  fill={p.dark ? '#0e0e10' : '#2a2622'}/>
              <circle cx="310" cy="130" r="22" fill={p.dark ? '#0e0e10' : '#2a2622'}/>
              <circle cx="310" cy="130" r="14" fill={p.dark ? '#2a2a2e' : '#65605a'}/>
              <circle cx="310" cy="130" r="5"  fill={p.dark ? '#0e0e10' : '#2a2622'}/>
              {/* charge port glow */}
              {t.charging && <circle cx="365" cy="100" r="5" fill={p.accent}>
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
              </circle>}
              {/* frunk hint */}
              {t.frunk && <path d="M 140 50 Q 180 25, 220 28" fill="none" stroke={p.accent} strokeWidth="2" strokeDasharray="3,3"/>}
              {t.trunk && <path d="M 290 50 Q 320 25, 340 30" fill="none" stroke={p.accent} strokeWidth="2" strokeDasharray="3,3"/>}
            </svg>

            {/* Charge bar bottom */}
            <div style={{position:'absolute', bottom:14, left:18, right:18}}>
              <div style={{display:'flex', alignItems:'baseline', gap:10, fontFamily:fonts.display, color:p.fg}}>
                <div style={{fontSize:46, fontWeight:500, lineHeight:1, fontVariantNumeric:'tabular-nums'}}>{t.chargePct}<span style={{fontSize:22, color:p.fg2}}>%</span></div>
                <div style={{fontSize:13, color:p.fg2}}>{t.range} mi range</div>
                <div style={{flex:1}}/>
                <div style={{fontSize:11, color:t.charging ? p.accent : p.fg3, display:'flex', alignItems:'center', gap:5}}>
                  {t.charging && <window.Icon name="bolt" size={11}/>}
                  {t.charging ? `+${t.chargeRate} mph` : (t.pluggedIn ? 'plugged in · idle' : 'unplugged')}
                </div>
              </div>
              <div style={{height:4, background:p.border, borderRadius:2, marginTop:8, overflow:'hidden'}}>
                <div style={{width:`${t.chargePct}%`, height:'100%', background:t.charging ? p.accent : 'oklch(60% 0.14 145)', transition:'width .3s'}}/>
              </div>
            </div>
          </div>

          {/* Quick actions row */}
          <div style={{padding:14, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, borderTop:`.5px solid ${p.border}`}}>
            {[
              { icon:'lock',     label: t.locked ? 'Unlock' : 'Lock', onClick: () => set('locked', !t.locked) },
              { icon:'snowflake',label: t.climateOn ? 'Climate on' : 'Precondition', onClick: () => set('climateOn', !t.climateOn), active: t.climateOn },
              { icon:'package',  label: t.frunk ? 'Frunk open' : 'Open frunk', onClick: () => set('frunk', !t.frunk), active: t.frunk },
              { icon:'package',  label: t.trunk ? 'Trunk open' : 'Open trunk', onClick: () => set('trunk', !t.trunk), active: t.trunk },
            ].map(b => (
              <button key={b.label} onClick={b.onClick} style={{
                padding:'12px 8px', borderRadius:9, cursor:'pointer', fontFamily:fonts.body, fontSize:11,
                border:`.5px solid ${b.active ? p.accent : p.border2}`,
                background: b.active ? p.accentSoft : p.surface, color: b.active ? p.accent : p.fg,
                display:'flex', flexDirection:'column', alignItems:'center', gap:6,
              }}>
                <window.Icon name={b.icon} size={16}/>
                <span>{b.label}</span>
              </button>
            ))}
          </div>
        </window.Card>

        {/* Right: climate */}
        <window.Card p={p} style={{padding:18}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
            <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3}}>Cabin climate</div>
            <window.Toggle p={p} on={t.climateOn} onChange={(v) => set('climateOn', v)}/>
          </div>
          <div style={{display:'flex', alignItems:'baseline', gap:14}}>
            <div style={{fontFamily:fonts.display, fontSize:54, lineHeight:1, color:p.fg}}>{t.target}<span style={{fontSize:24, color:p.fg2, marginLeft:2}}>°</span></div>
            <div style={{fontSize:12, color:p.fg2}}>
              <div>cabin {t.cabin}°</div>
              <div style={{color:p.fg3}}>target</div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button onClick={() => set('target', t.target - 1)} style={{
              flex:1, padding:'9px 0', border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, borderRadius:8, fontSize:14, cursor:'pointer'
            }}>−</button>
            <button onClick={() => set('target', t.target + 1)} style={{
              flex:1, padding:'9px 0', border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, borderRadius:8, fontSize:14, cursor:'pointer'
            }}>+</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:10}}>
            {['Auto','Defrost','Heat seats','Vent'].map(b => (
              <button key={b} style={{padding:'9px 0', border:`.5px solid ${p.border2}`, background:p.surface, color:p.fg, borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>{b}</button>
            ))}
          </div>
          <div style={{borderTop:`.5px solid ${p.border}`, paddingTop:12, marginTop:14, fontSize:11, color:p.fg3}}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span>Sunroof</span><span style={{color:p.fg2}}>{t.sunroof}% open</span></div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span>Windows</span><span style={{color:p.fg2}}>Closed</span></div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}><span>Tire pressure</span><span style={{color:p.fg2}}>42 / 41 / 42 / 41 psi</span></div>
          </div>
        </window.Card>
      </div>

      {/* Bottom row: charging schedule + trips */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:dens.gap}}>
        <window.Card p={p} style={{padding:18}}>
          <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:12}}>Charging</div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <Row p={p} label="Charge limit" value={`${t.chargePct < 80 ? 80 : 90}%`}/>
            <Row p={p} label="Scheduled start" value="Tonight · 11:00 PM"/>
            <Row p={p} label="Charging amps" value="48 A"/>
            <Row p={p} label="Voltage" value="240 V"/>
            <Row p={p} label="Energy added today" value="22.4 kWh"/>
          </div>
        </window.Card>
        <window.Card p={p} style={{padding:18}}>
          <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:12}}>Recent trips</div>
          {[
            { dest:'Studio · Mission',         time:'8:14 AM', dist:'4.2 mi',  energy:'1.6 kWh' },
            { dest:'Sightglass Coffee',        time:'11:32 AM', dist:'1.8 mi', energy:'0.7 kWh' },
            { dest:'Whole Foods · 4th St',     time:'5:48 PM',  dist:'3.1 mi', energy:'1.2 kWh' },
            { dest:'Home',                     time:'6:22 PM',  dist:'3.0 mi', energy:'1.1 kWh' },
          ].map((trip, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderTop: i ? `.5px solid ${p.border}` : 'none', fontSize:12}}>
              <window.Icon name="location" size={14} style={{color:p.fg3}}/>
              <div style={{flex:1, color:p.fg}}>{trip.dest}</div>
              <div style={{color:p.fg3, fontVariantNumeric:'tabular-nums'}}>{trip.time}</div>
              <div style={{color:p.fg3, width:60, textAlign:'right', fontVariantNumeric:'tabular-nums'}}>{trip.dist}</div>
            </div>
          ))}
        </window.Card>
      </div>
      <div style={{height:60}}/>
    </>
  );
};

const Row = ({ p, label, value }) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', fontSize:12}}>
    <span style={{color:p.fg2}}>{label}</span>
    <span style={{color:p.fg, fontVariantNumeric:'tabular-nums'}}>{value}</span>
  </div>
);

window.CarView = CarView;
