// tvs-section.jsx — Home page TV section + per-brand integrated remotes.
// Brands: appletv (Siri Remote), googletv (Google TV remote), lgthinq (LG Magic Remote).

import HassContext from './lib/hass-context.js';

const TvsSection = ({ ctx }) => {
  const { p, fonts, dens, state, isHidden } = ctx;
  const hass = React.useContext(HassContext);
  // TVs default to visible in every room; user blacklists per-room
  // through the Customize panel.
  const tvs = (state.tvs || []).filter(tv => !(isHidden && isHidden('tvs', tv.id)));
  const [remoteFor, setRemoteFor] = React.useState(null); // tv id when remote is open
  if (!tvs.length) return null;

  // Real HA service calls — local state mutations are pointless because
  // the bridge will overwrite them on the next state push anyway.
  const callMP = (id, service) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: id }); } catch {}
  };
  const togglePlay = (id) => callMP(id, 'media_play_pause');
  const togglePower = (id) => {
    const tv = state.tvs.find(t => t.id === id);
    if (!tv) return;
    callMP(id, tv.on ? 'turn_off' : 'turn_on');
  };

  return (
    <window.Section title="TVs" subtitle={`${tvs.filter(t => t.on).length} of ${tvs.length} on${inRoom.length ? '' : ' · whole house'}`} p={p} fonts={fonts}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:dens.tileGap}}>
        {tvs.map(tv => <TvCard key={tv.id} ctx={ctx} tv={tv} togglePlay={togglePlay} togglePower={togglePower} openRemote={() => setRemoteFor(tv.id)}/>)}
      </div>
      {remoteFor && (
        <RemoteOverlay ctx={ctx} tv={state.tvs.find(t => t.id===remoteFor)} onClose={() => setRemoteFor(null)}/>
      )}
    </window.Section>
  );
};

const BRAND_META = {
  appletv:  { label:'Apple TV',  badgeBg:'#1f1f1f', badgeFg:'#fff',     accent:'#a78bfa' },
  googletv: { label:'Google TV', badgeBg:'#1f1f1f', badgeFg:'#fff',     accent:'#5b8cff' },
  lgthinq:  { label:'LG ThinQ',  badgeBg:'#a8174e', badgeFg:'#fff',     accent:'#a8174e' },
};

