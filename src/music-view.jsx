// music-view.jsx — HA-driven music page (Music Assistant aware).

import HassContext from './lib/hass-context.js';

const GROUPING_FEATURE = 524288;
const SEARCH_FEATURE = 4194304;

const MA_PLATFORMS = new Set(['music_assistant', 'mass']);
const SONOS_PLATFORMS = new Set(['sonos']);
const ALLOWED_PLATFORMS = new Set([...MA_PLATFORMS, ...SONOS_PLATFORMS]);
const PLATFORM_PREF = ['music_assistant', 'mass', 'sonos'];

const INFINITY_KEY = 'homecntrd_infinity_v1';

function pushDiag(msg) {
  if (typeof window === 'undefined') return;
  if (!window.__hcDiag) window.__hcDiag = [];
  window.__hcDiag.push({ ts: Date.now(), kind: 'info', message: msg });
  while (window.__hcDiag.length > 50) window.__hcDiag.shift();
}

const MusicView = ({ ctx }) => {
  const { p, fonts, dens, state, narrow } = ctx;
  const hass = React.useContext(HassContext);

  // hassRef pattern — same fix we use for cameras. hass changes on every
  // HA state push (multiple times/sec), but hass.connection is stable.
  // Inner async work reads via the ref so effects don't churn.
  const hassRef = React.useRef(hass);
  React.useEffect(() => { hassRef.current = hass; }, [hass]);
  const conn = hass?.connection;

  // Entity registry → platform map. Used to drop non-Sonos/MA speakers.
  const [platforms, setPlatforms] = React.useState({});
  const [platformsLoaded, setPlatformsLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!hass) return;
    let alive = true;
    const apply = (m) => {
      if (!alive) return;
      setPlatforms(m);
      setPlatformsLoaded(true);
      const summary = (state.speakers || [])
        .map(s => `${s.name}=${m[s.id] || '?'}`).join(', ');
      pushDiag(`music: speaker platforms — ${summary || '(none)'}`);
    };
    if (hass.entities && Object.keys(hass.entities).length) {
      const m = {};
      for (const [id, e] of Object.entries(hass.entities)) m[id] = e?.platform || null;
      apply(m);
      return;
    }
    (async () => {
      try {
        const list = await hass.connection.sendMessagePromise({ type: 'config/entity_registry/list' });
        if (!alive || !Array.isArray(list)) return;
        const m = {};
        for (const e of list) m[e.entity_id] = e.platform || null;
        apply(m);
      } catch (e) {
        pushDiag(`music: entity registry fetch failed — ${e?.message || e}`);
        if (alive) setPlatformsLoaded(true); // proceed without filter rather than hanging forever
      }
    })();
    return () => { alive = false; };
  }, [conn]); // refetch only on reconnect, not on every state push

  // Strict filter: drop everything that isn't a Sonos or MA-managed
  // entity. If MA is present, drop the underlying Sonos natives too —
  // MA mirrors every Sonos speaker as its own entity, and library://
  // URIs only resolve through MA.
  const speakers = React.useMemo(() => {
    if (!state.speakers?.length || !platformsLoaded) return [];
    let pool = state.speakers.filter(s => ALLOWED_PLATFORMS.has(platforms[s.id]));
    // Graceful fallback if registry came back without our entities (rare):
    // accept anything with the GROUPING bit set so Sonos still works.
    if (pool.length === 0) {
      pool = state.speakers.filter(s => (s.supportedFeatures & GROUPING_FEATURE) !== 0);
    }
    const hasMA = pool.some(s => MA_PLATFORMS.has(platforms[s.id]));
    if (hasMA) pool = pool.filter(s => MA_PLATFORMS.has(platforms[s.id]));

    // Final dedupe by friendly name in case MA exposes two entities with
    // the same name (e.g. one stale).
    const groups = new Map();
    for (const s of pool) {
      const key = (s.name || s.id).toLowerCase().trim();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(s);
    }
    const pickBest = (group) => {
      for (const pref of PLATFORM_PREF) {
        const match = group.find(s => platforms[s.id] === pref);
        if (match) return match;
      }
      return group[0];
    };
    return Array.from(groups.values()).map(pickBest);
  }, [state.speakers, platforms, platformsLoaded]);

  if (!platformsLoaded) {
    return (
      <>
        <window.PageHead ctx={ctx} eyebrow="Music" title="Loading…" sub="Reading speaker registry"/>
      </>
    );
  }
  if (!speakers.length) {
    return (
      <>
        <window.PageHead ctx={ctx} eyebrow="Music" title="No speakers yet"
          sub="Add Sonos to HA — Music Assistant will mirror them automatically."/>
      </>
    );
  }

  const [activeId, setActiveId] = React.useState(speakers[0].id);
  React.useEffect(() => {
    if (!speakers.find(s => s.id === activeId)) setActiveId(speakers[0].id);
  }, [speakers, activeId]);

  const active = speakers.find(s => s.id === activeId) || speakers[0];
  const playingCount = speakers.filter(s => s.playing).length;
  const isMA = MA_PLATFORMS.has(platforms[active?.id]);

  // Infinity mode — when on, all play_media calls go through the
  // music_assistant.play_media service with radio_mode: true so MA
  // continues with similar tracks after the queue ends.
  const [infinity, setInfinityRaw] = React.useState(() => {
    try { return localStorage.getItem(INFINITY_KEY) === '1'; } catch { return false; }
  });
  const setInfinity = (v) => {
    setInfinityRaw(v);
    try { localStorage.setItem(INFINITY_KEY, v ? '1' : '0'); } catch {}
  };

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Music"
        title={active?.name || 'Music'}
        sub={`${speakers.length} speaker${speakers.length === 1 ? '' : 's'} · ${playingCount} playing`}
        right={isMA ? (
          <button onClick={() => setInfinity(!infinity)} style={{
            padding:'8px 14px', borderRadius:9,
            border:`.5px solid ${infinity ? p.accent : p.border2}`,
            background: infinity ? p.accentSoft : 'transparent',
            color: infinity ? p.accent : p.fg, fontSize:12, cursor:'pointer',
            fontFamily: fonts.body, display:'inline-flex', alignItems:'center', gap:6,
          }}>
            <span style={{fontSize:14}}>∞</span>
            Infinity {infinity ? 'on' : 'off'}
          </button>
        ) : null}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(280px, 360px)',
        gap: dens.gap, alignItems: 'start', minWidth: 0,
      }}>
        <div style={{display:'flex', flexDirection:'column', gap:dens.gap, minWidth: 0}}>
          <NowPlayingCard ctx={ctx} hassRef={hassRef} speaker={active} />
          <QueueCard ctx={ctx} hassRef={hassRef} conn={conn} speaker={active} />
          <BrowserCard ctx={ctx} hassRef={hassRef} conn={conn}
            speakerId={active?.id} isMA={isMA} infinity={infinity}/>
        </div>

        <SpeakersPanel ctx={ctx} hassRef={hassRef} speakers={speakers}
          activeId={activeId} setActiveId={setActiveId}/>
      </div>
      <div style={{height:60}}/>
    </>
  );
};

