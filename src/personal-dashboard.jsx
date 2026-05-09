// personal-dashboard.jsx — the new Home page.
//
// Black background, tangerine accents, two-column layout (main + calendar).

import HassContext from './lib/hass-context.js';
import { fetchAllScores, LEAGUES as SPORT_LEAGUES } from './lib/sports.js';
import {
  TILE_REGISTRY, loadLayout, saveLayout, resetLayout,
  moveTile, moveTileUp, moveTileDown, setTileSpan, setTileHidden,
} from './lib/layout.js';

const PersonalDashboard = ({ ctx, onOpenMenu }) => {
  const { p, fonts, state, user, narrow, setPage } = ctx;
  const hass = React.useContext(HassContext);
  const accent = p.accent;
  const surface = '#1a1612';
  const surface2 = '#221d18';
  const fg = '#f1ead9';
  const fg2 = 'rgba(241,234,217,0.7)';
  const fg3 = 'rgba(241,234,217,0.42)';
  const border = 'rgba(241,234,217,0.1)';
  const display = fonts.display;
  const body = fonts.body;

  const today = new Date();
  const dayName = today.toLocaleDateString([], { weekday: 'long' });
  const dateStr = today.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });

  // Calendar events. Fetch window follows the currently-viewed month
  // (CalendarColumn's < › nav) so the user can scroll forward/back and
  // see real dots + day filtering, but always includes the next two
  // weeks from today so 'Next 3 days' keeps working when navigated to a
  // different month.
  //
  // HA exposes calendar events via:
  //   - REST:       GET /api/calendars/<entity_id>?start=...&end=...
  //   - WebSocket:  calendar/event/subscribe (live stream)
  //
  // There is no bulk "list events" WS command (`calendar/get_events` and
  // `calendar/list_events` don't exist in HA core). REST is tried first;
  // if it returns nothing we fall back to the subscribe path the HA
  // frontend itself uses for live calendar cards.
  const [viewMonth, setViewMonth] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [fetchedEvents, setFetchedEvents] = React.useState([]);
  const calendarIds = (state.calendar || []).map(c => c.id).join(',');
  const viewMonthKey = `${viewMonth.getFullYear()}-${viewMonth.getMonth()}`;
  React.useEffect(() => {
    if (!hass || !calendarIds) { setFetchedEvents([]); return; }
    let alive = true;
    const ids = calendarIds.split(',').filter(Boolean);
    const diag = (entry) => {
      if (typeof window === 'undefined') return;
      if (!window.__hcDiag) window.__hcDiag = [];
      window.__hcDiag.push(entry);
      while (window.__hcDiag.length > 50) window.__hcDiag.shift();
    };

    // Normalise one HA calendar event into the shape the dashboard
    // renders. Handles all four start/end shapes HA integrations use in
    // the wild: ISO string, "YYYY-MM-DD HH:MM:SS" (no T), `{ dateTime }`,
    // or `{ date }`.
    const parseEvent = (ev, calId) => {
      const startVal = (ev.start && (ev.start.dateTime || ev.start.date)) || ev.start;
      const endVal = (ev.end && (ev.end.dateTime || ev.end.date)) || ev.end;
      if (!startVal) return null;
      let isAllDay;
      if (ev.start && typeof ev.start === 'object') {
        isAllDay = !ev.start.dateTime && !!ev.start.date;
      } else if (typeof startVal === 'string') {
        isAllDay = !/\d{2}:\d{2}/.test(startVal);
      } else {
        isAllDay = false;
      }
      const startDate = new Date(startVal);
      const endDate = endVal ? new Date(endVal) : null;
      return {
        id: `${calId}-${startVal}-${ev.summary || ''}`,
        title: ev.summary || '(untitled)',
        where: ev.location || '',
        kind: /birthday|bday/i.test(ev.summary || '') ? 'birthday' : 'event',
        start: startDate, end: endDate,
        isAllDay,
        sortKey: startDate.getTime(),
      };
    };

    // One-shot subscribe: open `calendar/event/subscribe`, collect events
    // pushed by the server, unsubscribe after a short window. The HA
    // frontend uses this for live calendar cards. The push payloads are
    // either `{ event: {...} }` (single) or `{ events: [...] }` (initial
    // batch) depending on HA version, so handle both.
    const fetchViaSubscribe = (id, startISO, endISO) => new Promise((resolve) => {
      if (!hass.connection?.subscribeMessage) return resolve([]);
      const events = [];
      let unsub = null;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (unsub) { try { unsub(); } catch {} }
        resolve(events);
      };
      const timeout = setTimeout(finish, 1200);
      hass.connection.subscribeMessage(
        (msg) => {
          if (Array.isArray(msg?.events)) events.push(...msg.events);
          else if (msg?.event) events.push(msg.event);
          else if (msg?.added && Array.isArray(msg.added)) events.push(...msg.added);
        },
        { type: 'calendar/event/subscribe', entity_id: id, start: startISO, end: endISO },
      ).then((u) => { unsub = u; }, (err) => {
        clearTimeout(timeout);
        diag({ ts: Date.now(), kind: 'error', message: `calendar ${id}: subscribe failed — ${err?.message || err}` });
        finish();
      });
    });

    const fetchAll = async () => {
      // Window covers the visible month grid (which spills a few days
      // into the prior / next months at the edges) AND today + 14 days,
      // so 'Next 3 days' keeps populating even when the user has scrolled
      // the grid off the current month.
      const monthStart = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
      const monthEnd = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
      const todayMid = new Date(today); todayMid.setHours(0, 0, 0, 0);
      const todayPlus14 = new Date(todayMid); todayPlus14.setDate(todayPlus14.getDate() + 14);
      const start = new Date(Math.min(monthStart.getTime(), todayMid.getTime()));
      // Pad each end of the visible grid by a week so the spillover days
      // also dot correctly.
      start.setDate(start.getDate() - 7);
      const end = new Date(Math.max(monthEnd.getTime(), todayPlus14.getTime()));
      end.setDate(end.getDate() + 7);
      const startISO = start.toISOString();
      const endISO = end.toISOString();
      const allEvents = [];

      // REST path — bulk fetch, the canonical HA pattern.
      try {
        await Promise.all(ids.map(async (id) => {
          try {
            const path = `calendars/${id}?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`;
            const events = await hass.callApi('GET', path);
            if (!Array.isArray(events)) return;
            for (const ev of events) {
              const parsed = parseEvent(ev, id);
              if (parsed) allEvents.push(parsed);
            }
          } catch (e) {
            diag({ ts: Date.now(), kind: 'error', message: `calendar ${id}: REST failed — ${e?.message || e}` });
          }
        }));
      } catch (e) {
        diag({ ts: Date.now(), kind: 'error', message: `calendar REST batch failed — ${e?.message || e}` });
      }

      // If REST returned nothing, try the subscribe path the HA frontend
      // uses for live cards.
      if (allEvents.length === 0) {
        try {
          const subscribeResults = await Promise.all(ids.map(id => fetchViaSubscribe(id, startISO, endISO)));
          subscribeResults.forEach((events, i) => {
            for (const ev of events) {
              const parsed = parseEvent(ev, ids[i]);
              if (parsed) allEvents.push(parsed);
            }
          });
        } catch (e) {
          diag({ ts: Date.now(), kind: 'error', message: `calendar subscribe batch failed — ${e?.message || e}` });
        }
      }

      if (alive) {
        allEvents.sort((a, b) => a.sortKey - b.sortKey);
        setFetchedEvents(allEvents);
      }
    };
    fetchAll();
    const t = setInterval(fetchAll, 5 * 60 * 1000); // refresh every 5 min
    return () => { alive = false; clearInterval(t); };
  }, [hass, calendarIds, viewMonthKey]);

  // Use fetched events when we have them; otherwise fall back to the
  // single-event preview from state.
  const allEvents = fetchedEvents.length > 0 ? fetchedEvents : (state.calendarEvents || []).map(e => ({
    ...e,
    start: e.start ? new Date(e.start) : null,
    end: null,
  }));

  const greet = () => {
    const h = today.getHours();
    if (h < 5) return 'Working late';
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    if (h < 21) return 'Good evening';
    return 'Good night';
  };

  // Tile manager state. The layout describes order, span (1|2 cols),
  // and visibility for the main column's tiles. Persisted to
  // localStorage so it survives reloads.
  const [layout, setLayout] = React.useState(() => loadLayout());
  const [editMode, setEditMode] = React.useState(false);
  const updateLayout = (next) => { setLayout(next); saveLayout(next); };
  const exitEdit = () => setEditMode(false);
  const doReset = () => { const next = resetLayout(); setLayout(next); };

  const tileTheme = { accent, fonts, surface, surface2, fg, fg2, fg3, border, narrow };
  const renderTile = (id) => {
    switch (id) {
      case 'weather': return <WeatherCard weather={state.weather} hass={hass} {...tileTheme}/>;
      case 'car':     return <CarCard hass={hass} {...tileTheme}/>;
      case 'sports':  return <SportsCard {...tileTheme}/>;
      case 'news':    return <NewsCard news={state.news} {...tileTheme}/>;
      case 'todo':    return <TodoCard todos={state.todos} {...tileTheme}/>;
      case 'notes':   return <NotesCard {...tileTheme}/>;
      default: return null;
    }
  };

  return (
    <div style={{
      background: '#0d0b09', color: fg, fontFamily: body,
      minHeight: '100%',
      // Safe-area aware so the status bar / home indicator don't clip
      // the rounded card corners on iPad / iOS Companion.
      paddingTop: `calc(env(safe-area-inset-top, 0px) + ${narrow ? 20 : 32}px)`,
      paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${narrow ? 24 : 40}px)`,
      paddingLeft: 0, paddingRight: 0,
      overflowX: 'hidden',
    }}>
    <div style={{
      // Constrain the content so tiles don't sprawl edge-to-edge on
      // wide viewports — they should sit inside a comfortable column
      // with the page background visible on both sides.
      maxWidth: 1280, margin: '0 auto',
      paddingLeft: narrow ? 16 : 36,
      paddingRight: narrow ? 16 : 36,
    }}>
      {/* Header
          Wide:   [Avatar pill] [Greeting] — Edit + Hamburger live INSIDE the pill.
          Narrow: [Greeting]    [Avatar circle] — Edit lives inside the avatar's
                  dropdown card; hamburger isn't shown (bottom nav covers it). */}
      <div style={{display:'flex', alignItems:'flex-start', gap: 14, marginBottom: narrow ? 24 : 36}}>
        {!narrow && (
          <PresenceAvatar
            hass={hass} user={user}
            accent={accent} fg={fg} fg2={fg2} fg3={fg3} border={border}
            surface={surface} surface2={surface2} fonts={fonts}
            narrow={false}
            editMode={editMode}
            onToggleEdit={() => setEditMode(v => !v)}
            onOpenMenu={onOpenMenu}
          />
        )}
        <div style={{flex: 1, minWidth: 0}}>
          <div style={{fontSize: 11, color: fg3, letterSpacing:'.12em', textTransform:'uppercase', marginBottom: 6}}>{dayName} · {dateStr}</div>
          <div style={{fontFamily: display, fontSize: narrow ? 30 : 40, lineHeight: 1.05, color: fg, fontWeight: 500}}>
            {greet()}, <em style={{fontStyle:'italic', color: accent, fontWeight: 400}}>{user?.firstName || 'there'}.</em>
          </div>
        </div>
        {narrow && (
          <PresenceAvatar
            hass={hass} user={user}
            accent={accent} fg={fg} fg2={fg2} fg3={fg3} border={border}
            surface={surface} surface2={surface2} fonts={fonts}
            narrow={true}
            editMode={editMode}
            onToggleEdit={() => setEditMode(v => !v)}
            onOpenMenu={onOpenMenu}
          />
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(280px, 360px)',
        gap: narrow ? 14 : 22,
      }}>
        {/* Left column — layout-driven tile grid. On narrow viewports we
            inject the calendar after the first tile (Weather) so the
            common-case order is Weather → Calendar → everything else,
            without losing the rest of the tile manager. */}
        <div>
          <TileGrid
            layout={layout}
            updateLayout={updateLayout}
            editMode={editMode}
            renderTile={renderTile}
            theme={tileTheme}
            injectAfterFirst={narrow ? (
              <CalendarColumn
                calendar={state.calendar} events={allEvents}
                viewMonth={viewMonth} setViewMonth={setViewMonth}
                accent={accent} fonts={fonts} surface={surface} surface2={surface2}
                fg={fg} fg2={fg2} fg3={fg3} border={border}
              />
            ) : null}
          />
          {editMode && (
            <EditFooter
              onReset={doReset}
              onDone={exitEdit}
              accent={accent}
              fonts={fonts}
              surface={surface}
              border={border}
              fg={fg}
              fg3={fg3}
            />
          )}
        </div>

        {/* Right column — calendar (wide layouts only; narrow renders it
            inline above via injectAfterFirst). */}
        {!narrow && (
          <CalendarColumn
            calendar={state.calendar} events={allEvents}
            viewMonth={viewMonth} setViewMonth={setViewMonth}
            accent={accent} fonts={fonts} surface={surface} surface2={surface2}
            fg={fg} fg2={fg2} fg3={fg3} border={border}
          />
        )}
      </div>

      <div style={{height: 80}}/>
    </div>
    </div>
  );
};

// ── Tile manager: grid + per-tile edit overlay ────────────────────────────

const TileGrid = ({ layout, updateLayout, editMode, renderTile, theme, injectAfterFirst }) => {
  const { narrow, accent, border, surface, fg, fg2, fg3, fonts } = theme;
  const visible = layout.filter(t => !t.hidden);
  const hidden = layout.filter(t => t.hidden);

  // HTML5 drag is the simplest cross-browser reorder mechanism on desktop.
  // Mobile native DnD is unreliable, so we also expose ↑/↓ buttons in the
  // edit toolbar for touch reordering.
  const [dragId, setDragId] = React.useState(null);

  const onDragStart = (id, e) => {
    setDragId(id);
    try { e.dataTransfer.effectAllowed = 'move'; } catch {}
    try { e.dataTransfer.setData('text/plain', id); } catch {}
  };
  const onDragOver = (e) => { e.preventDefault(); };
  const onDrop = (targetId, e) => {
    e.preventDefault();
    const sourceId = dragId || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
    if (sourceId && sourceId !== targetId) {
      updateLayout(moveTile(layout, sourceId, targetId));
    }
    setDragId(null);
  };
  const onDragEnd = () => setDragId(null);

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'repeat(2, minmax(0, 1fr))',
        gap: narrow ? 14 : 18,
        alignItems: 'start',
      }}>
        {visible.map((t, i) => (
          <React.Fragment key={t.id}>
            <TileFrame
              tile={t}
              index={i}
              isFirst={i === 0}
              isLast={i === visible.length - 1}
              editMode={editMode}
              isDragging={dragId === t.id}
              narrow={narrow}
              theme={theme}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
              onMoveUp={() => updateLayout(moveTileUp(layout, t.id))}
              onMoveDown={() => updateLayout(moveTileDown(layout, t.id))}
              onResize={(span) => updateLayout(setTileSpan(layout, t.id, span))}
              onHide={() => updateLayout(setTileHidden(layout, t.id, true))}
            >
              {renderTile(t.id)}
            </TileFrame>
            {/* Slot for injected content (e.g. calendar on narrow). The
                wrapper spans the full grid row so it doesn't get sucked
                into a column. */}
            {i === 0 && injectAfterFirst && (
              <div style={{gridColumn: '1 / -1'}}>{injectAfterFirst}</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hidden tiles tray — only shown in edit mode so the user can put
          them back without digging into settings. */}
      {editMode && hidden.length > 0 && (
        <div style={{
          marginTop: 22, padding: '14px 16px',
          borderRadius: 12, border: `.5px dashed ${border}`,
          background: 'rgba(241,234,217,0.02)',
        }}>
          <div style={{fontSize: 11, color: fg3, letterSpacing:'.06em', textTransform:'uppercase', marginBottom: 10}}>
            Hidden tiles
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap: 8}}>
            {hidden.map(t => (
              <button
                key={t.id}
                onClick={() => updateLayout(setTileHidden(layout, t.id, false))}
                style={{
                  padding: '7px 12px', borderRadius: 8,
                  background: surface, border: `.5px solid ${border}`,
                  color: fg2, fontSize: 12, fontFamily: 'inherit',
                  cursor: 'pointer', display:'inline-flex', alignItems:'center', gap: 6,
                }}
              >
                <span style={{fontSize: 13}}>+</span>
                {(TILE_REGISTRY[t.id]?.name) || t.id}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TileFrame = ({
  tile, isFirst, isLast, editMode, isDragging, narrow, theme,
  onDragStart, onDragOver, onDrop, onDragEnd,
  onMoveUp, onMoveDown, onResize, onHide,
  children,
}) => {
  const { accent, border, surface, fg, fg2, fg3 } = theme;
  // On narrow viewports everything is single-column anyway, so colSpan is
  // irrelevant — the tile fills the row regardless.
  const span = narrow ? 1 : tile.colSpan;

  return (
    <div
      draggable={editMode}
      onDragStart={(e) => editMode && onDragStart(tile.id, e)}
      onDragOver={editMode ? onDragOver : undefined}
      onDrop={(e) => editMode && onDrop(tile.id, e)}
      onDragEnd={editMode ? onDragEnd : undefined}
      style={{
        position: 'relative',
        gridColumn: `span ${span}`,
        opacity: isDragging ? 0.4 : 1,
        transition: 'opacity 120ms ease',
        // The dashed accent outline tells the user the tile is editable
        // without obscuring the underlying card.
        outline: editMode ? `2px dashed ${accent}66` : 'none',
        outlineOffset: editMode ? 4 : 0,
        borderRadius: 16,
      }}
    >
      {editMode && (
        <div style={{
          position: 'absolute', top: -10, right: 8, zIndex: 5,
          display: 'flex', gap: 4, padding: 4,
          background: '#0d0b09e8', backdropFilter: 'blur(8px)',
          borderRadius: 8, border: `.5px solid ${border}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}>
          <TileBtn onClick={onMoveUp} disabled={isFirst} title="Move up" border={border} fg={fg2}>↑</TileBtn>
          <TileBtn onClick={onMoveDown} disabled={isLast} title="Move down" border={border} fg={fg2}>↓</TileBtn>
          {!narrow && (
            <>
              <TileBtn
                onClick={() => onResize(1)}
                active={tile.colSpan === 1}
                title="Half width"
                border={border} fg={fg2} accent={accent}
              >▭</TileBtn>
              <TileBtn
                onClick={() => onResize(2)}
                active={tile.colSpan === 2}
                title="Full width"
                border={border} fg={fg2} accent={accent}
              >▬</TileBtn>
            </>
          )}
          <TileBtn onClick={onHide} title="Hide" border={border} fg={fg2}>×</TileBtn>
        </div>
      )}

      {editMode && (
        <div style={{
          position: 'absolute', top: -10, left: 8, zIndex: 5,
          padding: '5px 8px',
          background: '#0d0b09e8', backdropFilter: 'blur(8px)',
          borderRadius: 8, border: `.5px solid ${border}`,
          color: fg3, cursor: 'grab',
          fontSize: 11, letterSpacing: '.04em', textTransform: 'uppercase',
          display:'inline-flex', alignItems:'center', gap: 5,
        }}>
          <svg width="10" height="14" viewBox="0 0 6 10" fill="currentColor">
            <circle cx="1.5" cy="1.5" r="1"/><circle cx="4.5" cy="1.5" r="1"/>
            <circle cx="1.5" cy="5"   r="1"/><circle cx="4.5" cy="5"   r="1"/>
            <circle cx="1.5" cy="8.5" r="1"/><circle cx="4.5" cy="8.5" r="1"/>
          </svg>
          Drag
        </div>
      )}

      {children}
    </div>
  );
};

