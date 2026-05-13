// now-playing-bar.jsx — global mini-player driven by real HA media_player
// state. Visible whenever any speaker is playing, hidden on the Music
// page (where the full Now Playing card already covers this) and when
// nothing is actively playing on any speaker.
//
// Tap once to expand into a panel with bigger art + position slider +
// volume; tap again or the X to collapse.

import HassContext from './lib/hass-context.js';

const NowPlayingBar = ({ ctx }) => {
  const { p, fonts, state, narrow, page } = ctx;

  // All hooks must run unconditionally on every render. They sit above
  // the page/playing early returns so React's hook-order check stays
  // happy when the user navigates between pages or playback stops.
  const hass = React.useContext(HassContext);
  const [expanded, setExpanded] = React.useState(false);
  const [focused, setFocused] = React.useState(null);
  // Optimistic volume per speaker + a 150 ms trailing debounce on the
  // volume_set service call. Sonos rate-limits and each call waits on
  // a UPnP round-trip; without this, dragging a slider feels sluggish
  // (especially with a grouped queue, where every member gets a call)
  // and HA's stale state snaps the thumb backwards mid-drag.
  const [volOverrides, setVolOverrides] = React.useState({});
  const volTimersRef = React.useRef({});

  const playing = (state.speakers || []).filter(s => s.playing);
  const primary = focused
    ? state.speakers.find(s => s.id === focused) || playing[0]
    : playing[0];

  // Position interpolation. Always declared even when there's nothing
  // to play; the effect bails internally.
  const [tickPos, setTickPos] = React.useState(0);
  const lastSeenRef = React.useRef({ pos: 0, at: Date.now(), key: '' });
  const dur = primary?.duration || 0;
  const isPlaying = !!primary?.playing;

  React.useEffect(() => {
    if (!primary) return;
    const stampedPos = primary.progress || 0;
    const stampedAt = primary.progressUpdatedAt;
    const now = Date.now();
    const livePos = (primary.playing && stampedAt)
      ? stampedPos + Math.max(0, (now - stampedAt) / 1000)
      : stampedPos;
    const key = `${primary.id}|${primary.haMediaTitle}|${stampedAt || stampedPos}`;
    if (key !== lastSeenRef.current.key) {
      lastSeenRef.current = { pos: livePos, at: now, key };
      setTickPos(Math.min(primary.duration || livePos, livePos));
    }
  }, [primary?.id, primary?.haMediaTitle, primary?.progress, primary?.progressUpdatedAt, primary?.playing, primary]);

  React.useEffect(() => {
    if (!isPlaying) return;
    const i = setInterval(() => {
      const dt = (Date.now() - lastSeenRef.current.at) / 1000;
      setTickPos(Math.min(dur || 0, lastSeenRef.current.pos + dt));
    }, 500);
    return () => clearInterval(i);
  }, [isPlaying, primary?.id, dur]);

  // Filter the group-with list to real Sonos rooms, deduped by name.
  // Memoised; the inputs change rarely so the cost is small but the
  // dedupe walk runs every render without this. MUST live above the
  // early-return block — moving it below would change the hook count
  // between renders when navigating to /music or pausing playback and
  // trip React error #300.
  const sonosSpeakers = React.useMemo(() => {
    const isSonos = (s) => {
      const platform = hass?.entities?.[s.id]?.platform;
      return platform === 'sonos' || s.isSonosAttr;
    };
    const all = (state.speakers || []).filter(isSonos);
    const seen = new Map();
    for (const s of all) {
      const key = (s.name || s.id).toLowerCase().trim();
      if (!seen.has(key)) seen.set(key, s);
      else {
        // Prefer the native Sonos entity over MA mirror — join services
        // need to target the real Sonos device, not its MA queue proxy.
        const existing = seen.get(key);
        if (existing.isMAAttr && !s.isMAAttr) seen.set(key, s);
      }
    }
    return Array.from(seen.values());
  }, [state.speakers, hass?.entities]);

  // Hidden on the music page (full controls live there) and when no
  // speaker is actively playing. These run AFTER every hook above.
  if (page === 'music') return null;
  if (!primary) return null;

  const title = primary.haMediaTitle || 'Playing';
  const artist = primary.haMediaArtist || '';
  const album = primary.haMediaAlbum || '';
  const art = primary.haEntityPicture || null;

  const call = (id, service, data) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: id, ...data }); } catch {}
  };

  // Group membership for the primary speaker. HA exposes the active
  // group via the `group_members` attribute on the master.
  const groupAttr = hass?.states?.[primary.id]?.attributes?.group_members || [];

  // The primary may be the MA mirror; map its name to the native Sonos
  // entity so we can use it as the master for sonos.join.
  const primaryKey = (primary.name || '').toLowerCase().trim();
  const primarySonos = sonosSpeakers.find(s => (s.name || '').toLowerCase().trim() === primaryKey) || primary;
  const groupableSpeakers = sonosSpeakers.filter(s => (s.name || '').toLowerCase().trim() !== primaryKey);

  // Resolve the true Sonos group coordinator. HA's Sonos integration
  // orders `group_members` with the coordinator first, so `groupAttr[0]`
  // is the leader. The mini player's `primary` drifts to whichever
  // entity wins `playing[0]` (or the user-focused tab), which can be a
  // slave — passing a slave as `master` to `sonos.join` triggers
  // UPnP Error 1001 and can drop the whole group's playback. Always
  // address join/unjoin calls at the leader.
  const resolveSonos = (id) => {
    if (!id) return null;
    const raw = (state.speakers || []).find(s => s.id === id);
    if (!raw) return null;
    const k = (raw.name || '').toLowerCase().trim();
    return sonosSpeakers.find(s => (s.name || '').toLowerCase().trim() === k) || raw;
  };
  const leaderSonos = (groupAttr.length ? resolveSonos(groupAttr[0]) : null) || primarySonos;

  // Dedupe the playing list by name so the MA mirror of an actively-
  // playing Sonos doesn't show up as '+1 more' room or render a
  // duplicate focus tab. Prefer the native entity so picking a focus
  // tab lands on the same speaker the rest of the code resolves.
  const playingDeduped = (() => {
    const seen = new Map();
    for (const s of playing) {
      const key = (s.name || s.id).toLowerCase().trim();
      const existing = seen.get(key);
      if (!existing || (existing.isMAAttr && !s.isMAAttr)) seen.set(key, s);
    }
    return Array.from(seen.values());
  })();

  // Membership keyed by name so MA mirror IDs in group_members still
  // match against the deduped Sonos pool.
  const groupNames = new Set();
  for (const memberId of groupAttr) {
    const member = (state.speakers || []).find(s => s.id === memberId);
    if (member) groupNames.add((member.name || '').toLowerCase().trim());
  }
  const isMember = (s) => groupNames.has((s.name || '').toLowerCase().trim());

  const joinSpeaker = (speaker) => {
    if (typeof hass?.callService !== 'function') return;
    // Prefer sonos.join when available — handles Line-In sources,
    // satellite-speaker edge cases, and existing-group reorganisation
    // more reliably than the universal media_player.join. Probe
    // hass.services first so we don't fire a call HA will reject with
    // a visible 'Action sonos.join not found' toast on installs that
    // expose Sonos via Music Assistant only (no native sonos.*
    // services registered).
    const sonosAvailable = !!hass?.services?.sonos?.join;
    const fallback = () => hass.callService('media_player', 'join', {
      entity_id: leaderSonos.id,
      group_members: [
        ...groupAttr.filter(id => id !== leaderSonos.id),
        speaker.id,
      ],
    }).catch(() => {});
    if (sonosAvailable) {
      hass.callService('sonos', 'join', {
        master: leaderSonos.id,
        entity_id: speaker.id,
      }).catch(fallback);
    } else {
      fallback();
    }
  };
  const leaveSpeaker = (speaker) => {
    if (typeof hass?.callService !== 'function') return;
    const sonosAvailable = !!hass?.services?.sonos?.unjoin;
    const fallback = () => hass.callService('media_player', 'unjoin', { entity_id: speaker.id }).catch(() => {});
    if (sonosAvailable) {
      hass.callService('sonos', 'unjoin', { entity_id: speaker.id }).catch(fallback);
    } else {
      fallback();
    }
  };

  // Group members for the volume section, ordered with the true Sonos
  // coordinator first (so the HOST badge points at the actual leader,
  // not whichever entity won `playing[0]`).
  const inGroupSpeakers = (() => {
    if (!groupAttr.length) return [primarySonos];
    const out = [];
    for (const memberId of groupAttr) {
      const memberRaw = (state.speakers || []).find(s => s.id === memberId);
      if (!memberRaw) continue;
      const memberName = (memberRaw.name || '').toLowerCase().trim();
      const speaker = sonosSpeakers.find(s => (s.name || '').toLowerCase().trim() === memberName);
      if (speaker && !out.some(o => o.id === speaker.id)) out.push(speaker);
    }
    return out.length ? out : [primarySonos];
  })();

  const setVolume = (id, pct) => {
    setVolOverrides(prev => ({ ...prev, [id]: pct }));
    clearTimeout(volTimersRef.current[id]);
    volTimersRef.current[id] = setTimeout(() => {
      call(id, 'volume_set', { volume_level: pct / 100 });
      setTimeout(() => {
        setVolOverrides(prev => { const n = { ...prev }; delete n[id]; return n; });
      }, 1000);
    }, 150);
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
                Playing in {primary.name}{playingDeduped.length > 1 && <span style={{opacity:.7}}> · +{playingDeduped.length-1} more</span>}
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
              <button onClick={() => call(primary.id, primary.playing ? 'media_pause' : 'media_play')} style={{...ctlBtn(p, 46), background:p.accent, color:'#fff', border:0}}>{primary.playing ? '❚❚' : '▶'}</button>
              <button onClick={() => call(primary.id, 'media_next_track')} style={ctlBtn(p, 36)}>››</button>
              <div style={{flex:1}}/>
              <div style={{display:'flex', alignItems:'center', gap:8, color:p.fg3}}>
                <window.Icon name="speaker" size={12}/>
                <input type="range" min="0" max="100"
                  value={volOverrides[primary.id] ?? Math.round(primary.vol || 0)}
                  onChange={(e) => setVolume(primary.id, +e.target.value)}
                  style={{width:88, accentColor:p.accent, height:3}}/>
              </div>
            </div>
          </div>

          {playingDeduped.length > 1 && (
            <div style={{padding:'10px 14px', borderTop:`.5px solid ${p.border}`, display:'flex', gap:6, overflowX:'auto'}}>
              {playingDeduped.map(sp => {
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

          {inGroupSpeakers.length > 1 && (
            <div style={{padding:'10px 14px 12px', borderTop:`.5px solid ${p.border}`}}>
              <div style={{fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:p.fg3, marginBottom:10}}>
                In group ({inGroupSpeakers.length})
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {inGroupSpeakers.map(sp => {
                  const vol = volOverrides[sp.id] ?? Math.round(sp.vol || 0);
                  const isLeader = sp.id === leaderSonos.id;
                  return (
                    <div key={sp.id} style={{display:'flex', alignItems:'center', gap:10}}>
                      <span style={{
                        flex:'0 0 96px', fontSize:11.5, color:p.fg, fontWeight: isLeader ? 500 : 400,
                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                      }}>{sp.name}{isLeader && <span style={{color:p.accent, marginLeft:4, fontSize:9}}>HOST</span>}</span>
                      <input type="range" min="0" max="100" value={vol}
                        onChange={(e) => setVolume(sp.id, +e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        style={{flex:1, accentColor:p.accent, height:3}}/>
                      <span style={{flex:'0 0 32px', fontSize:10, color:p.fg3, textAlign:'right', fontVariantNumeric:'tabular-nums'}}>{vol}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {groupableSpeakers.length > 0 && (
            <div style={{padding:'10px 14px 14px', borderTop:`.5px solid ${p.border}`}}>
              <div style={{fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:p.fg3, marginBottom:8}}>
                Group with {leaderSonos.name || primary.name}
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                {groupableSpeakers.map(sp => {
                  const joined = isMember(sp);
                  return (
                    <button key={sp.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (joined) leaveSpeaker(sp); else joinSpeaker(sp);
                      }}
                      style={{
                        padding:'6px 12px', borderRadius:999,
                        border:`.5px solid ${joined ? p.accent : p.border2}`,
                        background: joined ? p.accentSoft : 'transparent',
                        color: joined ? p.accent : p.fg2,
                        fontSize:11.5, cursor:'pointer', fontFamily:fonts.body,
                        display:'inline-flex', alignItems:'center', gap:6,
                      }}>
                      <span style={{fontSize:13, lineHeight:1}}>{joined ? '✓' : '+'}</span>
                      <span>{sp.name}</span>
                    </button>
                  );
                })}
              </div>
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
          {playingDeduped.length > 1 && <span> +{playingDeduped.length-1}</span>}
        </div>
        {dur > 0 && (
          <div style={{height:2, background:p.border, borderRadius:1, marginTop:3, overflow:'hidden'}}>
            <div style={{width:`${(tickPos / dur) * 100}%`, height:'100%', background:p.accent, transition:'width .8s linear'}}/>
          </div>
        )}
      </div>
      <div style={{display:'flex', gap:2, flex:'none'}} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => call(primary.id, 'media_previous_track')} style={ctlBtn(p, 28)} title="Previous">‹‹</button>
        <button onClick={() => call(primary.id, primary.playing ? 'media_pause' : 'media_play')} style={{...ctlBtn(p, 32), background:p.accent, color:'#fff', border:0}} title={primary.playing ? 'Pause' : 'Play'}>
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