// ── Now-playing hero with seek slider ─────────────────────────────────────
const NowPlayingCard = ({ ctx, hassRef, speaker }) => {
  const { p, fonts, narrow } = ctx;
  if (!speaker) return null;

  const title = speaker.haMediaTitle;
  const artist = speaker.haMediaArtist;
  const album = speaker.haMediaAlbum;
  const art = speaker.haEntityPicture;
  const isPlaying = speaker.playing;
  const isIdle = !title;
  const dur = speaker.duration || 0;

  // Local position interpolation. HA only pushes media_position
  // updates every few seconds; we tick locally so the slider moves
  // smoothly. Reset whenever the upstream value changes.
  const [tickPos, setTickPos] = React.useState(speaker.progress || 0);
  const [seeking, setSeeking] = React.useState(false);
  const [seekValue, setSeekValue] = React.useState(0);
  const lastSeenRef = React.useRef({ pos: speaker.progress || 0, at: Date.now(), key: '' });

  React.useEffect(() => {
    const key = `${speaker.id}|${title}|${speaker.progress}`;
    if (key !== lastSeenRef.current.key) {
      lastSeenRef.current = { pos: speaker.progress || 0, at: Date.now(), key };
      if (!seeking) setTickPos(speaker.progress || 0);
    }
  }, [speaker.id, title, speaker.progress, seeking]);

  React.useEffect(() => {
    if (!isPlaying || seeking) return;
    const i = setInterval(() => {
      const dt = (Date.now() - lastSeenRef.current.at) / 1000;
      setTickPos(Math.min(dur || 0, lastSeenRef.current.pos + dt));
    }, 500);
    return () => clearInterval(i);
  }, [isPlaying, seeking, speaker.id, dur]);

  const call = (service, data) => {
    const hass = hassRef.current;
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: speaker.id, ...data }); } catch {}
  };

  const fmtTime = (s) => {
    if (!s || s < 0) return '0:00';
    const m = Math.floor(s / 60); const ss = Math.floor(s % 60);
    return `${m}:${ss.toString().padStart(2, '0')}`;
  };

  const displayPos = seeking ? seekValue : tickPos;

  return (
    <window.Card p={p} style={{padding: 0, overflow: 'hidden', background: p.surface}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : '180px 1fr',
        minHeight: narrow ? 'auto' : 200,
      }}>
        <div style={{
          aspectRatio: narrow ? '16/9' : 'auto',
          width: narrow ? '100%' : 180,
          height: narrow ? 'auto' : '100%',
          minHeight: narrow ? 220 : 200,
          position: 'relative', overflow: 'hidden',
          background: art ? '#0d0b09' : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
        }}>
          {art && (
            <img src={art} alt=""
              style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
          )}
        </div>
        <div style={{padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, gap: 14}}>
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

          {/* Seek slider — only when we know the duration. Drag commits
              on release via media_seek. */}
          {dur > 0 && (
            <div>
              <input type="range" min="0" max={dur} step={1}
                value={Math.min(displayPos, dur)}
                onMouseDown={() => { setSeeking(true); setSeekValue(tickPos); }}
                onTouchStart={() => { setSeeking(true); setSeekValue(tickPos); }}
                onChange={(e) => { setSeeking(true); setSeekValue(+e.target.value); }}
                onMouseUp={(e) => { call('media_seek', { seek_position: +e.target.value }); setSeeking(false); }}
                onTouchEnd={(e) => { call('media_seek', { seek_position: +e.target.value }); setSeeking(false); }}
                style={{width: '100%', accentColor: p.accent, height: 3}}/>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 10, color: p.fg3, marginTop: 4, fontVariantNumeric: 'tabular-nums'}}>
                <span>{fmtTime(displayPos)}</span>
                <span>−{fmtTime(Math.max(0, dur - displayPos))}</span>
              </div>
            </div>
          )}

          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
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