const TileBtn = ({ children, onClick, disabled, active, title, border, fg, accent }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    aria-label={title}
    style={{
      width: 26, height: 26, borderRadius: 6,
      background: active ? accent : 'transparent',
      border: active ? `.5px solid ${accent}` : `.5px solid ${border}`,
      color: active ? '#fff' : fg,
      fontSize: 12, fontFamily: 'inherit',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.35 : 1,
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      lineHeight: 1, padding: 0,
    }}
  >{children}</button>
);

const EditFooter = ({ onReset, onDone, accent, fonts, surface, border, fg, fg3 }) => (
  <div style={{
    marginTop: 18, padding: '12px 14px',
    background: surface, border: `.5px solid ${border}`, borderRadius: 12,
    display:'flex', alignItems:'center', justifyContent:'space-between', gap: 10,
  }}>
    <div style={{fontSize: 12, color: fg3, lineHeight: 1.5}}>
      Drag tiles to reorder, use <strong style={{color: fg}}>▭/▬</strong> to resize, and <strong style={{color: fg}}>×</strong> to hide. Layout saves automatically.
    </div>
    <div style={{display:'flex', gap: 8, flex: 'none'}}>
      <button onClick={onReset} style={{
        padding: '8px 14px', borderRadius: 8,
        background: 'transparent', border: `.5px solid ${border}`,
        color: fg3, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12,
      }}>Reset</button>
      <button onClick={onDone} style={{
        padding: '8px 14px', borderRadius: 8,
        background: accent, border: `.5px solid ${accent}`,
        color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12,
        fontWeight: 500,
      }}>Done</button>
    </div>
  </div>
);

