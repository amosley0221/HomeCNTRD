// music-view.jsx — Full Apple Music–style library with per-speaker playback

const MusicView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const [section, setSection] = React.useState('library');   // library | playlist | search | recent
  const [activePlaylist, setActivePlaylist] = React.useState(window.PLAYLISTS[0].id);
  const [query, setQuery] = React.useState('');
  const [activeSpeaker, setActiveSpeaker] = React.useState(state.speakers[0].id);

  const speaker = state.speakers.find(s => s.id === activeSpeaker) || state.speakers[0];

  // play a track on the current speaker
  const playOn = (trackId, speakerId = activeSpeaker) => {
    setState(s => ({
      ...s,
      speakers: s.speakers.map(sp => sp.id === speakerId ? {...sp, trackId, progress:0, playing:true} : sp)
    }));
  };
  const togglePlay = (speakerId) => setState(s => ({
    ...s,
    speakers: s.speakers.map(sp => sp.id === speakerId ? {...sp, playing: !sp.playing} : sp)
  }));
  const setVol = (speakerId, vol) => setState(s => ({
    ...s,
    speakers: s.speakers.map(sp => sp.id === speakerId ? {...sp, vol} : sp)
  }));

  // Add/remove track to playlist
  const addToPlaylist = (plId, trackId) => {
    // Note: PLAYLISTS is an outer constant; clone & store in state.playlists if not yet there
    setState(s => {
      const playlists = s.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ...s,
        playlists: playlists.map(pl => pl.id === plId
          ? {...pl, tracks: pl.tracks.includes(trackId) ? pl.tracks : [...pl.tracks, trackId], count: pl.count + (pl.tracks.includes(trackId) ? 0 : 1)}
          : pl)
      };
    });
  };
  const removeFromPlaylist = (plId, trackId) => {
    setState(s => {
      const playlists = s.playlists || JSON.parse(JSON.stringify(window.PLAYLISTS));
      return {
        ...s,
        playlists: playlists.map(pl => pl.id === plId
          ? {...pl, tracks: pl.tracks.filter(t => t !== trackId), count: Math.max(0, pl.count - 1)}
          : pl)
      };
    });
  };

  const playlists = state.playlists || window.PLAYLISTS;
  const currentPlaylist = playlists.find(pl => pl.id === activePlaylist);
  const filteredTracks = query
    ? window.TRACKS.filter(t => (t.title + ' ' + t.artist + ' ' + t.album).toLowerCase().includes(query.toLowerCase()))
    : window.TRACKS;

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Apple Music · 2,847 songs"
        title="Library"
        sub="frances.w@icloud.com · streaming to Sonos & AirPlay"
        right={<MusicSearch ctx={ctx} value={query} onChange={(v) => { setQuery(v); if (v) setSection('search'); }} />}
      />

      <div style={{display:'grid', gridTemplateColumns:'200px 1fr 320px', gap:dens.gap, alignItems:'start', minHeight:0}}>

        {/* LEFT: source sidebar */}
        <window.Card p={p} style={{padding:'14px 8px', position:'sticky', top:0}}>
          <MusicNavItem ctx={ctx} icon="library" label="Library"      active={section==='library'}  onClick={() => setSection('library')}/>
          <MusicNavItem ctx={ctx} icon="clock"   label="Recently played" active={section==='recent'} onClick={() => setSection('recent')}/>
          <MusicNavItem ctx={ctx} icon="heart"   label="Favorites"     onClick={() => setSection('library')}/>
          <MusicNavItem ctx={ctx} icon="search"  label="Search"        active={section==='search'}   onClick={() => setSection('search')}/>
          <div style={{padding:'14px 14px 6px', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:p.fg3, fontWeight:500}}>Playlists</div>
          {playlists.map(pl => (
            <MusicNavItem key={pl.id} ctx={ctx} swatches={pl.art.slice(0,4)} label={pl.name}
              active={section==='playlist' && activePlaylist === pl.id}
              onClick={() => { setSection('playlist'); setActivePlaylist(pl.id); }}/>
          ))}
          <button style={{
            display:'flex', alignItems:'center', gap:10, padding:'8px 14px', margin:'4px 0',
            border:0, background:'transparent', color:p.fg3, fontSize:12, fontFamily:fonts.body, cursor:'pointer', width:'100%'
          }}>
            <window.Icon name="plus" size={14}/> New playlist
          </button>
        </window.Card>

        {/* CENTER: tracks */}
        <div style={{display:'flex', flexDirection:'column', gap:dens.gap, minWidth:0}}>
          {section === 'playlist' && currentPlaylist
            ? <PlaylistView ctx={ctx} pl={currentPlaylist} playOn={playOn} speaker={speaker}
                removeFromPlaylist={removeFromPlaylist}/>
            : section === 'recent'
            ? <TrackTable ctx={ctx} title="Recently played" tracks={window.TRACKS.slice(0,8)} playOn={playOn} speaker={speaker} playlists={playlists} addToPlaylist={addToPlaylist}/>
            : section === 'search'
            ? <TrackTable ctx={ctx} title={`Results for "${query}"`} tracks={filteredTracks} playOn={playOn} speaker={speaker} playlists={playlists} addToPlaylist={addToPlaylist}/>
            : <LibraryView ctx={ctx} playOn={playOn} speaker={speaker} playlists={playlists} addToPlaylist={addToPlaylist} setSection={setSection} setActivePlaylist={setActivePlaylist}/>
          }
        </div>

        {/* RIGHT: speakers panel */}
        <SpeakersPanel ctx={ctx} activeSpeaker={activeSpeaker} setActiveSpeaker={setActiveSpeaker}
          togglePlay={togglePlay} setVol={setVol}/>
      </div>
      <div style={{height:60}}/>
    </>
  );
};

