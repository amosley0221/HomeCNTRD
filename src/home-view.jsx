// home-view.jsx — Categorized home page with section visibility toggle.

const SECTIONS = [
  { id:'climate',  label:'Climate' },
  { id:'lights',   label:'Lighting' },
  { id:'music',    label:'Music' },
  { id:'tvs',      label:'TVs' },
  { id:'scenes',   label:'Scenes' },
  { id:'cameras',  label:'Cameras' },
  { id:'security', label:'Security & access' },
  { id:'car',      label:'Car' },
  { id:'today',    label:"Today's schedule" },
];

const HomeView = ({ ctx }) => {
  const { p, fonts, dens, state, setState, room, user, patchUser, narrow } = ctx;
  const roomMeta = window.ROOMS.find(r => r.id === room);
  const lights = state.lights.filter(l => l.room === room);
  // Per-room section visibility. Falls back to legacy global homeSections, then all-on.
  const allRoomSections = user?.roomSections || {};
  const legacy = user?.homeSections;
  const defaultMap = legacy || Object.fromEntries(SECTIONS.map(s => [s.id, true]));
  const visible = allRoomSections[room] || defaultMap;
  const setVisible = (id, v) => patchUser?.(u => {
    const cur = (u.roomSections && u.roomSections[room]) || (u.homeSections) || Object.fromEntries(SECTIONS.map(s => [s.id, true]));
    return {...u, roomSections: {...(u.roomSections || {}), [room]: {...cur, [id]: v}}};
  });
  const [picking, setPicking] = React.useState(false);

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Currently in"
        title={`The ${roomMeta?.name || 'house'}`}
        sub={`${lights.filter(l => l.on).length} lamps softly lit · ${state.thermostat.temp}° · the cat is asleep on the rug`}
        right={
          <button onClick={() => setPicking(v => !v)} style={{
            padding:'8px 14px', borderRadius:9, border:`.5px solid ${picking ? p.accent : p.border2}`,
            background: picking ? p.accentSoft : 'transparent', color: picking ? p.accent : p.fg,
            fontSize:12, cursor:'pointer', fontFamily:fonts.body, display:'inline-flex', alignItems:'center', gap:6,
          }}>
            <window.Icon name={picking ? 'check' : 'edit'} size={12}/>
            {picking ? 'Done' : 'Customize'}
          </button>
        }
      />

      {picking && (
        <window.Card p={p} style={{padding:14}}>
          <div style={{fontSize:11, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10}}>Show in {roomMeta?.name || 'this room'}</div>
          <div style={{display:'grid', gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`, gap:6}}>
            {SECTIONS.map(s => (
              <div key={s.id} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, background:p.surface, border:`.5px solid ${p.border}`}}>
                <span style={{flex:1, fontSize:12, color:p.fg}}>{s.label}</span>
                <window.Toggle p={p} on={visible[s.id] !== false} onChange={(v) => setVisible(s.id, v)} size={16}/>
              </div>
            ))}
          </div>
          <div style={{fontSize:11, color:p.fg3, fontStyle:'italic', marginTop:10}}>Each room remembers its own layout.</div>
        </window.Card>
      )}

      {visible.climate  !== false && <window.ClimateSection ctx={ctx}/>}
      {visible.lights   !== false && <window.LightsSection ctx={ctx}/>}
      {visible.music    !== false && <window.MusicSection ctx={ctx}/>}
      {visible.tvs      !== false && <window.TvsSection ctx={ctx}/>}
      {visible.scenes   !== false && <window.ScenesSection ctx={ctx}/>}
      {visible.cameras  !== false && <window.CamerasSection ctx={ctx}/>}
      {visible.security !== false && <window.SecuritySection ctx={ctx}/>}
      {visible.car      !== false && <window.CarSection ctx={ctx}/>}
      {visible.today    !== false && <window.TodaySection ctx={ctx}/>}
      <div style={{height:80}}/>
    </>
  );
};

// ── CLIMATE (drag-to-select dial) ───────────────────────────────────────
const ClimateSection = ({ ctx }) => {
  const { p, fonts, state, setState, narrow } = ctx;
  const t = state.thermostat;
  const set = (target) => setState(s => ({...s, thermostat:{...s.thermostat, target}}));
  const setMode = (mode) => setState(s => ({...s, thermostat:{...s.thermostat, mode}}));

  // Drag dial: 60–83°F mapped onto 270° arc
  const MIN = 60, MAX = 83;
  const ringRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const tempFromEvent = (e) => {
    const r = ringRef.current.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    let ang = Math.atan2(dy, dx) * 180/Math.PI; // -180..180, 0=right
    // We want 0% at 135° (lower-left) going clockwise 270° to 45° (lower-right)
    // Convert atan2 angle so 135° -> 0
    let a = (ang + 360) % 360;
    // arc spans from 135° clockwise (i.e. 135 -> 405 mod 360 = 45)
    let pos = (a - 135 + 360) % 360;
    if (pos > 270) pos = pos > 315 ? 0 : 270; // clamp into the gap
    const pct = pos / 270;
    return Math.round(MIN + pct * (MAX - MIN));
  };

  const onDown = (e) => { setDragging(true); ringRef.current.setPointerCapture?.(e.pointerId); set(tempFromEvent(e)); };
  const onMove = (e) => { if (dragging) set(tempFromEvent(e)); };
  const onUp   = (e) => { setDragging(false); };

  // SVG arc
  const SIZE = 220, R = 92, CX = SIZE/2, CY = SIZE/2;
  const polarToXY = (deg, r) => {
    const rad = (deg) * Math.PI / 180;
    return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
  };
  const startA = 135, endA = 405; // 270° sweep
  const valA = startA + ((t.target - MIN)/(MAX-MIN)) * 270;
  const tempA = startA + ((t.temp - MIN)/(MAX-MIN)) * 270;
  const arcPath = (a0, a1) => {
    const [x0,y0] = polarToXY(a0, R);
    const [x1,y1] = polarToXY(a1, R);
    const large = (a1 - a0) > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`;
  };
  const [hx, hy] = polarToXY(valA, R);

  return (
    <window.Section title="Climate" subtitle="Hallway · Nest" p={p} fonts={fonts}>
      <window.Card p={p} style={{padding: narrow ? 18 : 24, display:'grid', gridTemplateColumns: narrow ? '1fr' : 'auto 1fr', gap: narrow ? 18 : 30, alignItems:'center', justifyItems: narrow ? 'center' : 'stretch'}}>
        <div ref={ringRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          style={{width:SIZE, height:SIZE, position:'relative', cursor: dragging ? 'grabbing' : 'grab', touchAction:'none', userSelect:'none', flex:'none'}}>
          <svg width={SIZE} height={SIZE} style={{position:'absolute', inset:0}}>
            {/* track */}
            <path d={arcPath(startA, endA)} fill="none" stroke={p.border} strokeWidth="14" strokeLinecap="round"/>
            {/* current temp range marker (between current and target) */}
            <path d={arcPath(Math.min(tempA, valA), Math.max(tempA, valA))} fill="none" stroke={p.accentSoft} strokeWidth="14" strokeLinecap="round"/>
            {/* progress to target */}
            <path d={arcPath(startA, valA)} fill="none" stroke={p.accent} strokeWidth="3" strokeLinecap="round" opacity=".75"/>
            {/* tick marks */}
            {Array.from({length: 24}).map((_, i) => {
              const a = startA + (i/23)*270;
              const [x0,y0] = polarToXY(a, R-10);
              const [x1,y1] = polarToXY(a, R-4);
              return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={p.fg3} strokeWidth=".5" opacity={i%4===0 ? .6 : .25}/>;
            })}
            {/* handle */}
            <circle cx={hx} cy={hy} r="11" fill={p.accent} stroke={p.surface2} strokeWidth="3"/>
            {/* center labels */}
            <text x={CX} y={CY-12} textAnchor="middle" fill={p.fg3} fontSize="10" fontFamily={fonts.body} letterSpacing="2">SET TO</text>
            <text x={CX} y={CY+22} textAnchor="middle" fill={p.fg} fontSize="50" fontFamily={fonts.display} fontWeight="500">{t.target}°</text>
            <text x={CX} y={CY+44} textAnchor="middle" fill={p.fg3} fontSize="11" fontFamily={fonts.display} fontStyle="italic">now {t.temp}°</text>
          </svg>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:14, width: narrow ? '100%' : 'auto'}}>
          <div style={{display:'flex', gap:18, fontSize:12, color:p.fg2, flexWrap:'wrap'}}>
            <div><div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Inside</div><div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, marginTop:2}}>{t.temp}°</div></div>
            <div><div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Humidity</div><div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, marginTop:2}}>{t.humidity}%</div></div>
            <div><div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Outside</div><div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, marginTop:2}}>{state.weather.temp}°</div></div>
          </div>
          <div style={{display:'flex', gap:8}}>
            {['cool','auto','heat','off'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex:1, padding:'10px 0', textTransform:'capitalize',
                border:`.5px solid ${m===t.mode ? p.accent : p.border2}`,
                background: m===t.mode ? p.accentSoft : 'transparent',
                color: m===t.mode ? p.accent : p.fg2, borderRadius:8, fontSize:12, cursor:'pointer', fontFamily:fonts.body
              }}>{m}</button>
            ))}
          </div>
          <div style={{fontSize:11, color:p.fg3, fontStyle:'italic', fontFamily:fonts.display}}>
            Drag the dial to set the target temperature. {state.weather.summary.toLowerCase()} outside.
          </div>
        </div>
      </window.Card>
    </window.Section>
  );
};