const TvCard = ({ ctx, tv, togglePlay, togglePower, openRemote }) => {
  const { p, fonts, state, setState } = ctx;
  const meta = BRAND_META[tv.brand] || BRAND_META.appletv;
  const roomName = window.ROOMS.find(r => r.id === tv.room)?.name;
  const pct = tv.dur > 0 ? (tv.progress / tv.dur) * 100 : 0;

  return (
    <window.Card p={p} style={{padding:0, overflow:'hidden', display:'flex', flexDirection:'column'}}>
      {/* "screen" — what's playing */}
      <div style={{
        position:'relative', aspectRatio:'16/9',
        background: tv.on
          ? `radial-gradient(120% 120% at 30% 25%, ${tv.poster}, oklch(15% 0.05 25))`
          : '#0a0a0a',
      }}>
        {/* badge */}
        <div style={{position:'absolute', top:10, left:10, padding:'3px 8px', borderRadius:6, background:meta.badgeBg, color:meta.badgeFg, fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', fontWeight:600, display:'flex', alignItems:'center', gap:5}}>
          {tv.brand === 'appletv' && <window.Icon name="apple" size={11}/>}
          {tv.brand === 'googletv' && <span style={{fontSize:11,fontWeight:700}}>▶</span>}
          {tv.brand === 'lgthinq' && <span style={{fontSize:10,fontWeight:700}}>LG</span>}
          {meta.label}
        </div>
        {/* live dot */}
        {tv.on && (
          <div style={{position:'absolute', top:10, right:10, padding:'3px 8px', borderRadius:6, background:'rgba(0,0,0,.5)', color:'#fff', fontSize:10, display:'flex', alignItems:'center', gap:5}}>
            <span style={{width:6, height:6, borderRadius:'50%', background: tv.playing ? '#ff5c5c' : '#fff'}}/>
            {tv.playing ? 'PLAYING' : tv.on ? 'PAUSED' : 'OFF'}
          </div>
        )}
        {/* show metadata at bottom */}
        {tv.on ? (
          <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'24px 14px 12px', background:'linear-gradient(to top, rgba(0,0,0,.7), transparent)'}}>
            <div style={{fontSize:10, color:'rgba(255,255,255,.75)', letterSpacing:'.08em', textTransform:'uppercase', fontWeight:500}}>{tv.app}</div>
            <div style={{fontFamily:fonts.display, fontSize:16, color:'#fff', fontWeight:500, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{tv.show}</div>
          </div>
        ) : (
          <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', color:'rgba(255,255,255,.4)', fontSize:11, letterSpacing:'.1em', textTransform:'uppercase'}}>
            <div>Off · {tv.input}</div>
          </div>
        )}
        {/* progress */}
        {tv.on && tv.dur > 0 && (
          <div style={{position:'absolute', left:14, right:14, bottom:6, height:2, background:'rgba(255,255,255,.18)', borderRadius:1, overflow:'hidden'}}>
            <div style={{width:`${pct}%`, height:'100%', background:'#fff'}}/>
          </div>
        )}
      </div>

      {/* meta row */}
      <div style={{padding:'12px 14px 10px', display:'flex', alignItems:'center', gap:10, borderBottom:`.5px solid ${p.border}`}}>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:p.fg, fontWeight:500}}>
            <window.Icon name="tv" size={12} style={{color:p.fg3}}/>
            {tv.name}
          </div>
          <div style={{fontSize:11, color:p.fg3, marginTop:1}}>
            {[tv.model, roomName].filter(Boolean).join(' · ') || '—'}
            {tv.on && tv.dur > 0 && <span> · {window.fmtTime(tv.progress)} / {window.fmtTime(tv.dur)}</span>}
          </div>
        </div>
        <window.Toggle p={p} on={tv.on} onChange={() => togglePower(tv.id)} size={18}/>
      </div>

      {/* controls */}
      <div style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:8}}>
        <button onClick={() => togglePlay(tv.id)} disabled={!tv.on} style={{
          flex:1, padding:'9px 12px', borderRadius:8, border:0,
          background: tv.on ? (tv.playing ? p.accentSoft : p.accent) : p.surface,
          color: tv.on ? (tv.playing ? p.accent : '#fff') : p.fg3,
          fontSize:12, fontFamily:fonts.body, fontWeight:500, cursor: tv.on ? 'pointer' : 'not-allowed',
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          opacity: tv.on ? 1 : .5,
        }}>
          <window.Icon name={tv.playing ? 'pause' : 'play'} size={12}/>
          {tv.playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={openRemote} style={{
          padding:'9px 12px', borderRadius:8, border:`.5px solid ${p.border2}`,
          background:'transparent', color:p.fg, fontSize:12, fontFamily:fonts.body, cursor:'pointer',
          display:'flex', alignItems:'center', gap:6,
        }}>
          <RemoteIcon size={12}/> Remote
        </button>
      </div>
    </window.Card>
  );
};