// ── MUSIC NAV ITEM ──────────────────────────────────────────────────────
const MusicNavItem = ({ ctx, icon, label, active, onClick, swatches }) => {
  const { p, fonts } = ctx;
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:10, padding:'7px 12px', margin:'2px 4px',
      borderRadius:7, border:0, background: active ? p.warm : 'transparent', color: active ? p.fg : p.fg2,
      fontFamily:fonts.body, fontSize:13, cursor:'pointer', width:'calc(100% - 8px)', textAlign:'left',
      borderLeft: active ? `2px solid ${p.accent}` : '2px solid transparent',
    }}>
      {icon && <window.Icon name={icon} size={14} stroke={1.5}/>}
      {swatches && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', width:18, height:18, borderRadius:3, overflow:'hidden', flex:'none'}}>
          {swatches.map((c,i) => <span key={i} style={{background:c}}/>)}
        </div>
      )}
      <span style={{flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{label}</span>
    </button>
  );
};

// ── SEARCH ──────────────────────────────────────────────────────────────
const MusicSearch = ({ ctx, value, onChange }) => {
  const { p, fonts } = ctx;
  return (
    <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 14px', background:p.surface2, borderRadius:10, border:`.5px solid ${p.border}`, minWidth:280}}>
      <window.Icon name="search" size={14} style={{color:p.fg3}}/>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Search songs, artists, albums…" style={{
        flex:1, border:0, outline:'none', background:'transparent', color:p.fg, fontSize:13, fontFamily:fonts.body
      }}/>
    </div>
  );
};