// ── LIGHTS ──────────────────────────────────────────────────────────────
const LightsSection = ({ ctx }) => {
  const { p, fonts, dens, state, setState, room } = ctx;
  const lights = state.lights.filter(l => l.room === room);
  const allOn = lights.every(l => l.on);
  return (
    <window.Section title="Lighting" subtitle={`${lights.filter(l=>l.on).length} of ${lights.length} on`} p={p} fonts={fonts}
      action={<button onClick={() => setState(s => ({...s, lights: s.lights.map(l => l.room===room ? {...l, on: !allOn} : l)}))} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>{allOn ? 'All off' : 'All on'}</button>}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(190px, 1fr))', gap:dens.tileGap}}>
        {lights.map(l => (
          <window.Card key={l.id} p={p} style={{padding:14, position:'relative', overflow:'hidden'}}>
            {l.on && <div style={{position:'absolute', right:-20, top:-20, width:80, height:80, borderRadius:'50%', background:`radial-gradient(circle, ${l.color}77, transparent 70%)`}}/>}
            <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', position:'relative'}}>
              <window.Icon name="bulb" size={18} stroke={1.4} style={{color: l.on ? l.color : p.fg3}}/>
              <window.Toggle p={p} on={l.on} size={18} onChange={() => setState(s => ({...s, lights: s.lights.map(x => x.id===l.id ? {...x, on:!x.on} : x)}))}/>
            </div>
            <div style={{fontSize:13, color:p.fg, marginTop:10, fontWeight:500}}>{l.name}</div>
            <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{l.on ? `${l.brightness}%` : 'off'}</div>
            {l.on && (
              <input type="range" min="1" max="100" value={l.brightness} onChange={(e) => setState(s => ({...s, lights: s.lights.map(x => x.id===l.id ? {...x, brightness:+e.target.value} : x)}))}
                style={{width:'100%', marginTop:8, accentColor:p.accent}}/>
            )}
          </window.Card>
        ))}
      </div>
    </window.Section>
  );
};