// Tiny remote-pad glyph
const RemoteIcon = ({ size=12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="3" width="10" height="18" rx="3"/>
    <circle cx="12" cy="9" r="2"/>
    <path d="M12 14v4M10 16h4"/>
  </svg>
);

// ────────────────────────────────────────────────────────────────────────
// Remote overlay — picks the right remote pad based on brand.
const RemoteOverlay = ({ ctx, tv, onClose }) => {
  const { p, fonts, setState, state } = ctx;
  if (!tv) return null;
  const meta = BRAND_META[tv.brand];
  const roomName = window.ROOMS.find(r => r.id === tv.room)?.name;

  const update = (patch) => setState(s => ({...s, tvs: s.tvs.map(t => t.id===tv.id ? {...t, ...patch} : t)}));
  const press = (action) => {
    // simulate effects
    if (action === 'play')   update({ playing:true, on:true });
    if (action === 'pause')  update({ playing:false });
    if (action === 'power')  update({ on:!tv.on, playing: !tv.on ? tv.playing : false });
    if (action === 'mute')   update({ mute:!tv.mute });
    if (action === 'volUp')   update({ vol: Math.min(100, tv.vol+2), mute:false });
    if (action === 'volDown') update({ vol: Math.max(0,   tv.vol-2) });
    if (action === 'next')   update({ progress: Math.min(tv.dur || 9999, tv.progress + 30) });
    if (action === 'prev')   update({ progress: Math.max(0, tv.progress - 30) });
  };

  return (
    <>
      <div onClick={onClose} style={{position:'absolute', inset:0, zIndex:60, background:'rgba(0,0,0,.5)', backdropFilter:'blur(4px)'}}/>
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width: 360, maxHeight:'min(720px, calc(100% - 80px))',
        background: p.surface2, border:`.5px solid ${p.border}`, borderRadius:22,
        boxShadow:'0 32px 80px rgba(0,0,0,.5)', display:'flex', flexDirection:'column',
        zIndex:61, overflow:'hidden',
      }}>
        {/* header */}
        <div style={{padding:'14px 18px', display:'flex', alignItems:'center', gap:10, borderBottom:`.5px solid ${p.border}`, background: p.surface}}>
          <div style={{
            width:32, height:32, borderRadius:8, background:meta.badgeBg, color:meta.badgeFg,
            display:'grid', placeItems:'center', flex:'none', fontSize:12, fontWeight:700,
          }}>
            {tv.brand === 'appletv' ? <window.Icon name="apple" size={14}/> : tv.brand === 'lgthinq' ? 'LG' : '▶'}
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontFamily:fonts.display, fontSize:15, color:p.fg, fontWeight:500}}>{tv.name}</div>
            <div style={{fontSize:11, color:p.fg3}}>{meta.label} · {roomName}{tv.on ? ' · On' : ' · Off'}</div>
          </div>
          <button onClick={onClose} style={{border:0, background:'transparent', color:p.fg3, cursor:'pointer', fontSize:22, padding:0, width:28, height:28}}>×</button>
        </div>

        {/* now playing strip (if on) */}
        {tv.on && tv.show && tv.show !== '—' && (
          <div style={{padding:'10px 16px', display:'flex', alignItems:'center', gap:10, background: p.warm, borderBottom:`.5px solid ${p.border}`}}>
            <div style={{width:40, height:40, borderRadius:5, background:`radial-gradient(120% 120% at 30% 25%, ${tv.poster}, oklch(15% 0.05 25))`, flex:'none'}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:10, color:p.fg3, letterSpacing:'.08em', textTransform:'uppercase'}}>{tv.app}</div>
              <div style={{fontSize:13, color:p.fg, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{tv.show}</div>
              {tv.dur > 0 && (
                <div style={{height:2, background:p.border, borderRadius:1, marginTop:4, overflow:'hidden'}}>
                  <div style={{width:`${(tv.progress/tv.dur)*100}%`, height:'100%', background:p.accent}}/>
                </div>
              )}
            </div>
          </div>
        )}

        {/* the actual remote */}
        <div style={{padding:18, overflow:'auto'}}>
          {tv.brand === 'appletv'  && <SiriRemote   p={p} fonts={fonts} press={press} update={update} tv={tv}/>}
          {tv.brand === 'googletv' && <GoogleRemote p={p} fonts={fonts} press={press} update={update} tv={tv}/>}
          {tv.brand === 'lgthinq'  && <LgMagicRemote p={p} fonts={fonts} press={press} update={update} tv={tv}/>}
        </div>
      </div>
    </>
  );
};

