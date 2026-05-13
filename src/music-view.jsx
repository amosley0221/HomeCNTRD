// music-view.jsx — HA-driven music page (Music Assistant aware).
//
// Layout matches the reference design:
//   - Center column: tall NowPlayingHero with art-tinted background +
//     queue (Up next) below.
//   - Right column: compact RoomChooser (one-tap speaker switcher
//     with popup), Group-all / Pause-all controls, then a customizable
//     Playlists grid pinned from MA's Playlists / Favorites trees.
//   - Search and full-tree browse are accessible from the player
//     header; results overlay the page.

import HassContext from './lib/hass-context.js';

const GROUPING_FEATURE = 524288;
const SEARCH_FEATURE = 4194304;

const MA_PLATFORMS = new Set(['music_assistant', 'mass']);
const SONOS_PLATFORMS = new Set(['sonos']);
const PLATFORM_PREF = ['music_assistant', 'mass', 'sonos'];

const INFINITY_KEY = 'homecntrd_infinity_v1';
const HIDDEN_KEY = 'homecntrd_music_hidden_v1';
const PINNED_PLAYLISTS_KEY = 'homecntrd_pinned_playlists_v1';
const HIDDEN_PLAYLISTS_KEY = 'homecntrd_hidden_playlists_v1';

const FAVORITES_RE = /favorites?|pinned|starred/i;
const PLAYLISTS_RE = /^playlists?$|my\s+playlists/i;

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

function loadStringSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); }
}
function saveStringSet(key, set) {
  try { localStorage.setItem(key, JSON.stringify([...set])); } catch {}
}

function pushDiag(msg) {
  if (typeof window === 'undefined') return;
  if (!window.__hcDiag) window.__hcDiag = [];
  window.__hcDiag.push({ ts: Date.now(), kind: 'info', message: msg });
  while (window.__hcDiag.length > 50) window.__hcDiag.shift();
}

const MusicView = ({ ctx }) => {
  const { p, fonts, dens, state, narrow } = ctx;
  const hass = React.useContext(HassContext);
  const hassRef = React.useRef(hass);
  React.useEffect(() => { hassRef.current = hass; }, [hass]);
  const conn = hass?.connection;

  // ── Entity registry / platform map ──────────────────────────────────
  const [platforms, setPlatforms] = React.useState({});
  const [platformsLoaded, setPlatformsLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!hass) return;
    let alive = true;
    const apply = (m) => {
      if (!alive) return;
      setPlatforms(m);
      setPlatformsLoaded(true);
      const summary = (state.speakers || []).map(s => {
        const tags = [];
        if (s.isSonosAttr) tags.push('sonos_attr');
        if (s.isMAAttr) tags.push('ma_attr');
        if ((s.supportedFeatures & GROUPING_FEATURE) !== 0) tags.push('group');
        return `${s.name}[${s.id}]=${m[s.id] || '?'}${tags.length ? '(' + tags.join('+') + ')' : ''}`;
      }).join(' | ');
      pushDiag(`music: speakers — ${summary || '(none)'}`);
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
        if (alive) setPlatformsLoaded(true);
      }
    })();
    return () => { alive = false; };
  }, [conn]);

  // ── Speaker filter (auto + manual hide list) ────────────────────────
  const [hidden, setHiddenRaw] = React.useState(() => loadStringSet(HIDDEN_KEY));
  const setHidden = React.useCallback((updater) => {
    setHiddenRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveStringSet(HIDDEN_KEY, next);
      return next;
    });
  }, []);

  const { visible: speakers, autoVisible } = React.useMemo(() => {
    const empty = { visible: [], autoVisible: [] };
    if (!state.speakers?.length || !platformsLoaded) return empty;
    const looksSonos = (s) => SONOS_PLATFORMS.has(platforms[s.id]) || s.isSonosAttr;
    const looksMA = (s) => MA_PLATFORMS.has(platforms[s.id]) || s.isMAAttr;
    let pool = state.speakers.filter(s => looksSonos(s) || looksMA(s));
    if (pool.length === 0) {
      pool = state.speakers.filter(s => (s.supportedFeatures & GROUPING_FEATURE) !== 0);
    }
    const hasMA = pool.some(looksMA);
    if (hasMA) pool = pool.filter(looksMA);
    const groups = new Map();
    for (const s of pool) {
      const key = (s.name || s.id).toLowerCase().trim();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(s);
    }
    const pickBest = (group) => {
      for (const pref of PLATFORM_PREF) {
        const m = group.find(s => platforms[s.id] === pref);
        if (m) return m;
      }
      const ma = group.find(s => s.isMAAttr); if (ma) return ma;
      const sonos = group.find(s => s.isSonosAttr); if (sonos) return sonos;
      return group[0];
    };
    const auto = Array.from(groups.values()).map(pickBest);
    return { autoVisible: auto, visible: auto.filter(s => !hidden.has(s.id)) };
  }, [state.speakers, platforms, platformsLoaded, hidden]);

  // ── Active speaker, infinity, manage panel ─────────────────────────
  const { settings, setSetting } = ctx;
  const savedDefaultId = settings?.defaultMusicSpeaker;
  const [activeId, setActiveId] = React.useState(null);
  // Track when the user explicitly tapped to switch speakers, so the
  // auto-track-playing logic below doesn't yank them off an idle
  // speaker they just selected (e.g., to start playback there).
  const lastUserSwitchRef = React.useRef(0);
  const userSwitchSpeaker = React.useCallback((id) => {
    lastUserSwitchRef.current = Date.now();
    setActiveId(id);
    // Persist as the default so next visit lands on this speaker
    // again unless something else is already playing.
    if (typeof setSetting === 'function') setSetting('defaultMusicSpeaker', id);
  }, [setSetting]);
  React.useEffect(() => {
    if (!speakers.length) return;
    const current = speakers.find(s => s.id === activeId);
    // No active or stale — pick a playing speaker if one exists, else
    // the user's saved default, else the first in the list.
    if (!current) {
      const firstPlaying = speakers.find(s => s.playing);
      const savedDefault = savedDefaultId
        ? speakers.find(s => s.id === savedDefaultId)
        : null;
      setActiveId((firstPlaying || savedDefault || speakers[0]).id);
      return;
    }
    // Active is idle and someone else is playing — follow the music
    // unless the user just hand-picked this speaker (within 30 s).
    if (!current.playing) {
      const recent = (Date.now() - lastUserSwitchRef.current) < 30000;
      if (recent) return;
      const firstPlaying = speakers.find(s => s.playing);
      if (firstPlaying && firstPlaying.id !== activeId) setActiveId(firstPlaying.id);
    }
  }, [speakers, activeId, savedDefaultId]);
  const [infinity, setInfinityRaw] = React.useState(() => {
    try { return localStorage.getItem(INFINITY_KEY) === '1'; } catch { return false; }
  });
  const setInfinity = (v) => {
    setInfinityRaw(v);
    try { localStorage.setItem(INFINITY_KEY, v ? '1' : '0'); } catch {}
  };
  const [manageOpen, setManageOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [browseOpen, setBrowseOpen] = React.useState(false);
  // When a tile elsewhere on the page (e.g. a playlist in PlaylistsCard)
  // wants the user to land inside the browse tree at a specific node,
  // it stashes that node here and opens the overlay. Cleared on close.
  const [overlayInitialPath, setOverlayInitialPath] = React.useState([]);

  // If any hidden speaker is currently a member of someone else's
  // group, unjoin it. This catches the case where the user previously
  // grouped the speaker (before hiding it), then hid it — Sonos keeps
  // the speaker in the group, and music keeps spilling out of it
  // until somebody manually unjoins. Runs whenever hidden or speaker
  // list changes so it self-heals.
  React.useEffect(() => {
    if (!hass?.callService || !state.speakers) return;
    for (const id of hidden) {
      const sp = state.speakers.find(s => s.id === id);
      if (!sp) continue;
      const inGroup = (sp.groupMembers || []).length > 1;
      if (!inGroup) continue;
      try { hass.callService('media_player', 'unjoin', { entity_id: sp.id }); } catch {}
    }
  }, [hidden, state.speakers, hass]);

  // ── Loading / empty states ─────────────────────────────────────────
  if (!platformsLoaded) {
    return <window.PageHead ctx={ctx} eyebrow="Music" title="Loading…" sub="Reading speaker registry"/>;
  }
  if (!speakers.length) {
    return <window.PageHead ctx={ctx} eyebrow="Music" title="No speakers yet"
      sub="Add Sonos to HA — Music Assistant will mirror them automatically."/>;
  }

  const active = speakers.find(s => s.id === activeId) || speakers[0];
  const playingCount = speakers.filter(s => s.playing).length;
  const isMA = MA_PLATFORMS.has(platforms[active?.id]) || active?.isMAAttr;

  // Shared play helper — used by playlists, search, browse.
  const playMedia = async (item, enqueue = 'play') => {
    const hass = hassRef.current;
    if (!hass?.callService || !active) return false;
    if (isMA) {
      try {
        await hass.callService('music_assistant', 'play_media', {
          entity_id: active.id,
          media_id: item.media_content_id,
          enqueue, radio_mode: !!infinity,
        });
        return true;
      } catch {}
    }
    try {
      await hass.callService('media_player', 'play_media', {
        entity_id: active.id,
        media_content_id: item.media_content_id,
        media_content_type: item.media_content_type,
        enqueue,
      });
      return true;
    } catch { return false; }
  };

  // Play a chosen track from a list (album / playlist) and queue the
  // remainder in order. Used by AlbumDetailView so that picking track
  // 4 plays it immediately and enqueues 5..N as Up Next, instead of
  // playing only the one track.
  const playFromList = async (items, idx) => {
    if (!items?.length || idx < 0 || idx >= items.length) return;
    await playMedia(items[idx], 'play');
    for (let i = idx + 1; i < items.length; i++) {
      await playMedia(items[i], 'add');
    }
  };

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Music"
        title={active?.name || 'Music'}
        sub={`${speakers.length} speaker${speakers.length === 1 ? '' : 's'} · ${playingCount} playing`}
        right={
          <div style={{display:'flex', gap:8}}>
            <button onClick={() => setSearchOpen(true)} style={iconBtn(p)} title="Search">🔍</button>
            <button onClick={() => setBrowseOpen(true)} style={iconBtn(p)} title="Browse">≣</button>
            {isMA && (
              <button onClick={() => setInfinity(!infinity)} style={{
                padding:'8px 14px', borderRadius:9,
                border:`.5px solid ${infinity ? p.accent : p.border2}`,
                background: infinity ? p.accentSoft : 'transparent',
                color: infinity ? p.accent : p.fg, fontSize:12, cursor:'pointer',
                fontFamily: fonts.body,
              }}>∞ Infinity {infinity ? 'on' : 'off'}</button>
            )}
          </div>
        }
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(300px, 380px)',
        gap: dens.gap, alignItems: 'start', minWidth: 0,
      }}>
        {/* Center column */}
        <div style={{display:'flex', flexDirection:'column', gap:dens.gap, minWidth: 0}}>
          <NowPlayingHero ctx={ctx} hassRef={hassRef} speaker={active}/>
          <QueueCard ctx={ctx} conn={conn} hassRef={hassRef} speaker={active}/>
        </div>

        {/* Right column */}
        <div style={{display:'flex', flexDirection:'column', gap:dens.gap, minWidth: 0}}>
          <RoomPanel ctx={ctx} hassRef={hassRef} speakers={speakers} activeId={activeId}
            setActiveId={userSwitchSpeaker} hidden={hidden} setHidden={setHidden}
            autoVisible={autoVisible}
            manageOpen={manageOpen} setManageOpen={setManageOpen}/>
          <PlaylistsCard ctx={ctx} hassRef={hassRef} conn={conn} speakerId={active?.id}
            playMedia={playMedia} isMA={isMA}
            onDrillInto={(item) => {
              setOverlayInitialPath([{
                contentId: item.media_content_id,
                contentType: item.media_content_type,
                contentClass: item.media_class,
                title: item.title,
                thumbnail: item.thumbnail,
              }]);
              setBrowseOpen(true);
            }}/>
        </div>
      </div>

      {(searchOpen || browseOpen) && (
        <MediaOverlay ctx={ctx} conn={conn} speakerId={active?.id}
          playMedia={playMedia} playFromList={playFromList}
          mode={searchOpen ? 'search' : 'browse'}
          initialPath={browseOpen ? overlayInitialPath : []}
          onClose={() => { setSearchOpen(false); setBrowseOpen(false); setOverlayInitialPath([]); }}/>
      )}
      <div style={{height: 60}}/>
    </>
  );
};