// ── MUSIC ───────────────────────────────────────────────────────────────
const MusicSection = ({ ctx }) => {
  const { p, fonts, state, setState, room, setPage } = ctx;
  const speaker = state.speakers.find(s => s.room === room) || state.speakers[0];
  if (!speaker) return null; // no media players known to HA yet → hide the section
  const track = window.trackById(speaker.trackId);
  const togglePlay = () => setState(s => ({...s, speakers: s.speakers.map(sp => sp.id === speaker.id ? {...sp, playing: !speaker.playing} : sp)}));
  return (
    <window.Section title="Music" subtitle={`${state.speakers.filter(s => s.playing).length} speakers playing`} p={p} fonts={fonts}
      action={<button onClick={() => setPage('music')} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Library →</button>}>
      <window.Card p={p} style={{padding:18, display:'flex', gap:16, alignItems:'center'}}>
        <div style={{width:90, height:90, borderRadius:10, flex:'none', background:`radial-gradient(120% 120% at 30% 25%, ${track.hue}, oklch(20% 0.05 25))`}}/>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Now playing · {window.ROOMS.find(r=>r.id===speaker.room)?.name}</div>
          <div style={{fontFamily:fonts.display, fontSize:20, color:p.fg, fontWeight:500, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{track.title}</div>
          <div style={{fontSize:12, color:p.fg2, fontStyle:'italic', marginTop:1}}>{track.artist} · {track.album}</div>
          <div style={{height:3, background:p.border, borderRadius:2, marginTop:12, position:'relative'}}>
            <div style={{position:'absolute', inset:0, width:`${(speaker.progress/track.dur)*100}%`, background:p.accent, borderRadius:2}}/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:p.fg3, marginTop:4}}>
            <span>{window.fmtTime(speaker.progress)}</span><span>−{window.fmtTime(track.dur - speaker.progress)}</span>
          </div>
        </div>
        <div style={{display:'flex', gap:6, flex:'none'}}>
          <button style={{width:34, height:34, borderRadius:8, background:'transparent', border:`.5px solid ${p.border2}`, color:p.fg2, cursor:'pointer'}}><window.Icon name="prev" size={14}/></button>
          <button onClick={togglePlay} style={{width:42, height:42, borderRadius:'50%', background:p.accent, color:'#fff', border:0, cursor:'pointer', display:'grid', placeItems:'center'}}><window.Icon name={speaker.playing ? 'pause' : 'play'} size={16}/></button>
          <button style={{width:34, height:34, borderRadius:8, background:'transparent', border:`.5px solid ${p.border2}`, color:p.fg2, cursor:'pointer'}}><window.Icon name="next" size={14}/></button>
        </div>
      </window.Card>
    </window.Section>
  );
};