// ── SHARED REMOTE PRIMITIVES ────────────────────────────────────────────
const PadBtn = ({ p, fonts, onClick, children, size=44, primary, danger, style, label }) => (
  <button onClick={onClick} style={{
    width:size, height:size, borderRadius: size/2,
    border:`.5px solid ${primary ? p.accent : p.border2}`,
    background: primary ? p.accent : danger ? p.danger : p.surface,
    color: primary || danger ? '#fff' : p.fg, cursor:'pointer',
    display:'grid', placeItems:'center', fontSize:13, fontFamily:fonts.body, fontWeight:500,
    transition:'transform .08s', ...style,
  }} onMouseDown={e => e.currentTarget.style.transform='scale(.94)'}
    onMouseUp={e => e.currentTarget.style.transform='scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
    title={label}>{children}</button>
);

// 5-way D-pad with center OK
const Dpad = ({ p, fonts, onPress, accent, size = 200 }) => {
  const arrowSize = size * 0.18;
  const ring = (
    <div style={{
      position:'absolute', inset:0, borderRadius:'50%',
      background: `radial-gradient(circle at 50% 50%, ${p.surface} 38%, ${p.surface2} 39%, ${p.surface2} 100%)`,
      border:`.5px solid ${p.border2}`, boxShadow:`inset 0 1px 0 rgba(255,255,255,.4), 0 1px 2px rgba(0,0,0,.08)`,
    }}/>
  );
  const Arrow = ({ dir, top, left, right, bottom, char }) => (
    <button onClick={() => onPress(dir)} style={{
      position:'absolute', top, left, right, bottom,
      width:arrowSize, height:arrowSize, border:0, borderRadius:'50%',
      background:'transparent', color:p.fg, cursor:'pointer', display:'grid', placeItems:'center', fontSize:14,
    }}>{char}</button>
  );
  return (
    <div style={{position:'relative', width:size, height:size, margin:'0 auto'}}>
      {ring}
      <Arrow dir="up"    top={4}    left={`calc(50% - ${arrowSize/2}px)`} char="▲"/>
      <Arrow dir="down"  bottom={4} left={`calc(50% - ${arrowSize/2}px)`} char="▼"/>
      <Arrow dir="left"  left={4}   top={`calc(50% - ${arrowSize/2}px)`}  char="◀"/>
      <Arrow dir="right" right={4}  top={`calc(50% - ${arrowSize/2}px)`}  char="▶"/>
      <button onClick={() => onPress('ok')} style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width: size*0.32, height: size*0.32, borderRadius:'50%',
        background: accent || p.accent, color:'#fff', border:0, cursor:'pointer',
        fontSize:11, fontWeight:600, letterSpacing:'.1em', boxShadow:'0 4px 12px rgba(0,0,0,.18)',
      }}>OK</button>
    </div>
  );
};

const RowGap = ({ children, gap=10, justify='space-between' }) => (
  <div style={{display:'flex', justifyContent:justify, alignItems:'center', gap, marginTop:14}}>{children}</div>
);

