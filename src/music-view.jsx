// music-view.jsx — HA-driven music page.
//
// What this can actually do, given HA's `media_player` API:
//   - Show the now-playing track (title, artist, album, art) for each
//     speaker, sourced from media_player attributes.
//   - Volume / play / pause / skip via the standard media_player
//     services.
//   - Group/ungroup speakers for whole-house audio (Sonos & AirPlay).
//   - Browse what HA has libraries for (Sonos's library, Spotify if
//     integrated, local media, radio) via media_player/browse_media,
//     and cast any of it to a chosen speaker via play_media.
//
// What this can't do without extra integrations:
//   - Browse the Apple Music library directly. HA doesn't have an
//     Apple Music integration; the path there is Music Assistant
//     (HACS) which we'd need to wire up separately. Until then, the
//     browser shows whatever Sonos / Spotify / local media exposes.

import HassContext from './lib/hass-context.js';

const MusicView = ({ ctx }) => {
  const { p, fonts, dens, state, narrow } = ctx;
  const hass = React.useContext(HassContext);

  if (!state.speakers || !state.speakers.length) {
    return (
      <>
        <window.PageHead ctx={ctx}
          eyebrow="Music"
          title="No speakers yet"
          sub="Add Sonos, AirPlay, or another media_player integration in HA."
        />
      </>
    );
  }

  const [activeId, setActiveId] = React.useState(state.speakers[0].id);
  const active = state.speakers.find(s => s.id === activeId) || state.speakers[0];
  const playingCount = state.speakers.filter(s => s.playing).length;

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Music"
        title={active?.name || 'Music'}
        sub={`${state.speakers.length} speaker${state.speakers.length === 1 ? '' : 's'} · ${playingCount} playing`}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(280px, 360px)',
        gap: dens.gap,
        alignItems: 'start',
        minWidth: 0,
      }}>
        {/* Main column: Now playing + browser */}
        <div style={{display:'flex', flexDirection:'column', gap:dens.gap, minWidth: 0}}>
          <NowPlayingCard ctx={ctx} hass={hass} speaker={active} />
          <BrowserCard ctx={ctx} hass={hass} speakerId={active?.id} />
        </div>

        {/* Right column: Speakers panel */}
        <SpeakersPanel
          ctx={ctx} hass={hass}
          speakers={state.speakers}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>
      <div style={{height:60}}/>
    </>
  );
};

