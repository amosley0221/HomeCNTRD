// automations-view.jsx — Automations list + creator UI.

const AutomationsView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const [creating, setCreating] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const [parsed, setParsed] = React.useState(null);
  const [err, setErr] = React.useState('');

  const tryParse = (text) => {
    setDraft(text); setErr('');
    if (!text.trim()) { setParsed(null); return; }
    const a = window.parseAutomation(text, state);
    if (a) setParsed(a);
    else { setParsed(null); setErr('Try: "When there is motion at the front door, turn on the porch light"'); }
  };
  const save = () => {
    if (!parsed) return;
    setState(s => ({...s, automations: [...s.automations, parsed]}));
    setDraft(''); setParsed(null); setCreating(false);
  };
  const toggle = (id) => setState(s => ({...s, automations: s.automations.map(a => a.id===id ? {...a, enabled: !a.enabled} : a)}));
  const remove = (id) => setState(s => ({...s, automations: s.automations.filter(a => a.id !== id)}));
  const run = (a) => window.runAutomation(a, state, setState);

  const examples = [
    'When there is motion at the front door, turn on the porch light',
    'When I leave home, lock everything',
    'Every day at 11:00 PM, run goodnight',
    'When motion at the back yard, turn lights on',
  ];

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow={`${state.automations.length} routines`}
        title="Automations"
        sub={`${state.automations.filter(a => a.enabled).length} active · let the house run itself`}
        right={
          <button onClick={() => setCreating(v => !v)} style={{
            padding:'9px 16px', borderRadius:9, border:`.5px solid ${p.accent}`,
            background: p.accent, color:'#fff', fontSize:12, cursor:'pointer', fontFamily:fonts.body,
            display:'inline-flex', alignItems:'center', gap:6,
          }}>
            <window.Icon name={creating ? 'x' : 'plus'} size={12}/>
            {creating ? 'Cancel' : 'New automation'}
          </button>
        }
      />

      {creating && (
        <window.Card p={p} style={{padding:20}}>
          <div style={{fontSize:11, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8}}>Describe it in plain English</div>
          <input
            value={draft}
            onChange={(e) => tryParse(e.target.value)}
            placeholder="When there is motion at the front door, turn on the porch light"
            autoFocus
            style={{
              width:'100%', padding:'12px 14px', borderRadius:10, border:`.5px solid ${parsed ? p.accent : p.border2}`,
              background:p.surface, color:p.fg, fontSize:14, fontFamily:fonts.body, outline:'none', boxSizing:'border-box',
            }}
          />
          {!draft && (
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:10}}>
              {examples.map(ex => (
                <button key={ex} onClick={() => tryParse(ex)} style={{
                  padding:'5px 10px', borderRadius:999, border:`.5px solid ${p.border2}`,
                  background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body,
                }}>{ex}</button>
              ))}
            </div>
          )}
          {parsed && (
            <div style={{marginTop:14, padding:14, borderRadius:10, background:p.warm, border:`.5px solid ${p.border}`}}>
              <div style={{fontSize:11, color:p.fg3, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:6}}>I understood</div>
              <div style={{fontFamily:fonts.display, fontSize:16, color:p.fg, fontWeight:500, marginBottom:4}}>{parsed.name}</div>
              <div style={{fontSize:12, color:p.fg2, fontStyle:'italic'}}>{parsed.desc}</div>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <button onClick={save} style={{padding:'8px 14px', borderRadius:8, border:0, background:p.accent, color:'#fff', fontSize:12, cursor:'pointer'}}>Save automation</button>
                <button onClick={() => { setDraft(''); setParsed(null); }} style={{padding:'8px 14px', borderRadius:8, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:12, cursor:'pointer'}}>Try again</button>
              </div>
            </div>
          )}
          {err && !parsed && <div style={{marginTop:10, fontSize:12, color:p.fg3, fontStyle:'italic'}}>{err}</div>}
          <div style={{marginTop:14, padding:'10px 12px', borderRadius:8, background:p.surface, border:`.5px dashed ${p.border2}`, fontSize:11, color:p.fg3}}>
            <window.Icon name="sparkle" size={11} style={{display:'inline', verticalAlign:'middle', marginRight:5}}/>
            Tip: you can also just tell the agent. Say <em style={{color:p.accent}}>"when there's motion on the front door cam, turn the porch light on"</em> and it'll set it up.
          </div>
        </window.Card>
      )}

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px, 1fr))', gap:dens.tileGap}}>
        {state.automations.map(a => (
          <AutomationCard key={a.id} a={a} ctx={ctx} onToggle={() => toggle(a.id)} onRemove={() => remove(a.id)} onRun={() => run(a)} />
        ))}
      </div>
      <div style={{height:80}}/>
    </>
  );
};

