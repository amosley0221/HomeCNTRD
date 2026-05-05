// calendar-view.jsx — Outlook calendar with per-event Do Not Disturb

const CalendarView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const set = (id, k, v) => setState(s => ({...s, calendar: s.calendar.map(e => e.id === id ? {...e, [k]: v} : e)}));

  const toggleEventDnd = (id, current) => set(id, 'dnd', !current);
  const setPreMins = (id, mins) => set(id, 'preMins', mins);
  const startDndNow = (e) => setState(s => ({...s, dnd: { active:true, until:e.end + ' (' + e.title + ')', source:e.id }}));

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Microsoft Outlook · frances.w@willowstudio.com"
        title="Tuesday, May 5"
        sub={`${state.calendar.length} events · ${state.calendar.filter(e => e.dnd).length} with Do Not Disturb`}
        right={
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <DndStatus ctx={ctx}/>
          </div>
        }
      />

      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:dens.gap, alignItems:'start'}}>
        {/* timeline */}
        <window.Card p={p} style={{padding:0, overflow:'hidden'}}>
          <Timeline ctx={ctx}/>
        </window.Card>

        {/* event list */}
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {state.calendar.map(e => (
            <window.Card key={e.id} p={p} style={{padding:16}}>
              <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                <div style={{width:4, alignSelf:'stretch', borderRadius:2, background: e.dot, flex:'none'}}/>
                <div style={{flex:1}}>
                  <div style={{display:'flex', alignItems:'baseline', gap:10}}>
                    <div style={{fontFamily:fonts.display, fontSize:17, fontWeight:500, color:p.fg, flex:1}}>{e.title}</div>
                    <div style={{fontSize:12, color:p.fg2, fontVariantNumeric:'tabular-nums'}}>{e.t} – {e.end}</div>
                  </div>
                  <div style={{fontSize:12, color:p.fg3, marginTop:3, fontStyle:'italic'}}>{e.where} · {e.organizer}</div>

                  <div style={{display:'flex', alignItems:'center', gap:10, marginTop:12, padding:'10px 12px', borderRadius:8, background: e.dnd ? p.accentSoft : p.surface, border:`.5px solid ${e.dnd ? p.accent : p.border}`}}>
                    <window.Icon name={e.dnd ? 'bellOff' : 'bell'} size={14} style={{color: e.dnd ? p.accent : p.fg3}}/>
                    <div style={{flex:1, fontSize:12}}>
                      <div style={{color: e.dnd ? p.accent : p.fg, fontWeight: e.dnd ? 500 : 400}}>Do not disturb {e.dnd ? 'on' : 'off'}</div>
                      {e.dnd && <div style={{color:p.fg3, marginTop:2, fontSize:11}}>Starts {e.preMins} min before · ends when meeting ends</div>}
                    </div>
                    {e.dnd && (
                      <div style={{display:'flex', gap:4}}>
                        {[0, 5, 10, 15].map(m => (
                          <button key={m} onClick={() => setPreMins(e.id, m)} style={{
                            padding:'3px 7px', borderRadius:5, fontSize:10, border:`.5px solid ${m === e.preMins ? p.accent : p.border2}`,
                            background: m === e.preMins ? p.accent : 'transparent', color: m === e.preMins ? '#fff' : p.fg2, cursor:'pointer', fontFamily:fonts.body
                          }}>{m === 0 ? 'now' : `−${m}m`}</button>
                        ))}
                      </div>
                    )}
                    <window.Toggle p={p} on={e.dnd} onChange={() => toggleEventDnd(e.id, e.dnd)}/>
                  </div>

                  <div style={{display:'flex', gap:6, marginTop:10, fontSize:11}}>
                    <span style={{
                      padding:'3px 8px', borderRadius:999, border:`.5px solid ${p.border2}`,
                      color: e.accepted === 'accepted' ? 'oklch(60% 0.13 145)' : p.fg3,
                      background: e.accepted === 'accepted' ? 'oklch(60% 0.13 145 / .12)' : 'transparent'
                    }}>{e.accepted === 'accepted' ? '✓ Going' : '? Tentative'}</span>
                    {e.dnd && (
                      <button onClick={() => startDndNow(e)} style={{
                        padding:'3px 9px', borderRadius:999, border:`.5px solid ${p.accent}`, background:p.accent, color:'#fff', fontSize:11, cursor:'pointer', fontFamily:fonts.body
                      }}>Start DND now</button>
                    )}
                  </div>
                </div>
              </div>
            </window.Card>
          ))}
        </div>
      </div>

      <DndExplainer ctx={ctx}/>
      <div style={{height:60}}/>
    </>
  );
};

