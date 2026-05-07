// personal-dashboard.jsx — the new Home page.
//
// Black background, tangerine accents, two-column layout (main + calendar).
// Sections:
//   - Greeting + date
//   - Weather (large card, big temp + forecast)
//   - To-do lists (read from HA todo.* entities)
//   - Sports scores (read from sensor.* entities matching team patterns)
//   - Breaking news (read from sensor.feedreader_* entities)
//   - Notes (local-storage backed, multi-device sync via HA later)
//   - Calendar (right side: month grid + upcoming events list)
//
// Each section reads whatever the user's HA exposes; sections without
// backing entities show an empty state with a one-line hint pointing at
// the integration to install.

const PersonalDashboard = ({ ctx }) => {
  const { p, fonts, state, user, narrow, setPage } = ctx;
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
      minHeight: '100%', padding: narrow ? '20px 16px' : '32px 36px',
    }}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:14, marginBottom: narrow ? 24 : 36}}>
        <div>
          <div style={{fontSize: 11, color: fg3, letterSpacing:'.12em', textTransform:'uppercase', marginBottom: 6}}>{dayName} · {dateStr}</div>
          <div style={{fontFamily: display, fontSize: narrow ? 30 : 40, lineHeight: 1.05, color: fg, fontWeight: 500}}>
            {greet()}, <em style={{fontStyle:'italic', color: accent, fontWeight: 400}}>{user?.firstName || 'there'}.</em>
          </div>
        </div>
        <button onClick={() => setPage('dashboard')} style={{
          padding:'9px 14px', borderRadius:9, border:`.5px solid ${border}`,
          background: 'transparent', color: fg2, fontSize: 12, cursor: 'pointer', fontFamily: body,
          display:'inline-flex', alignItems:'center', gap: 8,
        }}>
          <window.Icon name="home" size={13}/> Open the home dashboard →
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(280px, 360px)',
        gap: narrow ? 14 : 22,
      }}>
        {/* Left column */}
        <div style={{display:'flex', flexDirection:'column', gap: narrow ? 14 : 18}}>
          <WeatherCard weather={state.weather} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} narrow={narrow} />

          <div style={{display:'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: narrow ? 14 : 18}}>
            <TodoCard todos={state.todos} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />
            <SportsCard sports={state.sports} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />
          </div>

          <NewsCard news={state.news} accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />

          <NotesCard accent={accent} fonts={fonts} surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} />
        </div>

        {/* Right column — calendar */}
        <CalendarColumn
          calendar={state.calendar} events={state.calendarEvents}
          accent={accent} fonts={fonts} surface={surface} surface2={surface2}
          fg={fg} fg2={fg2} fg3={fg3} border={border}
        />
      </div>

      <div style={{height: 80}}/>
    </div>
  );
};

// ── Section: Weather ──────────────────────────────────────────────────────
const WeatherCard = ({ weather, accent, fonts, surface, fg, fg2, fg3, border, narrow }) => {
  if (!weather || weather.summary === 'Unavailable') {
    return <EmptyCard title="Weather" hint="Add a Weather integration in HA → Devices & Services. Pirate Weather and Met.no are both free." surface={surface} fg={fg} fg2={fg2} fg3={fg3} border={border} fonts={fonts} accent={accent}/>;
  }
  return (
    <div style={{
      padding: narrow ? '20px 18px' : '28px 28px',
      borderRadius: 16, background: surface, border: `.5px solid ${border}`,
      display: 'flex', alignItems: 'center', gap: narrow ? 18 : 28,
    }}>
      <div style={{flex:1, minWidth: 0}}>
        <div style={{fontSize:11, color:fg3, letterSpacing:'.06em', textTransform:'uppercase', marginBottom: 6}}>Weather</div>
        <div style={{fontFamily: fonts.display, fontSize: narrow ? 56 : 76, lineHeight: 1, color: fg, fontWeight: 400, fontVariantNumeric: 'tabular-nums'}}>
          {weather.temp}°
        </div>
        <div style={{fontSize: 14, color: fg2, marginTop: 8, textTransform: 'capitalize'}}>{weather.summary}</div>
        <div style={{fontSize: 12, color: fg3, marginTop: 4, fontVariantNumeric: 'tabular-nums'}}>
          High {weather.high}° · Low {weather.low}°
        </div>
      </div>
      {weather.hourly?.length > 0 && (
        <div style={{display:'flex', alignItems:'flex-end', gap: 4, height: 90, flex: 'none'}}>
          {weather.hourly.slice(0, narrow ? 6 : 12).map((t, i) => {
            const min = Math.min(...weather.hourly);
            const max = Math.max(...weather.hourly);
            const h = max === min ? 50 : ((t - min) / (max - min)) * 60 + 18;
            return (
              <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 4}}>
                <div style={{fontSize: 9, color: fg3, fontVariantNumeric:'tabular-nums'}}>{Math.round(t)}°</div>
                <div style={{width: 6, height: h, background: i === 0 ? accent : `${accent}55`, borderRadius: 3}}/>
              </div>
            );
          })}
        </div>
      )}
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

