// personal-dashboard.jsx — the new Home page.
//
// Black background, tangerine accents, two-column layout (main + calendar).

import HassContext from './lib/hass-context.js';

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

  // Fetch a 14-day window of events directly from HA's REST API. The
  // single-event preview that arrives in `state.calendar*` only contains
  // each calendar's next event — for the full upcoming list we ask each
  // calendar entity for its events in [now, now + 14d].
  const [fetchedEvents, setFetchedEvents] = React.useState([]);
  const calendarIds = (state.calendar || []).map(c => c.id).join(',');
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
    const fetchAll = async () => {
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const end = new Date(start); end.setDate(end.getDate() + 14);
      const startISO = start.toISOString();
      const endISO = end.toISOString();
      const allEvents = [];
      let totalCount = 0;
      await Promise.all(ids.map(async (id) => {
        try {
          const path = `calendars/${id}?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`;
          const events = await hass.callApi('GET', path);
          if (!Array.isArray(events)) {
            diag({ ts: Date.now(), kind: 'info', message: `calendar ${id}: response not an array (${typeof events})` });
            return;
          }
          totalCount += events.length;
          diag({ ts: Date.now(), kind: 'info', message: `calendar ${id}: fetched ${events.length} event(s) over 14 days` });
          for (const ev of events) {
            // HA returns events as either ISO strings or { date | dateTime } objects.
            // - { dateTime: "2026-05-07T10:00:00-04:00" } → timed
            // - { date: "2026-05-07" } → all-day
            // - "2026-05-07 10:00:00" → timed (some integrations skip the T)
            // - "2026-05-07"            → all-day
            const startVal = (ev.start && (ev.start.dateTime || ev.start.date)) || ev.start;
            const endVal = (ev.end && (ev.end.dateTime || ev.end.date)) || ev.end;
            if (!startVal) continue;
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
            allEvents.push({
              id: `${id}-${startVal}-${ev.summary || ''}`,
              title: ev.summary || '(untitled)',
              where: ev.location || '',
              kind: /birthday|bday/i.test(ev.summary || '') ? 'birthday' : 'event',
              start: startDate, end: endDate,
              isAllDay,
              sortKey: startDate.getTime(),
            });
          }
        } catch (e) {
          diag({ ts: Date.now(), kind: 'error', message: `calendar ${id}: fetch failed — ${e?.message || e}` });
          console.warn(`[dashboard] could not fetch events for ${id}:`, e?.message || e);
        }
      }));
      if (alive) {
        allEvents.sort((a, b) => a.sortKey - b.sortKey);
        diag({ ts: Date.now(), kind: 'info', message: `calendar: ${allEvents.length} total events parsed from ${ids.length} calendar(s); raw=${totalCount}` });
        setFetchedEvents(allEvents);
      }
    };
    fetchAll();
    const t = setInterval(fetchAll, 5 * 60 * 1000); // refresh every 5 min
    return () => { alive = false; clearInterval(t); };
  }, [hass, calendarIds]);

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
      {/* Header */}
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap: 14, marginBottom: narrow ? 24 : 36}}>
        <div>
          <div style={{fontSize: 11, color: fg3, letterSpacing:'.12em', textTransform:'uppercase', marginBottom: 6}}>{dayName} · {dateStr}</div>
          <div style={{fontFamily: display, fontSize: narrow ? 30 : 40, lineHeight: 1.05, color: fg, fontWeight: 500}}>
            {greet()}, <em style={{fontStyle:'italic', color: accent, fontWeight: 400}}>{user?.firstName || 'there'}.</em>
          </div>
        </div>

        {/* Hamburger — only shown on wide viewports where we've hidden the
            inline sidebar. Tap to slide it in as a drawer. On narrow
            viewports the bottom nav already covers this so we hide the
            button. */}
        {!narrow && onOpenMenu && (
          <button onClick={onOpenMenu} aria-label="Open menu" style={{
            width: 42, height: 42, borderRadius: 10, flex: 'none',
            background: surface, border: `.5px solid ${border}`,
            color: fg, cursor: 'pointer',
            display:'grid', placeItems:'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(280px, 360px)',
        gap: narrow ? 14 : 22,
      }}>
        {/* Left column */}
        <div style={{display:'flex', flexDirection:'column', gap: narrow ? 14 : 18}}>
          <WeatherCard
            weather={state.weather} hass={hass}
            accent={accent} fonts={fonts} surface={surface} surface2={surface2}
            fg={fg} fg2={fg2} fg3={fg3} border={border} narrow={narrow}
          />

          <div style={{display:'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: narrow ? 14 : 18}}>
            <TodoCard todos={state.todos} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />
            <SportsCard sports={state.sports} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />
          </div>

          <NewsCard news={state.news} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />

          <NotesCard accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />
        </div>

        {/* Right column — calendar */}
        <CalendarColumn
          calendar={state.calendar} events={allEvents}
          accent={accent} fonts={fonts} surface={surface} surface2={surface2}
          fg={fg} fg2={fg2} fg3={fg3} border={border}
        />
      </div>

      <div style={{height: 80}}/>
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
const SportsCard = ({ sports, accent, fonts, surface, fg, fg2, fg3, border }) => {
  if (!sports || !sports.length) {
    return <EmptyCard title="Sports" hint="Install TeamTracker via HACS, then add your favourite teams." surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} fonts={fonts} accent={accent}/>;
  }
  return (
    <Card surface={surface} border={border}>
      <CardHeader title="Sports" right={null} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
      <div style={{display:'flex', flexDirection:'column', gap: 10}}>
        {sports.slice(0, 4).map(g => (
          <div key={g.id} style={{padding: '8px 0', borderBottom: `.5px solid ${border}`}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: 8}}>
              <span style={{fontSize: 12, color: fg, fontWeight: 500}}>{g.team} <span style={{color: fg3}}>vs</span> {g.opponent}</span>
              {g.live && <span style={{fontSize: 9, padding: '2px 6px', borderRadius: 999, background: '#c14d36', color: '#fff', fontWeight: 600, letterSpacing: '.04em'}}>LIVE</span>}
            </div>
            <div style={{display:'flex', alignItems:'baseline', gap: 8, marginTop: 4}}>
              <span style={{fontFamily: fonts.display, fontSize: 22, color: fg, fontVariantNumeric: 'tabular-nums'}}>{g.teamScore ?? '—'}</span>
              <span style={{fontSize: 11, color: fg3}}>—</span>
              <span style={{fontFamily: fonts.display, fontSize: 22, color: fg2, fontVariantNumeric: 'tabular-nums'}}>{g.oppScore ?? '—'}</span>
              <span style={{flex: 1, textAlign: 'right', fontSize: 11, color: fg3}}>{g.state}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

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
const CalendarColumn = ({ calendar, events, accent, fonts, surface, surface2, fg, fg2, fg3, border }) => {
  const today = new Date();
  const todayKey = ymd(today);
  const [viewMonth, setViewMonth] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
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
