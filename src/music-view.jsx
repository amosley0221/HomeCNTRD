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
//   - Show the upcoming queue for Sonos speakers (sonos.get_queue).
//
// What this can't do without extra integrations:
//   - Browse the Apple Music library directly. HA doesn't have an
//     Apple Music integration; the path there is Music Assistant
//     (HACS) which we'd need to wire up separately. Until then, the
//     browser shows whatever Sonos / Spotify / local media exposes.

import HassContext from './lib/hass-context.js';

// MediaPlayerEntityFeature.GROUPING bit. Only speakers that advertise
// this feature can be part of a join/unjoin call — Tesla, AppleTV,
// Chromecast, etc. don't. Everything else still gets play/pause and
// volume.
const GROUPING_FEATURE = 524288;

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
        {/* Main column: Now playing + queue + browser */}
        <div style={{display:'flex', flexDirection:'column', gap:dens.gap, minWidth: 0}}>
          <NowPlayingCard ctx={ctx} hass={hass} speaker={active} />
          <QueueCard ctx={ctx} hass={hass} speaker={active} />
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

// ── Up-next queue ─────────────────────────────────────────────────────────
//
// Sonos exposes a `sonos.get_queue` service with response support. We
// poll it whenever the speaker's current track changes (cheap — single
// WS call) and show the next ~5 tracks. Non-Sonos speakers don't have
// this service, so we silently hide the card for them.
const QueueCard = ({ ctx, hass, speaker }) => {
  const { p, fonts } = ctx;
  const [queue, setQueue] = React.useState(null);
  const [unsupported, setUnsupported] = React.useState(false);

  const titleKey = speaker?.haMediaTitle || '';
  const speakerId = speaker?.id;

  React.useEffect(() => {
    if (!hass?.connection || !speakerId) { setQueue(null); return; }
    let alive = true;
    const fetchQueue = async () => {
      try {
        const resp = await hass.connection.sendMessagePromise({
          type: 'call_service',
          domain: 'sonos',
          service: 'get_queue',
          service_data: { entity_id: speakerId },
          return_response: true,
        });
        if (!alive) return;
        const arr = resp?.response?.[speakerId];
        setQueue(Array.isArray(arr) ? arr : []);
        setUnsupported(false);
      } catch (e) {
        if (alive) { setQueue([]); setUnsupported(true); }
      }
    };
    fetchQueue();
    return () => { alive = false; };
  }, [hass, speakerId, titleKey]);

  if (unsupported || !queue || queue.length === 0) return null;

  // Find the currently-playing track to skip past it in the list.
  const currentTitle = (speaker.haMediaTitle || '').toLowerCase();
  const currentIdx = queue.findIndex(q => (q.title || '').toLowerCase() === currentTitle);
  const upcoming = (currentIdx >= 0 ? queue.slice(currentIdx + 1) : queue).slice(0, 5);
  if (!upcoming.length) return null;

  return (
    <window.Card p={p} style={{padding: 0}}>
      <div style={{padding: '12px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{fontFamily: fonts.display, fontSize: 14, color: p.fg, fontWeight: 500}}>Up next</div>
        <div style={{fontSize: 11, color: p.fg3}}>{upcoming.length} track{upcoming.length === 1 ? '' : 's'}</div>
      </div>
      <div>
        {upcoming.map((tr, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 18px',
            borderBottom: i < upcoming.length - 1 ? `.5px solid ${p.border}` : 'none',
            minWidth: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 5, flex: 'none',
              background: tr.thumbnail
                ? `center / cover no-repeat url("${tr.thumbnail}"), oklch(20% 0.05 25)`
                : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`,
            }}/>
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontSize: 13, color: p.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{tr.title || 'Untitled'}</div>
              <div style={{fontSize: 11, color: p.fg3, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {[tr.artist, tr.album].filter(Boolean).join(' · ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </window.Card>
  );
};

// ── HA Media Browser ──────────────────────────────────────────────────────
//
// Filters out non-music sources (TTS, Camera, Image, AI generated images,
// Nest snapshots, etc.) so the browser only surfaces content the user
// can actually cast to a speaker.
const REJECT_CLASSES = new Set(['image', 'video', 'game', 'movie']);
const ROOT_REJECT_RE = /^(image|camera|text-to-speech|tts|ai\s+generated|image\s+upload|nest)/i;
function isMusicItem(item) {
  if (!item) return false;
  const cls = (item.media_class || '').toLowerCase();
  if (REJECT_CLASSES.has(cls)) return false;
  const title = (item.title || '').toLowerCase();
  const cid = (item.media_content_id || '').toLowerCase();
  if (ROOT_REJECT_RE.test(title)) return false;
  if (/^media-source:\/\/(image|camera|tts|nest)/i.test(cid)) return false;
  return true;
}

const BrowserCard = ({ ctx, hass, speakerId }) => {
  const { p, fonts } = ctx;
  const [path, setPath] = React.useState([]);
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Search query + debounced results. When non-empty, search results
  // replace the browse grid. media_player/search_media is the standard
  // HA 2024.10+ command that delegates to whatever provider backs the
  // speaker — Music Assistant for MA-managed players, returning hits
  // from the full Apple Music / Spotify / etc. catalog.
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(null);
  const [searchError, setSearchError] = React.useState(null);

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
        if (!alive) return;
        const filtered = (resp?.children || []).filter(isMusicItem);
        setItems(filtered);
      } catch (e) {
        if (alive) setError(e?.message || String(e));
      }
    };
    browse();
    return () => { alive = false; };
  }, [hass, speakerId, head?.contentId, head?.contentType]);

  // Debounced full-catalog search via media_player/search_media. Empty
  // query clears the result panel and falls back to browse.
  React.useEffect(() => {
    if (!hass?.connection || !speakerId || !query.trim()) {
      setResults(null);
      setSearchError(null);
      return;
    }
    let alive = true;
    setSearchError(null);
    const t = setTimeout(async () => {
      try {
        const resp = await hass.connection.sendMessagePromise({
          type: 'media_player/search_media',
          entity_id: speakerId,
          search_query: query.trim(),
        });
        if (!alive) return;
        const arr = (resp?.result || resp?.results || []).filter(isMusicItem);
        setResults(arr);
      } catch (e) {
        if (alive) {
          setResults([]);
          setSearchError(e?.message || String(e));
        }
      }
    }, 350);
    return () => { alive = false; clearTimeout(t); };
  }, [hass, speakerId, query]);

  const onItemClick = async (item) => {
    if (item.can_expand) {
      // From search results, drilling in flips us into browse mode at
      // the chosen node so the breadcrumb makes sense.
      if (results !== null) { setQuery(''); setResults(null); }
      setPath(p => [...p, { contentId: item.media_content_id, contentType: item.media_content_type, title: item.title }]);
      return;
    }
    if (item.can_play && hass?.callService) {
      try {
        await hass.callService('media_player', 'play_media', {
          entity_id: speakerId,
          media_content_id: item.media_content_id,
          media_content_type: item.media_content_type,
          enqueue: 'play',
        });
      } catch (e) {
        setError(e?.message || String(e));
      }
    }
  };

  const showingSearch = results !== null;
  const visible = showingSearch ? results : items;

  return (
    <window.Card p={p} style={{padding: 0}}>
      {/* Search bar — sits above the breadcrumb and takes precedence
          over the browse view whenever it has text. */}
      <div style={{padding: '12px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 14, color: p.fg3}}>🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, artists, albums…"
          style={{
            flex: 1, minWidth: 0,
            border: 0, outline: 'none', background: 'transparent',
            color: p.fg, fontSize: 13, fontFamily: fonts.body, padding: '4px 0',
          }}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults(null); }}
            style={{
              padding: '4px 8px', borderRadius: 6,
              background: 'transparent', border: `.5px solid ${p.border2}`,
              color: p.fg3, cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
            }}
          >Clear</button>
        )}
      </div>

      {/* Browse breadcrumb row — hidden while searching to keep the
          panel focused on results. */}
      {!showingSearch && (
        <div style={{padding: '12px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
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
      )}

      {/* Loading / error / empty states */}
      {showingSearch && results === null && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>Searching…</div>
      )}
      {showingSearch && searchError && results?.length === 0 && (
        <div style={{padding: '14px 18px', fontSize: 12, color: '#e0a89a'}}>
          Search failed: {searchError}. Make sure Music Assistant is set up — non-MA speakers don't expose a search API.
        </div>
      )}
      {showingSearch && results !== null && results.length === 0 && !searchError && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>No results for "{query}"</div>
      )}
      {!showingSearch && error && (
        <div style={{padding: '14px 18px', fontSize: 12, color: '#e0a89a'}}>{error}</div>
      )}
      {!showingSearch && items === null && !error && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>
      )}
      {!showingSearch && items !== null && !items.length && !error && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, lineHeight: 1.6}}>
          {path.length === 0 ? (
            <>
              <div style={{color: p.fg2, marginBottom: 6}}>Nothing music-related at the top level yet.</div>
              <div>Open <strong style={{color: p.fg}}>Music Assistant</strong> from the sidebar and add Apple Music / Spotify / Tidal — they'll appear here once linked. You can also <strong style={{color: p.fg}}>search</strong> the full catalog using the box above.</div>
            </>
          ) : 'Nothing here.'}
        </div>
      )}

      {visible?.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          padding: '14px 18px',
        }}>
          {visible.map((item) => (
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
  // Only Sonos / AirPlay / etc. speakers that advertise the GROUPING
  // feature can be join/unjoin'd. Filter once so the top-row buttons
  // never try to join non-groupable entities — that's what was raising
  // the "does not support action media_player.unjoin" toast.
  const groupable = speakers.filter(s => (s.supportedFeatures & GROUPING_FEATURE) !== 0);

  const call = (entityId, service, data) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: entityId, ...data }); }
    catch {}
  };

  const groupAll = () => {
    if (!groupable.length || !hass?.callService) return;
    const leaderEntity = groupable.find(s => s.id === activeId) || groupable[0];
    const followers = groupable.filter(s => s.id !== leaderEntity.id).map(s => s.id);
    if (!followers.length) return;
    try {
      hass.callService('media_player', 'join', {
        entity_id: leaderEntity.id,
        group_members: followers,
      });
    } catch {}
  };

  const ungroupAll = () => {
    if (!groupable.length || !hass?.callService) return;
    try { hass.callService('media_player', 'unjoin', { entity_id: groupable.map(s => s.id) }); } catch {}
  };

  const pauseAll = () => {
    const playing = speakers.filter(s => s.playing).map(s => s.id);
    if (!playing.length || !hass?.callService) return;
    try { hass.callService('media_player', 'media_pause', { entity_id: playing }); } catch {}
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
        <button onClick={groupAll} disabled={groupable.length < 2}
          style={smallActionBtn(p, fonts, true, groupable.length < 2)}>Group all</button>
        <button onClick={ungroupAll} disabled={!groupable.length}
          style={{...smallActionBtn(p, fonts, false, !groupable.length), gridColumn: '1 / -1'}}>Ungroup</button>
      </div>
    </window.Card>
  );
};

const smallActionBtn = (p, fonts, primary, disabled) => ({
  padding: '7px 10px', borderRadius: 7,
  border: `.5px solid ${primary ? p.accent : p.border2}`,
  background: primary ? p.accentSoft : 'transparent',
  color: primary ? p.accent : p.fg, fontSize: 11,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.4 : 1,
  fontFamily: fonts.body,
});

window.MusicView = MusicView;
