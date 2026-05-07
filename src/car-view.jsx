// car-view.jsx — Tesla page (under Dashboard view)
//
// Reads from state.tesla, which ha-bridge populates from Tessie entities.
// All actions are wired through setState — diffAndDispatch in ha-bridge.js
// translates the state changes into HA service calls.
//
// Picture priority:
//   1. /local/homecntrd-tesla.jpg                     ← user-supplied photo
//   2. Tesla's public configurator compositor URL     ← live render
//   3. Inline SVG silhouette                          ← always works

// Tesla's public configurator compositor. Options chosen for a Pearl
// White 2020 Model 3 with 19" Sport wheels (silver) and a black interior.
//   $MT311 — Model 3 Long Range
//   $PPSW  — Pearl White paint
//   $IBB1  — Black interior
//   $WY19B — 19" Sport wheels (silver)
const TESLA_COMPOSITOR_URL =
  'https://static-assets.tesla.com/configurator/compositor' +
  '?context=design_studio_2&bkba_opt=1&view=STUD_3QTR&size=1920' +
  '&model=m3&options=$MT311,$PPSW,$IBB1,$WY19B';

const CarView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const t = state.tesla;
  const set = (k, v) => setState(s => ({...s, tesla: {...s.tesla, [k]: v}}));

  // Picture-source fallback chain. We start at index 0 and step forward
  // each time the previous source fires onError.
  const sources = ['/local/homecntrd-tesla.jpg', TESLA_COMPOSITOR_URL];
  const [imgIdx, setImgIdx] = React.useState(0);
  const [imgFailed, setImgFailed] = React.useState(false);
  const onImgError = () => {
    if (imgIdx < sources.length - 1) setImgIdx(imgIdx + 1);
    else setImgFailed(true);
  };

  // No Tesla detected — show a friendly, actionable empty state instead
  // of the demo data with zeros.
  if (!t.id) {
    return (
      <>
        <window.PageHead ctx={ctx}
          eyebrow="Tesla"
          title="No Tesla connected"
          sub="Add the Tessie integration in HA and your car will appear here."
        />
        <window.Card p={p} style={{padding:24}}>
          <div style={{fontSize:13, color:p.fg2, lineHeight:1.6}}>
            <div style={{marginBottom:10, color:p.fg, fontFamily:fonts.display, fontSize:16}}>How to connect</div>
            <ol style={{margin:0, paddingLeft:18, display:'flex', flexDirection:'column', gap:6}}>
              <li>Sign in at <span style={{color:p.fg}}>tessie.com</span> with your Tesla account.</li>
              <li>In the Tesla mobile app: Locks → Add Key → scan Tessie's QR.</li>
              <li>In Tessie: Settings → Home Assistant → copy the access token.</li>
              <li>In HA: Settings → Devices & Services → Add Integration → Tessie → paste token.</li>
            </ol>
          </div>
        </window.Card>
      </>
    );
  }

  const subParts = [];
  if (t.location && t.location !== '—') subParts.push(t.location);
  if (t.software && t.software !== '—') subParts.push(`software ${t.software}`);
  if (t.odometer) subParts.push(`${t.odometer.toLocaleString()} ${t.odometerUnit}`);
  const sub = subParts.join(' · ');

  const tu = t.tempUnit || '°F';
  const ru = t.rangeUnit || 'mi';
  const chargeColor = t.chargePct <= 20 ? '#c14d36' : t.chargePct <= 40 ? '#d8843e' : p.accent;

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Tesla"
        title={t.name}
        sub={sub || '—'}
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
            {!imgFailed ? (
              <img
                src={sources[imgIdx]}
                alt="Tesla"
                onError={onImgError}
                style={{
                  position:'absolute', top:'50%', left:'50%',
                  transform:'translate(-50%, -55%)',
                  width:'88%', height:'auto', maxHeight:'78%',
                  objectFit:'contain',
                  filter: p.dark ? 'drop-shadow(0 8px 24px rgba(0,0,0,.55))' : 'drop-shadow(0 8px 18px rgba(0,0,0,.18))',
                }}
              />
            ) : (
              <TeslaSilhouette p={p} accent={p.accent} charging={t.charging} frunk={t.frunk} trunk={t.trunk}/>
            )}

            {/* Charge port glow on top of the photo when charging */}
            {!imgFailed && t.charging && (
              <div style={{
                position:'absolute', top:'46%', right:'12%',
                width:14, height:14, borderRadius:'50%',
                background: p.accent, boxShadow: `0 0 18px 3px ${p.accent}`,
                animation:'pulse 2s ease-in-out infinite',
              }}/>
            )}

            {/* Charge bar bottom */}
            <div style={{position:'absolute', bottom:14, left:18, right:18}}>
              <div style={{display:'flex', alignItems:'baseline', gap:10, fontFamily:fonts.display, color:p.fg}}>
                <div style={{fontSize:46, fontWeight:500, lineHeight:1, fontVariantNumeric:'tabular-nums'}}>{t.chargePct}<span style={{fontSize:22, color:p.fg2}}>%</span></div>
                <div style={{fontSize:13, color:p.fg2}}>{t.range} {ru} range</div>
                <div style={{flex:1}}/>
                <div style={{fontSize:11, color:t.charging ? p.accent : p.fg3, display:'flex', alignItems:'center', gap:5}}>
                  {t.charging && <window.Icon name="bolt" size={11}/>}
                  {t.charging
                    ? (t.chargeRate ? `+${t.chargeRate} mph` : 'charging')
                    : (t.pluggedIn ? 'plugged in · idle' : 'unplugged')}
                </div>
              </div>
              <div style={{height:4, background:p.border, borderRadius:2, marginTop:8, overflow:'hidden'}}>
                <div style={{width:`${t.chargePct}%`, height:'100%', background: chargeColor, transition:'width .3s'}}/>
              </div>
            </div>
          </div>

          {/* Quick actions row */}
          <div style={{padding:14, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, borderTop:`.5px solid ${p.border}`}}>
            {[
              { icon:'lock',     label: t.locked ? 'Unlock' : 'Lock', onClick: () => set('locked', !t.locked) },
              { icon:'snowflake',label: t.climateOn ? 'Climate off' : 'Precondition', onClick: () => set('climateOn', !t.climateOn), active: t.climateOn },
              { icon:'package',  label: t.frunk ? 'Close frunk' : 'Open frunk', onClick: () => set('frunk', !t.frunk), active: t.frunk },
              { icon:'package',  label: t.trunk ? 'Close trunk' : 'Open trunk', onClick: () => set('trunk', !t.trunk), active: t.trunk },
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
              <div>cabin {t.cabin}{tu}</div>
              <div style={{color:p.fg3}}>target</div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button
              onClick={() => set('target', Math.max(t.targetMin || 60, t.target - 1))}
              style={tempBtn(p)}>−</button>
            <button
              onClick={() => set('target', Math.min(t.targetMax || 82, t.target + 1))}
              style={tempBtn(p)}>+</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:10}}>
            <button
              onClick={() => set('climateOn', !t.climateOn)}
              style={smallBtn(p, t.climateOn)}>
              {t.climateOn ? 'Climate on' : 'Auto'}
            </button>
            <button
              onClick={() => set('defrost', !t.defrost)}
              style={smallBtn(p, t.defrost)}>
              Defrost{t.defrost ? ' on' : ''}
            </button>
          </div>
          <div style={{borderTop:`.5px solid ${p.border}`, paddingTop:12, marginTop:14, fontSize:11, color:p.fg3}}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}>
              <span>Outside</span>
              <span style={{color:p.fg2}}>{t.outside ? `${t.outside}${tu}` : '—'}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}>
              <span>Charge port</span>
              <span style={{color:p.fg2}}>{t.chargePortOpen ? 'Open' : 'Closed'}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'4px 0'}}>
              <span>Sentry</span>
              <span style={{color:p.fg2}}>{t.sentry ? 'On' : 'Off'}</span>
            </div>
          </div>
        </window.Card>
      </div>

      {/* Bottom row: charging + vehicle info */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:dens.gap}}>
        <window.Card p={p} style={{padding:18}}>
          <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:12}}>Charging</div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <Row p={p} label="State" value={
              t.charging ? 'Charging' : t.pluggedIn ? 'Plugged in · idle' : 'Unplugged'
            }/>
            <Row p={p} label="Charge limit" value={`${t.chargeLimit}%`}/>
            {t.charging && t.timeToFull > 0 && (
              <Row p={p} label="Time to full" value={fmtHours(t.timeToFull)}/>
            )}
            {t.chargingAmps !== null && (
              <Row p={p} label="Amps" value={`${Math.round(t.chargingAmps)} A`}/>
            )}
            {t.voltage !== null && (
              <Row p={p} label="Voltage" value={`${Math.round(t.voltage)} V`}/>
            )}
            {t.energyAdded !== null && (
              <Row p={p} label="Energy added" value={`${t.energyAdded.toFixed(1)} kWh`}/>
            )}
          </div>
        </window.Card>
        <window.Card p={p} style={{padding:18}}>
          <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:12}}>Vehicle</div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <Row p={p} label="Name" value={t.name}/>
            <Row p={p} label="Software" value={t.software}/>
            <Row p={p} label="Odometer" value={`${t.odometer.toLocaleString()} ${t.odometerUnit}`}/>
            <Row p={p} label="Location" value={t.location}/>
            <Row p={p} label="Inside / outside" value={`${t.cabin}${tu} / ${t.outside}${tu}`}/>
            <Row p={p} label="Frunk / trunk" value={`${t.frunk ? 'Open' : 'Closed'} / ${t.trunk ? 'Open' : 'Closed'}`}/>
          </div>
        </window.Card>
      </div>
      <div style={{height:60}}/>

      {/* Pulse animation for the charge port glow. Scoped via a unique
          parent so it doesn't leak to other pages. */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.18); }
        }
      `}</style>
    </>
  );
};

const tempBtn = (p) => ({
  flex:1, padding:'9px 0', border:`.5px solid ${p.border2}`, background:'transparent',
  color:p.fg, borderRadius:8, fontSize:14, cursor:'pointer',
});

const smallBtn = (p, active) => ({
  padding:'9px 0', borderRadius:8, fontSize:11, cursor:'pointer', fontFamily:'inherit',
  border:`.5px solid ${active ? p.accent : p.border2}`,
  background: active ? p.accentSoft : p.surface,
  color: active ? p.accent : p.fg,
});

function fmtHours(hours) {
  if (!hours) return '—';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

const Row = ({ p, label, value }) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', fontSize:12, gap:8}}>
    <span style={{color:p.fg2, flex:'none'}}>{label}</span>
    <span style={{color:p.fg, fontVariantNumeric:'tabular-nums', textAlign:'right', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{value}</span>
  </div>
);

// Fallback silhouette — reused from the original prototype, kept for the
// rare case where neither a local nor Tesla compositor image loads.
const TeslaSilhouette = ({ p, accent, charging, frunk, trunk }) => (
  <svg viewBox="0 0 400 160" style={{position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%)', width:'82%', height:'auto', filter: p.dark ? 'drop-shadow(0 8px 24px rgba(0,0,0,.5))' : 'drop-shadow(0 8px 18px rgba(0,0,0,.18))'}}>
    {/* white-paint body */}
    <path d="M 30 110 Q 60 70, 130 60 Q 180 35, 240 38 Q 290 40, 330 60 Q 360 78, 380 105 L 380 120 Q 370 130, 350 130 L 50 130 Q 30 130, 30 120 Z"
          fill="#ebe7e0" stroke="rgba(0,0,0,0.18)" strokeWidth=".8"/>
    <path d="M 130 60 Q 180 35, 240 38 Q 280 40, 310 56 L 290 80 L 150 80 Z" fill="#1a1d22" opacity=".7"/>
    <path d="M 60 90 Q 130 78, 200 78 Q 280 78, 360 95" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1"/>
    <circle cx="110" cy="130" r="22" fill="#0e0e10"/>
    <circle cx="110" cy="130" r="14" fill="#2a2a2e"/>
    <circle cx="110" cy="130" r="5"  fill="#0e0e10"/>
    <circle cx="310" cy="130" r="22" fill="#0e0e10"/>
    <circle cx="310" cy="130" r="14" fill="#2a2a2e"/>
    <circle cx="310" cy="130" r="5"  fill="#0e0e10"/>
    {charging && <circle cx="365" cy="100" r="5" fill={accent}>
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
    </circle>}
    {frunk && <path d="M 140 50 Q 180 25, 220 28" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3,3"/>}
    {trunk && <path d="M 290 50 Q 320 25, 340 30" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3,3"/>}
  </svg>
);

window.CarView = CarView;