// ── SCENES ──────────────────────────────────────────────────────────────
const ScenesSection = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  return (
    <window.Section title="Scenes" subtitle="Tap to activate" p={p} fonts={fonts}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:dens.tileGap}}>
        {state.scenes.map(sc => (
          <button key={sc.id} onClick={() => setState(s => ({...s, scenes: s.scenes.map(x => ({...x, active: x.id===sc.id}))}))} style={{
            padding:14, borderRadius:11, cursor:'pointer', textAlign:'left', fontFamily:fonts.body,
            background: sc.active ? p.accent : p.surface2, color: sc.active ? '#fff' : p.fg,
            border:`.5px solid ${sc.active ? p.accent : p.border}`,
            display:'flex', flexDirection:'column', gap:8,
          }}>
            <window.Icon name={sc.icon} size={22} stroke={1.4}/>
            <div style={{fontFamily:fonts.display, fontSize:14, fontWeight:500}}>{sc.name}</div>
            <div style={{fontSize:10, opacity:.7}}>{sc.active ? 'Active' : 'Tap to run'}</div>
          </button>
        ))}
      </div>
    </window.Section>
  );
};

// ── CAMERAS ─────────────────────────────────────────────────────────────
const CamerasSection = ({ ctx }) => {
  const { p, fonts, dens, state, setPage } = ctx;
  return (
    <window.Section title="Cameras" subtitle={`${state.cameras.filter(c=>c.online).length} live · ${state.cameras.filter(c=>c.motion).length} motion`} p={p} fonts={fonts}
      action={<button onClick={() => setPage('cameras')} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Open feeds →</button>}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:dens.tileGap}}>
        {state.cameras.map(c => <window.CamThumb key={c.id} c={c} ctx={ctx}/>)}
      </div>
    </window.Section>
  );
};

// ── RING MODE SWITCHER (shared) ─────────────────────────────────────────
const RING_MODES = [
  { id:'disarmed', label:'Disarmed', icon:'shield',  desc:'Sensors off · all clear',                color:'oklch(55% 0.05 80)' },
  { id:'home',     label:'Home',     icon:'home',    desc:'Perimeter armed · interior bypassed',     color:'oklch(60% 0.13 145)' },
  { id:'away',     label:'Away',     icon:'lock',    desc:'Full system armed · entry delay 30s',     color:'oklch(58% 0.16 30)' },
];