const DndStatus = ({ ctx }) => {
  const { p, fonts, state, setState } = ctx;
  if (state.dnd.active) {
    return (
      <div style={{display:'inline-flex', alignItems:'center', gap:10, padding:'8px 14px', borderRadius:10, background:p.accent, color:'#fff', fontSize:12, fontFamily:fonts.body, whiteSpace:'nowrap'}}>
        <window.Icon name="bellOff" size={14}/>
        DND active · until {state.dnd.until}
        <button onClick={() => setState(s => ({...s, dnd:{active:false, until:null, source:null}}))} style={{
          marginLeft:8, padding:'3px 9px', borderRadius:6, border:0, background:'rgba(255,255,255,.2)', color:'#fff', fontSize:11, cursor:'pointer'
        }}>End</button>
      </div>
    );
  }
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'8px 14px', borderRadius:10, border:`.5px solid ${p.border2}`, background:p.surface2, color:p.fg, fontSize:12, fontFamily:fonts.body}}>
      <window.Icon name="bell" size={14} style={{color:p.fg3}}/>
      Notifications · all clear
    </div>
  );
};

const Timeline = ({ ctx }) => {
  const { p, fonts, state } = ctx;
  // Render 8am–8pm
  const startHour = 8, endHour = 20;
  const totalH = (endHour - startHour) * 60;
  const slotHeight = 44; // px per hour
  const totalHeight = (endHour - startHour) * slotHeight;

  const parseT = (s) => {
    const [, h, m, ap] = s.match(/(\d+):(\d+)\s*(AM|PM)/i);
    return ((parseInt(h) % 12) + (ap.toUpperCase() === 'PM' ? 12 : 0)) * 60 + parseInt(m);
  };
  const yFor = (timeStr) => ((parseT(timeStr) - startHour * 60) / totalH) * totalHeight;

  // current time line — "now" = 7:42 PM in our world
  const now = 19 * 60 + 42;
  const nowY = ((now - startHour * 60) / totalH) * totalHeight;

  return (
    <div style={{display:'grid', gridTemplateColumns:'60px 1fr', height:totalHeight, fontSize:11}}>
      <div>
        {Array.from({length: endHour - startHour}).map((_, i) => (
          <div key={i} style={{height:slotHeight, color:p.fg3, padding:'2px 10px 0', borderTop:`.5px solid ${p.border}`, textAlign:'right'}}>
            {((startHour + i) % 12 || 12)} {(startHour + i) >= 12 ? 'PM' : 'AM'}
          </div>
        ))}
      </div>
      <div style={{position:'relative', borderLeft:`.5px solid ${p.border}`}}>
        {Array.from({length: endHour - startHour}).map((_, i) => (
          <div key={i} style={{height:slotHeight, borderTop:`.5px solid ${p.border}`}}/>
        ))}
        {state.calendar.map(e => {
          const top = yFor(e.t);
          const dur = parseT(e.end) - parseT(e.t);
          const h = (dur / 60) * slotHeight;
          return (
            <div key={e.id} style={{
              position:'absolute', top, left:8, right:14, height:h - 4,
              borderRadius:8, background: e.dot, color:'#fff', padding:'8px 10px',
              fontSize:11, lineHeight:1.3, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,.15)',
            }}>
              <div style={{fontWeight:600, fontSize:12, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{e.title}</div>
              <div style={{opacity:.85, fontSize:10}}>{e.t} – {e.end} · {e.where}</div>
              {e.dnd && <div style={{position:'absolute', top:7, right:8, fontSize:9, padding:'1px 5px', borderRadius:3, background:'rgba(255,255,255,.25)'}}>DND</div>}
            </div>
          );
        })}
        {nowY > 0 && nowY < totalHeight && (
          <div style={{position:'absolute', top:nowY, left:0, right:0, height:1, background:p.accent, zIndex:5}}>
            <div style={{position:'absolute', left:-4, top:-4, width:9, height:9, borderRadius:'50%', background:p.accent}}/>
            <div style={{position:'absolute', right:8, top:-9, fontSize:10, color:p.accent, fontWeight:600, background:p.surface2, padding:'1px 5px', borderRadius:3}}>now · 7:42 PM</div>
          </div>
        )}
      </div>
    </div>
  );
};

const DndExplainer = ({ ctx }) => {
  const { p, fonts } = ctx;
  return (
    <window.Card p={p} style={{padding:18, background:p.surface}}>
      <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:10}}>How meeting DND works</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, fontSize:12, color:p.fg2}}>
        {[
          { n:'1', icon:'bellOff', title:'Mute notifications', text:'Silences phone, watch, and home speaker chimes for the duration of the meeting.' },
          { n:'2', icon:'bulb',    title:'Dim office lights',  text:'Brings office lights to 60% and pauses any music in that room.' },
          { n:'3', icon:'cam',     title:'Hide camera doorbells', text:'Mutes Ring chimes; you\'ll still see motion logs after the meeting ends.' },
          { n:'4', icon:'clock',   title:'Auto-end',           text:'DND lifts the moment the meeting wraps. No manual cleanup.' },
        ].map(c => (
          <div key={c.n} style={{padding:14, background:p.surface2, borderRadius:10, border:`.5px solid ${p.border}`}}>
            <window.Icon name={c.icon} size={18} style={{color:p.accent}}/>
            <div style={{fontFamily:fonts.display, fontSize:14, color:p.fg, marginTop:8, fontWeight:500}}>{c.title}</div>
            <div style={{marginTop:4, lineHeight:1.4}}>{c.text}</div>
          </div>
        ))}
      </div>
    </window.Card>
  );
};

window.CalendarView = CalendarView;