const AutomationCard = ({ a, ctx, onToggle, onRemove, onRun }) => {
  const { p, fonts, state } = ctx;
  const tIcon = a.trigger.type==='motion' ? 'cam' : a.trigger.type==='time' ? 'clock' : a.trigger.type==='leaveHome' ? 'door' : 'home';
  const tLabel = a.trigger.type==='motion'
    ? `Motion · ${state.cameras.find(c => c.id===a.trigger.cameraId)?.name || 'camera'}`
    : a.trigger.type==='time' ? `At ${a.trigger.at}`
    : a.trigger.type==='leaveHome' ? 'When I leave'
    : a.trigger.type==='arriveHome' ? 'When I arrive' : 'Trigger';

  return (
    <window.Card p={p} style={{padding:16, opacity: a.enabled ? 1 : 0.55}}>
      <div style={{display:'flex', alignItems:'flex-start', gap:10}}>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:p.accent, letterSpacing:'.05em'}}>
            <window.Icon name={tIcon} size={11}/>
            {tLabel}
          </div>
          <div style={{fontFamily:fonts.display, fontSize:16, color:p.fg, fontWeight:500, marginTop:6}}>{a.name}</div>
          <div style={{fontSize:12, color:p.fg2, fontStyle:'italic', marginTop:4, lineHeight:1.4}}>{a.desc}</div>
        </div>
        <window.Toggle p={p} on={a.enabled} onChange={onToggle} size={18}/>
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:12, paddingTop:12, borderTop:`.5px solid ${p.border}`}}>
        {a.actions.map((act, i) => (
          <span key={i} style={{
            padding:'3px 9px', borderRadius:999, background:p.surface, border:`.5px solid ${p.border2}`,
            fontSize:10, color:p.fg2, display:'inline-flex', alignItems:'center', gap:4,
          }}>
            <window.Icon name={actionIcon(act)} size={9}/>
            {actionLabel(act, state)}
          </span>
        ))}
      </div>
      <div style={{display:'flex', gap:6, marginTop:12}}>
        <button onClick={onRun} style={{flex:1, padding:'7px 10px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5}}>
          <window.Icon name="play" size={10}/> Run now
        </button>
        <button onClick={onRemove} style={{padding:'7px 10px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg3, fontSize:11, cursor:'pointer'}}>
          <window.Icon name="trash" size={11}/>
        </button>
      </div>
      {a.lastRun && <div style={{fontSize:10, color:p.fg3, marginTop:8, textAlign:'right'}}>Last ran {a.lastRun}</div>}
    </window.Card>
  );
};

const actionIcon = (a) => {
  if (a.type==='light' || a.type==='allLights') return 'bulb';
  if (a.type==='lockAll') return 'lock';
  if (a.type==='scene') return 'scene';
  if (a.type==='precondition') return 'car';
  if (a.type==='closeGarage') return 'garage';
  if (a.type==='thermostat') return 'therm';
  return 'sparkle';
};
const actionLabel = (a, state) => {
  if (a.type==='light') {
    const l = state.lights.find(x => x.id===a.lightId);
    return `${a.on ? 'On' : 'Off'} · ${l?.name || 'light'}`;
  }
  if (a.type==='allLights') return a.on ? 'All lights on' : 'All lights off';
  if (a.type==='lockAll') return 'Lock all';
  if (a.type==='scene') return `Scene · ${a.sceneId}`;
  if (a.type==='precondition') return 'Precondition Tesla';
  if (a.type==='closeGarage') return 'Close garage';
  if (a.type==='thermostat') return `Set ${a.target}°`;
  return a.type;
};

Object.assign(window, { AutomationsView });