const RingModeSwitcher = ({ ctx, compact }) => {
  const { p, fonts, state, setState } = ctx;
  const cur = state.ring?.mode || 'disarmed';
  const set = (id) => {
    setState(s => ({
      ...s,
      ring: { ...(s.ring||{}), mode:id, lastChanged: new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}), changedBy:'You' },
      // Away also locks everything
      locks: id === 'away' ? s.locks.map(l => ({...l, locked:true})) : s.locks,
    }));
  };
  const meta = RING_MODES.find(m => m.id === cur);
  return (
    <window.Card p={p} style={{padding: compact ? 12 : 16}}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
        <div style={{width:24, height:24, borderRadius:5, background:'#1f1f1f', color:'#fff', display:'grid', placeItems:'center', fontSize:9, fontWeight:700, flex:'none'}}>R</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:12, color:p.fg, fontWeight:500}}>Ring Alarm</div>
          <div style={{fontSize:10, color:p.fg3}}>{meta.desc} · {state.ring?.lastChanged} by {state.ring?.changedBy}</div>
        </div>
        <div style={{width:7, height:7, borderRadius:'50%', background:meta.color}}/>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6}}>
        {RING_MODES.map(m => {
          const active = m.id === cur;
          return (
            <button key={m.id} onClick={() => set(m.id)} style={{
              padding: compact ? '8px 6px' : '10px 8px', borderRadius:8,
              border:`.5px solid ${active ? m.color : p.border2}`,
              background: active ? `color-mix(in oklch, ${m.color} 14%, transparent)` : p.surface,
              color: active ? m.color : p.fg, cursor:'pointer', fontFamily:fonts.body,
              display:'flex', flexDirection:'column', alignItems:'center', gap:4,
              transition:'border-color .15s, background .15s',
            }}>
              <window.Icon name={m.icon} size={14}/>
              <span style={{fontSize:11, fontWeight: active ? 600 : 500}}>{m.label}</span>
            </button>
          );
        })}
      </div>
    </window.Card>
  );
};

// ── SECURITY ────────────────────────────────────────────────────────────
const SecuritySection = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const allLocked = state.locks.every(l => l.locked);
  const ringMode = state.ring?.mode || 'disarmed';
  const ringMeta = RING_MODES.find(m => m.id === ringMode);
  return (
    <window.Section title="Security & access" subtitle={`${ringMeta.label} · ${allLocked ? 'all locked' : 'something is open'}`} p={p} fonts={fonts}
      action={<button onClick={() => setState(s => ({...s, locks: s.locks.map(l => ({...l, locked:true}))}))} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Lock all</button>}>
      <div style={{marginBottom:dens.tileGap}}>
        <RingModeSwitcher ctx={ctx}/>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:dens.tileGap}}>
        {state.locks.map(l => (
          <window.Card key={l.id} p={p} style={{padding:14, display:'flex', alignItems:'center', gap:12}}>
            <window.Icon name="lock" size={20} style={{color: l.locked ? 'oklch(60% 0.13 145)' : p.accent}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, color:p.fg, fontWeight:500}}>{l.name}</div>
              <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{l.locked ? 'Locked' : 'Unlocked'}</div>
            </div>
            <button onClick={() => setState(s => ({...s, locks: s.locks.map(x => x.id===l.id ? {...x, locked:!x.locked} : x)}))} style={{padding:'5px 10px', borderRadius:999, border:`.5px solid ${l.locked ? p.border2 : p.accent}`, background: l.locked ? 'transparent' : p.accentSoft, color: l.locked ? p.fg2 : p.accent, fontSize:11, cursor:'pointer'}}>{l.locked ? 'Unlock' : 'Lock'}</button>
          </window.Card>
        ))}
      </div>
    </window.Section>
  );
};

// ── CAR ─────────────────────────────────────────────────────────────────
const CarSection = ({ ctx }) => {
  const { p, fonts, state, setPage } = ctx;
  const t = state.tesla;
  if (!t.id) return null;
  return (
    <window.Section title="Car" p={p} fonts={fonts}>
      <window.Card p={p} style={{padding:16, cursor:'pointer'}} onClick={() => setPage('car')}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3}}>{t.name}</div>
          <window.Icon name="car" size={14} style={{color:p.fg3}}/>
        </div>
        <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:10}}>
          <div style={{fontFamily:fonts.display, fontSize:34, color:p.fg, fontWeight:500, lineHeight:1}}>{t.chargePct}<span style={{fontSize:14, color:p.fg2}}>%</span></div>
          <div style={{fontSize:12, color:p.fg2}}>{t.range} {t.rangeUnit || 'mi'} · {t.charging ? `+${t.chargeRate} mph` : t.pluggedIn ? 'plugged in' : 'unplugged'}</div>
        </div>
        <div style={{height:5, background:p.border, borderRadius:3, marginTop:12, overflow:'hidden'}}>
          <div style={{width:`${t.chargePct}%`, height:'100%', background:t.charging ? p.accent : 'oklch(60% 0.14 145)'}}/>
        </div>
        <div style={{fontSize:11, color:p.fg3, marginTop:8, display:'flex', alignItems:'center', gap:5}}><window.Icon name="location" size={10}/> {t.location}</div>
      </window.Card>
    </window.Section>
  );
};