const CtrlBtn = ({ p, fonts, primary, icon, onClick }) => (
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
  </button>
);

// ── Up-next queue ─────────────────────────────────────────────────────────
const QueueCard = ({ ctx, hassRef, conn, speaker }) => {
  const { p, fonts } = ctx;
  const [queue, setQueue] = React.useState(null);
  const [unsupported, setUnsupported] = React.useState(false);
  const titleKey = speaker?.haMediaTitle || '';
  const speakerId = speaker?.id;

  React.useEffect(() => {
    if (!conn || !speakerId) { setQueue(null); return; }
    let alive = true;
    const fetchQueue = async () => {
      try {
        const resp = await conn.sendMessagePromise({
          type: 'call_service', domain: 'sonos', service: 'get_queue',
          service_data: { entity_id: speakerId }, return_response: true,
        });
        if (!alive) return;
        const arr = resp?.response?.[speakerId];
        setQueue(Array.isArray(arr) ? arr : []);
        setUnsupported(false);
      } catch { if (alive) { setQueue([]); setUnsupported(true); } }
    };
    fetchQueue();
    return () => { alive = false; };
  }, [conn, speakerId, titleKey]);

  if (unsupported || !queue || queue.length === 0) return null;
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
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
            borderBottom: i < upcoming.length - 1 ? `.5px solid ${p.border}` : 'none', minWidth: 0}}>
            <div style={{width: 36, height: 36, borderRadius: 5, flex: 'none',
              background: tr.thumbnail ? `center / cover no-repeat url("${tr.thumbnail}"), oklch(20% 0.05 25)` : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`}}/>
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

// ── Browse + Search + Sections ────────────────────────────────────────────
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
const FAVORITES_RE = /favorites?|pinned|starred/i;
const RECENT_RE = /recently\s*added|new\s+releases?/i;

const BrowserCard = ({ ctx, hassRef, conn, speakerId, isMA, infinity }) => {
  const { p, fonts } = ctx;
  const [path, setPath] = React.useState([]);
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [sections, setSections] = React.useState(null);

  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(null);
  const [searchError, setSearchError] = React.useState(null);

  const head = path[path.length - 1] || null;
  const isAtRoot = path.length === 0;
  const inAlbum = head?.contentType === 'album';

  // Browse — depends on connection (stable) not hass (churns).
  React.useEffect(() => {
    if (!conn || !speakerId) { setItems(null); return; }
    let alive = true;
    setItems(null); setError(null); setSections(null);
    (async () => {
      try {
        const msg = { type: 'media_player/browse_media', entity_id: speakerId };
        if (head) {
          msg.media_content_id = head.contentId;
          msg.media_content_type = head.contentType;
        }
        const resp = await conn.sendMessagePromise(msg);
        if (!alive) return;
        setItems((resp?.children || []).filter(isMusicItem));
      } catch (e) { if (alive) setError(e?.message || String(e)); }
    })();
    return () => { alive = false; };
  }, [conn, speakerId, head?.contentId, head?.contentType]);

  // Pre-expand Favorites + Recently Added at root.
  React.useEffect(() => {
    if (!isAtRoot || !items?.length || !conn || !speakerId) { setSections(null); return; }
    let alive = true;
    const fetchInto = async (node) => {
      if (!node?.can_expand) return [];
      try {
        const resp = await conn.sendMessagePromise({
          type: 'media_player/browse_media', entity_id: speakerId,
          media_content_id: node.media_content_id,
          media_content_type: node.media_content_type,
        });
        return (resp?.children || []).filter(isMusicItem).slice(0, 12);
      } catch { return []; }
    };
    const findFirst = (re) => items.find(i => re.test(i.title || ''));
    const favNode = findFirst(FAVORITES_RE);
    const recentNode = findFirst(RECENT_RE);
    Promise.all([fetchInto(favNode), fetchInto(recentNode)]).then(([favs, recent]) => {
      if (!alive) return;
      setSections({
        favorites: { node: favNode, items: favs },
        recent: { node: recentNode, items: recent },
      });
    });
    return () => { alive = false; };
  }, [isAtRoot, items, speakerId, conn]);

  // Debounced search.
  React.useEffect(() => {
    if (!conn || !query.trim() || !speakerId) { setResults(null); setSearchError(null); return; }
    let alive = true;
    setSearchError(null);
    const t = setTimeout(async () => {
      try {
        const resp = await conn.sendMessagePromise({
          type: 'media_player/search_media',
          entity_id: speakerId,
          search_query: query.trim(),
        });
        if (!alive) return;
        setResults((resp?.result || resp?.results || []).filter(isMusicItem));
      } catch (e) {
        if (alive) { setResults([]); setSearchError(e?.message || String(e)); }
      }
    }, 350);
    return () => { alive = false; clearTimeout(t); };
  }, [conn, speakerId, query]);

  // Play helpers. When MA + Infinity is on, prefer music_assistant.play_media
  // so MA can append a radio queue after the chosen item plays out.
  const playMedia = async (item, enqueue) => {
    const hass = hassRef.current;
    if (!hass?.callService) return false;
    if (isMA) {
      try {
        await hass.callService('music_assistant', 'play_media', {
          entity_id: speakerId,
          media_id: item.media_content_id,
          enqueue: enqueue || 'play',
          radio_mode: !!infinity,
        });
        return true;
      } catch {
        // Fall through to media_player.play_media
      }
    }
    try {
      await hass.callService('media_player', 'play_media', {
        entity_id: speakerId,
        media_content_id: item.media_content_id,
        media_content_type: item.media_content_type,
        enqueue: enqueue || 'play',
      });
      return true;
    } catch (e) {
      setError(e?.message || String(e));
      return false;
    }
  };

  const onItemClick = async (item) => {
    if (item.can_expand) {
      if (results !== null) { setQuery(''); setResults(null); }
      setPath(p => [...p, { contentId: item.media_content_id, contentType: item.media_content_type, title: item.title }]);
      return;
    }
    if (!item.can_play) return;
    // In an album view, queue the rest of the album after the clicked
    // track. enqueue: 'play' on the first replaces the queue; 'add' on
    // the rest appends.
    if (inAlbum && items?.length > 1) {
      const idx = items.findIndex(i => i.media_content_id === item.media_content_id);
      if (idx >= 0) {
        const ok = await playMedia(items[idx], 'play');
        if (ok) {
          for (let i = idx + 1; i < items.length; i++) {
            await playMedia(items[i], 'add');
          }
        }
        return;
      }
    }
    await playMedia(item, 'play');
  };

  const drillIntoSection = (node) => {
    if (!node) return;
    if (results !== null) { setQuery(''); setResults(null); }
    setPath([{ contentId: node.media_content_id, contentType: node.media_content_type, title: node.title }]);
  };

  const showingSearch = results !== null;
  const restItems = React.useMemo(() => {
    if (!isAtRoot || !items) return items;
    const skipIds = new Set();
    if (sections?.favorites?.node) skipIds.add(sections.favorites.node.media_content_id);
    if (sections?.recent?.node) skipIds.add(sections.recent.node.media_content_id);
    return items.filter(i => !skipIds.has(i.media_content_id));
  }, [isAtRoot, items, sections]);

  return (
    <window.Card p={p} style={{padding: 0}}>
      <div style={{padding: '12px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 14, color: p.fg3}}>🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, artists, albums…"
          style={{flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent',
            color: p.fg, fontSize: 13, fontFamily: fonts.body, padding: '4px 0'}}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults(null); }}
            style={{padding: '4px 8px', borderRadius: 6, background: 'transparent',
              border: `.5px solid ${p.border2}`, color: p.fg3, cursor: 'pointer', fontFamily: 'inherit', fontSize: 11}}>
            Clear
          </button>
        )}
      </div>

      {!showingSearch && (
        <div style={{padding: '12px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
          <button onClick={() => setPath([])} disabled={!path.length}
            style={{padding: '6px 10px', borderRadius: 6, background: 'transparent',
              border: `.5px solid ${p.border2}`, color: path.length ? p.fg : p.fg3,
              cursor: path.length ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: 11}}>
            Browse
          </button>
          {path.map((node, i) => (
            <React.Fragment key={node.contentId}>
              <span style={{color: p.fg3, fontSize: 11}}>›</span>
              <button onClick={() => setPath(prev => prev.slice(0, i + 1))}
                style={{padding: '6px 10px', borderRadius: 6, background: 'transparent', border: 'none',
                  color: i === path.length - 1 ? p.fg : p.fg2, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 11, fontWeight: i === path.length - 1 ? 500 : 400,
                  overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180, whiteSpace: 'nowrap'}}>
                {node.title}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {showingSearch && results === null && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>Searching…</div>
      )}
      {showingSearch && searchError && results?.length === 0 && (
        <div style={{padding: '14px 18px', fontSize: 12, color: '#e0a89a'}}>
          Search failed: {searchError}.
        </div>
      )}
      {showingSearch && results !== null && results.length === 0 && !searchError && (
        <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>No results for "{query}"</div>
      )}
      {showingSearch && results?.length > 0 && (
        <ItemsGrid items={results} onItemClick={onItemClick} ctx={ctx}/>
      )}

      {!showingSearch && (
        <>
          {error && <div style={{padding: '14px 18px', fontSize: 12, color: '#e0a89a'}}>{error}</div>}
          {items === null && !error && (
            <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>
          )}
          {isAtRoot && sections?.favorites?.items?.length > 0 && (
            <SectionRow ctx={ctx} title="Pinned" subtitle={sections.favorites.node?.title}
              onSeeAll={() => drillIntoSection(sections.favorites.node)}
              items={sections.favorites.items} onItemClick={onItemClick}/>
          )}
          {isAtRoot && sections?.recent?.items?.length > 0 && (
            <SectionRow ctx={ctx} title="Recently added" subtitle={sections.recent.node?.title}
              onSeeAll={() => drillIntoSection(sections.recent.node)}
              items={sections.recent.items} onItemClick={onItemClick}/>
          )}
          {restItems !== null && !restItems.length && !error && (
            <div style={{padding: '24px 18px', fontSize: 12, color: p.fg3, lineHeight: 1.6}}>
              {isAtRoot ? 'Nothing here at the top level. Use search above to find anything from your linked services.' : 'Nothing here.'}
            </div>
          )}
          {restItems?.length > 0 && (
            <div>
              {isAtRoot && (sections?.favorites?.items?.length > 0 || sections?.recent?.items?.length > 0) && (
                <div style={{padding: '12px 18px 0', fontSize: 11, color: p.fg3, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500}}>
                  Browse
                </div>
              )}
              <ItemsGrid items={restItems} onItemClick={onItemClick} ctx={ctx}/>
            </div>
          )}
        </>
      )}
    </window.Card>
  );
};

const SectionRow = ({ ctx, title, subtitle, items, onItemClick, onSeeAll }) => {
  const { p, fonts } = ctx;
  return (
    <div style={{borderBottom: `.5px solid ${p.border}`}}>
      <div style={{padding: '14px 18px 8px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8}}>
        <div>
          <div style={{fontFamily: fonts.display, fontSize: 14, color: p.fg, fontWeight: 500}}>{title}</div>
          {subtitle && subtitle.toLowerCase() !== title.toLowerCase() && (
            <div style={{fontSize: 11, color: p.fg3, marginTop: 1}}>{subtitle}</div>
          )}
        </div>
        {onSeeAll && (
          <button onClick={onSeeAll} style={{
            padding: '4px 10px', borderRadius: 6, background: 'transparent',
            border: `.5px solid ${p.border2}`, color: p.fg2,
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
          }}>See all</button>
        )}
      </div>
      <div style={{
        display: 'grid', gridAutoFlow: 'column',
        gridAutoColumns: '140px', gap: 12, padding: '0 18px 14px',
        overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'thin',
      }}>
        {items.map(item => <ItemTile key={item.media_content_id || item.title} item={item} onClick={() => onItemClick(item)} ctx={ctx}/>)}
      </div>
    </div>
  );
};

const ItemsGrid = ({ items, onItemClick, ctx }) => (
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, padding: '14px 18px'}}>
    {items.map(item => <ItemTile key={item.media_content_id || item.title} item={item} onClick={() => onItemClick(item)} ctx={ctx}/>)}
  </div>
);

const ItemTile = ({ item, onClick, ctx }) => {
  const { p } = ctx;
  return (
    <button onClick={onClick} style={{
      padding: 0, border: 0, background: 'transparent', cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0,
    }}>
      <div style={{aspectRatio: '1', borderRadius: 8, overflow: 'hidden',
        background: `linear-gradient(135deg, ${p.surface2}, ${p.surface})`, position: 'relative'}}>
        {item.thumbnail && (
          <img src={item.thumbnail} alt=""
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
        )}
        {!item.can_expand && item.can_play && (
          <div style={{position: 'absolute', bottom: 6, right: 6, width: 24, height: 24, borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11}}>▶</div>
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
  );
};

// ── Speakers panel ────────────────────────────────────────────────────────
const SpeakersPanel = ({ ctx, hassRef, speakers, activeId, setActiveId }) => {
  const { p, fonts } = ctx;
  const groupable = speakers.filter(s => (s.supportedFeatures & GROUPING_FEATURE) !== 0);

  const call = (entityId, service, data) => {
    const hass = hassRef.current;
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: entityId, ...data }); } catch {}
  };
  const groupAll = () => {
    const hass = hassRef.current;
    if (!groupable.length || !hass?.callService) return;
    const leader = groupable.find(s => s.id === activeId) || groupable[0];
    const followers = groupable.filter(s => s.id !== leader.id).map(s => s.id);
    if (!followers.length) return;
    try { hass.callService('media_player', 'join', { entity_id: leader.id, group_members: followers }); } catch {}
  };
  const ungroupAll = () => {
    const hass = hassRef.current;
    if (!groupable.length || !hass?.callService) return;
    try { hass.callService('media_player', 'unjoin', { entity_id: groupable.map(s => s.id) }); } catch {}
  };
  const pauseAll = () => {
    const hass = hassRef.current;
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
            <div key={sp.id} onClick={() => setActiveId(sp.id)}
              style={{padding: '12px 14px', borderBottom: `.5px solid ${p.border}`, cursor: 'pointer',
                background: isActive ? p.warm : 'transparent',
                borderLeft: isActive ? `2px solid ${p.accent}` : '2px solid transparent'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 36, height: 36, borderRadius: 6, flex: 'none',
                  background: sp.haEntityPicture ? `center / cover no-repeat url("${sp.haEntityPicture}"), oklch(20% 0.05 25)` : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`}}/>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: p.fg, fontWeight: 500}}>
                    {sp.name}
                    {sp.playing && <span style={{width: 6, height: 6, borderRadius: '50%', background: 'oklch(60% 0.14 145)'}}/>}
                  </div>
                  <div style={{fontSize: 11, color: p.fg3, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {sp.playing && title ? `${title}${artist ? ' · ' + artist : ''}` : 'Idle'}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); call(sp.id, 'media_play_pause'); }}
                  style={{width: 28, height: 28, borderRadius: '50%', border: 0,
                    background: sp.playing ? p.accent : p.surface, color: sp.playing ? '#fff' : p.fg2,
                    cursor: 'pointer', display: 'grid', placeItems: 'center', flex: 'none', fontSize: 11}}>
                  {sp.playing ? '❚❚' : '▶'}
                </button>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 8}}>
                <window.Icon name="speaker" size={11} style={{color: p.fg3}}/>
                <input type="range" min="0" max="100" value={sp.vol}
                  onChange={(e) => call(sp.id, 'volume_set', { volume_level: (+e.target.value) / 100 })}
                  onClick={(e) => e.stopPropagation()}
                  style={{flex: 1, accentColor: p.accent, height: 3}}/>
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
  opacity: disabled ? 0.4 : 1, fontFamily: fonts.body,
});

window.MusicView = MusicView;