// ── Presence avatar ───────────────────────────────────────────────────────
//
// Header chip that surfaces "where I am / what my phone is doing" without
// any setup beyond the Mobile App / Person integration that HA already
// wires up. Entities are discovered by suffix so the same code works for
// any user — no hard-coded entity IDs.
//
// Narrow: 42px circle on the right of the header; tap opens a 244px
// dropdown card with full status rows + Edit-layout button.
// Wide:   42px circle on the LEFT of the header that expands horizontally
// into a 340px pill on hover/click. Pill shows compact pips plus inline
// Edit and Hamburger buttons.

const ACTIVITY_ICON = {
  stationary: '🧍',
  walking: '🚶',
  running: '🏃',
  automotive: '🚗',
  cycling: '🚴',
};
const ACTIVITY_LABEL = {
  stationary: 'Stationary',
  walking: 'Walking',
  running: 'Running',
  automotive: 'Driving',
  cycling: 'Cycling',
};

const findEntity = (hass, domains, suffixes) => {
  if (!hass || !hass.states) return null;
  for (const sfx of suffixes) {
    for (const id in hass.states) {
      if (!id.endsWith(sfx)) continue;
      if (domains && !domains.some(d => id.startsWith(d + '.'))) continue;
      return hass.states[id];
    }
  }
  return null;
};

const findPerson = (hass, firstName) => {
  if (!hass || !hass.states) return null;
  const lower = (firstName || '').toLowerCase();
  if (lower) {
    const exact = hass.states[`person.${lower}`];
    if (exact) return exact;
    const mosley = hass.states[`person.${lower}_mosley`];
    if (mosley) return mosley;
  }
  for (const id in hass.states) {
    if (id.startsWith('person.')) return hass.states[id];
  }
  return null;
};

const focusGlyph = (state) => {
  const s = String(state || '').toLowerCase().trim();
  if (!s || s === 'no focus' || s === 'unknown' || s === 'unavailable' || s === 'none') return null;
  if (/sleep/.test(s)) return '🌙';
  if (/work/.test(s)) return '💼';
  if (/personal/.test(s)) return '🧘';
  if (/driv/.test(s)) return '🚗';
  if (/dnd|do not disturb|disturb/.test(s)) return '🔕';
  if (/fitness|exerc/.test(s)) return '🏋️';
  if (/mind/.test(s)) return '🧠';
  return '🎯';
};

// Pull the phone's entity prefix from the person entity that HA Companion
// is tracking. `person.<x>.attributes.source` is set to the device tracker
// the integration created (e.g. `device_tracker.andrews_iphone_15_pro`).
// Strip the domain → that's the slug every Companion sensor on that phone
// shares (`sensor.andrews_iphone_15_pro_battery_level`, etc.). Anchoring
// every lookup to this prefix is what keeps the avatar from picking up
// AirTag / watch / remote battery sensors that happen to be alphabetically
// first in `hass.states`.
const phonePrefix = (person) => {
  const src = person?.attributes?.source;
  if (typeof src !== 'string') return null;
  const m = src.match(/^device_tracker\.(.+)$/);
  return m ? m[1] : null;
};

// Fallback used when we can't derive a prefix from `person.source` (e.g.
// the user hasn't opened the iOS Companion app yet, so the device tracker
// hasn't been registered, or they've named it something unusual). Prefer
// IDs that look like a phone; skip ones that obviously aren't.
const PHONE_HINT = /(iphone|ipad|phone|tablet|companion)/i;
const NOT_PHONE = /(airtag|airpods|apple_?tv|_watch|homepod|remote|doorbell|lock|camera|tile_)/i;
const findPhoneEntity = (hass, domain, suffix) => {
  if (!hass || !hass.states) return null;
  let weak = null;
  for (const id in hass.states) {
    if (!id.startsWith(domain + '.')) continue;
    if (!id.endsWith(suffix)) continue;
    if (NOT_PHONE.test(id)) continue;
    if (PHONE_HINT.test(id)) return hass.states[id];
    if (!weak) weak = hass.states[id];
  }
  return weak;
};

// Try the prefix-anchored entity ID first for each (domain, suffix)
// candidate; on miss, fall back to phone-keyword matching. Used for every
// Companion sensor (battery, charge state, activity, focus) so they all
// resolve to the same phone instead of independently picking the first
// thing that ends with the right suffix.
const phoneSensor = (hass, prefix, candidates) => {
  if (!hass || !hass.states) return null;
  if (prefix) {
    for (const [domain, suffix] of candidates) {
      const id = `${domain}.${prefix}${suffix}`;
      if (hass.states[id]) return hass.states[id];
    }
  }
  for (const [domain, suffix] of candidates) {
    const e = findPhoneEntity(hass, domain, suffix);
    if (e) return e;
  }
  return null;
};