// ── TODAY ───────────────────────────────────────────────────────────────
const TodaySection = ({ ctx }) => {
  const { p, fonts, dens, state, setPage, narrow } = ctx;
  return (
    <window.Section title="Today" subtitle={`${state.calendar.length} events · ${state.alarms.filter(a=>a.on).length} alarms`} p={p} fonts={fonts}
      action={<button onClick={() => setPage('calendar')} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Calendar →</button>}>
      <div style={{display:'grid', gridTemplateColumns: narrow ? '1fr' : '2fr 1fr', gap:dens.tileGap}}>
        <window.Card p={p} style={{padding:16}}>
          <div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10}}>Schedule</div>
          {state.calendar.slice(0,5).map((e, i) => (
            <div key={e.id} style={{display:'flex', gap:12, padding:'8px 0', borderTop: i ? `.5px solid ${p.border}` : 'none', alignItems:'baseline'}}>
              <div style={{width:64, fontSize:12, color:p.fg2, fontVariantNumeric:'tabular-nums'}}>{e.t}</div>
              <div style={{width:3, height:18, borderRadius:2, background:e.dot, alignSelf:'center'}}/>
              <div style={{flex:1, fontSize:13, color:p.fg}}>{e.title}<span style={{fontSize:11, color:p.fg3, marginLeft:8}}>{e.where}</span></div>
              {e.dnd && <span style={{fontSize:9, padding:'1px 6px', borderRadius:999, background:p.accentSoft, color:p.accent}}>DND</span>}
            </div>
          ))}
        </window.Card>
        <window.Card p={p} style={{padding:16}}>
          <div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10}}>Alarms</div>
          {state.alarms.map((a, i) => (
            <div key={a.id} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderTop: i ? `.5px solid ${p.border}` : 'none'}}>
              <div>
                <div style={{fontFamily:fonts.display, fontSize:15, color: a.on ? p.fg : p.fg3, fontVariantNumeric:'tabular-nums'}}>{a.time}</div>
                <div style={{fontSize:10, color:p.fg3}}>{a.label}</div>
              </div>
              <div style={{flex:1}}/>
              <window.Toggle p={p} on={a.on} size={16} onChange={(v) => ctx.setState(s => ({...s, alarms: s.alarms.map(x => x.id===a.id ? {...x, on:v} : x)}))}/>
            </div>
          ))}
        </window.Card>
      </div>
    </window.Section>
  );
};

const CamThumb = ({ c, ctx }) => {
  const { p, fonts } = ctx;
  // HA's snapshot URL doesn't auto-refresh — append a cache-busting param
  // that ticks every 10 s so we periodically re-pull the latest still.
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!c.picture) return;
    const t = setInterval(() => setTick(x => x + 1), 10000);
    return () => clearInterval(t);
  }, [c.picture]);
  const src = c.picture
    ? (c.picture + (c.picture.includes('?') ? '&' : '?') + 'hc=' + tick)
    : null;

  return (
    <div style={{aspectRatio:'16/10', borderRadius:10, position:'relative', overflow:'hidden', background:`linear-gradient(135deg, ${c.hue}, oklch(20% 0.04 25))`, color:'#fff'}}>
      {src ? (
        <img
          src={src}
          alt={c.name}
          style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div style={{position:'absolute', inset:0, backgroundImage:`repeating-linear-gradient(110deg, rgba(255,255,255,0.05) 0 12px, transparent 12px 24px)`}}/>
      )}
      {/* Dark gradient at top and bottom so the LIVE pill and label stay
          legible over bright snapshots. */}
      {src && <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)'}}/>}
      <div style={{position:'absolute', top:8, left:8, fontSize:10, padding:'2px 7px', borderRadius:999, background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', gap:5}}>
        <span style={{width:5, height:5, borderRadius:'50%', background: c.online ? '#ff5c5c' : '#666'}}/>{c.online ? 'LIVE' : 'OFF'}
      </div>
      {c.motion && <div style={{position:'absolute', top:8, right:8, fontSize:10, padding:'2px 7px', borderRadius:999, background:'rgba(255,92,92,.85)'}}>MOTION</div>}
      <div style={{position:'absolute', bottom:8, left:10, fontFamily:fonts.display, fontSize:13, fontStyle:'italic', textShadow:'0 1px 4px rgba(0,0,0,.7)'}}>{c.name}</div>
    </div>
  );
};

Object.assign(window, { HomeView, ClimateSection, LightsSection, MusicSection, ScenesSection, CamerasSection, SecuritySection, CarSection, TodaySection, CamThumb, RingModeSwitcher });