// ── LIBRARY (default view) ──────────────────────────────────────────────
const LibraryView = ({ ctx, playOn, speaker, playlists, addToPlaylist, setSection, setActivePlaylist }) => {
  const { p, fonts, dens } = ctx;
  return (
    <>
      {/* hero */}
      <window.Card p={p} style={{padding:0, overflow:'hidden', display:'flex', minHeight:200}}>
        <div style={{flex:1, padding:24, display:'flex', flexDirection:'column', justifyContent:'flex-end', background:`linear-gradient(135deg, ${p.accent} 0%, oklch(35% 0.13 30) 100%)`}}>
          <div style={{fontSize:11, color:'rgba(255,255,255,.85)', letterSpacing:'.12em', textTransform:'uppercase'}}>Made for you</div>
          <div style={{fontFamily:fonts.display, fontSize:30, color:'#fff', marginTop:6, fontWeight:500}}>Frances' Picks</div>
          <div style={{fontSize:13, color:'rgba(255,255,255,.85)', marginTop:4, fontStyle:'italic'}}>91 tracks · refreshed for Tuesday</div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button onClick={() => playOn('t11')} style={{padding:'8px 18px', borderRadius:8, border:0, background:'#fff', color:p.accent, fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6}}>
              <window.Icon name="play" size={13}/> Play
            </button>
            <button style={{padding:'8px 18px', borderRadius:8, border:`.5px solid rgba(255,255,255,.4)`, background:'transparent', color:'#fff', fontSize:13, cursor:'pointer'}}>Shuffle</button>
          </div>
        </div>
        <div style={{width:200, position:'relative', overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr', gap:1}}>
          {window.PLAYLISTS[3].art.map((c, i) => <div key={i} style={{background:c}}/>)}
        </div>
      </window.Card>

      {/* Recently played row */}
      <window.Section title="Recently played" p={p} fonts={fonts}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:dens.tileGap}}>
          {window.TRACKS.slice(0,6).map(t => (
            <button key={t.id} onClick={() => playOn(t.id)} style={{padding:0, border:0, background:'transparent', cursor:'pointer', textAlign:'left'}}>
              <div style={{aspectRatio:'1', borderRadius:8, background:`radial-gradient(120% 120% at 30% 25%, ${t.hue}, oklch(15% 0.05 25))`, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 70% 70%, rgba(255,220,150,.4), transparent 55%)'}}/>
                <div style={{position:'absolute', bottom:8, left:10, right:10, fontFamily:fonts.display, fontStyle:'italic', fontSize:10, color:'rgba(255,240,210,.85)', letterSpacing:'.05em', textTransform:'uppercase', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{t.album}</div>
              </div>
              <div style={{fontFamily:fonts.display, fontSize:14, color:p.fg, marginTop:8, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{t.title}</div>
              <div style={{fontSize:11, color:p.fg3, marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{t.artist}</div>
            </button>
          ))}
        </div>
      </window.Section>

      {/* Playlists row */}
      <window.Section title="Your playlists" p={p} fonts={fonts}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:dens.tileGap}}>
          {playlists.map(pl => (
            <button key={pl.id} onClick={() => { setSection('playlist'); setActivePlaylist(pl.id); }} style={{padding:0, border:0, background:'transparent', cursor:'pointer', textAlign:'left'}}>
              <div style={{aspectRatio:'1', borderRadius:8, display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden'}}>
                {pl.art.slice(0,4).map((c,i) => <div key={i} style={{background:c}}/>)}
              </div>
              <div style={{fontFamily:fonts.display, fontSize:14, color:p.fg, marginTop:8, fontWeight:500}}>{pl.name}</div>
              <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{pl.count} songs</div>
            </button>
          ))}
        </div>
      </window.Section>

      <window.Section title="All songs" subtitle={`${window.TRACKS.length} of 2,847`} p={p} fonts={fonts}>
        <TrackTable ctx={ctx} tracks={window.TRACKS} playOn={playOn} speaker={speaker} playlists={playlists} addToPlaylist={addToPlaylist}/>
      </window.Section>
    </>
  );
};

// ── PLAYLIST VIEW ───────────────────────────────────────────────────────
const PlaylistView = ({ ctx, pl, playOn, speaker, removeFromPlaylist }) => {
  const { p, fonts } = ctx;
  const tracks = pl.tracks.map(id => window.trackById(id)).filter(Boolean);
  return (
    <>
      <window.Card p={p} style={{padding:0, overflow:'hidden', display:'flex', minHeight:200}}>
        <div style={{width:200, display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, flex:'none'}}>
          {pl.art.slice(0,4).map((c,i) => <div key={i} style={{background:c}}/>)}
        </div>
        <div style={{flex:1, padding:24, display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
          <div style={{fontSize:11, color:p.fg3, letterSpacing:'.12em', textTransform:'uppercase'}}>Playlist · {pl.count} songs</div>
          <div style={{fontFamily:fonts.display, fontSize:36, color:p.fg, marginTop:6, fontWeight:500}}>{pl.name}</div>
          <div style={{display:'flex', gap:8, marginTop:14}}>
            <button onClick={() => tracks[0] && playOn(tracks[0].id)} style={{padding:'8px 18px', borderRadius:8, border:0, background:p.accent, color:'#fff', fontSize:13, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontFamily:fonts.body}}>
              <window.Icon name="play" size={13}/> Play
            </button>
            <button style={{padding:'8px 14px', borderRadius:8, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontFamily:fonts.body}}>
              <window.Icon name="shuffle" size={13}/> Shuffle
            </button>
            <button style={{padding:'8px 14px', borderRadius:8, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontFamily:fonts.body}}>
              <window.Icon name="edit" size={13}/> Edit
            </button>
          </div>
        </div>
      </window.Card>
      <TrackTable ctx={ctx} tracks={tracks} playOn={playOn} speaker={speaker}
        rowAction={(t) => (
          <button onClick={(e) => { e.stopPropagation(); removeFromPlaylist(pl.id, t.id); }}
            style={{padding:'4px 8px', borderRadius:6, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg3, fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontFamily:fonts.body}}>
            <window.Icon name="minus" size={11}/> Remove
          </button>
        )}/>
    </>
  );
};

// ── TRACK TABLE ─────────────────────────────────────────────────────────
const TrackTable = ({ ctx, tracks, title, playOn, speaker, playlists, addToPlaylist, rowAction }) => {
  const { p, fonts } = ctx;
  const [openMenu, setOpenMenu] = React.useState(null);

  return (
    <div>
      {title && <h2 style={{margin:'0 0 12px', fontFamily:fonts.display, fontSize:20, fontWeight:500, color:p.fg}}>{title}</h2>}
      <window.Card p={p} style={{padding:0, overflow:'hidden'}}>
        <div style={{display:'grid', gridTemplateColumns:'40px 1.6fr 1fr 1fr 60px 80px', alignItems:'center', gap:14, padding:'10px 18px', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:p.fg3, borderBottom:`.5px solid ${p.border}`}}>
          <span>#</span><span>Title</span><span>Artist</span><span>Album</span><span style={{textAlign:'right'}}>Time</span><span></span>
        </div>
        {tracks.map((t, i) => {
          const isCurrent = speaker.trackId === t.id;
          return (
            <div key={t.id + '-' + i} style={{display:'grid', gridTemplateColumns:'40px 1.6fr 1fr 1fr 60px 80px', alignItems:'center', gap:14, padding:'8px 18px', fontSize:13, color:p.fg, borderBottom: i < tracks.length - 1 ? `.5px solid ${p.border}` : 'none', cursor:'pointer', position:'relative'}} onDoubleClick={() => playOn(t.id)}>
              <button onClick={() => playOn(t.id)} style={{width:24, height:24, borderRadius:'50%', border:0, background: isCurrent ? p.accent : 'transparent', color: isCurrent ? '#fff' : p.fg3, cursor:'pointer', display:'grid', placeItems:'center'}}>
                {isCurrent && speaker.playing
                  ? <PlayingDots p={p}/>
                  : <window.Icon name="play" size={11}/>}
              </button>
              <div style={{display:'flex', alignItems:'center', gap:10, minWidth:0}}>
                <div style={{width:34, height:34, borderRadius:5, flex:'none', background:`radial-gradient(120% 120% at 30% 25%, ${t.hue}, oklch(20% 0.05 25))`}}/>
                <div style={{minWidth:0}}>
                  <div style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color: isCurrent ? p.accent : p.fg, fontWeight: isCurrent ? 500 : 400}}>{t.title}</div>
                </div>
              </div>
              <div style={{color:p.fg2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{t.artist}</div>
              <div style={{color:p.fg3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{t.album}</div>
              <div style={{textAlign:'right', color:p.fg3, fontSize:11, fontVariantNumeric:'tabular-nums'}}>{window.fmtTime(t.dur)}</div>
              <div style={{display:'flex', justifyContent:'flex-end', gap:6, position:'relative'}}>
                {rowAction ? rowAction(t) : (
                  <button onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === t.id ? null : t.id); }} style={{
                    width:26, height:26, borderRadius:6, border:0, background:'transparent', color:p.fg3, cursor:'pointer', display:'grid', placeItems:'center'
                  }}><window.Icon name="dots" size={14}/></button>
                )}
                {openMenu === t.id && playlists && (
                  <div style={{position:'absolute', right:0, top:30, width:200, background:p.surface2, border:`.5px solid ${p.border2}`, borderRadius:9, boxShadow:'0 12px 32px rgba(0,0,0,.18)', zIndex:30, padding:6}}
                    onMouseLeave={() => setOpenMenu(null)}>
                    <div style={{padding:'4px 10px', fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Add to playlist</div>
                    {playlists.map(pl => (
                      <button key={pl.id} onClick={() => { addToPlaylist(pl.id, t.id); setOpenMenu(null); }} style={{
                        display:'flex', alignItems:'center', gap:8, width:'100%', padding:'7px 10px', borderRadius:6, border:0, background:'transparent', color:p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body, textAlign:'left'
                      }}>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', width:14, height:14, borderRadius:2, overflow:'hidden', flex:'none'}}>
                          {pl.art.slice(0,4).map((c, j) => <span key={j} style={{background:c}}/>)}
                        </div>
                        {pl.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </window.Card>
    </div>
  );
};

const PlayingDots = ({ p }) => (
  <span style={{display:'inline-flex', gap:1.5, alignItems:'flex-end', height:10}}>
    {[0,1,2].map(i => <span key={i} style={{width:2, background:'#fff', animation:`mvBar 0.8s ${i*0.12}s infinite ease-in-out`, height:'100%'}}/>)}
    <style>{`@keyframes mvBar{0%,100%{height:30%}50%{height:100%}}`}</style>
  </span>
);

// ── SPEAKERS PANEL ──────────────────────────────────────────────────────
const SpeakersPanel = ({ ctx, activeSpeaker, setActiveSpeaker, togglePlay, setVol }) => {
  const { p, fonts, state, setState } = ctx;
  return (
    <window.Card p={p} style={{padding:0, overflow:'hidden', position:'sticky', top:0}}>
      <div style={{padding:'14px 16px', borderBottom:`.5px solid ${p.border}`, display:'flex', alignItems:'center', gap:8}}>
        <window.Icon name="airplay" size={14} style={{color:p.accent}}/>
        <div style={{flex:1, fontFamily:fonts.display, fontSize:15, color:p.fg, fontWeight:500}}>Playing on</div>
        <div style={{fontSize:11, color:p.fg3}}>{state.speakers.filter(s => s.playing).length} of {state.speakers.length}</div>
      </div>

      <div style={{maxHeight:520, overflow:'auto'}}>
        {state.speakers.map(sp => {
          const tk = window.trackById(sp.trackId);
          const isActive = sp.id === activeSpeaker;
          return (
            <div key={sp.id} onClick={() => setActiveSpeaker(sp.id)} style={{
              padding:'12px 14px', borderBottom:`.5px solid ${p.border}`, cursor:'pointer',
              background: isActive ? p.warm : 'transparent',
              borderLeft: isActive ? `2px solid ${p.accent}` : '2px solid transparent',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{width:36, height:36, borderRadius:6, background:`radial-gradient(120% 120% at 30% 25%, ${tk.hue}, oklch(20% 0.05 25))`, flex:'none'}}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:p.fg, fontWeight:500}}>
                    <window.Icon name={sp.type === 'airplay' ? 'airplay' : 'sonos'} size={11} style={{color:p.fg3}}/>
                    {sp.name}
                    {sp.playing && <span style={{width:6, height:6, borderRadius:'50%', background:'oklch(60% 0.14 145)'}}/>}
                  </div>
                  <div style={{fontSize:11, color:p.fg3, marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {sp.playing ? `${tk.title} · ${tk.artist}` : 'Idle'}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); togglePlay(sp.id); }} style={{
                  width:28, height:28, borderRadius:'50%', border:0, background: sp.playing ? p.accent : p.surface, color: sp.playing ? '#fff' : p.fg2, cursor:'pointer', display:'grid', placeItems:'center', flex:'none'
                }}>
                  <window.Icon name={sp.playing ? 'pause' : 'play'} size={11}/>
                </button>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
                <window.Icon name="speaker" size={11} style={{color:p.fg3}}/>
                <input type="range" min="0" max="100" value={sp.vol}
                  onChange={(e) => setVol(sp.id, +e.target.value)} onClick={(e) => e.stopPropagation()}
                  style={{flex:1, accentColor: p.accent, height:3}}/>
                <span style={{fontSize:10, color:p.fg3, fontVariantNumeric:'tabular-nums', width:20, textAlign:'right'}}>{sp.vol}</span>
              </div>
              {sp.playing && (
                <div style={{height:2, background:p.border, borderRadius:1, marginTop:6, overflow:'hidden'}}>
                  <div style={{width:`${(sp.progress / tk.dur) * 100}%`, height:'100%', background:p.accent}}/>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{padding:'12px 14px', borderTop:`.5px solid ${p.border}`, display:'flex', gap:8}}>
        <button onClick={() => setState(s => ({...s, speakers: s.speakers.map(sp => ({...sp, playing:false}))}))} style={{
          flex:1, padding:'7px 10px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, fontSize:11, cursor:'pointer', fontFamily:fonts.body
        }}>Pause all</button>
        <button onClick={() => {
          // group all speakers around the active one
          const active = state.speakers.find(sp => sp.id === activeSpeaker);
          setState(s => ({...s, speakers: s.speakers.map(sp => ({...sp, group:'g1', trackId: active.trackId, progress: active.progress, playing: active.playing}))}));
        }} style={{
          flex:1, padding:'7px 10px', borderRadius:7, border:`.5px solid ${p.accent}`, background:p.accentSoft, color:p.accent, fontSize:11, cursor:'pointer', fontFamily:fonts.body, display:'flex', alignItems:'center', justifyContent:'center', gap:5
        }}>
          <window.Icon name="airplay" size={11}/> Group all
        </button>
      </div>
    </window.Card>
  );
};

window.MusicView = MusicView;
