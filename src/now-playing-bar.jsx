// now-playing-bar.jsx — global mini-player. Visible whenever any speaker is playing.
// Double-click to expand into a full panel showing queue + all rooms.

const NowPlayingBar = ({ ctx }) => {
  const { p, fonts, state, setState, narrow } = ctx;
  const [expanded, setExpanded] = React.useState(false);
  const [focused, setFocused] = React.useState(null); // speaker id when expanded; null = primary

  // Persist a "primary" speaker — the most recently controlled one (where the agent's last play landed).
  // Heuristic: pick the first playing speaker, preferring living room.
  const playing = state.speakers.filter(s => s.playing);
  const primary = focused
    ? state.speakers.find(s => s.id === focused) || playing[0]
    : (playing.find(s => s.room === 'living') || playing[0]);

  if (!primary) return null; // nothing playing → bar hidden

  const track = window.trackById(primary.trackId);
  const roomName = window.ROOMS.find(r => r.id === primary.room)?.name || primary.name;

  const togglePlay = (id) => setState(s => ({...s, speakers: s.speakers.map(sp => sp.id === id ? {...sp, playing:!sp.playing} : sp)}));
  const skipNext = (id) => setState(s => ({...s, speakers: s.speakers.map(sp => {
    if (sp.id !== id) return sp;
    const q = sp.queue || [];
    const nextId = q[0] || window.TRACKS[(window.TRACKS.findIndex(t => t.id === sp.trackId) + 1) % window.TRACKS.length].id;
    return {...sp, trackId: nextId, queue: q.slice(1).concat(sp.trackId), progress: 0};
  })}));
  const skipPrev = (id) => setState(s => ({...s, speakers: s.speakers.map(sp => {
    if (sp.id !== id) return sp;
    const i = window.TRACKS.findIndex(t => t.id === sp.trackId);
    return {...sp, trackId: window.TRACKS[(i - 1 + window.TRACKS.length) % window.TRACKS.length].id, progress: 0};
  })}));
  const playFromQueue = (id, trackId) => setState(s => ({...s, speakers: s.speakers.map(sp => {
    if (sp.id !== id) return sp;
    const q = (sp.queue || []).filter(qid => qid !== trackId);
    return {...sp, trackId, progress:0, playing:true, queue:q};
  })}));
  const removeFromQueue = (id, trackId) => setState(s => ({...s, speakers: s.speakers.map(sp =>
    sp.id === id ? {...sp, queue: (sp.queue || []).filter(qid => qid !== trackId)} : sp
  )}));

  // ─────── EXPANDED PANEL ───────
  if (expanded) {
    const upcoming = (primary.queue || []).map(id => window.trackById(id)).filter(Boolean);
    return (
      <>
        {/* dim backdrop */}
        <div onClick={() => setExpanded(false)} style={{
          position:'absolute', inset:0, zIndex:48, background:'rgba(0,0,0,.35)', backdropFilter:'blur(4px)',
        }}/>
        <div style={{
          position:'absolute', right: narrow ? 12 : 24, bottom: narrow ? 84 : 24,
          width: narrow ? 'calc(100% - 24px)' : 460, maxHeight: narrow ? 'calc(100% - 100px)' : 'min(620px, calc(100% - 80px))',
          background: p.surface2, border:`.5px solid ${p.border}`, borderRadius:18,
          boxShadow:'0 32px 80px rgba(0,0,0,.32)', display:'flex', flexDirection:'column',
          zIndex:49, overflow:'hidden',
        }}>
          {/* hero */}
          <div style={{
            position:'relative', padding:'18px 18px 16px', display:'flex', gap:14, alignItems:'flex-end',
            background:`linear-gradient(160deg, ${track.hue} 0%, oklch(20% 0.06 25) 100%)`,
            color:'#fff',
          }}>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 80% 0%, rgba(255,220,170,.25), transparent 60%)'}}/>
            <div style={{
              width:96, height:96, borderRadius:10, flex:'none', position:'relative',
              background:`radial-gradient(120% 120% at 30% 25%, ${track.hue}, oklch(15% 0.05 25))`,
              boxShadow:'0 12px 28px rgba(0,0,0,.35)',
            }}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)', borderRadius:10}}/>
              <div style={{position:'absolute', bottom:6, left:7, right:7, fontFamily:fonts.display, fontStyle:'italic', fontSize:9, color:'rgba(255,240,210,.85)', letterSpacing:'.05em', textTransform:'uppercase', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{track.album}</div>
            </div>
            <div style={{flex:1, minWidth:0, position:'relative', paddingBottom:2}}>
              <div style={{fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', opacity:.85, display:'flex', alignItems:'center', gap:6}}>
                <window.Icon name={primary.type === 'airplay' ? 'airplay' : 'sonos'} size={11}/>
                Playing in {roomName}
                {playing.length > 1 && <span style={{opacity:.7}}>· +{playing.length-1} more</span>}
              </div>
              <div style={{fontFamily:fonts.display, fontSize:22, fontWeight:500, marginTop:4, lineHeight:1.15, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{track.title}</div>
              <div style={{fontSize:13, opacity:.85, marginTop:2, fontStyle:'italic', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{track.artist} · {track.album}</div>
              <button onClick={() => setExpanded(false)} style={{position:'absolute', top:-6, right:-2, width:28, height:28, borderRadius:'50%', border:0, background:'rgba(0,0,0,.25)', color:'#fff', cursor:'pointer', display:'grid', placeItems:'center', fontSize:16, lineHeight:1}}>×</button>
            </div>
          </div>

          {/* progress + controls */}
          <div style={{padding:'12px 18px 14px', borderBottom:`.5px solid ${p.border}`}}>
            <div style={{height:3, background:p.border, borderRadius:2, position:'relative', overflow:'hidden'}}>
              <div style={{width:`${(primary.progress/track.dur)*100}%`, height:'100%', background:p.accent, borderRadius:2, transition:'width .8s linear'}}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:p.fg3, marginTop:5, fontVariantNumeric:'tabular-nums'}}>
              <span>{window.fmtTime(primary.progress)}</span>
              <span>−{window.fmtTime(track.dur - primary.progress)}</span>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:10}}>
              <button onClick={() => skipPrev(primary.id)} style={ctlBtn(p, 36)}><window.Icon name="prev" size={15}/></button>
              <button onClick={() => togglePlay(primary.id)} style={{...ctlBtn(p, 46), background:p.accent, color:'#fff', border:0}}><window.Icon name={primary.playing ? 'pause' : 'play'} size={18}/></button>
              <button onClick={() => skipNext(primary.id)} style={ctlBtn(p, 36)}><window.Icon name="next" size={15}/></button>
              <div style={{flex:1}}/>
              <div style={{display:'flex', alignItems:'center', gap:8, color:p.fg3}}>
                <window.Icon name="speaker" size={12}/>
                <input type="range" min="0" max="100" value={primary.vol}
                  onChange={(e) => setState(s => ({...s, speakers: s.speakers.map(sp => sp.id === primary.id ? {...sp, vol:+e.target.value} : sp)}))}
                  style={{width:88, accentColor:p.accent, height:3}}/>
              </div>
            </div>
          </div>

          {/* room switcher (if multiple speakers playing) */}
          {playing.length > 1 && (
            <div style={{padding:'10px 14px', borderBottom:`.5px solid ${p.border}`, display:'flex', gap:6, overflowX:'auto'}}>
              {playing.map(sp => {
                const t = window.trackById(sp.trackId);
                const rn = window.ROOMS.find(r => r.id === sp.room)?.name || sp.name;
                const active = sp.id === primary.id;
                return (
                  <button key={sp.id} onClick={() => setFocused(sp.id)} style={{
                    padding:'6px 10px', borderRadius:8, border:`.5px solid ${active ? p.accent : p.border2}`,
                    background: active ? p.accentSoft : 'transparent', color: active ? p.accent : p.fg2,
                    fontSize:11, cursor:'pointer', fontFamily:fonts.body, display:'flex', alignItems:'center', gap:6, whiteSpace:'nowrap', flex:'none',
                  }}>
                    <span style={{width:6, height:6, borderRadius:'50%', background:'oklch(60% 0.14 145)'}}/>
                    {rn} <span style={{opacity:.6, marginLeft:2}}>· {t.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* queue */}
          <div style={{flex:1, overflow:'auto', padding:'4px 0 8px'}}>
            <div style={{padding:'10px 18px 6px', display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
              <div style={{fontSize:10, color:p.fg3, letterSpacing:'.12em', textTransform:'uppercase', fontWeight:500}}>Up next · {roomName}</div>
              <div style={{fontSize:11, color:p.fg3}}>{upcoming.length} song{upcoming.length===1?'':'s'}</div>
            </div>
            {upcoming.length === 0 ? (
              <div style={{padding:'18px 18px 22px', fontSize:12, color:p.fg3, fontStyle:'italic', fontFamily:fonts.display}}>
                Queue is empty. The next track in your library will play after this one.
              </div>
            ) : upcoming.map((tr, i) => (
              <div key={tr.id+'-'+i} onClick={() => playFromQueue(primary.id, tr.id)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'8px 18px', cursor:'pointer',
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = p.warm}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{fontSize:11, color:p.fg3, width:14, textAlign:'right', fontVariantNumeric:'tabular-nums'}}>{i+1}</div>
                <div style={{width:36, height:36, borderRadius:5, flex:'none', background:`radial-gradient(120% 120% at 30% 25%, ${tr.hue}, oklch(20% 0.05 25))`}}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, color:p.fg, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{tr.title}</div>
                  <div style={{fontSize:11, color:p.fg3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{tr.artist} · {tr.album}</div>
                </div>
                <div style={{fontSize:11, color:p.fg3, fontVariantNumeric:'tabular-nums'}}>{window.fmtTime(tr.dur)}</div>
                <button onClick={(e) => { e.stopPropagation(); removeFromQueue(primary.id, tr.id); }} style={{
                  width:24, height:24, borderRadius:6, border:0, background:'transparent', color:p.fg3, cursor:'pointer', display:'grid', placeItems:'center'
                }}><window.Icon name="x" size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ─────── COLLAPSED MINI-BAR ───────
  return (
    <div
      onDoubleClick={() => setExpanded(true)}
      onClick={(e) => { if (e.detail === 1) {/* single click no-op so dbl works */} }}
      title="Double-click to expand"
      style={{
        position:'absolute',
        right: narrow ? 12 : 96, // leave room for the 56px agent bubble + 16 gap on desktop
        bottom: narrow ? 76 : 28,
        left: narrow ? 12 : 'auto',
        maxWidth: narrow ? 'none' : 380,
        minWidth: narrow ? 0 : 320,
        height: 56,
        background: p.surface2,
        border: `.5px solid ${p.border}`,
        borderLeft: `3px solid ${p.accent}`,
        borderRadius: 12,
        boxShadow: '0 12px 32px rgba(0,0,0,.18), 0 1px 0 rgba(255,255,255,.3) inset',
        display: 'flex', alignItems:'center', gap:10, padding:'6px 10px 6px 6px',
        zIndex: 49, cursor:'pointer', userSelect:'none',
      }}
    >
      {/* art */}
      <div style={{
        width:44, height:44, borderRadius:7, flex:'none', position:'relative',
        background:`radial-gradient(120% 120% at 30% 25%, ${track.hue}, oklch(20% 0.05 25))`,
      }}>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 70% 70%, rgba(255,220,150,.35), transparent 55%)', borderRadius:7}}/>
      </div>
      {/* meta */}
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:p.fg, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', lineHeight:1.2}}>
          {track.title}
          {primary.playing && <PulseDots p={p}/>}
        </div>
        <div style={{fontSize:11, color:p.fg3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:1}}>
          <span style={{color:p.fg2}}>{track.artist}</span>
          <span> · {roomName}</span>
          {playing.length > 1 && <span> +{playing.length-1}</span>}
        </div>
        {/* ultra-thin progress */}
        <div style={{height:2, background:p.border, borderRadius:1, marginTop:3, overflow:'hidden'}}>
          <div style={{width:`${(primary.progress/track.dur)*100}%`, height:'100%', background:p.accent, transition:'width .8s linear'}}/>
        </div>
      </div>
      {/* controls */}
      <div style={{display:'flex', gap:2, flex:'none'}} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => skipPrev(primary.id)} style={ctlBtn(p, 28)} title="Previous"><window.Icon name="prev" size={12}/></button>
        <button onClick={() => togglePlay(primary.id)} style={{...ctlBtn(p, 32), background:p.accent, color:'#fff', border:0}} title={primary.playing ? 'Pause' : 'Play'}>
          <window.Icon name={primary.playing ? 'pause' : 'play'} size={13}/>
        </button>
        <button onClick={() => skipNext(primary.id)} style={ctlBtn(p, 28)} title="Next"><window.Icon name="next" size={12}/></button>
        <button onClick={() => setExpanded(true)} style={ctlBtn(p, 28)} title="Show queue">
          <window.Icon name="queue" size={12}/>
        </button>
      </div>
    </div>
  );
};

const ctlBtn = (p, size) => ({
  width:size, height:size, borderRadius: size>=36 ? '50%' : 7,
  border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2,
  cursor:'pointer', display:'grid', placeItems:'center', flex:'none',
});

const PulseDots = ({ p }) => (
  <span style={{display:'inline-flex', gap:1.5, alignItems:'flex-end', height:9, marginLeft:4}}>
    {[0,1,2].map(i => <span key={i} style={{width:2, background:p.accent, animation:`npbBar 0.9s ${i*0.13}s infinite ease-in-out`, height:'100%', borderRadius:1}}/>)}
    <style>{`@keyframes npbBar{0%,100%{height:25%}50%{height:100%}}`}</style>
  </span>
);

window.NowPlayingBar = NowPlayingBar;