const StatusRow = ({ icon, label, value, fg, fg2, fg3, border }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 0',
    borderBottom: `.5px solid ${border}`,
  }}>
    <div style={{width: 22, fontSize: 16, textAlign: 'center'}}>{icon || '·'}</div>
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{fontSize: 10, color: fg3, letterSpacing: '.08em', textTransform: 'uppercase'}}>{label}</div>
      <div style={{fontSize: 13, color: fg, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
        {value || <span style={{color: fg2}}>—</span>}
      </div>
    </div>
  </div>
);

const PresencePip = ({ icon, title, fg2 }) => (
  <span
    title={title || ''}
    style={{
      fontSize: 14, lineHeight: 1, color: fg2,
      display: 'inline-flex', alignItems: 'center',
      flex: 'none',
    }}
  >{icon}</span>
);

const PresenceAvatar = ({
  hass, user,
  accent, fg, fg2, fg3, border, surface, surface2, fonts,
  narrow, editMode, onToggleEdit, onOpenMenu,
}) => {
  const [open, setOpen] = React.useState(false);     // dropdown (narrow) / sticky-expanded (wide)
  const [hovering, setHovering] = React.useState(false);
  const wrapRef = React.useRef(null);

  // Tap-outside closes the narrow dropdown / wide sticky pill. We listen
  // on `click` (not `pointerdown`) so the document handler runs AFTER any
  // inner button's onClick has already fired — otherwise toggling edit
  // mode from inside the dropdown races the close and only one of the two
  // state updates lands.
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  const firstName = user?.firstName || '';
  const initial = (firstName[0] || 'U').toUpperCase();
  const person = findPerson(hass, firstName);
  const personPic = person?.attributes?.entity_picture || null;
  const personState = (person?.state || '').toLowerCase();

  const presenceColor =
    personState === 'home' ? '#34c759'
    : (personState && personState !== 'unknown' && personState !== 'unavailable') ? '#ff9f0a'
    : 'rgba(241,234,217,0.32)';
  const presenceLabel =
    personState === 'home' ? '🏠 Home'
    : !personState || personState === 'unknown' || personState === 'unavailable' ? 'Unknown'
    : (personState === 'not_home' || personState === 'away') ? '✈️ Away'
    : `📍 ${person.state}`;
  const presencePipIcon =
    personState === 'home' ? '🏠'
    : (personState === 'not_home' || personState === 'away') ? '✈️'
    : (personState && personState !== 'unknown' && personState !== 'unavailable') ? '📍'
    : '·';

  // Anchor every Companion sensor lookup to the phone HA Companion is
  // tracking — derived from `person.<x>.attributes.source`. Without this,
  // each suffix match independently picks the first matching entity in
  // `hass.states`, which routinely lands on AirTag / watch / remote
  // batteries and other non-phone sources.
  const phoneId = phonePrefix(person);
  const batt = phoneSensor(hass, phoneId, [['sensor', '_battery_level']]);
  const battNum = batt && !isNaN(parseFloat(batt.state)) ? Math.round(parseFloat(batt.state)) : null;
  const chargeSensor = phoneSensor(hass, phoneId, [
    ['binary_sensor', '_battery_state'],
    ['binary_sensor', '_is_charging'],
    ['sensor', '_battery_state'],
  ]);
  const chargeRaw = (chargeSensor?.state || '').toLowerCase();
  const charging = chargeRaw === 'on' || chargeRaw === 'charging' || chargeRaw === 'full';
  const battIcon = battNum != null
    ? (charging ? '🔌' : (battNum < 20 ? '🪫' : '🔋'))
    : null;
  const battValue = battNum != null
    ? `${battNum}%${charging ? ' · charging' : ''}`
    : null;

  const act = phoneSensor(hass, phoneId, [
    ['sensor', '_activity_2'],
    ['sensor', '_activity'],
  ]);
  const actRaw = (act?.state || '').toLowerCase();
  const actIcon = ACTIVITY_ICON[actRaw] || null;
  const actLabel = ACTIVITY_LABEL[actRaw] || (actRaw && actRaw !== 'unknown' && actRaw !== 'unavailable' ? act.state : null);

  const focus = phoneSensor(hass, phoneId, [['sensor', '_focus']]);
  const focusIcon = focusGlyph(focus?.state);
  const focusLabel = focusIcon ? focus.state : null;

  // The avatar circle. Used as the left endcap of both the narrow chip
  // and the wide pill. Presence dot stays inside the 42×42 box so it
  // doesn't get clipped by the pill's `overflow: hidden` during the
  // width transition.
  const avatarCircle = (
    <div style={{
      position: 'relative',
      width: 42, height: 42, borderRadius: '50%',
      flex: 'none',
      background: personPic
        ? `center/cover no-repeat url(${personPic})`
        : `linear-gradient(135deg, #ff8a3d 0%, ${accent} 100%)`,
      color: '#fff',
      fontFamily: fonts.display, fontWeight: 600, fontSize: 18,
      letterSpacing: '.02em',
      display: 'grid', placeItems: 'center',
      boxShadow: 'inset 0 0 0 .5px rgba(255,255,255,0.12)',
    }}>
      {!personPic && initial}
      <span aria-hidden style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 12, height: 12, borderRadius: '50%',
        background: presenceColor,
        border: '2px solid #0d0b09',
        boxSizing: 'border-box',
      }}/>
    </div>
  );

  if (narrow) {
    return (
      <div ref={wrapRef} style={{position: 'relative', flex: 'none'}}>
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Profile and presence"
          aria-expanded={open}
          style={{
            padding: 0, background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'block',
          }}
        >
          {avatarCircle}
        </button>
        {open && (
          <div style={{
            position: 'absolute', top: 50, right: 0, width: 244,
            background: surface2, border: `.5px solid ${border}`,
            borderRadius: 14, padding: '6px 14px 14px',
            boxShadow: '0 14px 32px rgba(0,0,0,0.45)',
            zIndex: 50,
          }}>
            <StatusRow icon="🏠" label="Presence" value={presenceLabel}
              fg={fg} fg2={fg2} fg3={fg3} border={border}/>
            <StatusRow icon={battIcon} label="Battery" value={battValue}
              fg={fg} fg2={fg2} fg3={fg3} border={border}/>
            <StatusRow icon={actIcon} label="Activity" value={actLabel}
              fg={fg} fg2={fg2} fg3={fg3} border={border}/>
            {focusIcon && (
              <StatusRow icon={focusIcon} label="Focus" value={focusLabel}
                fg={fg} fg2={fg2} fg3={fg3} border={border}/>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleEdit) onToggleEdit();
                setOpen(false);
              }}
              style={{
                marginTop: 12, width: '100%', height: 36,
                borderRadius: 8,
                background: editMode ? accent : 'transparent',
                border: `.5px solid ${editMode ? accent : border}`,
                color: editMode ? '#fff' : fg,
                cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 12, fontWeight: 500,
                letterSpacing: '.04em', textTransform: 'uppercase',
              }}
            >
              {editMode ? '✓ Done editing' : '✎ Edit layout'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Wide: avatar expands horizontally into a 340px pill.
  const expanded = open || hovering;
  const iconBtn = (label, content, onClick) => (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: 28, height: 28, borderRadius: 8, flex: 'none',
        background: 'transparent', border: `.5px solid ${border}`,
        color: fg, cursor: 'pointer',
        display: 'grid', placeItems: 'center',
        fontSize: 13, lineHeight: 1, fontFamily: 'inherit',
      }}
    >{content}</button>
  );

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={(e) => {
        // Only sticky-toggle when the click lands on the avatar / pill bg
        // itself; inner buttons stop propagation via their own handlers.
        if (e.target === e.currentTarget) setOpen(v => !v);
      }}
      style={{
        height: 42,
        width: expanded ? 340 : 42,
        borderRadius: 21,
        background: surface,
        border: `.5px solid ${border}`,
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        transition: 'width 220ms cubic-bezier(.2,.7,.2,1)',
        flex: 'none',
        cursor: 'pointer',
      }}
    >
      {avatarCircle}
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', alignItems: 'center', gap: 8,
        paddingLeft: 10, paddingRight: 7,
        opacity: expanded ? 1 : 0,
        transition: 'opacity 160ms ease 60ms',
      }}>
        <PresencePip icon={presencePipIcon} title={presenceLabel} fg2={fg2}/>
        {battIcon && <PresencePip icon={battIcon} title={battValue || ''} fg2={fg2}/>}
        {actIcon && <PresencePip icon={actIcon} title={actLabel || ''} fg2={fg2}/>}
        {focusIcon && <PresencePip icon={focusIcon} title={focusLabel || ''} fg2={fg2}/>}
        <div style={{flex: 1}}/>
        <div onClick={(e) => e.stopPropagation()} style={{display: 'flex', gap: 6, flex: 'none'}}>
          {iconBtn(
            editMode ? 'Done editing' : 'Edit layout',
            <span style={{color: editMode ? accent : fg}}>{editMode ? '✓' : '✎'}</span>,
            onToggleEdit,
          )}
          {onOpenMenu && iconBtn(
            'Open menu',
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>,
            onOpenMenu,
          )}
        </div>
      </div>
    </div>
  );
};

// ── Section: Weather ──────────────────────────────────────────────────────
const CONDITION_ICON = {
  'sunny': '☀️',
  'clear-night': '🌙',
  'partlycloudy': '⛅',
  'cloudy': '☁️',
  'rainy': '🌧️',
  'pouring': '🌧️',
  'lightning': '⛈️',
  'lightning-rainy': '⛈️',
  'snowy': '❄️',
  'snowy-rainy': '🌨️',
  'fog': '🌫️',
  'windy': '💨',
  'windy-variant': '💨',
  'hail': '🌨️',
  'exceptional': '⚠️',
};
const conditionIcon = (c) => CONDITION_ICON[c] || '☁️';
const conditionLabel = (c) => (c || 'unknown').replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase());