// ── APPLE TV — Siri Remote ─────────────────────────────────────────────
const SiriRemote = ({ p, fonts, press, update, tv }) => {
  return (
    <div>
      {/* top row: back / TV / power */}
      <RowGap justify="space-between" gap={8}>
        <PadBtn p={p} fonts={fonts} onClick={() => press('back')} size={40} label="Back">↶</PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('home')} size={40} label="TV"><window.Icon name="tv" size={16}/></PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('power')} size={40} danger={!tv.on ? false : false} label="Power"><window.Icon name="bolt" size={14}/></PadBtn>
      </RowGap>

      {/* clickpad */}
      <div style={{marginTop:18}}>
        <Dpad p={p} fonts={fonts} accent="#a78bfa" onPress={(d) => press(d)}/>
      </div>

      {/* Siri / play / mute row */}
      <RowGap justify="space-between" gap={8}>
        <PadBtn p={p} fonts={fonts} onClick={() => press('siri')} size={40} label="Siri"><window.Icon name="mic" size={14}/></PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press(tv.playing ? 'pause' : 'play')} size={40} label="Play/Pause" primary>
          <window.Icon name={tv.playing ? 'pause' : 'play'} size={14}/>
        </PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('mute')} size={40} label="Mute"><window.Icon name={tv.mute ? 'bellOff' : 'speaker'} size={14}/></PadBtn>
      </RowGap>

      {/* volume + scrub */}
      <VolumeRow p={p} fonts={fonts} tv={tv} press={press}/>
      <ScrubRow  p={p} fonts={fonts} tv={tv} press={press}/>

      <AppRow p={p} fonts={fonts} apps={['Apple TV+','Netflix','HBO Max','Hulu','Disney+','YouTube']} update={update}/>
    </div>
  );
};

// ── GOOGLE TV — Google TV Remote ──────────────────────────────────────
const GoogleRemote = ({ p, fonts, press, update, tv }) => {
  return (
    <div>
      <RowGap justify="space-between" gap={8}>
        <PadBtn p={p} fonts={fonts} onClick={() => press('power')} size={40} label="Power"><window.Icon name="bolt" size={14}/></PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('mute')}  size={40} label="Mute"><window.Icon name={tv.mute ? 'bellOff' : 'speaker'} size={14}/></PadBtn>
      </RowGap>

      <div style={{marginTop:18}}>
        <Dpad p={p} fonts={fonts} accent="#5b8cff" onPress={(d) => press(d)}/>
      </div>

      <RowGap justify="space-between" gap={8}>
        <PadBtn p={p} fonts={fonts} onClick={() => press('back')} size={40} label="Back">←</PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('home')} size={40} label="Home"><window.Icon name="home" size={14}/></PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('assistant')} size={40} label="Assistant"
          style={{background:'linear-gradient(135deg, #4285f4, #ea4335 35%, #fbbc05 65%, #34a853)', color:'#fff', border:0}}>
          <window.Icon name="mic" size={14}/>
        </PadBtn>
      </RowGap>

      <VolumeRow p={p} fonts={fonts} tv={tv} press={press}/>
      <ScrubRow  p={p} fonts={fonts} tv={tv} press={press}/>

      <AppRow p={p} fonts={fonts} apps={['YouTube','Netflix','Prime Video','Disney+','HBO Max','Spotify']} update={update}/>
    </div>
  );
};

// ── LG ThinQ — Magic Remote ────────────────────────────────────────────
const LgMagicRemote = ({ p, fonts, press, update, tv }) => {
  return (
    <div>
      <RowGap justify="space-between" gap={8}>
        <PadBtn p={p} fonts={fonts} onClick={() => press('power')} size={40} danger label="Power"><window.Icon name="bolt" size={14}/></PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('input')} size={40} label="Input">▣</PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('settings')} size={40} label="Settings"><window.Icon name="settings" size={14}/></PadBtn>
      </RowGap>

      <div style={{marginTop:18}}>
        <Dpad p={p} fonts={fonts} accent="#a8174e" onPress={(d) => press(d)}/>
      </div>

      <RowGap justify="space-between" gap={8}>
        <PadBtn p={p} fonts={fonts} onClick={() => press('back')} size={40} label="Back">↩</PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('home')} size={40} label="Home"
          style={{background:'#a8174e', color:'#fff', border:0}}><span style={{fontSize:11, fontWeight:700}}>LG</span></PadBtn>
        <PadBtn p={p} fonts={fonts} onClick={() => press('mute')} size={40} label="Mute"><window.Icon name={tv.mute ? 'bellOff' : 'speaker'} size={14}/></PadBtn>
      </RowGap>

      <VolumeRow p={p} fonts={fonts} tv={tv} press={press}/>

      {/* numeric keypad — classic LG */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6, marginTop:14}}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((n,i) => (
          <button key={i} onClick={() => n!=='' && press('num'+n)} disabled={n===''} style={{
            padding:'10px 0', borderRadius:8, border:`.5px solid ${p.border2}`,
            background: n==='' ? 'transparent' : p.surface, color: n==='' ? 'transparent' : p.fg,
            fontSize:14, fontFamily:fonts.body, cursor: n==='' ? 'default' : 'pointer',
          }}>{n}</button>
        ))}
      </div>

      <AppRow p={p} fonts={fonts} apps={['LG Channels','Netflix','Disney+','YouTube','Prime Video','Apple TV']} update={update}/>
    </div>
  );
};