// ── Section: Notes ────────────────────────────────────────────────────────
const NotesCard = ({ accent, fonts, surface, fg, fg2, fg3, border }) => {
  const KEY = 'homecntrd_notes_v1';
  const [text, setText] = React.useState(() => {
    try { return localStorage.getItem(KEY) || ''; } catch { return ''; }
  });
  const save = (v) => {
    setText(v);
    try { localStorage.setItem(KEY, v); } catch {}
  };
  return (
    <Card surface={surface} border={border}>
      <CardHeader title="Notes" right={<span style={{fontSize: 11, color: fg3}}>{text.length} chars</span>} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
      <textarea
        value={text}
        onChange={(e) => save(e.target.value)}
        placeholder="Quick thoughts, reminders, things to remember…"
        style={{
          width: '100%', minHeight: 110, padding: '10px 12px', borderRadius: 8,
          background: 'rgba(241,234,217,0.03)', color: fg,
          border: `.5px solid ${border}`, outline: 'none', resize: 'vertical',
          fontFamily: fonts.body, fontSize: 13, lineHeight: 1.5,
        }}
      />
    </Card>
  );
};

// ── Right column: Calendar + upcoming events ──────────────────────────────
const CalendarColumn = ({ calendar, events, accent, fonts, surface, surface2, fg, fg2, fg3, border }) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const monthName = today.toLocaleDateString([], { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{display:'flex', flexDirection:'column', gap: 14}}>
      {/* Calendar grid */}
      <Card surface={surface} border={border}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12}}>
          <div style={{fontFamily: fonts.display, fontSize: 16, color: fg, fontWeight: 500}}>{monthName}</div>
          <window.Icon name="cal" size={14} style={{color: accent}}/>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontFamily: fonts.body, fontSize: 11}}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} style={{textAlign:'center', padding: 4, color: fg3, fontWeight: 500}}>{d}</div>
          ))}
          {cells.map((d, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '6px 0', borderRadius: 6,
              fontSize: 12, fontVariantNumeric: 'tabular-nums',
              color: d ? (d === today.getDate() ? '#fff' : fg2) : 'transparent',
              background: d === today.getDate() ? accent : 'transparent',
              fontWeight: d === today.getDate() ? 600 : 400,
            }}>
              {d || ''}
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming events */}
      <Card surface={surface} border={border}>
        <CardHeader title="Upcoming" right={null} fonts={fonts} fg={fg} fg3={fg3} accent={accent}/>
        {(events && events.length > 0) ? (
          <div style={{display:'flex', flexDirection:'column', gap: 10}}>
            {events.slice(0, 8).map((e, i) => (
              <div key={i} style={{display:'flex', gap: 10, padding: '6px 0', borderBottom: i < events.length - 1 ? `.5px solid ${border}` : 'none'}}>
                <div style={{
                  width: 38, flex: 'none', textAlign: 'center', padding: '4px 0',
                  background: surface2, borderRadius: 6, border: `.5px solid ${border}`,
                }}>
                  <div style={{fontSize: 9, color: fg3, letterSpacing: '.06em', textTransform: 'uppercase'}}>{e.monthShort}</div>
                  <div style={{fontFamily: fonts.display, fontSize: 16, color: fg, fontWeight: 500, lineHeight: 1}}>{e.day}</div>
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 13, color: fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{e.title}</div>
                  <div style={{fontSize: 11, color: fg3, marginTop: 2}}>{e.timeStr}{e.where ? ` · ${e.where}` : ''}</div>
                </div>
                {e.kind === 'birthday' && <span style={{fontSize: 12}}>🎂</span>}
              </div>
            ))}
          </div>
        ) : !calendar?.length ? (
          <EmptyMessage hint="Add Outlook (Microsoft 365), Google Calendar, or CalDAV in HA to see events here." fg={fg2} fg3={fg3} border={border} accent={accent} surface={surface2}/>
        ) : (
          <div style={{padding: '20px 0', textAlign: 'center', color: fg3, fontSize: 12}}>No upcoming events.</div>
        )}
      </Card>
    </div>
  );
};

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