// ── Now-playing hero ──────────────────────────────────────────────────────
const NowPlayingCard = ({ ctx, hass, speaker }) => {
  const { p, fonts, narrow } = ctx;
  if (!speaker) return null;

  const title = speaker.haMediaTitle;
  const artist = speaker.haMediaArtist;
  const album = speaker.haMediaAlbum;
  const art = speaker.haEntityPicture;
  const isPlaying = speaker.playing;
  const isIdle = !title;

  const call = (service, data) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: speaker.id, ...data }); }
    catch {}
  };

  return (
    <window.Card p={p} style={{padding: 0, overflow: 'hidden', background: p.surface}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : '180px 1fr',
        gap: 0,
        minHeight: narrow ? 'auto' : 200,
      }}>
        {/* Album art (or placeholder gradient when idle / no art) */}
        <div style={{
          aspectRatio: narrow ? '16/9' : 'auto',
          width: narrow ? '100%' : 180,
          height: narrow ? 'auto' : '100%',
          minHeight: narrow ? 220 : 200,
          position: 'relative',
          overflow: 'hidden',
          background: art ? '#0d0b09' : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
        }}>
          {art && (
            <img
              src={art}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
              }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
        </div>

        <div style={{padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0}}>
          <div style={{minWidth: 0}}>
            <div style={{fontSize: 11, color: p.fg3, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6}}>
              {isIdle ? 'Idle' : isPlaying ? 'Playing' : 'Paused'} · {speaker.name}
            </div>
            <div style={{fontFamily: fonts.display, fontSize: narrow ? 22 : 26, color: p.fg, fontWeight: 500, lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {title || 'Nothing playing'}
            </div>
            {(artist || album) && (
              <div style={{fontSize: 13, color: p.fg2, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {artist}{artist && album ? ' · ' : ''}{album}
              </div>
            )}
          </div>

          <div style={{display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap'}}>
            <CtrlBtn p={p} fonts={fonts} onClick={() => call('media_previous_track')} icon="‹‹"/>
            <CtrlBtn p={p} fonts={fonts} primary onClick={() => call('media_play_pause')} icon={isPlaying ? '❚❚' : '▶'}/>
            <CtrlBtn p={p} fonts={fonts} onClick={() => call('media_next_track')} icon="››"/>
            {isPlaying && <CtrlBtn p={p} fonts={fonts} onClick={() => call('media_stop')} icon="◼"/>}
          </div>
        </div>
      </div>
    </window.Card>
  );
};

const CtrlBtn = ({ p, fonts, primary, icon, onClick, label }) => (
  <button onClick={onClick} style={{
    minWidth: primary ? 56 : 44, height: 44, padding: '0 14px',
    borderRadius: 10,
    background: primary ? p.accent : p.surface2,
    color: primary ? '#fff' : p.fg,
    border: `.5px solid ${primary ? p.accent : p.border2}`,
    cursor: 'pointer', fontFamily: fonts.body,
    fontSize: 16, fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  }}>
    <span style={{fontSize: 14}}>{icon}</span>
    {label && <span style={{fontSize: 12}}>{label}</span>}
  </button>
);

// ── HA Media Browser ──────────────────────────────────────────────────────
//
// Asks HA what playable content the active speaker can browse — Sonos
// exposes its libraries + favorites here, Spotify the user's playlists,
// local media the file tree, etc. Each click drills further; clicking a
// playable leaf casts to the speaker via play_media.
const BrowserCard = ({ ctx, hass, speakerId }) => {
  const { p, fonts } = ctx;
  // path is a stack of { contentId, contentType, title } nodes the user
  // has drilled into. Empty = root browse on the speaker.
  const [path, setPath] = React.useState([]);
  const [items, setItems] = React.useState(null); // null = loading
  const [error, setError] = React.useState(null);

  const head = path[path.length - 1] || null;

  React.useEffect(() => {
    if (!hass?.connection || !speakerId) { setItems(null); return; }
    let alive = true;
    setItems(null); setError(null);
    const browse = async () => {
      try {
        const msg = {
          type: 'media_player/browse_media',
          entity_id: speakerId,
        };
        if (head) {
          msg.media_content_id = head.contentId;
          msg.media_content_type = head.contentType;
        }
        const resp = await hass.connection.sendMessagePromise(msg);
        if (alive) setItems(resp?.children || []);
      } catch (e) {
        if (alive) setError(e?.message || String(e));
      }
    };
    browse();
    return () => { alive = false; };
  }, [hass, speakerId, head?.contentId, head?.contentType]);

  const onItemClick = async (item) => {
    if (item.can_expand) {
      setPath(p => [...p, { contentId: item.media_content_id, contentType: item.media_content_type, title: item.title }]);
      return;
    }
    if (item.can_play && hass?.callService) {
      try {
        await hass.callService('media_player', 'play_media', {
          entity_id: speakerId,
          media_content_id: item.media_content_id,
          media_content_type: item.media_content_type,
        });
      } catch (e) {
        setError(e?.message || String(e));
      }
    }
  };

  return (
    <window.Card p={p} style={{padding: 0}}>
      <div style={{padding: '14px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8}}>
        <button
          onClick={() => setPath([])}
          disabled={!path.length}
          style={{
            padding: '6px 10px', borderRadius: 6,
            background: 'transparent', border: `.5px solid ${p.border2}`,
            color: path.length ? p.fg : p.fg3,
            cursor: path.length ? 'pointer' : 'default',
            fontFamily: 'inherit', fontSize: 11,
          }}
        >Browse</button>
        {path.map((node, i) => (
          <React.Fragment key={node.contentId}>
            <span style={{color: p.fg3, fontSize: 11}}>›</span>
            <button
              onClick={() => setPath(prev => prev.slice(0, i + 1))}
              style={{
                padding: '6px 10px', borderRadius: 6,
                background: 'transparent', border: 'none',
                color: i === path.length - 1 ? p.fg : p.fg2,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
                fontWeight: i === path.length - 1 ? 500 : 400,
                overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180, whiteSpace: 'nowrap',
              }}
            >{node.title}</button>
          </React.Fragment>
        ))}
      </div>

      {error && (
        <div style={{padding: '14px 18px', fontSize: 12, color: '#e0a89a'}}>{error}</div>
      )}
      {items === null && !error && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>
      )}
      {items !== null && !items.length && !error && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, lineHeight: 1.5}}>
          Nothing here yet. Add Apple Music to your Sonos sources in the Sonos app, link Spotify in HA, or drop files into <code style={{color: p.fg2}}>/config/media</code> to browse them here.
        </div>
      )}
      {items?.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          padding: '14px 18px',
        }}>
          {items.map((item) => (
            <button
              key={item.media_content_id || item.title}
              onClick={() => onItemClick(item)}
              style={{
                padding: 0, border: 0, background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 6,
                minWidth: 0,
              }}
            >
              <div style={{
                aspectRatio: '1', borderRadius: 8, overflow: 'hidden',
                background: `linear-gradient(135deg, ${p.surface2}, ${p.surface})`,
                position: 'relative',
              }}>
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt=""
                    style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                {!item.can_expand && item.can_play && (
                  <div style={{
                    position: 'absolute', bottom: 6, right: 6,
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.65)', color: '#fff',
                    display: 'grid', placeItems: 'center', fontSize: 11,
                  }}>▶</div>
                )}
              </div>
              <div style={{fontSize: 12, color: p.fg, fontWeight: 500, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {item.title}
              </div>
              {item.media_class && (
                <div style={{fontSize: 10, color: p.fg3, letterSpacing: '.04em', textTransform: 'capitalize'}}>
                  {item.media_class}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </window.Card>
  );
};

// ── Speakers panel ────────────────────────────────────────────────────────
const SpeakersPanel = ({ ctx, hass, speakers, activeId, setActiveId }) => {
  const { p, fonts } = ctx;

  const call = (entityId, service, data) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: entityId, ...data }); }
    catch {}
  };

  const groupAll = () => {
    if (!speakers.length || !hass?.callService) return;
    // The active speaker becomes the group leader; everyone else joins.
    const leader = activeId;
    const followers = speakers.filter(s => s.id !== leader).map(s => s.id);
    if (!followers.length) return;
    try {
      hass.callService('media_player', 'join', {
        entity_id: leader,
        group_members: followers,
      });
    } catch {}
  };

  const ungroupAll = () => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', 'unjoin', { entity_id: speakers.map(s => s.id) }); } catch {}
  };

  const pauseAll = () => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', 'media_pause', { entity_id: speakers.filter(s => s.playing).map(s => s.id) }); } catch {}
  };

  return (
    <window.Card p={p} style={{padding: 0, overflow: 'hidden'}}>
      <div style={{padding: '14px 16px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8}}>
        <div style={{flex: 1, fontFamily: fonts.display, fontSize: 15, color: p.fg, fontWeight: 500}}>Playing on</div>
        <div style={{fontSize: 11, color: p.fg3}}>{speakers.filter(s => s.playing).length} of {speakers.length}</div>
      </div>

      <div style={{maxHeight: 540, overflowY: 'auto'}}>
        {speakers.map(sp => {
          const isActive = sp.id === activeId;
          const title = sp.haMediaTitle;
          const artist = sp.haMediaArtist;
          return (
            <div
              key={sp.id}
              onClick={() => setActiveId(sp.id)}
              style={{
                padding: '12px 14px', borderBottom: `.5px solid ${p.border}`,
                cursor: 'pointer',
                background: isActive ? p.warm : 'transparent',
                borderLeft: isActive ? `2px solid ${p.accent}` : '2px solid transparent',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{
                  width: 36, height: 36, borderRadius: 6, flex: 'none',
                  background: sp.haEntityPicture
                    ? `center / cover no-repeat url("${sp.haEntityPicture}"), oklch(20% 0.05 25)`
                    : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`,
                }}/>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: p.fg, fontWeight: 500}}>
                    {sp.name}
                    {sp.playing && <span style={{width: 6, height: 6, borderRadius: '50%', background: 'oklch(60% 0.14 145)'}}/>}
                  </div>
                  <div style={{fontSize: 11, color: p.fg3, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {sp.playing && title ? `${title}${artist ? ' · ' + artist : ''}` : 'Idle'}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); call(sp.id, 'media_play_pause'); }}
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: 0, background: sp.playing ? p.accent : p.surface,
                    color: sp.playing ? '#fff' : p.fg2, cursor: 'pointer',
                    display: 'grid', placeItems: 'center', flex: 'none', fontSize: 11,
                  }}
                >{sp.playing ? '❚❚' : '▶'}</button>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 8}}>
                <window.Icon name="speaker" size={11} style={{color: p.fg3}}/>
                <input
                  type="range" min="0" max="100" value={sp.vol}
                  onChange={(e) => call(sp.id, 'volume_set', { volume_level: (+e.target.value) / 100 })}
                  onClick={(e) => e.stopPropagation()}
                  style={{flex: 1, accentColor: p.accent, height: 3}}
                />
                <span style={{fontSize: 10, color: p.fg3, fontVariantNumeric: 'tabular-nums', width: 22, textAlign: 'right'}}>{sp.vol}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{padding: '12px 14px', borderTop: `.5px solid ${p.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}>
        <button onClick={pauseAll} style={smallActionBtn(p, fonts)}>Pause all</button>
        <button onClick={groupAll} style={smallActionBtn(p, fonts, true)}>Group all</button>
        <button onClick={ungroupAll} style={{...smallActionBtn(p, fonts), gridColumn: '1 / -1'}}>Ungroup</button>
      </div>
    </window.Card>
  );
};

const smallActionBtn = (p, fonts, primary) => ({
  padding: '7px 10px', borderRadius: 7,
  border: `.5px solid ${primary ? p.accent : p.border2}`,
  background: primary ? p.accentSoft : 'transparent',
  color: primary ? p.accent : p.fg, fontSize: 11, cursor: 'pointer',
  fontFamily: fonts.body,
});

window.MusicView = MusicView;