const iconBtn = (p) => ({
  width: 38, height: 38, borderRadius: 10,
  background: p.surface, border: `.5px solid ${p.border2}`,
  color: p.fg, cursor: 'pointer', fontSize: 14,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
});

// ── NowPlayingHero — full-bleed album art with text fading over it ────────
const NowPlayingHero = ({ ctx, hassRef, speaker }) => {
  const { p, fonts, narrow } = ctx;

  const [tickPos, setTickPos] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const [seekValue, setSeekValue] = React.useState(0);
  const lastSeenRef = React.useRef({ pos: 0, at: Date.now(), key: '' });
  // Optimistic play/pause overlay. HA's state pushes can lag the user's
  // tap by several seconds (especially MA, which routes through Sonos
  // before reporting back). pendingPlay flips the UI immediately on
  // click; HA's actual state takes over once it matches.
  const [pendingPlay, setPendingPlay] = React.useState(null); // bool | null
  const pendingTimerRef = React.useRef(null);
  // Same idea for shuffle / repeat — the user tap should change the
  // icon immediately, then HA's confirmed state takes over.
  const [pendingShuffle, setPendingShuffle] = React.useState(null); // bool | null
  const [pendingRepeat, setPendingRepeat] = React.useState(null);   // 'off'|'all'|'one'|null
  const pendingShuffleTimer = React.useRef(null);
  const pendingRepeatTimer = React.useRef(null);

  const title = speaker?.haMediaTitle;
  const artist = speaker?.haMediaArtist;
  const album = speaker?.haMediaAlbum;
  const art = speaker?.haEntityPicture;
  const dur = speaker?.duration || 0;
  const realPlaying = !!speaker?.playing;
  const realShuffle = !!speaker?.shuffle;
  const realRepeat = speaker?.repeat || 'off';
  // Effective playing state — UI uses this for icon + progress ticker.
  const isPlaying = pendingPlay !== null ? pendingPlay : realPlaying;
  const shuffleOn = pendingShuffle !== null ? pendingShuffle : realShuffle;
  const repeatMode = pendingRepeat !== null ? pendingRepeat : realRepeat;
  const isIdle = !title;

  // Once HA's reported state matches the pending intent, drop the
  // overlay so the UI tracks reality again.
  React.useEffect(() => {
    if (pendingPlay !== null && pendingPlay === realPlaying) {
      setPendingPlay(null);
    }
  }, [realPlaying, pendingPlay]);
  React.useEffect(() => {
    if (pendingShuffle !== null && pendingShuffle === realShuffle) {
      setPendingShuffle(null);
    }
  }, [realShuffle, pendingShuffle]);
  React.useEffect(() => {
    if (pendingRepeat !== null && pendingRepeat === realRepeat) {
      setPendingRepeat(null);
    }
  }, [realRepeat, pendingRepeat]);

  React.useEffect(() => {
    if (!speaker) return;
    const stampedPos = speaker.progress || 0;
    const stampedAt = speaker.progressUpdatedAt;
    const now = Date.now();
    const livePos = (isPlaying && stampedAt)
      ? stampedPos + Math.max(0, (now - stampedAt) / 1000)
      : stampedPos;
    const key = `${speaker.id}|${title}|${stampedAt || stampedPos}`;
    if (key !== lastSeenRef.current.key) {
      lastSeenRef.current = { pos: livePos, at: now, key };
      if (!seeking) setTickPos(Math.min(speaker.duration || livePos, livePos));
    }
  }, [speaker?.id, title, speaker?.progress, speaker?.progressUpdatedAt, isPlaying, seeking, speaker]);

  React.useEffect(() => {
    if (!isPlaying || seeking) return;
    const i = setInterval(() => {
      const dt = (Date.now() - lastSeenRef.current.at) / 1000;
      setTickPos(Math.min(dur || 0, lastSeenRef.current.pos + dt));
    }, 500);
    return () => clearInterval(i);
  }, [isPlaying, seeking, speaker?.id, dur]);

  if (!speaker) return null;

  const call = (service, data, optimistic) => {
    const hass = hassRef.current;
    if (!hass?.callService) return;
    // Optimistic overlays for shuffle / repeat: flip the icon now,
    // then let HA's confirmed state take over via the effects above.
    // Auto-clear after 6 s so a silently-failed call doesn't strand
    // the UI in the wrong state.
    if (optimistic === 'shuffle' && data && typeof data.shuffle === 'boolean') {
      setPendingShuffle(data.shuffle);
      clearTimeout(pendingShuffleTimer.current);
      pendingShuffleTimer.current = setTimeout(() => setPendingShuffle(null), 6000);
    } else if (optimistic === 'repeat' && data && data.repeat) {
      setPendingRepeat(data.repeat);
      clearTimeout(pendingRepeatTimer.current);
      pendingRepeatTimer.current = setTimeout(() => setPendingRepeat(null), 6000);
    }
    try { hass.callService('media_player', service, { entity_id: speaker.id, ...data }); } catch {}
  };
  const fmtTime = (s) => {
    if (!s || s < 0) return '0:00';
    const m = Math.floor(s / 60); const ss = Math.floor(s % 60);
    return `${m}:${ss.toString().padStart(2, '0')}`;
  };
  const displayPos = seeking ? seekValue : tickPos;

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 16, minHeight: narrow ? 380 : 440,
      // Full-bleed album art as the card background. When there's no
      // art (idle, or radio without art), fall back to a tangerine
      // gradient so the card is never blank.
      background: art
        ? `center / cover no-repeat url("${art}"), oklch(15% 0.03 25)`
        : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
    }}>
      {/* Top fade — keeps the eyebrow + title legible against bright art. */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative', zIndex: 1,
        padding: narrow ? '20px 18px 20px' : '24px 28px 24px',
        display: 'flex', flexDirection: 'column',
        height: '100%', minHeight: narrow ? 380 : 440,
        color: '#fff',
      }}>
        {/* Top: status + title + artist */}
        <div style={{minWidth: 0}}>
          <div style={{
            fontSize: 11, color: 'rgba(255,255,255,0.85)',
            letterSpacing: '.14em', textTransform: 'uppercase',
            marginBottom: 10,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}>
            {isIdle ? 'Idle' : isPlaying ? 'Playing' : 'Paused'} · {speaker.name}
          </div>
          <div style={{
            fontFamily: fonts.display,
            fontSize: narrow ? 30 : 38, fontWeight: 500,
            lineHeight: 1.05, marginBottom: 6,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            textShadow: '0 2px 8px rgba(0,0,0,0.55)',
          }}>{title || 'Nothing playing'}</div>
          {(artist || album) && (
            <div style={{
              fontSize: 14, color: 'rgba(255,255,255,0.92)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}>{[artist, album].filter(Boolean).join(' · ')}</div>
          )}
        </div>

        <div style={{flex: 1}}/>

        {/* Seek slider */}
        {dur > 0 && (
          <div>
            <input type="range" min="0" max={dur} step={1}
              value={Math.min(displayPos, dur)}
              onMouseDown={() => { setSeeking(true); setSeekValue(tickPos); }}
              onTouchStart={() => { setSeeking(true); setSeekValue(tickPos); }}
              onChange={(e) => { setSeeking(true); setSeekValue(+e.target.value); }}
              onMouseUp={(e) => { call('media_seek', { seek_position: +e.target.value }); setSeeking(false); }}
              onTouchEnd={(e) => { call('media_seek', { seek_position: +e.target.value }); setSeeking(false); }}
              style={{width: '100%', accentColor: '#fff', height: 3}}/>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 11,
              color: 'rgba(255,255,255,0.85)', marginTop: 6, fontVariantNumeric: 'tabular-nums',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
              <span>{fmtTime(displayPos)}</span>
              <span>{fmtTime(dur)}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 14}}>
          {/* Shuffle: media_player.shuffle_set toggles the boolean. The
              button glows when shuffle is on. */}
          <HeroBtn onClick={() => call('shuffle_set', { shuffle: !shuffleOn }, 'shuffle')}
            icon="⇄" size={44} active={shuffleOn}/>
          <HeroBtn onClick={() => call('media_previous_track')} icon="‹‹" size={44}/>
          {/* Explicit media_play / media_pause based on current state.
              media_play_pause is a toggle service that some integrations
              (notably MA) silently no-op on, leaving the UI stuck. */}
          <HeroBtn onClick={() => {
            const next = !isPlaying;
            setPendingPlay(next);
            // Auto-clear after 6 s in case HA never confirms (e.g.,
            // service call quietly failed) — better than a permanently
            // wrong icon.
            clearTimeout(pendingTimerRef.current);
            pendingTimerRef.current = setTimeout(() => setPendingPlay(null), 6000);
            call(next ? 'media_play' : 'media_pause');
          }}
            icon={isPlaying ? '❚❚' : '▶'} size={64} primary/>
          <HeroBtn onClick={() => call('media_next_track')} icon="››" size={44}/>
          {/* Repeat: cycles off → all → one → off. Glow when not off;
              a small "1" badge marks single-track repeat. */}
          <HeroBtn onClick={() => {
            const next = repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off';
            call('repeat_set', { repeat: next }, 'repeat');
          }}
            icon={repeatMode === 'one' ? '↻¹' : '↻'} size={44} active={repeatMode !== 'off'}/>
        </div>
      </div>
    </div>
  );
};

const HeroBtn = ({ onClick, icon, size, primary, active }) => (
  <button onClick={onClick} style={{
    width: size, height: size, borderRadius: '50%',
    background: primary ? '#fff' : active ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.1)',
    color: primary ? '#000' : '#fff',
    border: primary ? '0' : `.5px solid ${active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)'}`,
    cursor: 'pointer', fontSize: size > 50 ? 22 : 16, fontWeight: 600,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
  }}>{icon}</button>
);