const WeatherCard = ({ weather, hass, accent, fonts, surface, surface2, fg, fg2, fg3, border, narrow }) => {
  // Pull a daily forecast via the get_forecasts service. Newer HA versions
  // (2024.1+) deprecated the inline forecast attribute; this is the right
  // path going forward and works across most weather integrations.
  const [daily, setDaily] = React.useState([]);
  const weatherId = weather?.id;
  React.useEffect(() => {
    if (!hass || !weatherId) return;
    let alive = true;
    const fetchForecast = async () => {
      try {
        const resp = await hass.connection.sendMessagePromise({
          type: 'call_service',
          domain: 'weather',
          service: 'get_forecasts',
          service_data: { type: 'daily' },
          target: { entity_id: weatherId },
          return_response: true,
        });
        const arr = resp?.response?.[weatherId]?.forecast;
        if (alive && Array.isArray(arr)) setDaily(arr.slice(0, 4));
      } catch {
        // Fallback for older integrations: read the inline forecast attr
        const att = hass.states?.[weatherId]?.attributes;
        if (alive && Array.isArray(att?.forecast)) {
          setDaily(att.forecast.slice(0, 4));
        }
      }
    };
    fetchForecast();
    const t = setInterval(fetchForecast, 30 * 60 * 1000); // 30 min
    return () => { alive = false; clearInterval(t); };
  }, [hass, weatherId]);

  if (!weather || weather.summary === 'Unavailable') {
    return <EmptyCard title="Weather" hint="Add a Weather integration in HA → Devices & Services. Pirate Weather and Met.no are both free." surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} fonts={fonts} accent={accent}/>;
  }

  // Skip "today" from the forecast since the headline already shows it.
  // Different integrations sometimes lead with tomorrow already — detect by
  // comparing to today's local date.
  const todayKey = ymd(new Date());
  const upcoming = daily
    .map(f => ({ ...f, _date: new Date(f.datetime || f.date || Date.now()) }))
    .filter(f => ymd(f._date) !== todayKey)
    .slice(0, 3);

  return (
    <div style={{
      padding: narrow ? '20px 18px' : '24px 28px',
      borderRadius: 16, background: surface, border: `.5px solid ${border}`,
    }}>
      <div style={{fontSize:11, color:fg3, letterSpacing:'.06em', textTransform:'uppercase', marginBottom: narrow ? 12 : 16}}>Weather</div>

      <div style={{
        display:'flex', alignItems:'center',
        gap: narrow ? 14 : 28,
        flexWrap: narrow ? 'wrap' : 'nowrap',
      }}>
        {/* Current conditions */}
        <div style={{display:'flex', alignItems:'center', gap: narrow ? 12 : 18, flex: 'none'}}>
          <div style={{fontFamily: fonts.display, fontSize: narrow ? 52 : 64, lineHeight: 1, color: fg, fontWeight: 400, fontVariantNumeric: 'tabular-nums'}}>
            {weather.temp}°
          </div>
          <div style={{display:'flex', flexDirection:'column', gap: 2}}>
            <div style={{fontSize: narrow ? 32 : 40, lineHeight: 1}}>{conditionIcon(weather.condition)}</div>
            <div style={{fontSize: 12, color: fg2, marginTop: 4}}>{conditionLabel(weather.condition)}</div>
            <div style={{fontSize: 11, color: fg3, fontVariantNumeric: 'tabular-nums'}}>
              H {weather.high}° · L {weather.low}°
            </div>
          </div>
        </div>

        {/* 3-day forecast — inline, no boxes */}
        {upcoming.length > 0 && (
          <div style={{
            flex: 1, minWidth: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${upcoming.length}, 1fr)`,
            gap: narrow ? 8 : 14,
          }}>
            {upcoming.map((f, i) => {
              const dayLabel = f._date.toLocaleDateString([], { weekday: 'short' });
              const high = Math.round(f.temperature ?? f.temp ?? 0);
              const low = Math.round(f.templow ?? f.temp_low ?? f.temp_min ?? 0);
              return (
                <div key={i} style={{
                  display:'flex', flexDirection:'column', alignItems:'center', gap: 4,
                  textAlign:'center',
                }}>
                  <div style={{fontSize: 10, color: fg3, letterSpacing:'.06em', textTransform:'uppercase', fontWeight: 500}}>{dayLabel}</div>
                  <div style={{fontSize: narrow ? 26 : 30, lineHeight: 1}}>{conditionIcon(f.condition)}</div>
                  <div style={{fontFamily: fonts.display, fontSize: 15, color: fg, fontWeight: 500, fontVariantNumeric:'tabular-nums'}}>
                    {high}° <span style={{color: fg3, fontWeight: 400}}>/ {low}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Section: Car (Tessie) ─────────────────────────────────────────────────
//
// Reads from / writes to the Tessie integration. Entity ids follow the
// pattern <prefix>_<thing> where the prefix is the slugified Tesla name.
// Change CAR_PREFIX if you rename the car in the Tesla app.
const CAR_PREFIX = 'tone';

const CarCard = ({ hass, accent, fonts, surface, surface2, fg, fg2, fg3, border, narrow }) => {
  // Force a re-render when hass.states changes. The HassContext value is
  // the same object reference across updates, so we listen for the
  // bridge's tick (which the rest of the dashboard already drives).
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    if (!hass) return;
    const t = setInterval(force, 5000); // refresh local view every 5s
    return () => clearInterval(t);
  }, [hass]);

  const stateOf = (id) => hass?.states?.[id];
  const val = (id) => stateOf(id)?.state ?? null;
  const num = (id) => {
    const s = val(id);
    if (s === null || s === undefined || s === 'unavailable' || s === 'unknown') return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  };
  const attr = (id, key) => stateOf(id)?.attributes?.[key];
  const exists = (id) => !!stateOf(id);

  const callService = async (domain, service, data = {}) => {
    if (!hass?.callService) return;
    try { await hass.callService(domain, service, data); }
    catch (err) { console.error(`[car] ${domain}.${service} failed:`, err); }
  };

  // Reads
  const battery = num(`sensor.${CAR_PREFIX}_battery_level`);
  const range = num(`sensor.${CAR_PREFIX}_battery_range`);
  const rangeUnit = attr(`sensor.${CAR_PREFIX}_battery_range`, 'unit_of_measurement') || 'mi';
  const charging = val(`sensor.${CAR_PREFIX}_charging`);
  const isCharging = charging === 'Charging';
  const timeToFull = num(`sensor.${CAR_PREFIX}_time_to_full_charge`); // hours
  const inside = num(`sensor.${CAR_PREFIX}_inside_temperature`);
  const outside = num(`sensor.${CAR_PREFIX}_outside_temperature`);
  const tempUnit = attr(`sensor.${CAR_PREFIX}_inside_temperature`, 'unit_of_measurement') || '°F';

  const lockId = `lock.${CAR_PREFIX}`;
  const lockState = val(lockId);
  const isLocked = lockState === 'locked';

  const climateId = `climate.${CAR_PREFIX}_climate`;
  const climateState = val(climateId);
  const climateOn = climateState && climateState !== 'off' && climateState !== 'unavailable' && climateState !== 'unknown';
  const climateTarget = attr(climateId, 'temperature');
  const climateMin = attr(climateId, 'min_temp') ?? 60;
  const climateMax = attr(climateId, 'max_temp') ?? 82;

  const frunkId = `cover.${CAR_PREFIX}_frunk`;
  const trunkId = `cover.${CAR_PREFIX}_trunk`;
  const chargePortId = `cover.${CAR_PREFIX}_charge_port_door`;
  const sentryId = `switch.${CAR_PREFIX}_sentry_mode`;
  const defrostId = `switch.${CAR_PREFIX}_defrost`;

  // No data yet — show a friendly placeholder rather than a broken card.
  if (!hass || !exists(`sensor.${CAR_PREFIX}_battery_level`)) {
    return (
      <Card surface={surface} border={border}>
        <CardHeader title="Car" right={null} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
        <div style={{fontSize:12, color:fg3, lineHeight: 1.5}}>
          Waiting for Tessie data. If this persists, check that the Tessie integration is active in HA and that the car name's slug is <code style={{color:fg2}}>{CAR_PREFIX}</code>.
        </div>
      </Card>
    );
  }

  const carName = attr(`sensor.${CAR_PREFIX}_battery_level`, 'friendly_name')?.replace(/ Battery level$/i, '') || 'Tone';
  const batteryColor = battery === null
    ? fg3
    : battery <= 20 ? '#c14d36' : battery <= 40 ? '#d8843e' : accent;

  return (
    <Card surface={surface} border={border}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 14, gap: 8}}>
        <div style={{fontFamily: fonts.display, fontSize: 18, color: fg, fontWeight: 500}}>{carName}</div>
        <div style={{display:'flex', alignItems:'center', gap: 8}}>
          {isCharging && (
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 999,
              background: `${accent}22`, color: accent, fontWeight: 500,
              letterSpacing: '.04em', textTransform: 'uppercase',
            }}>Charging</span>
          )}
          <span style={{fontSize: 11, color: isLocked ? fg2 : '#d8843e'}}>
            {isLocked ? 'Locked' : 'Unlocked'}
          </span>
        </div>
      </div>

      {/* Battery + range row */}
      <div style={{display:'flex', alignItems:'center', gap: narrow ? 14 : 22, marginBottom: 16, flexWrap:'wrap'}}>
        <div style={{flex: 1, minWidth: 200}}>
          <div style={{display:'flex', alignItems:'baseline', gap: 8, marginBottom: 6}}>
            <div style={{fontFamily: fonts.display, fontSize: narrow ? 36 : 44, lineHeight: 1, color: fg, fontWeight: 400, fontVariantNumeric:'tabular-nums'}}>
              {battery !== null ? `${Math.round(battery)}%` : '—'}
            </div>
            {range !== null && (
              <div style={{fontSize: 13, color: fg3, fontVariantNumeric:'tabular-nums'}}>
                · {Math.round(range)} {rangeUnit}
              </div>
            )}
          </div>
          {/* Battery bar */}
          <div style={{width: '100%', height: 6, background: 'rgba(241,234,217,0.06)', borderRadius: 3, overflow:'hidden'}}>
            <div style={{
              width: `${Math.max(0, Math.min(100, battery ?? 0))}%`,
              height: '100%', background: batteryColor,
              transition: 'width 600ms ease',
            }}/>
          </div>
          {isCharging && timeToFull !== null && timeToFull > 0 && (
            <div style={{fontSize: 11, color: fg3, marginTop: 6, fontVariantNumeric:'tabular-nums'}}>
              {formatTimeToFull(timeToFull)} until full
            </div>
          )}
        </div>

        {/* Temps */}
        {(inside !== null || outside !== null) && (
          <div style={{display:'flex', gap: 14, flex:'none'}}>
            {inside !== null && (
              <Stat label="Inside" value={`${Math.round(inside)}${tempUnit}`} fonts={fonts} fg={fg} fg3={fg3}/>
            )}
            {outside !== null && (
              <Stat label="Outside" value={`${Math.round(outside)}${tempUnit}`} fonts={fonts} fg={fg} fg3={fg3}/>
            )}
          </div>
        )}
      </div>

      {/* Climate set point — only if climate is on */}
      {climateOn && climateTarget !== undefined && climateTarget !== null && (
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between', gap: 10,
          padding: '10px 12px', borderRadius: 10, marginBottom: 12,
          background: `${accent}11`, border: `.5px solid ${accent}33`,
        }}>
          <div>
            <div style={{fontSize: 10, color: accent, letterSpacing:'.06em', textTransform:'uppercase', fontWeight: 600, marginBottom: 2}}>Climate target</div>
            <div style={{fontFamily: fonts.display, fontSize: 22, color: fg, fontVariantNumeric:'tabular-nums'}}>
              {Math.round(climateTarget)}{tempUnit}
            </div>
          </div>
          <div style={{display:'flex', gap: 6}}>
            <TempBtn onClick={() => callService('climate', 'set_temperature', { entity_id: climateId, temperature: Math.max(climateMin, climateTarget - 1) })} border={border} fg={fg2}>−</TempBtn>
            <TempBtn onClick={() => callService('climate', 'set_temperature', { entity_id: climateId, temperature: Math.min(climateMax, climateTarget + 1) })} border={border} fg={fg2}>+</TempBtn>
          </div>
        </div>
      )}

      {/* Action grid */}
      <div style={{
        display:'grid',
        gridTemplateColumns: `repeat(${narrow ? 2 : 3}, 1fr)`,
        gap: 8,
      }}>
        {exists(lockId) && (
          <CarBtn
            label={isLocked ? 'Unlock' : 'Lock'}
            icon={isLocked ? '🔓' : '🔒'}
            active={!isLocked}
            onClick={() => callService('lock', isLocked ? 'unlock' : 'lock', { entity_id: lockId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(climateId) && (
          <CarBtn
            label={climateOn ? 'Climate off' : 'Climate on'}
            icon={climateOn ? '🌡️' : '🌬️'}
            active={climateOn}
            onClick={() => callService('climate', climateOn ? 'turn_off' : 'turn_on', { entity_id: climateId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(frunkId) && (
          <CarBtn
            label="Frunk"
            sub={val(frunkId) === 'open' ? 'Open' : 'Closed'}
            icon="🚗"
            active={val(frunkId) === 'open'}
            onClick={() => callService('cover', val(frunkId) === 'open' ? 'close_cover' : 'open_cover', { entity_id: frunkId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(trunkId) && (
          <CarBtn
            label="Trunk"
            sub={val(trunkId) === 'open' ? 'Open' : 'Closed'}
            icon="🧳"
            active={val(trunkId) === 'open'}
            onClick={() => callService('cover', val(trunkId) === 'open' ? 'close_cover' : 'open_cover', { entity_id: trunkId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(chargePortId) && (
          <CarBtn
            label="Charge port"
            sub={val(chargePortId) === 'open' ? 'Open' : 'Closed'}
            icon="🔌"
            active={val(chargePortId) === 'open'}
            onClick={() => callService('cover', val(chargePortId) === 'open' ? 'close_cover' : 'open_cover', { entity_id: chargePortId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(sentryId) && (
          <CarBtn
            label="Sentry"
            sub={val(sentryId) === 'on' ? 'On' : 'Off'}
            icon="👁️"
            active={val(sentryId) === 'on'}
            onClick={() => callService('switch', val(sentryId) === 'on' ? 'turn_off' : 'turn_on', { entity_id: sentryId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(defrostId) && (
          <CarBtn
            label="Defrost"
            sub={val(defrostId) === 'on' ? 'On' : 'Off'}
            icon="❄️"
            active={val(defrostId) === 'on'}
            onClick={() => callService('switch', val(defrostId) === 'on' ? 'turn_off' : 'turn_on', { entity_id: defrostId })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(`button.${CAR_PREFIX}_flash_lights`) && (
          <CarBtn
            label="Flash"
            icon="💡"
            onClick={() => callService('button', 'press', { entity_id: `button.${CAR_PREFIX}_flash_lights` })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
        {exists(`button.${CAR_PREFIX}_honk_horn`) && (
          <CarBtn
            label="Honk"
            icon="📣"
            onClick={() => callService('button', 'press', { entity_id: `button.${CAR_PREFIX}_honk_horn` })}
            accent={accent} surface={surface2} border={border} fg={fg} fg3={fg3}
          />
        )}
      </div>
    </Card>
  );
};

const Stat = ({ label, value, fonts, fg, fg3 }) => (
  <div style={{textAlign:'right'}}>
    <div style={{fontSize: 9.5, color: fg3, letterSpacing:'.06em', textTransform:'uppercase', marginBottom: 2}}>{label}</div>
    <div style={{fontFamily: fonts.display, fontSize: 16, color: fg, fontVariantNumeric:'tabular-nums'}}>{value}</div>
  </div>
);

const TempBtn = ({ children, onClick, border, fg }) => (
  <button onClick={onClick} style={{
    width: 30, height: 30, borderRadius: 8,
    background: 'transparent', border: `.5px solid ${border}`,
    color: fg, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit',
    display:'inline-flex', alignItems:'center', justifyContent:'center',
  }}>{children}</button>
);

const CarBtn = ({ label, sub, icon, active, onClick, accent, surface, border, fg, fg3 }) => (
  <button onClick={onClick} style={{
    padding: '12px 10px', borderRadius: 10,
    background: active ? `${accent}1a` : surface,
    border: `.5px solid ${active ? `${accent}66` : border}`,
    color: fg, cursor: 'pointer', fontFamily: 'inherit',
    display:'flex', flexDirection:'column', alignItems:'flex-start', gap: 4,
    textAlign: 'left',
  }}>
    <span style={{fontSize: 18, lineHeight: 1}}>{icon}</span>
    <span style={{fontSize: 12, fontWeight: 500, color: fg}}>{label}</span>
    {sub && <span style={{fontSize: 10, color: active ? accent : fg3, letterSpacing:'.04em', textTransform:'uppercase'}}>{sub}</span>}
  </button>
);

function formatTimeToFull(hours) {
  if (!hours || hours <= 0) return '';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

// ── Section: Todo ─────────────────────────────────────────────────────────
const TodoCard = ({ todos, accent, fonts, surface, fg, fg2, fg3, border }) => {
  if (!todos || !todos.length) {
    return <EmptyCard title="To-do" hint="Add a To-do list in HA: Settings → Devices & Services → + Add Integration → Local To-do." surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} fonts={fonts} accent={accent}/>;
  }
  return (
    <Card surface={surface} border={border}>
      <CardHeader title="To-do" right={<span style={{fontSize:11, color: fg3}}>{todos.reduce((s, t) => s + (t.count || 0), 0)} open</span>} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
      <div style={{display:'flex', flexDirection:'column', gap: 8}}>
        {todos.slice(0, 5).map(t => (
          <div key={t.id} style={{display:'flex', alignItems:'center', gap: 10, padding: '6px 0', borderBottom: `.5px solid ${border}`}}>
            <span style={{
              width: 16, height: 16, borderRadius: 4, border: `.5px solid ${border}`,
              flex: 'none',
            }}/>
            <span style={{flex: 1, fontSize: 13, color: fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{t.name}</span>
            <span style={{fontSize: 11, color: fg3, fontVariantNumeric: 'tabular-nums'}}>{t.count ?? 0}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ── Section: Sports ───────────────────────────────────────────────────────
const SportsCard = ({ accent, fonts, surface, fg, fg2, fg3, border }) => {
  // null = first load in flight; [] = loaded but no games today
  const [games, setGames] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [leagueFilter, setLeagueFilter] = React.useState('all');

  React.useEffect(() => {
    let alive = true;
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const tick = async () => {
      try {
        const g = await fetchAllScores({ signal: ctl?.signal });
        if (alive) { setGames(g); setError(null); }
      } catch (e) {
        if (alive && e?.name !== 'AbortError') setError(e?.message || String(e));
      }
    };
    tick();
    // Refresh every 60s — fast enough to follow live games, slow enough
    // not to hammer ESPN.
    const t = setInterval(tick, 60 * 1000);
    return () => { alive = false; clearInterval(t); ctl?.abort(); };
  }, []);

  // Decide which games to show. Default view: favorites only, padded with
  // upcoming/live games to a minimum of 3. Expanded view: top 12 across
  // all leagues. League filter overrides everything: show that league's
  // full schedule (capped to keep the column tight).
  //
  // Hide anything kicking off more than a week out — ESPN's CFB / EPL
  // feeds happily return September fixtures in May, and showing a
  // favorite team's September opener on the dashboard in May is noise,
  // not signal. Live and recently-finished games pass through naturally
  // since their startTime is in the past or now.
  const { visible, hiddenCount } = React.useMemo(() => {
    if (!games || !games.length) return { visible: [], hiddenCount: 0 };
    const cutoff = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const inWindow = games.filter(g => !g.startTime || g.startTime.getTime() < cutoff);
    if (leagueFilter !== 'all') {
      const filtered = inWindow.filter(g => g.leagueId === leagueFilter);
      const cap = expanded ? filtered.length : 6;
      return { visible: filtered.slice(0, cap), hiddenCount: Math.max(0, filtered.length - cap) };
    }
    if (expanded) {
      const cap = 12;
      return { visible: inWindow.slice(0, cap), hiddenCount: Math.max(0, inWindow.length - cap) };
    }
    const favs = inWindow.filter(g => g.isFavorite);
    let pick;
    if (favs.length >= 3) {
      pick = favs;
    } else {
      const fillers = inWindow.filter(g =>
        !g.isFavorite && (g.status.state === 'in' || g.status.state === 'pre')
      );
      pick = [...favs, ...fillers].slice(0, Math.max(3, favs.length));
    }
    return { visible: pick, hiddenCount: Math.max(0, inWindow.length - pick.length) };
  }, [games, leagueFilter, expanded]);

  // Only list leagues in the filter dropdown that actually have games on
  // the wire — saves the user from picking "Boxing" and finding nothing.
  const availableLeagues = React.useMemo(() => {
    if (!games) return [];
    const set = new Set(games.map(g => g.leagueId));
    return SPORT_LEAGUES.filter(L => set.has(L.id));
  }, [games]);

  if (games === null) {
    return (
      <Card surface={surface} border={border}>
        <SportsHeader fonts={fonts} fg={fg} fg2={fg2} border={border} availableLeagues={[]} leagueFilter="all" setLeagueFilter={() => {}}/>
        <div style={{fontSize:12, color:fg3}}>Pulling scores from ESPN…</div>
      </Card>
    );
  }

  if (error && !games.length) {
    return (
      <Card surface={surface} border={border}>
        <SportsHeader fonts={fonts} fg={fg} fg2={fg2} border={border} availableLeagues={[]} leagueFilter="all" setLeagueFilter={() => {}}/>
        <div style={{fontSize:12, color:fg3}}>Couldn't reach ESPN: {error}</div>
      </Card>
    );
  }

  if (!games.length) {
    return (
      <Card surface={surface} border={border}>
        <SportsHeader fonts={fonts} fg={fg} fg2={fg2} border={border} availableLeagues={[]} leagueFilter="all" setLeagueFilter={() => {}}/>
        <div style={{fontSize:12, color:fg3}}>Nothing on the docket right now.</div>
      </Card>
    );
  }

  return (
    <Card surface={surface} border={border}>
      <SportsHeader fonts={fonts} fg={fg} fg2={fg2} border={border}
        availableLeagues={availableLeagues}
        leagueFilter={leagueFilter}
        setLeagueFilter={(v) => { setLeagueFilter(v); setExpanded(false); }}
      />
      {visible.length > 0 ? (
        <div style={{display:'flex', flexDirection:'column', gap: 8}}>
          {visible.map(g => (
            <GameRow key={g.id} g={g} accent={accent} fonts={fonts} fg={fg} fg2={fg2} fg3={fg3} border={border}/>
          ))}
        </div>
      ) : (
        <div style={{fontSize:12, color:fg3, padding:'8px 0'}}>
          {leagueFilter === 'all'
            ? 'No favorite or upcoming games right now.'
            : `No ${SPORT_LEAGUES.find(L => L.id === leagueFilter)?.name || ''} games today.`}
        </div>
      )}

      {(hiddenCount > 0 || expanded) && (
        <button onClick={() => setExpanded(v => !v)} style={{
          marginTop: 10, width: '100%', padding: '7px 10px',
          borderRadius: 7, background: 'transparent', cursor: 'pointer',
          border: `.5px solid ${border}`, color: fg2,
          fontSize: 11, fontFamily: 'inherit', letterSpacing: '.04em', textTransform: 'uppercase',
        }}>
          {expanded
            ? 'Show less'
            : `Show more${hiddenCount ? ` (${hiddenCount})` : ''}`}
        </button>
      )}
    </Card>
  );
};

const SportsHeader = ({ fonts, fg, fg2, border, availableLeagues, leagueFilter, setLeagueFilter }) => (
  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 10, gap: 8}}>
    <div style={{fontFamily: fonts.display, fontSize: 15, color: fg, fontWeight: 500}}>Sports</div>
    <select
      value={leagueFilter}
      onChange={(e) => setLeagueFilter(e.target.value)}
      aria-label="Filter by league"
      style={{
        background: 'rgba(241,234,217,0.04)', color: fg2,
        border: `.5px solid ${border}`, borderRadius: 6,
        fontSize: 11, padding: '4px 8px', fontFamily: 'inherit',
        cursor: 'pointer',
      }}
    >
      <option value="all">All leagues</option>
      {availableLeagues.map(L => (
        <option key={L.id} value={L.id}>{L.name}</option>
      ))}
    </select>
  </div>
);

const GameRow = ({ g, accent, fonts, fg, fg2, fg3, border }) => {
  const isLive = g.status.state === 'in';
  const isPre = g.status.state === 'pre';
  const isPost = g.status.state === 'post';

  const startStr = g.startTime
    ? `${g.startTime.toLocaleDateString([], { weekday:'short', month:'short', day:'numeric' })} · ${g.startTime.toLocaleTimeString([], { hour:'numeric', minute:'2-digit' })}`
    : '';
  const statusLabel = isPre ? startStr : (g.status.label || (isPost ? 'Final' : ''));

  // Hide the 0-0 placeholder on pre-game rows; ESPN sends "0" before kickoff.
  const showScores = !isPre;
  const aLoses = isPost && Number(g.teamA.score) < Number(g.teamB.score);
  const bLoses = isPost && Number(g.teamB.score) < Number(g.teamA.score);

  return (
    <div style={{
      padding:'9px 11px', borderRadius: 9,
      background: g.isFavorite ? `${accent}13` : 'rgba(241,234,217,0.025)',
      border: g.isFavorite ? `.5px solid ${accent}44` : `.5px solid ${border}`,
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginBottom: 6}}>
        <span style={{fontSize:9.5, color: g.isFavorite ? accent : fg3, letterSpacing:'.06em', textTransform:'uppercase', fontWeight: 600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{g.league}</span>
        {isLive && <span style={{flex:'none', fontSize:9, padding:'2px 6px', borderRadius:999, background:'#c14d36', color:'#fff', fontWeight:600, letterSpacing:'.04em'}}>LIVE</span>}
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:3}}>
        <TeamLine c={g.teamA} fg={fg} fg3={fg3} fonts={fonts} dim={aLoses} showScore={showScores}/>
        <TeamLine c={g.teamB} fg={fg} fg3={fg3} fonts={fonts} dim={bLoses} showScore={showScores}/>
      </div>
      <div style={{fontSize:10.5, color: fg3, marginTop: 5, textAlign: 'right', fontVariantNumeric:'tabular-nums'}}>{statusLabel}</div>
    </div>
  );
};

const TeamLine = ({ c, fg, fg3, fonts, dim, showScore }) => (
  <div style={{display:'flex', alignItems:'center', gap:8, opacity: dim ? 0.55 : 1}}>
    {c.logo
      ? <img src={c.logo} alt="" width="18" height="18" style={{flex:'none', objectFit:'contain'}} loading="lazy"/>
      : <span style={{flex:'none', width:18, height:18, borderRadius:'50%', background:'rgba(241,234,217,0.06)'}}/>
    }
    <span style={{flex:1, minWidth:0, fontSize:12.5, color:fg, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.name}</span>
    {showScore && c.score !== '' && (
      <span style={{fontFamily: fonts.display, fontSize:15, color:fg, fontVariantNumeric:'tabular-nums', fontWeight: c.winner ? 600 : 400}}>{c.score}</span>
    )}
  </div>
);

// ── Section: News ─────────────────────────────────────────────────────────
const NewsCard = ({ news, accent, fonts, surface, fg, fg2, fg3, border }) => {
  if (!news || !news.length) {
    return <EmptyCard title="Breaking news" hint="Add Feedreader in configuration.yaml with your favourite RSS URLs (NYT, BBC, etc.). I can wire this up if you want." surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} fonts={fonts} accent={accent}/>;
  }
  return (
    <Card surface={surface} border={border}>
      <CardHeader title="Breaking news" right={<span style={{fontSize: 11, color: fg3}}>{news.length} headlines</span>} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
      <div style={{display:'flex', flexDirection:'column', gap: 10}}>
        {news.slice(0, 5).map((n, i) => (
          <a key={i} href={n.url || '#'} target="_blank" rel="noopener noreferrer" style={{
            padding: '8px 0', borderBottom: `.5px solid ${border}`,
            textDecoration: 'none', color: 'inherit',
          }}>
            <div style={{fontSize: 13, color: fg, lineHeight: 1.4, marginBottom: 4}}>{n.title}</div>
            <div style={{fontSize: 10.5, color: fg3, letterSpacing: '.04em', textTransform: 'uppercase'}}>{n.source} · {n.timeAgo}</div>
          </a>
        ))}
      </div>
    </Card>
  );
};

// ── Section: Notes (text + handwritten) ───────────────────────────────────
const NOTES_TEXT_KEY = 'homecntrd_notes_v1';
const NOTES_DRAW_KEY = 'homecntrd_drawing_v1';
const NOTES_MODE_KEY = 'homecntrd_notes_mode_v1';

const NotesCard = ({ accent, fonts, surface, fg, fg2, fg3, border }) => {
  const [mode, setMode] = React.useState(() => {
    try { return localStorage.getItem(NOTES_MODE_KEY) || 'text'; } catch { return 'text'; }
  });
  const switchMode = (m) => {
    setMode(m);
    try { localStorage.setItem(NOTES_MODE_KEY, m); } catch {}
  };

  return (
    <Card surface={surface} border={border}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12, gap: 8}}>
        <div style={{fontFamily: fonts.display, fontSize: 15, color: fg, fontWeight: 500}}>Notes</div>
        <div style={{display:'flex', gap: 4, padding: 3, borderRadius: 8, background: 'rgba(241,234,217,0.04)', border: `.5px solid ${border}`}}>
          <button onClick={() => switchMode('text')} style={tabPill(mode === 'text', accent, fg2)}>Text</button>
          <button onClick={() => switchMode('draw')} style={tabPill(mode === 'draw', accent, fg2)}>Draw</button>
        </div>
      </div>

      {mode === 'text' && <TextNotes fg={fg} border={border} fonts={fonts} />}
      {mode === 'draw' && <DrawNotes accent={accent} fg={fg} fg3={fg3} border={border} fonts={fonts} />}
    </Card>
  );
};

const tabPill = (active, accent, fg2) => ({
  padding: '5px 12px', borderRadius: 6, border: 0,
  background: active ? accent : 'transparent',
  color: active ? '#fff' : fg2,
  fontSize: 11.5, fontWeight: active ? 500 : 400,
  cursor: 'pointer', fontFamily: 'inherit',
});

const TextNotes = ({ fg, border, fonts }) => {
  const [text, setText] = React.useState(() => {
    try { return localStorage.getItem(NOTES_TEXT_KEY) || ''; } catch { return ''; }
  });
  const save = (v) => {
    setText(v);
    try { localStorage.setItem(NOTES_TEXT_KEY, v); } catch {}
  };
  return (
    <textarea
      value={text}
      onChange={(e) => save(e.target.value)}
      placeholder="Quick thoughts, reminders, things to remember…"
      style={{
        width: '100%', minHeight: 160, padding: '10px 12px', borderRadius: 8,
        background: 'rgba(241,234,217,0.03)', color: fg,
        border: `.5px solid ${border}`, outline: 'none', resize: 'vertical',
        fontFamily: fonts.body, fontSize: 13, lineHeight: 1.5, boxSizing: 'border-box',
      }}
    />
  );
};

const DrawNotes = ({ accent, fg, fg3, border, fonts }) => {
  const canvasRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const drawingRef = React.useRef(false);
  const lastRef = React.useRef({ x: 0, y: 0 });
  const [tool, setTool] = React.useState('pen'); // pen | eraser

  // Resize the canvas to its layout size while preserving the drawing.
  // Re-bind on mount + on the wrap element resizing.
  const resizeAndRestore = React.useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = wrap.clientWidth;
    const cssH = 240;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Restore from storage.
    try {
      const stored = localStorage.getItem(NOTES_DRAW_KEY);
      if (stored) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, cssW, cssH);
        img.src = stored;
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    resizeAndRestore();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(resizeAndRestore);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [resizeAndRestore]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    canvasRef.current.setPointerCapture?.(e.pointerId);
    drawingRef.current = true;
    lastRef.current = getPos(e);
  };
  const onPointerMove = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(x, y);
    ctx.lineWidth = tool === 'eraser' ? 18 : 2.5;
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : '#f1ead9';
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.stroke();
    lastRef.current = { x, y };
  };
  const onPointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    try {
      localStorage.setItem(NOTES_DRAW_KEY, canvasRef.current.toDataURL('image/png'));
    } catch {}
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    try { localStorage.removeItem(NOTES_DRAW_KEY); } catch {}
  };

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: 8, marginBottom: 8}}>
        <div style={{display:'flex', gap: 4, padding: 3, borderRadius: 7, background: 'rgba(241,234,217,0.03)', border: `.5px solid ${border}`}}>
          <button onClick={() => setTool('pen')} style={tabPill(tool === 'pen', accent, fg3)}>Pen</button>
          <button onClick={() => setTool('eraser')} style={tabPill(tool === 'eraser', accent, fg3)}>Eraser</button>
        </div>
        <button onClick={clear} style={{
          padding: '5px 10px', borderRadius: 6, border: `.5px solid ${border}`,
          background: 'transparent', color: fg3, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
        }}>Clear</button>
      </div>
      <div ref={wrapRef} style={{
        background: 'rgba(241,234,217,0.03)', border: `.5px solid ${border}`,
        borderRadius: 8, overflow: 'hidden',
      }}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            display: 'block', width: '100%', height: 240,
            touchAction: 'none', // critical: stops the page from scrolling while you draw with a finger or stylus
            cursor: tool === 'eraser' ? 'cell' : 'crosshair',
          }}
        />
      </div>
      <div style={{fontSize: 10.5, color: fg3, marginTop: 6, lineHeight: 1.4}}>
        Use Apple Pencil, stylus, or finger. Drawings save automatically per device.
      </div>
    </div>
  );
};

// ── Right column: Calendar + upcoming events ──────────────────────────────
const CalendarColumn = ({ calendar, events, viewMonth, setViewMonth, accent, fonts, surface, surface2, fg, fg2, fg3, border }) => {
  const today = new Date();
  const todayKey = ymd(today);
  const [selectedKey, setSelectedKey] = React.useState(null); // YYYY-MM-DD

  const month = viewMonth.getMonth();
  const year = viewMonth.getFullYear();
  const monthName = viewMonth.toLocaleDateString([], { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Build a Set of YYYY-MM-DD keys that have events, so the grid can
  // dot the right day cells.
  const eventDays = React.useMemo(() => {
    const set = new Set();
    for (const e of events || []) {
      if (!e?.start) continue;
      set.add(ymd(e.start instanceof Date ? e.start : new Date(e.start)));
    }
    return set;
  }, [events]);

  // What to show in the Upcoming list:
  //   - If a day is selected, only events on that day
  //   - Otherwise, the next 3 days of events (today + 2)
  const visibleEvents = React.useMemo(() => {
    if (!events?.length) return [];
    if (selectedKey) {
      return events.filter(e => e.start && ymd(e.start instanceof Date ? e.start : new Date(e.start)) === selectedKey);
    }
    const cutoff = new Date(today); cutoff.setHours(0, 0, 0, 0); cutoff.setDate(cutoff.getDate() + 3);
    return events.filter(e => {
      if (!e.start) return false;
      const d = e.start instanceof Date ? e.start : new Date(e.start);
      return d.getTime() >= today.getTime() - 60 * 60 * 1000 && d.getTime() < cutoff.getTime();
    });
  }, [events, selectedKey, todayKey]);

  const goPrev = () => setViewMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNext = () => setViewMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToday = () => { setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1)); setSelectedKey(null); };

  return (
    <div style={{display:'flex', flexDirection:'column', gap: 14}}>
      {/* Calendar grid */}
      <Card surface={surface} border={border}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12, gap: 6}}>
          <div style={{fontFamily: fonts.display, fontSize: 16, color: fg, fontWeight: 500, flex: 1}}>{monthName}</div>
          <button onClick={goPrev} aria-label="Previous month" style={navBtn(fg2, border)}>‹</button>
          <button onClick={goToday} aria-label="Today" style={{...navBtn(fg2, border), padding: '0 10px', width: 'auto', fontSize: 11}}>Today</button>
          <button onClick={goNext} aria-label="Next month" style={navBtn(fg2, border)}>›</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontFamily: fonts.body, fontSize: 11}}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} style={{textAlign:'center', padding: 4, color: fg3, fontWeight: 500}}>{d}</div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const cellDate = new Date(year, month, d);
            const cellKey = ymd(cellDate);
            const isToday = cellKey === todayKey;
            const isSelected = cellKey === selectedKey;
            const hasEvents = eventDays.has(cellKey);
            return (
              <button
                key={i}
                onClick={() => setSelectedKey(prev => prev === cellKey ? null : cellKey)}
                style={{
                  position: 'relative', textAlign: 'center', padding: '8px 0', borderRadius: 6,
                  fontSize: 12, fontVariantNumeric: 'tabular-nums',
                  color: isToday ? '#fff' : (isSelected ? accent : fg2),
                  background: isToday ? accent : (isSelected ? `${accent}22` : 'transparent'),
                  border: 0, cursor: 'pointer', fontFamily: fonts.body,
                  fontWeight: isToday || isSelected ? 600 : 400,
                  outline: isSelected && !isToday ? `1px solid ${accent}66` : 'none',
                }}
              >
                {d}
                {hasEvents && (
                  <span style={{
                    position: 'absolute', left: '50%', bottom: 3, transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%',
                    background: isToday ? '#fff' : accent,
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Upcoming events */}
      <Card surface={surface} border={border}>
        <CardHeader
          title={selectedKey
            ? new Date(selectedKey + 'T00:00:00').toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
            : 'Next 3 days'}
          right={selectedKey
            ? <button onClick={() => setSelectedKey(null)} style={linkBtn(fg3)}>Clear</button>
            : <span style={{fontSize: 11, color: fg3}}>{visibleEvents.length} event{visibleEvents.length === 1 ? '' : 's'}</span>}
          fonts={fonts} fg={fg} fg3={fg3} accent={accent}
        />
        {visibleEvents.length > 0 ? (
          <div style={{display:'flex', flexDirection:'column', gap: 10}}>
            {visibleEvents.map((e, i) => {
              const start = e.start instanceof Date ? e.start : new Date(e.start);
              const end = e.end ? (e.end instanceof Date ? e.end : new Date(e.end)) : null;
              const day = start.getDate();
              const monthShort = start.toLocaleDateString([], { month: 'short' }).toUpperCase();
              const timeStr = e.isAllDay
                ? 'All day'
                : start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) +
                  (end ? ` – ${end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : '');
              return (
                <div key={e.id || i} style={{display:'flex', gap: 10, padding: '6px 0', borderBottom: i < visibleEvents.length - 1 ? `.5px solid ${border}` : 'none'}}>
                  <div style={{
                    width: 38, flex: 'none', textAlign: 'center', padding: '4px 0',
                    background: surface2, borderRadius: 6, border: `.5px solid ${border}`,
                  }}>
                    <div style={{fontSize: 9, color: fg3, letterSpacing: '.06em', textTransform: 'uppercase'}}>{monthShort}</div>
                    <div style={{fontFamily: fonts.display, fontSize: 16, color: fg, fontWeight: 500, lineHeight: 1}}>{day}</div>
                  </div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 13, color: fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{e.title}</div>
                    <div style={{fontSize: 11, color: fg3, marginTop: 2}}>{timeStr}{e.where ? ` · ${e.where}` : ''}</div>
                  </div>
                  {e.kind === 'birthday' && <span style={{fontSize: 12}}>🎂</span>}
                </div>
              );
            })}
          </div>
        ) : !calendar?.length ? (
          <EmptyMessage hint="Add Outlook, Google Calendar, or Remote iCalendar in HA to see events here." fg={fg2} fg3={fg3} border={border} accent={accent} surface={surface2}/>
        ) : (
          <div style={{padding: '20px 0', textAlign: 'center', color: fg3, fontSize: 12}}>
            {selectedKey ? 'Nothing scheduled this day.' : 'Nothing scheduled in the next 3 days.'}
          </div>
        )}
      </Card>
    </div>
  );
};

