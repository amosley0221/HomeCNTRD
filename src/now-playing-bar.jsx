// now-playing-bar.jsx — global mini-player driven by real HA media_player
// state. Visible whenever any speaker is playing, hidden on the Music
// page (where the full Now Playing card already covers this) and when
// nothing is actively playing on any speaker.
//
// Tap once to expand into a panel with bigger art + position slider +
// volume; tap again or the X to collapse.

const NowPlayingBar = ({ ctx }) => {
  const { p, fonts, state, narrow, page } = ctx;
  const [expanded, setExpanded] = React.useState(false);
  const [focused, setFocused] = React.useState(null); // pinned speaker id
  const hass = window.HassContext ? React.useContext(window.HassContext) : null;

  // Hidden on the music page (full controls live there) and when no
  // speaker is actively playing.
  if (page === 'music') return null;

  const playing = (state.speakers || []).filter(s => s.playing);
  const primary = focused
    ? state.speakers.find(s => s.id === focused) || playing[0]
    : playing[0];

  if (!primary) return null;

  const title = primary.haMediaTitle || 'Playing';
  const artist = primary.haMediaArtist || '';
  const album = primary.haMediaAlbum || '';
  const art = primary.haEntityPicture || null;
  const dur = primary.duration || 0;
  // Local position counter so the progress bar moves smoothly between
  // HA updates (which only fire every couple of seconds).
  const [tickPos, setTickPos] = React.useState(primary.progress || 0);
  const lastSeenRef = React.useRef({ pos: primary.progress || 0, at: Date.now(), key: '' });
  React.useEffect(() => {
    const key = `${primary.id}|${primary.haMediaTitle}|${primary.progress}`;
    if (key !== lastSeenRef.current.key) {
      lastSeenRef.current = { pos: primary.progress || 0, at: Date.now(), key };
      setTickPos(primary.progress || 0);
    }
  }, [primary.id, primary.haMediaTitle, primary.progress]);
  React.useEffect(() => {
    if (!primary.playing) return;
    const i = setInterval(() => {
      const dt = (Date.now() - lastSeenRef.current.at) / 1000;
      setTickPos(Math.min(dur || 0, lastSeenRef.current.pos + dt));
    }, 500);
    return () => clearInterval(i);
  }, [primary.playing, primary.id, dur]);

  const call = (id, service, data) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: id, ...data }); } catch {}
  };

  const fmtTime = (s) => {
    if (!s || s < 0) return '0:00';
    const m = Math.floor(s / 60); const ss = Math.floor(s % 60);
    return `${m}:${ss.toString().padStart(2, '0')}`;
  };

  // ─── EXPANDED ───
  if (expanded) {
    return (
      <>
        <div onClick={() => setExpanded(false)} style={{
          position:'absolute', inset:0, zIndex:48, background:'rgba(0,0,0,.45)', backdropFilter:'blur(4px)',
        }}/>
        <div style={{
          position:'absolute', right: narrow ? 12 : 24, bottom: narrow ? 84 : 24,
          width: narrow ? 'calc(100% - 24px)' : 460, maxHeight: narrow ? 'calc(100% - 100px)' : 'min(620px, calc(100% - 80px))',
          background: p.surface2, border:`.5px solid ${p.border}`, borderRadius:18,
          boxShadow:'0 32px 80px rgba(0,0,0,.32)', display:'flex', flexDirection:'column',
          zIndex:49, overflow:'hidden',
        }}>
          <div style={{padding:'18px 18px 16px', display:'flex', gap:14, alignItems:'flex-end',
            background: art ? '#0d0b09' : `linear-gradient(160deg, ${p.accent} 0%, oklch(20% 0.06 25) 100%)`,
            color:'#fff', position:'relative', minHeight: 132,
          }}>
            <div style={{
              width:96, height:96, borderRadius:10, flex:'none', position:'relative',
              background: art ? `center / cover no-repeat url("${art}"), oklch(15% 0.05 25)` : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
              boxShadow:'0 12px 28px rgba(0,0,0,.35)',
            }}/>
            <div style={{flex:1, minWidth:0, paddingBottom:2}}>
              <div style={{fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', opacity:.85}}>
                Playing in {primary.name}{playing.length > 1 && <span style={{opacity:.7}}> · +{playing.length-1} more</span>}
              </div>
              <div style={{fontFamily:fonts.display, fontSize:22, fontWeight:500, marginTop:4, lineHeight:1.15, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{title}</div>
              <div style={{fontSize:13, opacity:.85, marginTop:2, fontStyle:'italic', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{[artist, album].filter(Boolean).join(' · ')}</div>
            </div>
            <button onClick={() => setExpanded(false)} style={{position:'absolute', top:10, right:10, width:28, height:28, borderRadius:'50%', border:0, background:'rgba(0,0,0,.45)', color:'#fff', cursor:'pointer', display:'grid', placeItems:'center', fontSize:16, lineHeight:1}}>×</button>
          </div>

          <div style={{padding:'14px 18px 16px'}}>
            {dur > 0 && (
              <>
                <input type="range" min="0" max={dur} step={1} value={tickPos}
                  onChange={(e) => call(primary.id, 'media_seek', { seek_position: +e.target.value })}
                  style={{width:'100%', accentColor:p.accent, height:3}}/>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:p.fg3, marginTop:4, fontVariantNumeric:'tabular-nums'}}>
                  <span>{fmtTime(tickPos)}</span>
                  <span>−{fmtTime(Math.max(0, dur - tickPos))}</span>
                </div>
              </>
            )}
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:10}}>
              <button onClick={() => call(primary.id, 'media_previous_track')} style={ctlBtn(p, 36)}>‹‹</button>
              <button onClick={() => call(primary.id, 'media_play_pause')} style={{...ctlBtn(p, 46), background:p.accent, color:'#fff', border:0}}>{primary.playing ? '❚❚' : '▶'}</button>
              <button onClick={() => call(primary.id, 'media_next_track')} style={ctlBtn(p, 36)}>››</button>
              <div style={{flex:1}}/>
              <div style={{display:'flex', alignItems:'center', gap:8, color:p.fg3}}>
                <window.Icon name="speaker" size={12}/>
                <input type="range" min="0" max="100" value={primary.vol}
                  onChange={(e) => call(primary.id, 'volume_set', { volume_level: (+e.target.value) / 100 })}
                  style={{width:88, accentColor:p.accent, height:3}}/>
              </div>
            </div>
          </div>

          {playing.length > 1 && (
            <div style={{padding:'10px 14px', borderTop:`.5px solid ${p.border}`, display:'flex', gap:6, overflowX:'auto'}}>
              {playing.map(sp => {
                const active = sp.id === primary.id;
                return (
                  <button key={sp.id} onClick={() => setFocused(sp.id)} style={{
                    padding:'6px 10px', borderRadius:8, border:`.5px solid ${active ? p.accent : p.border2}`,
                    background: active ? p.accentSoft : 'transparent', color: active ? p.accent : p.fg2,
                    fontSize:11, cursor:'pointer', fontFamily:fonts.body, whiteSpace:'nowrap', flex:'none',
                  }}>{sp.name}</button>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }

  // ─── COLLAPSED MINI-BAR ───
  return (
    <div
      onClick={() => setExpanded(true)}
      title="Tap to expand"
      style={{
        position:'absolute',
        right: narrow ? 12 : 96,
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
      <div style={{
        width:44, height:44, borderRadius:7, flex:'none',
        background: art ? `center / cover no-repeat url("${art}"), oklch(20% 0.05 25)` : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
      }}/>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:p.fg, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', lineHeight:1.2}}>
          {title}
          {primary.playing && <PulseDots p={p}/>}
        </div>
        <div style={{fontSize:11, color:p.fg3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:1}}>
          {artist && <span style={{color:p.fg2}}>{artist}</span>}
          {artist && ' · '}
          <span>{primary.name}</span>
          {playing.length > 1 && <span> +{playing.length-1}</span>}
        </div>
        {dur > 0 && (
          <div style={{height:2, background:p.border, borderRadius:1, marginTop:3, overflow:'hidden'}}>
            <div style={{width:`${(tickPos / dur) * 100}%`, height:'100%', background:p.accent, transition:'width .8s linear'}}/>
          </div>
        )}
      </div>
      <div style={{display:'flex', gap:2, flex:'none'}} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => call(primary.id, 'media_previous_track')} style={ctlBtn(p, 28)} title="Previous">‹‹</button>
        <button onClick={() => call(primary.id, 'media_play_pause')} style={{...ctlBtn(p, 32), background:p.accent, color:'#fff', border:0}} title={primary.playing ? 'Pause' : 'Play'}>
          {primary.playing ? '❚❚' : '▶'}
        </button>
        <button onClick={() => call(primary.id, 'media_next_track')} style={ctlBtn(p, 28)} title="Next">››</button>
      </div>
    </div>
  );
};

const ctlBtn = (p, size) => ({
  width:size, height:size, borderRadius: size>=36 ? '50%' : 7,
  border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2,
  cursor:'pointer', display:'grid', placeItems:'center', flex:'none',
  fontSize: size >= 40 ? 16 : 12, fontFamily:'inherit',
});

const PulseDots = ({ p }) => (
  <span style={{display:'inline-flex', gap:1.5, alignItems:'flex-end', height:9, marginLeft:4}}>
    {[0,1,2].map(i => <span key={i} style={{width:2, background:p.accent, animation:`npbBar 0.9s ${i*0.13}s infinite ease-in-out`, height:'100%', borderRadius:1}}/>)}
    <style>{`@keyframes npbBar{0%,100%{height:25%}50%{height:100%}}`}</style>
  </span>
);

window.NowPlayingBar = NowPlayingBar;