// ── COMMON SUBSECTIONS ─────────────────────────────────────────────────
const VolumeRow = ({ p, fonts, tv, press }) => (
  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:14}}>
    <div style={{padding:'8px 6px', borderRadius:12, border:`.5px solid ${p.border2}`, background:p.surface, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <button onClick={() => press('volDown')} style={{width:34, height:34, borderRadius:'50%', border:0, background:'transparent', color:p.fg, cursor:'pointer', fontSize:18}}>−</button>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:9, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Vol</div>
        <div style={{fontSize:14, color:p.fg, fontWeight:500, fontVariantNumeric:'tabular-nums'}}>{tv.mute ? '×' : tv.vol}</div>
      </div>
      <button onClick={() => press('volUp')} style={{width:34, height:34, borderRadius:'50%', border:0, background:'transparent', color:p.fg, cursor:'pointer', fontSize:18}}>+</button>
    </div>
    <div style={{padding:'8px 6px', borderRadius:12, border:`.5px solid ${p.border2}`, background:p.surface, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <button onClick={() => press('chDown')} style={{width:34, height:34, borderRadius:'50%', border:0, background:'transparent', color:p.fg, cursor:'pointer', fontSize:18}}>∧</button>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:9, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Ch</div>
        <div style={{fontSize:14, color:p.fg, fontWeight:500}}>{tv.input}</div>
      </div>
      <button onClick={() => press('chUp')} style={{width:34, height:34, borderRadius:'50%', border:0, background:'transparent', color:p.fg, cursor:'pointer', fontSize:18}}>∨</button>
    </div>
  </div>
);

const ScrubRow = ({ p, fonts, tv, press }) => (
  <div style={{display:'flex', justifyContent:'center', gap:14, marginTop:14}}>
    <PadBtn p={p} fonts={fonts} onClick={() => press('prev')} size={38} label="−30s"><window.Icon name="prev" size={13}/></PadBtn>
    <PadBtn p={p} fonts={fonts} onClick={() => press(tv.playing ? 'pause' : 'play')} size={50} primary label="Play/Pause">
      <window.Icon name={tv.playing ? 'pause' : 'play'} size={16}/>
    </PadBtn>
    <PadBtn p={p} fonts={fonts} onClick={() => press('next')} size={38} label="+30s"><window.Icon name="next" size={13}/></PadBtn>
  </div>
);

const AppRow = ({ p, fonts, apps, update }) => (
  <div style={{marginTop:18, paddingTop:14, borderTop:`.5px solid ${p.border}`}}>
    <div style={{fontSize:10, color:p.fg3, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:8, fontWeight:500}}>Apps</div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6}}>
      {apps.map(a => (
        <button key={a} onClick={() => update({ app:a, on:true })} style={{
          padding:'8px 6px', borderRadius:7, border:`.5px solid ${p.border2}`,
          background:p.surface, color:p.fg, fontSize:11, fontFamily:fonts.body, cursor:'pointer',
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
        }}>{a}</button>
      ))}
    </div>
  </div>
);

window.TvsSection = TvsSection;