// Local YYYY-MM-DD key — avoids ISO timezone shifts.
function ymd(d) {
  if (!d) return '';
  const x = d instanceof Date ? d : new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
}

const navBtn = (fg2, border) => ({
  width: 26, height: 26, borderRadius: 6,
  background: 'transparent', border: `.5px solid ${border}`,
  color: fg2, cursor: 'pointer',
  display:'inline-flex', alignItems:'center', justifyContent:'center',
  fontSize: 14, fontFamily: 'inherit',
});
const linkBtn = (fg3) => ({
  background: 'transparent', border: 0, color: fg3,
  fontSize: 11, cursor: 'pointer', padding: 0, fontFamily: 'inherit',
  textDecoration: 'underline', textUnderlineOffset: 2,
});

// ── Shared: Card wrapper, header, empty state ─────────────────────────────
const Card = ({ surface, border, children, style }) => (
  <div style={{
    padding: '18px 20px', borderRadius: 14,
    background: surface, border: `.5px solid ${border}`,
    ...style,
  }}>{children}</div>
);

const CardHeader = ({ title, right, fonts, fg, fg3, accent }) => (
  <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 12}}>
    <div style={{fontFamily: fonts.display, fontSize: 15, color: fg, fontWeight: 500}}>{title}</div>
    {right}
  </div>
);

const EmptyCard = ({ title, hint, surface, fg, fg2, fg3, border, fonts, accent }) => (
  <Card surface={surface} border={border}>
    <CardHeader title={title} right={null} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
    <EmptyMessage hint={hint} fg={fg2} fg3={fg3} border={border} accent={accent} surface={surface}/>
  </Card>
);

const EmptyMessage = ({ hint, fg, fg3, border, accent, surface }) => (
  <div style={{
    padding: '14px 12px', borderRadius: 8,
    background: 'rgba(241,234,217,0.02)', border: `.5px dashed ${border}`,
    fontSize: 12, color: fg3, lineHeight: 1.5,
  }}>
    <div style={{display:'flex', alignItems:'center', gap: 6, marginBottom: 4}}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: accent, opacity: .5,
        display: 'inline-block',
      }}/>
      <span style={{color: fg, fontSize: 11.5, letterSpacing: '.04em', textTransform: 'uppercase'}}>Not connected yet</span>
    </div>
    {hint}
  </div>
);

window.PersonalDashboard = PersonalDashboard;