// ── Up next ───────────────────────────────────────────────────────────────
//
// Pulls the queue from whichever service backs the active speaker. MA
// exposes music_assistant.get_queue with a richer schema; Sonos's
// underlying integration uses sonos.get_queue. Try MA first since the
// active speaker is usually the MA mirror; fall back to Sonos.
const QueueCard = ({ ctx, conn, hassRef, speaker }) => {
  const { p, fonts } = ctx;
  const [queue, setQueue] = React.useState(null);
  const titleKey = speaker?.haMediaTitle || '';
  const speakerId = speaker?.id;

  React.useEffect(() => {
    if (!conn || !speakerId) { setQueue(null); return; }
    let alive = true;
    const tryService = async (domain, service) => {
      try {
        const resp = await conn.sendMessagePromise({
          type: 'call_service', domain, service,
          service_data: { entity_id: speakerId },
          return_response: true,
        });
        return { ok: true, response: resp?.response };
      } catch (e) { return { ok: false, error: e?.message || String(e) }; }
    };
    const norm = (it) => ({
      title: it.title || it.name || '',
      artist: (it.artists?.[0]?.name) || it.artist || '',
      album: (it.album?.name) || it.album || '',
      thumbnail: it.image || it.thumbnail || it.media_image_url || it.image_url || null,
      // Preserve identifiers for click-to-play. MA's get_queue returns
      // queue items with `queue_item_id` (for queue/play_index) and a
      // `media_item` containing the canonical URI / content_id.
      queueItemId: it.queue_item_id || it.item_id || null,
      mediaId: it.media_item?.uri || it.uri || it.media_content_id || null,
      mediaType: it.media_item?.media_type || it.media_content_type || null,
    });
    const trySendWs = async (msg) => {
      try {
        const resp = await conn.sendMessagePromise(msg);
        return { ok: true, response: resp };
      } catch (e) { return { ok: false, error: e?.message || String(e) }; }
    };
    (async () => {
      // MA's get_queue returns a metadata object: { queue_id, items:
      // <COUNT — not an array!>, current_index, current_item,
      // next_item, ... }. To fetch the actual items array we need a
      // separate WS command that mirrors MA server's `player_queues/items`.
      const ma = await tryService('music_assistant', 'get_queue');
      let cand = null;
      let totalCount = null;
      if (alive && ma.ok) {
        cand = ma.response?.[speakerId] ?? ma.response;
        totalCount = typeof cand?.items === 'number' ? cand.items : null;
        const queueId = cand?.queue_id || speakerId;
        const ci = typeof cand?.current_index === 'number' ? cand.current_index : -1;

        // Some integrations / versions DO put an array somewhere; keep
        // checking the alternate keys for forwards-compat.
        let arr = null;
        const i = cand?.items;
        if (Array.isArray(i)) arr = i;
        else if (Array.isArray(cand?.queue_items)) arr = cand.queue_items;
        else if (Array.isArray(cand?.tracks)) arr = cand.tracks;
        else if (Array.isArray(cand?.queue?.items)) arr = cand.queue.items;

        if (Array.isArray(arr) && arr.length) {
          const upcoming = ci >= 0 ? arr.slice(ci + 1) : arr;
          pushDiag(`music: MA queue — ${arr.length} items inline, ${upcoming.length} upcoming`);
          setQueue({ items: upcoming.map(norm), totalCount });
          return;
        }

        // Probe MA WS commands. The MA server's command is exactly
        // `player_queues/items` per the MA frontend; the HA integration
        // proxies that namespace. Try the most-likely names in order.
        const wsCandidates = [
          { type: 'music_assistant/player_queues/items', queue_id: queueId, limit: 50, offset: 0 },
          { type: 'music_assistant/player_queues/items', queue_id: queueId },
          { type: 'music_assistant/get_player_queue_items', queue_id: queueId },
          { type: 'music_assistant/queue/get_items', queue_id: queueId },
        ];
        for (const msg of wsCandidates) {
          if (!alive) return;
          const r = await trySendWs(msg);
          if (r.ok) {
            const items = Array.isArray(r.response) ? r.response
              : Array.isArray(r.response?.items) ? r.response.items
              : Array.isArray(r.response?.queue_items) ? r.response.queue_items
              : null;
            if (Array.isArray(items) && items.length) {
              const upcoming = ci >= 0 ? items.slice(ci + 1) : items;
              pushDiag(`music: MA WS ${msg.type} — ${items.length} items, ${upcoming.length} upcoming`);
              setQueue({ items: upcoming.map(norm), totalCount });
              return;
            }
            pushDiag(`music: MA WS ${msg.type} returned 0 items`);
          } else if (!/unknown_command/i.test(r.error || '')) {
            pushDiag(`music: MA WS ${msg.type} failed — ${r.error}`);
          }
        }

        // Fall back to next_item alone — get_queue's documented shape
        // doesn't include the rest of the queue, only the single next
        // item. Dump cand's shape on the way so future diag tells us
        // whether a new field appears.
        const keys = cand ? Object.keys(cand).join(',') : 'null';
        if (cand?.next_item) {
          pushDiag(`music: MA queue — next_item only · keys=${keys} · items_count=${totalCount}`);
          setQueue({ items: [norm(cand.next_item)], totalCount });
          return;
        }
        pushDiag(`music: MA queue — empty · keys=${keys}`);
      } else if (alive && ma) {
        pushDiag(`music: MA get_queue failed — ${ma.error}`);
      }
      if (alive) setQueue({ items: [], totalCount });
    })();
    return () => { alive = false; };
  }, [conn, speakerId, titleKey]);

  // Tap a track in Up Next to play it. MA exposes
  // `music_assistant.queue_command` with `command: play_index` +
  // `queue_item_id` — that jumps within the queue. If we only have
  // a media URI (no queue_item_id, e.g. a Sonos fallback), fall back
  // to `music_assistant.play_media` which enqueues+plays.
  const playFromQueue = (tr) => {
    const hass = hassRef?.current;
    if (!hass?.callService || !speakerId) return;
    if (tr.queueItemId) {
      try {
        hass.callService('music_assistant', 'queue_command', {
          entity_id: speakerId, command: 'play_index',
          queue_item_id: tr.queueItemId,
        });
        return;
      } catch {}
    }
    if (tr.mediaId) {
      try {
        hass.callService('music_assistant', 'play_media', {
          entity_id: speakerId, media_id: tr.mediaId,
          enqueue: 'play',
        });
      } catch {}
    }
  };

  const items = queue?.items || [];
  const totalCount = queue?.totalCount;
  if (!items.length) return null;
  const currentTitle = (speaker.haMediaTitle || '').toLowerCase();
  const currentIdx = items.findIndex(q => (q.title || '').toLowerCase() === currentTitle);
  const upcoming = (currentIdx >= 0 ? items.slice(currentIdx + 1) : items).slice(0, 12);
  if (!upcoming.length) return null;
  // Prefer MA's reported total-queue size for the counter so the user
  // sees the full queue length (e.g. "204 in queue") even when we can
  // only render the immediate-next track.
  const countLabel = (typeof totalCount === 'number' && totalCount > upcoming.length)
    ? `${upcoming.length} of ${totalCount}`
    : `${upcoming.length} track${upcoming.length === 1 ? '' : 's'}`;

  return (
    <window.Card p={p} style={{padding: 0}}>
      <div style={{padding: '14px 18px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{fontFamily: fonts.display, fontSize: 15, color: p.fg, fontWeight: 500}}>Up next</div>
        <div style={{fontSize: 11, color: p.fg3}}>{countLabel}</div>
      </div>
      <div>
        {upcoming.map((tr, i) => {
          const clickable = !!(tr.queueItemId || tr.mediaId);
          return (
            <button key={i}
              disabled={!clickable}
              onClick={() => clickable && playFromQueue(tr)}
              style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px',
                width: '100%', textAlign: 'left',
                background: 'transparent', border: 0,
                borderBottom: i < upcoming.length - 1 ? `.5px solid ${p.border}` : 'none',
                cursor: clickable ? 'pointer' : 'default',
                color: 'inherit', fontFamily: 'inherit', minWidth: 0}}>
              <div style={{width: 38, height: 38, borderRadius: 5, flex: 'none',
                background: tr.thumbnail ? `center / cover no-repeat url("${tr.thumbnail}"), oklch(20% 0.05 25)` : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`}}/>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 13, color: p.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{tr.title || 'Untitled'}</div>
                <div style={{fontSize: 11, color: p.fg3, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                  {[tr.artist, tr.album].filter(Boolean).join(' · ')}
                </div>
              </div>
              {clickable && (
                <div style={{fontSize: 13, color: p.fg3, flex: 'none', paddingLeft: 8}}>▶</div>
              )}
            </button>
          );
        })}
      </div>
    </window.Card>
  );
};

// ── Right column: room chooser with inline grouping & manage ───────────────
const RoomPanel = ({ ctx, hassRef, speakers, activeId, setActiveId,
                     hidden, setHidden, autoVisible, manageOpen, setManageOpen }) => {
  const { p, fonts } = ctx;
  const [chooserOpen, setChooserOpen] = React.useState(false);

  const groupable = speakers.filter(s => (s.supportedFeatures & GROUPING_FEATURE) !== 0);
  const hiddenSpeakers = (autoVisible || []).filter(s => hidden?.has?.(s.id));
  const active = speakers.find(s => s.id === activeId) || speakers[0];
  // Float currently-playing speakers to the top of the dropdown so the
  // user doesn't have to scan past idle rooms to find what's actually
  // making sound. Original order is preserved within each tier.
  const sortedSpeakers = React.useMemo(() => {
    const playing = speakers.filter(s => s.playing);
    const idle = speakers.filter(s => !s.playing);
    return [...playing, ...idle];
  }, [speakers]);
  const activeGroup = active?.groupMembers || [];

  const call = (entityId, service, data) => {
    const hass = hassRef.current;
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: entityId, ...data }); } catch {}
  };

  // Volume slider: optimistic local value per speaker + a trailing
  // debounce on volume_set so a long drag doesn't fire 30 service
  // calls per second (Sonos rate-limits and the slider feels sluggish
  // because each change waits on a round-trip).
  const [volOverrides, setVolOverrides] = React.useState({});
  const volTimersRef = React.useRef({});
  const setVolume = (sp, pct) => {
    setVolOverrides(prev => ({ ...prev, [sp.id]: pct }));
    clearTimeout(volTimersRef.current[sp.id]);
    volTimersRef.current[sp.id] = setTimeout(() => {
      try { call(sp.id, 'volume_set', { volume_level: pct / 100 }); } catch {}
      // Drop the override 1 s after dispatch so HA's reported value
      // takes back over once it's fresh.
      setTimeout(() => {
        setVolOverrides(prev => { const n = { ...prev }; delete n[sp.id]; return n; });
      }, 1000);
    }, 150);
  };

  // Is this speaker grouped with the currently-active speaker?
  // Either it's the leader or shares the active's group_members list
  // (Sonos mirrors the list across all members).
  const inActiveGroup = (sp) => sp.id !== active?.id && activeGroup.includes(sp.id);

  // Toggle membership: add to / remove from the active's group.
  const toggleGroup = (sp) => {
    if (!active || sp.id === active.id) return;
    if (inActiveGroup(sp)) {
      call(sp.id, 'unjoin');
    } else {
      call(active.id, 'join', { group_members: [sp.id] });
    }
  };

  const groupedNames = groupable
    .filter(s => s.id !== active?.id && inActiveGroup(s))
    .map(s => s.name);
  const subtitleParts = [active?.name || ''];
  if (groupedNames.length === 1) subtitleParts[0] += ` + ${groupedNames[0]}`;
  else if (groupedNames.length > 1) subtitleParts[0] += ` + ${groupedNames.length}`;

  return (
    <window.Card p={p} style={{padding: 0, overflow: 'visible'}}>
      <div style={{padding: '12px 14px', display: 'grid', gap: 8}}>
        {/* Choose Room dropdown — also hosts grouping toggles + manage */}
        <div style={{position: 'relative'}}>
          <button onClick={() => setChooserOpen(v => !v)} style={{
            width: '100%', padding: '12px 14px', borderRadius: 10,
            background: p.surface, border: `.5px solid ${p.border2}`, color: p.fg,
            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{flex: 1, minWidth: 0}}>
              <div style={{fontSize: 10, color: p.fg3, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 2}}>
                Playing on
              </div>
              <div style={{fontSize: 14, fontWeight: 500, color: p.fg,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {subtitleParts[0] || 'Room'}
              </div>
            </span>
            <span style={{fontSize: 11, color: p.fg3, transform: chooserOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 120ms ease'}}>▾</span>
          </button>
          {chooserOpen && (
            <>
              {/* Backdrop — absorbs taps outside the popup so we never
                  accidentally close while the user is mid-interaction
                  with a row. Lower z-index than the popup, so clicks
                  on rows still hit the rows. */}
              <div onClick={() => setChooserOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 25, background: 'transparent',
              }}/>
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                background: p.surface2, border: `.5px solid ${p.border2}`, borderRadius: 10,
                boxShadow: '0 18px 40px rgba(0,0,0,0.4)', zIndex: 30,
                maxHeight: 480, overflowY: 'auto',
              }}>
              {/* Header with manage toggle */}
              <div style={{
                padding: '10px 14px', borderBottom: `.5px solid ${p.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{fontSize: 11, color: p.fg3, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500}}>
                  {manageOpen ? 'Manage speakers' : 'Tap to switch · Group to add'}
                </div>
                <button onClick={() => setManageOpen(v => !v)} style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: manageOpen ? p.accentSoft : 'transparent',
                  border: `.5px solid ${manageOpen ? p.accent : p.border2}`,
                  color: manageOpen ? p.accent : p.fg2,
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
                }}>{manageOpen ? 'Done' : 'Manage'}</button>
              </div>

              {sortedSpeakers.map(sp => {
                const isActive = sp.id === active?.id;
                const grouped = inActiveGroup(sp);
                const canGroup = !isActive && (sp.supportedFeatures & GROUPING_FEATURE) !== 0;
                return (
                  <div key={sp.id}
                    style={{
                      padding: '10px 14px',
                      background: isActive ? p.warm : 'transparent',
                      borderLeft: isActive ? `2px solid ${p.accent}` : '2px solid transparent',
                      borderBottom: `.5px solid ${p.border}`,
                    }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                      <button onClick={() => { if (!manageOpen) { setActiveId(sp.id); } }}
                        disabled={manageOpen}
                        style={{
                          flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10,
                          padding: 0, border: 0, background: 'transparent',
                          cursor: manageOpen ? 'default' : 'pointer', textAlign: 'left',
                        }}>
                        <div style={{width: 30, height: 30, borderRadius: 5, flex: 'none',
                          background: sp.haEntityPicture
                            ? `center / cover no-repeat url("${sp.haEntityPicture}"), oklch(20% 0.05 25)`
                            : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`}}/>
                        <div style={{flex: 1, minWidth: 0}}>
                          <div style={{fontSize: 13, color: p.fg, fontWeight: 500,
                            display: 'flex', alignItems: 'center', gap: 6,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                            {sp.name}
                            {isActive && <span style={{fontSize: 9, padding: '2px 6px', borderRadius: 999, background: p.accent, color: '#fff', fontWeight: 600, letterSpacing: '.04em'}}>NOW</span>}
                            {grouped && <span style={{fontSize: 9, padding: '2px 6px', borderRadius: 999, background: 'rgba(241,234,217,0.1)', color: p.fg2, fontWeight: 500, letterSpacing: '.04em'}}>GROUPED</span>}
                          </div>
                          <div style={{fontSize: 11, color: p.fg3, marginTop: 1,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                            {sp.playing && sp.haMediaTitle ? `${sp.haMediaTitle}${sp.haMediaArtist ? ' · ' + sp.haMediaArtist : ''}` : 'Idle'}
                          </div>
                        </div>
                      </button>
                      {!manageOpen && canGroup && (
                        <button onClick={(e) => { e.stopPropagation(); toggleGroup(sp); }}
                          title={grouped ? 'Remove from group' : 'Add to group'}
                          style={{
                            padding: '5px 10px', borderRadius: 6,
                            background: grouped ? p.accentSoft : 'transparent',
                            border: `.5px solid ${grouped ? p.accent : p.border2}`,
                            color: grouped ? p.accent : p.fg2,
                            cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
                          }}>{grouped ? '✓ Grouped' : '+ Group'}</button>
                      )}
                      {manageOpen && (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          // Unjoin the speaker from whatever group it's
                          // in before hiding it. Otherwise Sonos keeps
                          // the speaker in its group and music played
                          // to the leader continues to spill out of a
                          // device the user explicitly wanted gone.
                          if ((sp.supportedFeatures & GROUPING_FEATURE) !== 0) {
                            try { call(sp.id, 'unjoin'); } catch {}
                          }
                          setHidden(prev => { const n = new Set(prev); n.add(sp.id); return n; });
                        }}
                          title="Hide & ungroup this speaker"
                          style={{
                            width: 24, height: 24, borderRadius: '50%',
                            border: `.5px solid ${p.border2}`,
                            background: 'transparent', color: p.fg3, cursor: 'pointer', fontSize: 12,
                          }}>×</button>
                      )}
                    </div>
                    {/* Per-speaker volume slider — visible always so the
                        user can nudge volume without leaving the dropdown.
                        Uses an optimistic local value while dragging so
                        the UI tracks the thumb instead of HA's lagging
                        reported value. */}
                    {!manageOpen && (() => {
                      const override = volOverrides[sp.id];
                      const v = override !== undefined ? override : sp.vol;
                      return (
                        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 8}}>
                          <window.Icon name="speaker" size={11} style={{color: p.fg3}}/>
                          <input type="range" min="0" max="100" value={v}
                            onChange={(e) => setVolume(sp, +e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            style={{flex: 1, accentColor: p.accent, height: 3}}/>
                          <span style={{fontSize: 10, color: p.fg3, fontVariantNumeric: 'tabular-nums', width: 22, textAlign: 'right'}}>{v}</span>
                        </div>
                      );
                    })()}
                  </div>
                );
              })}

              {/* Restore hidden — only when manage mode is on */}
              {manageOpen && hiddenSpeakers.length > 0 && (
                <div style={{padding: '10px 14px', borderBottom: `.5px solid ${p.border}`,
                  background: 'rgba(241,234,217,0.02)'}}>
                  <div style={{fontSize: 10, color: p.fg3, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6}}>
                    Hidden — tap to restore
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: 4}}>
                    {hiddenSpeakers.map(sp => (
                      <button key={sp.id}
                        onClick={() => setHidden(prev => { const n = new Set(prev); n.delete(sp.id); return n; })}
                        style={{
                          padding: '4px 10px', borderRadius: 6,
                          background: p.surface, border: `.5px solid ${p.border2}`,
                          color: p.fg2, cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
                        }}>+ {sp.name}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </>
          )}
        </div>

      </div>
    </window.Card>
  );
};

// ── Playlists card — pinned/customizable ──────────────────────────────────
const PlaylistsCard = ({ ctx, hassRef, conn, speakerId, playMedia, isMA, onDrillInto }) => {
  const { p, fonts } = ctx;
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const [hidden, setHiddenRaw] = React.useState(() => loadStringSet(HIDDEN_PLAYLISTS_KEY));
  const setHidden = (updater) => {
    setHiddenRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveStringSet(HIDDEN_PLAYLISTS_KEY, next);
      return next;
    });
  };

  // Fetch the user's playlists. We try MA's Playlists folder first
  // (richer, includes all linked services), then fall back to whatever
  // the speaker's root browse exposes — any node titled "Playlists" /
  // "Favorites" / "Pinned".
  React.useEffect(() => {
    if (!conn || !speakerId) { setItems(null); return; }
    let alive = true;
    setItems(null); setError(null);
    (async () => {
      try {
        // Browse root, find a Playlists or Favorites node, expand it.
        const rootResp = await conn.sendMessagePromise({
          type: 'media_player/browse_media', entity_id: speakerId,
        });
        const rootChildren = (rootResp?.children || []).filter(isMusicItem);
        const pickInto = async (re) => {
          const node = rootChildren.find(c => re.test(c.title || ''));
          if (!node?.can_expand) return [];
          try {
            const r = await conn.sendMessagePromise({
              type: 'media_player/browse_media', entity_id: speakerId,
              media_content_id: node.media_content_id,
              media_content_type: node.media_content_type,
            });
            return (r?.children || []).filter(isMusicItem);
          } catch { return []; }
        };
        let pls = await pickInto(PLAYLISTS_RE);
        // If the playlists folder is MA-style and contains nested
        // "Library", drill one level deeper.
        if (pls.length === 1 && pls[0].can_expand && /library/i.test(pls[0].title || '')) {
          try {
            const r = await conn.sendMessagePromise({
              type: 'media_player/browse_media', entity_id: speakerId,
              media_content_id: pls[0].media_content_id,
              media_content_type: pls[0].media_content_type,
            });
            pls = (r?.children || []).filter(isMusicItem);
          } catch {}
        }
        let favs = [];
        if (pls.length === 0) favs = await pickInto(FAVORITES_RE);
        const merged = pls.length ? pls : favs;
        if (alive) setItems(merged);
      } catch (e) {
        if (alive) setError(e?.message || String(e));
      }
    })();
    return () => { alive = false; };
  }, [conn, speakerId]);

  const visible = (items || []).filter(it => !hidden.has(it.media_content_id));

  return (
    <window.Card p={p} style={{padding: 0}}>
      <div style={{padding: '12px 16px', borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 8}}>
        <div style={{flex: 1, fontFamily: fonts.display, fontSize: 14, color: p.fg, fontWeight: 500}}>Playlists</div>
        {items?.length > 0 && (
          <button onClick={() => setEditing(v => !v)} style={{
            padding: '4px 10px', borderRadius: 6,
            background: editing ? p.accentSoft : 'transparent',
            border: `.5px solid ${editing ? p.accent : p.border2}`,
            color: editing ? p.accent : p.fg2,
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
          }}>{editing ? 'Done' : 'Edit'}</button>
        )}
      </div>
      {error && <div style={{padding: '14px 16px', fontSize: 12, color: '#e0a89a'}}>{error}</div>}
      {items === null && !error && (
        <div style={{padding: '20px 16px', fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>
      )}
      {items?.length === 0 && (
        <div style={{padding: '20px 16px', fontSize: 12, color: p.fg3, lineHeight: 1.5}}>
          {isMA ? 'No playlists found yet. Add some in Music Assistant or favorite tracks/albums in your linked services.'
                : 'Install Music Assistant for your full Apple Music library, or favorite tracks in the Sonos app.'}
        </div>
      )}
      {visible.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: 8, padding: '12px 16px',
        }}>
          {visible.map(it => (
            <PlaylistTile key={it.media_content_id} item={it} ctx={ctx}
              onOpen={() => onDrillInto?.(it)}
              onPlay={() => playMedia(it, 'play')}
              editing={editing}
              onHide={() => setHidden(prev => { const n = new Set(prev); n.add(it.media_content_id); return n; })}/>
          ))}
        </div>
      )}
      {editing && hidden.size > 0 && items?.length > 0 && (
        <div style={{padding: '8px 16px 14px', borderTop: `.5px dashed ${p.border}`}}>
          <div style={{fontSize: 10, color: p.fg3, letterSpacing: '.06em', textTransform: 'uppercase', margin: '6px 0'}}>
            Hidden — tap to restore
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 4}}>
            {(items || []).filter(i => hidden.has(i.media_content_id)).map(it => (
              <button key={it.media_content_id}
                onClick={() => setHidden(prev => { const n = new Set(prev); n.delete(it.media_content_id); return n; })}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: p.surface, border: `.5px solid ${p.border2}`,
                  color: p.fg2, cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
                  overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160, whiteSpace: 'nowrap',
                }}>+ {it.title}</button>
            ))}
          </div>
        </div>
      )}
    </window.Card>
  );
};

const PlaylistTile = ({ item, ctx, onOpen, onPlay, editing, onHide }) => {
  const { p } = ctx;
  // Tap the tile = drill in (show tracks). The small ▶ button in the
  // corner = play immediately.
  return (
    <div style={{position: 'relative'}}>
      <button onClick={editing ? undefined : onOpen} disabled={editing}
        style={{
          padding: 0, border: 0, background: 'transparent',
          cursor: editing ? 'default' : 'pointer', textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, width: '100%',
        }}>
        <div style={{
          aspectRatio: '1', borderRadius: 8, overflow: 'hidden',
          background: `linear-gradient(135deg, ${p.surface2}, ${p.surface})`,
          position: 'relative',
        }}>
          {item.thumbnail && (
            <img src={item.thumbnail} alt=""
              style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
          )}
        </div>
        <div style={{fontSize: 11, color: p.fg, fontWeight: 500, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
          {item.title}
        </div>
      </button>
      {!editing && (
        <button onClick={(e) => { e.stopPropagation(); onPlay(); }} title="Play now"
          style={{
            position: 'absolute', top: 6, right: 6,
            width: 26, height: 26, borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)', color: '#fff',
            border: 0, cursor: 'pointer', fontSize: 11,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>▶</button>
      )}
      {editing && (
        <button onClick={onHide} title="Hide"
          style={{
            position: 'absolute', top: 4, right: 4,
            width: 22, height: 22, borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)', color: '#fff',
            border: 0, cursor: 'pointer', fontSize: 12,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
      )}
    </div>
  );
};


// ── Unified MediaOverlay — search + browse + artist + album views ─────────
//
// Single overlay component that handles the four contexts the user can
// be in while exploring music:
//
//   1. Search:  text input → results grid.
//   2. Browse:  drill the speaker's media tree → tile grid w/ A-Z scroller.
//   3. Artist:  drilled into an artist node → top tracks + albums (newest
//                first) on a dedicated detail page.
//   4. Album:   drilled into an album node → numbered track list with
//                a "Play album" button at the top. Tapping a track plays
//                it and queues the rest of the album as Up Next.
//
// The mode is determined by the path stack and the head's media_class.
const MediaOverlay = ({ ctx, conn, speakerId, playMedia, playFromList, mode, onClose, initialPath }) => {
  const { p, fonts } = ctx;
  const [path, setPath] = React.useState(initialPath || []);
  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(null);
  const [searchError, setSearchError] = React.useState(null);
  const inputRef = React.useRef(null);

  const head = path[path.length - 1] || null;
  const headClass = (head?.contentClass || '').toLowerCase();
  const isArtist = headClass === 'artist';
  const isAlbum = headClass === 'album';
  const showingSearch = mode === 'search' && path.length === 0;
  const isBrowseRoot = mode === 'browse' && path.length === 0;

  // Music Assistant's browse_media response is capped server-side at a
  // few hundred children — anything past that gets truncated, so big
  // libraries (artists, albums, tracks) never show A-Z fully via plain
  // browse. The MA search API doesn't have the same cap, so we fan out
  // a search per letter / digit, dedupe by media_content_id, and merge
  // back into the displayed items.
  const [loadingAll, setLoadingAll] = React.useState(false);
  const loadAll = async () => {
    if (!conn || !speakerId || !items) return;
    setLoadingAll(true);
    const accumulated = new Map();
    for (const item of items) {
      if (item.media_content_id) accumulated.set(item.media_content_id, item);
    }
    // Filter merged-in search hits to the type of thing the user was
    // browsing (artist / album / track / playlist / …) so 'a' doesn't
    // pull in albums when they're looking at artists.
    const expectedClass = (items[0]?.media_class || '').toLowerCase();
    const queries = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    for (const q of queries) {
      try {
        const resp = await conn.sendMessagePromise({
          type: 'media_player/search_media', entity_id: speakerId, search_query: q,
        });
        const results = (resp?.result || resp?.results || []).filter(isMusicItem);
        for (const r of results) {
          if (expectedClass && (r.media_class || '').toLowerCase() !== expectedClass) continue;
          if (r.media_content_id && !accumulated.has(r.media_content_id)) {
            accumulated.set(r.media_content_id, r);
          }
        }
      } catch (e) {
        pushDiag(`music: loadAll q="${q}" failed — ${e?.message || e}`);
      }
    }
    setItems(Array.from(accumulated.values()));
    setLoadingAll(false);
    pushDiag(`music: loadAll done — ${accumulated.size} items (was ${items.length})`);
  };
  const showLoadAll = !isBrowseRoot && !showingSearch && !isArtist && !isAlbum
    && Array.isArray(items) && items.length >= 50;

  const [manageMode, setManageMode] = React.useState(false);
  const [hiddenIds, setHiddenIds] = React.useState(() => {
    try {
      const raw = localStorage.getItem(BROWSE_HIDDEN_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch { return new Set(); }
  });
  const toggleHide = (id) => {
    setHiddenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem(BROWSE_HIDDEN_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  };
  React.useEffect(() => { if (!isBrowseRoot) setManageMode(false); }, [isBrowseRoot]);

  // Browse fetch — runs whenever the path tail changes.
  React.useEffect(() => {
    if (!conn || !speakerId || showingSearch) { setItems(null); return; }
    let alive = true;
    setItems(null); setError(null);
    (async () => {
      try {
        const msg = { type: 'media_player/browse_media', entity_id: speakerId };
        if (head) {
          msg.media_content_id = head.contentId;
          msg.media_content_type = head.contentType;
        }
        const resp = await conn.sendMessagePromise(msg);
        if (!alive) return;
        const children = resp?.children || [];
        const filtered = children.filter(isMusicItem);
        // Surface response shape so users can spot truncation when a
        // big library (artists, albums, tracks) gets capped by MA. The
        // node title + counts are enough to diagnose without leaking PII.
        const label = head?.title || 'root';
        const first = filtered[0]?.title || '∅';
        const last = filtered[filtered.length - 1]?.title || '∅';
        pushDiag(`music: browse "${label}" — ${filtered.length}/${children.length} items (${first} → ${last})`);
        setItems(filtered);
      } catch (e) { if (alive) setError(e?.message || String(e)); }
    })();
    return () => { alive = false; };
  }, [conn, speakerId, head?.contentId, head?.contentType, showingSearch]);

  // Search fetch.
  React.useEffect(() => {
    if (mode !== 'search') return;
    if (!conn || !query.trim() || !speakerId) { setResults(null); setSearchError(null); return; }
    let alive = true;
    const t = setTimeout(async () => {
      try {
        const resp = await conn.sendMessagePromise({
          type: 'media_player/search_media', entity_id: speakerId, search_query: query.trim(),
        });
        if (!alive) return;
        setResults((resp?.result || resp?.results || []).filter(isMusicItem));
        setSearchError(null);
      } catch (e) {
        if (alive) { setResults([]); setSearchError(e?.message || String(e)); }
      }
    }, 300);
    return () => { alive = false; clearTimeout(t); };
  }, [conn, query, speakerId, mode]);

  React.useEffect(() => { if (mode === 'search') inputRef.current?.focus(); }, [mode]);

  const drillInto = (item) => {
    setPath(p => [...p, {
      contentId: item.media_content_id,
      contentType: item.media_content_type,
      contentClass: item.media_class,
      title: item.title,
      thumbnail: item.thumbnail,
    }]);
    if (results !== null) setResults(null);
    setQuery('');
  };

  // Albums, playlists, and artists ALWAYS drill in instead of playing
  // their first track, even when MA marks them can_expand=false. The
  // user expects to see the track list before committing to play.
  const DRILL_CLASSES = new Set(['artist', 'album', 'playlist', 'directory', 'genre', 'composer']);
  const onItemClick = async (item) => {
    const cls = (item.media_class || '').toLowerCase();
    if (item.can_expand || DRILL_CLASSES.has(cls)) {
      drillInto(item);
      return;
    }
    if (item.can_play) { playMedia(item, 'play'); onClose(); }
  };

  return (
    <Overlay onClose={onClose} ctx={ctx}>
      {/* Header — search bar (search mode @ root) or breadcrumb (browse) */}
      {showingSearch ? (
        <div style={{padding: 18, borderBottom: `.5px solid ${p.border}`, display: 'flex', alignItems: 'center', gap: 10}}>
          <span style={{fontSize: 18, color: p.fg3}}>🔍</span>
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, albums…"
            style={{flex: 1, border: 0, outline: 'none', background: 'transparent',
              color: p.fg, fontSize: 16, fontFamily: fonts.body}}/>
          <button onClick={onClose} style={overlayCloseBtn(p)}>×</button>
        </div>
      ) : (
        <div style={{padding: 14, borderBottom: `.5px solid ${p.border}`,
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
          <button onClick={() => setPath([])} disabled={!path.length}
            style={{padding: '6px 12px', borderRadius: 7, background: 'transparent',
              border: `.5px solid ${p.border2}`, color: path.length ? p.fg : p.fg3,
              cursor: path.length ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: 12}}>
            {mode === 'search' ? '← Search' : 'Browse'}
          </button>
          {path.map((node, i) => (
            <React.Fragment key={node.contentId}>
              <span style={{color: p.fg3, fontSize: 12}}>›</span>
              <button onClick={() => setPath(prev => prev.slice(0, i + 1))}
                style={{padding: '6px 12px', borderRadius: 7, background: 'transparent', border: 'none',
                  color: i === path.length - 1 ? p.fg : p.fg2, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: i === path.length - 1 ? 500 : 400,
                  overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200, whiteSpace: 'nowrap'}}>
                {node.title}
              </button>
            </React.Fragment>
          ))}
          <div style={{flex: 1}}/>
          {showLoadAll && (
            <button onClick={loadAll} disabled={loadingAll}
              title="Music Assistant caps browse at a few hundred items. This fans out searches A-Z + 0-9 to grab the rest."
              style={{padding: '6px 12px', borderRadius: 7,
                background: 'transparent',
                border: `.5px solid ${loadingAll ? p.border : p.accent}`,
                color: loadingAll ? p.fg3 : p.accent,
                cursor: loadingAll ? 'default' : 'pointer',
                fontFamily: 'inherit', fontSize: 12,
                opacity: loadingAll ? 0.7 : 1}}>
              {loadingAll ? 'Loading…' : 'Load all'}
            </button>
          )}
          {isBrowseRoot && (
            <button onClick={() => setManageMode(m => !m)}
              style={{padding: '6px 12px', borderRadius: 7,
                background: manageMode ? p.surface2 : 'transparent',
                border: `.5px solid ${p.border2}`,
                color: manageMode ? p.accent : p.fg2,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 12}}>
              {manageMode ? 'Done' : 'Manage'}
            </button>
          )}
          <button onClick={onClose} style={overlayCloseBtn(p)}>×</button>
        </div>
      )}

      {/* Body */}
      <div style={{flex: 1, overflowY: 'auto', minHeight: 0}}>
        {showingSearch && (
          <SearchBody ctx={ctx} query={query} results={results}
            error={searchError} onItemClick={onItemClick}/>
        )}
        {!showingSearch && isArtist && (
          <ArtistDetail ctx={ctx} conn={conn} speakerId={speakerId}
            artist={head} items={items} error={error}
            onAlbumClick={(item) => drillInto(item)}
            onTrackPlay={(item) => { playMedia(item, 'play'); onClose(); }}/>
        )}
        {!showingSearch && isAlbum && (
          <AlbumDetail ctx={ctx} album={head} items={items} error={error}
            onPlayFromIdx={(idx) => { playFromList(items.filter(i => i.can_play), idx); onClose(); }}/>
        )}
        {!showingSearch && !isArtist && !isAlbum && (
          isBrowseRoot
            ? <BrowseRootList ctx={ctx} items={items} error={error}
                onItemClick={onItemClick}
                manageMode={manageMode} hiddenIds={hiddenIds} onToggleHide={toggleHide}/>
            : <BrowseBody ctx={ctx} items={items} error={error} onItemClick={onItemClick}/>
        )}
      </div>
    </Overlay>
  );
};

const overlayCloseBtn = (p) => ({
  width: 32, height: 32, borderRadius: '50%', border: `.5px solid ${p.border2}`,
  background: 'transparent', color: p.fg2, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
});

// ── Search results body ────────────────────────────────────────────────────
const SearchBody = ({ ctx, query, results, error, onItemClick }) => {
  const { p } = ctx;
  if (!query) {
    return <div style={{padding: 24, fontSize: 13, color: p.fg3, textAlign: 'center'}}>
      Type a song, artist, or album name to search across your linked services.
    </div>;
  }
  if (results === null) return <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Searching…</div>;
  if (error && results?.length === 0) return <div style={{padding: 18, fontSize: 12, color: '#e0a89a'}}>Search failed: {error}</div>;
  if (results.length === 0) return <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>No results for "{query}"</div>;
  return <SortableGrid ctx={ctx} items={results} onItemClick={onItemClick}/>;
};

// ── Browse list body — sorted alphabetically with A-Z scroller ─────────────
const BrowseBody = ({ ctx, items, error, onItemClick }) => {
  const { p } = ctx;
  if (error) return <div style={{padding: 18, fontSize: 12, color: '#e0a89a'}}>{error}</div>;
  if (items === null) return <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>;
  if (items.length === 0) return <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Nothing here.</div>;
  return <SortableGrid ctx={ctx} items={items} onItemClick={onItemClick}/>;
};

// ── Browse root — compact list of top-level categories ────────────────────
// Hidden IDs persist in localStorage so the user's "don't show me Audiobooks"
// preference survives reloads.
const BROWSE_HIDDEN_KEY = 'homecntrd:music:hidden-root';
const BrowseRootList = ({ ctx, items, error, onItemClick, manageMode, hiddenIds, onToggleHide }) => {
  const { p } = ctx;
  if (error) return <div style={{padding: 18, fontSize: 12, color: '#e0a89a'}}>{error}</div>;
  if (items === null) return <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>;
  if (items.length === 0) return <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Nothing here.</div>;

  const visible = manageMode ? items : items.filter(it => !hiddenIds.has(it.media_content_id));
  if (visible.length === 0) return (
    <div style={{padding: 24, fontSize: 13, color: p.fg3, textAlign: 'center'}}>
      Everything's hidden. Tap Manage to bring items back.
    </div>
  );

  return (
    <div>
      {visible.map((item, i) => {
        const hidden = hiddenIds.has(item.media_content_id);
        return (
          <button key={item.media_content_id || item.title}
            onClick={() => manageMode ? onToggleHide(item.media_content_id) : onItemClick(item)}
            style={{
              width: '100%', padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: 12,
              border: 0, background: 'transparent', color: p.fg,
              fontFamily: 'inherit', fontSize: 15, textAlign: 'left',
              cursor: 'pointer',
              borderBottom: i < visible.length - 1 ? `.5px solid ${p.border}` : 'none',
              opacity: manageMode && hidden ? 0.5 : 1,
            }}>
            <span style={{flex: 1, fontWeight: 500}}>{item.title}</span>
            {manageMode ? (
              <span style={{fontSize: 11, color: hidden ? p.fg3 : p.accent,
                letterSpacing: '.04em', textTransform: 'uppercase'}}>
                {hidden ? 'Hidden' : 'Visible'}
              </span>
            ) : (
              <span style={{color: p.fg3, fontSize: 16}}>›</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ── Artist detail — top tracks + albums newest-first ──────────────────────
const ArtistDetail = ({ ctx, conn, speakerId, artist, items, error, onAlbumClick, onTrackPlay }) => {
  const { p, fonts } = ctx;
  // MA's artist node typically has Top Tracks + Albums folders. We
  // expand both in parallel; if children are already a flat list of
  // tracks/albums (some integrations) we partition by media_class.
  const [topTracks, setTopTracks] = React.useState([]);
  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!conn || !speakerId || !items) return;
    let alive = true;
    setLoading(true);
    const fetchInto = async (node) => {
      if (!node?.can_expand) return [];
      try {
        const r = await conn.sendMessagePromise({
          type: 'media_player/browse_media', entity_id: speakerId,
          media_content_id: node.media_content_id,
          media_content_type: node.media_content_type,
        });
        return (r?.children || []).filter(isMusicItem);
      } catch { return []; }
    };
    (async () => {
      const ttFolder = items.find(i => /top\s+tracks?|popular/i.test(i.title || ''));
      const albFolder = items.find(i => /^albums?$/i.test(i.title || ''));
      let tt = items.filter(i => (i.media_class || '').toLowerCase() === 'track');
      let alb = items.filter(i => (i.media_class || '').toLowerCase() === 'album');
      if (ttFolder) tt = await fetchInto(ttFolder);
      if (albFolder) alb = await fetchInto(albFolder);
      if (!alive) return;
      // Sort albums newest-first when MA exposes year/release_date.
      const yearOf = (it) => {
        if (typeof it.year === 'number') return it.year;
        if (it.release_date) return new Date(it.release_date).getFullYear() || 0;
        const m = (it.title || '').match(/\((\d{4})\)/);
        return m ? +m[1] : 0;
      };
      alb = [...alb].sort((a, b) => yearOf(b) - yearOf(a));
      setTopTracks(tt.slice(0, 12));
      setAlbums(alb);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [conn, speakerId, items]);

  if (error) return <div style={{padding: 18, fontSize: 12, color: '#e0a89a'}}>{error}</div>;

  return (
    <div>
      {/* Hero */}
      <div style={{padding: 24, display: 'flex', alignItems: 'center', gap: 18,
        borderBottom: `.5px solid ${p.border}`,
        background: artist.thumbnail ? '#0d0b09' : 'transparent', position: 'relative', overflow: 'hidden',
      }}>
        {artist.thumbnail && (
          <>
            <div aria-hidden style={{position: 'absolute', inset: 0,
              backgroundImage: `url("${artist.thumbnail}")`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(40px) brightness(0.5)', transform: 'scale(1.3)'}}/>
            <div aria-hidden style={{position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.85))'}}/>
          </>
        )}
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 18, color: '#fff'}}>
          <div style={{width: 96, height: 96, borderRadius: '50%', flex: 'none',
            background: artist.thumbnail ? `center / cover no-repeat url("${artist.thumbnail}")` : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
            boxShadow: '0 12px 28px rgba(0,0,0,0.45)'}}/>
          <div>
            <div style={{fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4}}>Artist</div>
            <div style={{fontFamily: fonts.display, fontSize: 28, fontWeight: 500, lineHeight: 1.1}}>{artist.title}</div>
            <div style={{fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4}}>
              {topTracks.length} top track{topTracks.length === 1 ? '' : 's'} · {albums.length} album{albums.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </div>

      {loading && <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>}

      {/* Top tracks */}
      {!loading && topTracks.length > 0 && (
        <div>
          <div style={{padding: '14px 18px 8px', fontFamily: fonts.display, fontSize: 14, color: p.fg, fontWeight: 500}}>
            Popular
          </div>
          {topTracks.map((tr, i) => (
            <button key={tr.media_content_id || i}
              onClick={() => onTrackPlay(tr)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 18px', border: 0, background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
                borderBottom: i < topTracks.length - 1 ? `.5px solid ${p.border}` : 'none',
              }}>
              <div style={{width: 22, fontSize: 11, color: p.fg3, textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>{i + 1}</div>
              <div style={{width: 38, height: 38, borderRadius: 5, flex: 'none',
                background: tr.thumbnail ? `center / cover no-repeat url("${tr.thumbnail}"), oklch(20% 0.05 25)` : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`}}/>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 13, color: p.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{tr.title}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Albums */}
      {!loading && albums.length > 0 && (
        <div>
          <div style={{padding: '18px 18px 8px', fontFamily: fonts.display, fontSize: 14, color: p.fg, fontWeight: 500}}>
            Albums
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, padding: '0 18px 18px'}}>
            {albums.map(alb => <ItemTileSmall key={alb.media_content_id} item={alb} ctx={ctx} onClick={() => onAlbumClick(alb)}/>)}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Album detail — track list, click to play + queue rest ─────────────────
const AlbumDetail = ({ ctx, album, items, error, onPlayFromIdx }) => {
  const { p, fonts } = ctx;
  const tracks = (items || []).filter(i => i.can_play);
  if (error) return <div style={{padding: 18, fontSize: 12, color: '#e0a89a'}}>{error}</div>;

  return (
    <div>
      {/* Hero */}
      <div style={{padding: 24, display: 'flex', alignItems: 'flex-end', gap: 18,
        borderBottom: `.5px solid ${p.border}`,
        background: album.thumbnail ? '#0d0b09' : 'transparent', position: 'relative', overflow: 'hidden',
        minHeight: 180,
      }}>
        {album.thumbnail && (
          <>
            <div aria-hidden style={{position: 'absolute', inset: 0,
              backgroundImage: `url("${album.thumbnail}")`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(40px) brightness(0.5)', transform: 'scale(1.3)'}}/>
            <div aria-hidden style={{position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.85))'}}/>
          </>
        )}
        <div style={{position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 18, color: '#fff', flex: 1}}>
          <div style={{width: 130, height: 130, borderRadius: 8, flex: 'none',
            background: album.thumbnail ? `center / cover no-repeat url("${album.thumbnail}")` : `linear-gradient(135deg, ${p.accent}, oklch(20% 0.05 25))`,
            boxShadow: '0 12px 28px rgba(0,0,0,0.5)'}}/>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4}}>Album</div>
            <div style={{fontFamily: fonts.display, fontSize: 26, fontWeight: 500, lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{album.title}</div>
            <div style={{fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4}}>
              {tracks.length} track{tracks.length === 1 ? '' : 's'}
            </div>
            {tracks.length > 0 && (
              <button onClick={() => onPlayFromIdx(0)} style={{
                marginTop: 12, padding: '8px 16px', borderRadius: 8,
                background: '#fff', color: '#000', border: 0,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>▶ Play album</button>
            )}
          </div>
        </div>
      </div>

      {items === null && <div style={{padding: 24, fontSize: 12, color: p.fg3, textAlign: 'center'}}>Loading…</div>}

      {/* Track list */}
      {tracks.map((tr, i) => (
        <button key={tr.media_content_id || i}
          onClick={() => onPlayFromIdx(i)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 18px', border: 0, background: 'transparent',
            cursor: 'pointer', textAlign: 'left',
            borderBottom: i < tracks.length - 1 ? `.5px solid ${p.border}` : 'none',
          }}>
          <div style={{width: 22, fontSize: 11, color: p.fg3, textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>{i + 1}</div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontSize: 13, color: p.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{tr.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

// ── Tile grid with optional A-Z scroller ──────────────────────────────────
const SortableGrid = ({ ctx, items, onItemClick }) => {
  const { p } = ctx;
  // Always sort alphabetically when there are enough items to need a
  // scroller. Below the threshold we leave the order alone so MA's
  // curated rows ("Recently Added", etc.) stay intact.
  const SORT_THRESHOLD = 25;
  const sorted = React.useMemo(() => {
    if (items.length < SORT_THRESHOLD) return items;
    return [...items].sort((a, b) => (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' }));
  }, [items]);

  const containerRef = React.useRef(null);
  const itemRefs = React.useRef(new Map());

  const letters = React.useMemo(() => {
    if (sorted.length < SORT_THRESHOLD) return [];
    const set = new Set();
    for (const it of sorted) {
      const c = ((it.title || '').trim()[0] || '').toUpperCase();
      set.add(/[A-Z]/.test(c) ? c : '#');
    }
    const arr = [...set];
    arr.sort((a, b) => a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b));
    return arr;
  }, [sorted]);

  const jumpTo = (letter) => {
    const target = sorted.find(it => {
      const c = ((it.title || '').trim()[0] || '').toUpperCase();
      const bucket = /[A-Z]/.test(c) ? c : '#';
      return bucket === letter;
    });
    if (!target) return;
    const node = itemRefs.current.get(target.media_content_id);
    if (node) {
      // scrollIntoView with `nearest` so we don't yank past the header.
      node.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  return (
    <div style={{display: 'flex', minHeight: '100%'}}>
      <div ref={containerRef} style={{flex: 1, minWidth: 0,
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12, padding: 18,
      }}>
        {sorted.map(item => (
          <div key={item.media_content_id || item.title}
            ref={(node) => { if (node) itemRefs.current.set(item.media_content_id, node); }}>
            <ItemTileSmall item={item} ctx={ctx} onClick={() => onItemClick(item)}/>
          </div>
        ))}
      </div>
      {letters.length > 0 && (
        <div style={{
          position: 'sticky', top: 0, alignSelf: 'flex-start',
          display: 'flex', flexDirection: 'column', gap: 1,
          padding: '14px 8px', flex: 'none',
        }}>
          {letters.map(l => (
            <button key={l} onClick={() => jumpTo(l)} style={{
              width: 22, height: 18, padding: 0,
              border: 0, background: 'transparent',
              color: p.fg2, cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 10, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 4,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = p.surface2; e.currentTarget.style.color = p.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = p.fg2; }}
            >{l}</button>
          ))}
        </div>
      )}
    </div>
  );
};

// Small reusable tile for grid views inside the overlay.
const ItemTileSmall = ({ item, onClick, ctx }) => {
  const { p, user, patchUser } = ctx;
  const cls = (item.media_class || '').toLowerCase();
  const pinnable = cls === 'album' || cls === 'playlist';
  const pins = Array.isArray(user?.pinnedMedia) ? user.pinnedMedia : [];
  const pinId = item.media_content_id;
  const isPinned = pinnable && pins.some(x => x.id === pinId);
  const atCap = pins.length >= 6 && !isPinned;

  const togglePin = (e) => {
    e.stopPropagation();
    if (typeof patchUser !== 'function') return;
    if (isPinned) {
      patchUser(u => ({ ...u, pinnedMedia: (u?.pinnedMedia || []).filter(x => x.id !== pinId) }));
      return;
    }
    if (atCap) return; // cap at 6; user must remove one first from the dashboard
    const fresh = {
      id: pinId,
      name: item.title || 'Untitled',
      art: item.thumbnail || '',
      contentId: item.media_content_id,
      contentType: item.media_content_type || cls || 'album',
      class: cls,
    };
    patchUser(u => {
      const current = (u?.pinnedMedia || []).filter(x => x.id !== pinId);
      // Most-recent first; cap at 6 in case state has drifted somehow.
      return { ...u, pinnedMedia: [fresh, ...current].slice(0, 6) };
    });
  };

  return (
    <button onClick={onClick} style={{
      padding: 0, border: 0, background: 'transparent',
      cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, width: '100%',
    }}>
      <div style={{aspectRatio: '1', borderRadius: 8, overflow: 'hidden',
        background: `linear-gradient(135deg, ${p.surface2}, ${p.surface})`, position: 'relative',
        ...(cls === 'artist' ? { borderRadius: '50%' } : {}),
      }}>
        {item.thumbnail && (
          <img src={item.thumbnail} alt=""
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
        )}
        {!item.can_expand && item.can_play && (
          <div style={{position: 'absolute', bottom: 6, right: 6, width: 24, height: 24, borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11}}>▶</div>
        )}
        {pinnable && (
          <span
            role="button"
            tabIndex={0}
            onClick={togglePin}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePin(e); }}
            aria-label={isPinned ? 'Unpin from home' : (atCap ? 'Pin limit reached' : 'Pin to home')}
            title={isPinned ? 'Unpin from home' : (atCap ? 'Pinned limit (6) reached — remove one to add another' : 'Pin to home')}
            style={{
              position: 'absolute', top: 6, left: 6,
              width: 26, height: 26, borderRadius: '50%',
              background: isPinned ? p.accent : 'rgba(0,0,0,0.55)',
              color: '#fff', fontSize: 13, lineHeight: 1,
              display: 'grid', placeItems: 'center',
              cursor: atCap ? 'not-allowed' : 'pointer',
              opacity: atCap ? 0.45 : 1,
              userSelect: 'none',
            }}
          >📌</span>
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

const Overlay = ({ onClose, children, ctx }) => {
  const { p } = ctx;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
      display: 'grid', placeItems: 'center', padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 'min(820px, 100%)', maxHeight: '88vh',
        background: p.surface, border: `.5px solid ${p.border2}`,
        borderRadius: 14, display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
      }}>
        {children}
      </div>
    </div>
  );
};

window.MusicView = MusicView;
