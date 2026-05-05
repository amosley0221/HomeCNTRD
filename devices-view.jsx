// devices-view.jsx — Integration hub & Add Device wizard

const DevicesView = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const [adding, setAdding] = React.useState(null); // integration id being added
  const [expanded, setExpanded] = React.useState(null); // integration id expanded to show its devices

  const connected = state.integrations.filter(i => i.status === 'connected');
  const available = state.integrations.filter(i => i.status === 'available');

  const setIntegrationStatus = (id, status) => setState(s => ({
    ...s, integrations: s.integrations.map(i => i.id === id ? { ...i, status } : i)
  }));

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow={`${connected.length} integrations connected`}
        title="Devices"
        sub="Hue, Sonos, Ring, Nest, Apple TV, Apple Music, Tesla, MyQ, Outlook · all online"
        right={<button onClick={() => setAdding('PICK')} style={{
          padding:'9px 16px', borderRadius:9, border:0, background:p.accent, color:'#fff', fontSize:13, cursor:'pointer', fontFamily:fonts.body, fontWeight:500, display:'flex', alignItems:'center', gap:6
        }}><window.Icon name="plus" size={13}/> Add device</button>}
      />

      <window.Section title="Connected" subtitle={`${connected.length} services · 32 devices`} p={p} fonts={fonts}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:dens.tileGap}}>
          {connected.map(i => (
            <IntegrationCard key={i.id} ctx={ctx} integration={i} expanded={expanded === i.id}
              onClick={() => setExpanded(expanded === i.id ? null : i.id)}
              onDisconnect={() => setIntegrationStatus(i.id, 'available')}/>
          ))}
        </div>
      </window.Section>

      <window.Section title="Available" subtitle="Compatible with HomeCNTRD" p={p} fonts={fonts}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:dens.tileGap}}>
          {available.map(i => (
            <button key={i.id} onClick={() => setAdding(i.id)} style={{
              padding:18, borderRadius:12, border:`1px dashed ${p.border2}`, background:p.surface2,
              color:p.fg, cursor:'pointer', textAlign:'left', display:'flex', flexDirection:'column', gap:8, fontFamily:fonts.body
            }}>
              <div style={{width:38, height:38, borderRadius:9, background:i.color + '22', color:i.color, display:'grid', placeItems:'center'}}>
                <window.Icon name={i.icon} size={20}/>
              </div>
              <div style={{fontFamily:fonts.display, fontSize:15, fontWeight:500, marginTop:4}}>{i.name}</div>
              <div style={{fontSize:11, color:p.fg3}}>+ Set up</div>
            </button>
          ))}
        </div>
      </window.Section>

      {adding && <AddDeviceModal ctx={ctx} integrationId={adding} onClose={() => setAdding(null)}
        onConnect={(id) => { setIntegrationStatus(id, 'connected'); setAdding(null); }}/>}
      <div style={{height:60}}/>
    </>
  );
};

const IntegrationCard = ({ ctx, integration, expanded, onClick, onDisconnect }) => {
  const { p, fonts, state } = ctx;
  const i = integration;
  // Find devices belonging to this integration in shared state
  const devicesUnder = devicesForIntegration(i.id, state);

  return (
    <div style={{borderRadius:12, border:`.5px solid ${p.border}`, background:p.surface2, overflow:'hidden'}}>
      <button onClick={onClick} style={{
        width:'100%', padding:14, border:0, background:'transparent', cursor:'pointer', textAlign:'left',
        display:'flex', alignItems:'center', gap:12, color:p.fg, fontFamily:fonts.body
      }}>
        <div style={{width:40, height:40, borderRadius:9, background:i.color + '22', color:i.color, display:'grid', placeItems:'center', flex:'none'}}>
          <window.Icon name={i.icon} size={20}/>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:8, minWidth:0}}>
            <div style={{fontFamily:fonts.display, fontSize:15, color:p.fg, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0}}>{i.name}</div>
            <span style={{width:6, height:6, borderRadius:'50%', background:'oklch(60% 0.14 145)', flex:'none'}}/>
          </div>
          <div style={{fontSize:11, color:p.fg3, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{i.account}</div>
        </div>
        <div style={{textAlign:'right', flex:'none'}}>
          <div style={{fontSize:12, color:p.fg2, fontVariantNumeric:'tabular-nums'}}>{typeof i.devices === 'number' ? `${i.devices} devices` : i.devices}</div>
          <div style={{fontSize:10, color:p.fg3, marginTop:2}}>{expanded ? 'Hide' : 'Manage'}</div>
        </div>
      </button>
      {expanded && (
        <div style={{borderTop:`.5px solid ${p.border}`, padding:'10px 14px', background:p.surface}}>
          {(i.id === 'hue' || i.id === 'sonos' || i.id === 'ring') ? (
            <RoomAssignList ctx={ctx} integrationId={i.id}/>
          ) : devicesUnder.length > 0 && (
            <div style={{display:'flex', flexDirection:'column', gap:4, marginBottom:8}}>
              {devicesUnder.map((d, j) => (
                <div key={j} style={{display:'flex', alignItems:'center', gap:8, padding:'5px 0', fontSize:12, color:p.fg2, borderBottom: j < devicesUnder.length - 1 ? `.5px solid ${p.border}` : 'none'}}>
                  <window.Icon name={d.icon} size={11} style={{color:p.fg3}}/>
                  <span style={{flex:1}}>{d.name}</span>
                  <span style={{fontSize:10, color: d.online ? 'oklch(60% 0.14 145)' : p.fg3}}>● {d.online ? 'online' : 'offline'}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{display:'flex', gap:6}}>
            <button style={{flex:1, padding:'6px 10px', borderRadius:6, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Refresh</button>
            <button style={{flex:1, padding:'6px 10px', borderRadius:6, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Settings</button>
            <button onClick={(e) => { e.stopPropagation(); onDisconnect(); }} style={{
              flex:1, padding:'6px 10px', borderRadius:6, border:`.5px solid ${p.border2}`, background:'transparent', color:p.danger, fontSize:11, cursor:'pointer', fontFamily:fonts.body
            }}>Disconnect</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Map integration id to the actual devices in state — for the manage view
function devicesForIntegration(id, state) {
  switch (id) {
    case 'hue':     return state.lights.map(l => ({ name:`${l.name}`, icon:'bulb', online:true }));
    case 'sonos':   return state.speakers.filter(s => s.type === 'sonos').map(s => ({ name:s.name, icon:'sonos', online:true }));
    case 'ring':    return state.cameras.map(c => ({ name:c.name, icon:'cam', online:c.online }));
    case 'nest':    return [{ name:'Hallway thermostat', icon:'therm', online:true }];
    case 'appletv': return state.tvs.filter(tv => tv.brand==='appletv').map(tv => ({ name:`${window.ROOMS.find(r=>r.id===tv.room)?.name} · ${tv.model}`, icon:'tv', online:true }));
    case 'googletv':return state.tvs.filter(tv => tv.brand==='googletv').map(tv => ({ name:`${window.ROOMS.find(r=>r.id===tv.room)?.name} · ${tv.model}`, icon:'tv', online:true }));
    case 'lgthinq': return state.tvs.filter(tv => tv.brand==='lgthinq').map(tv => ({ name:`${window.ROOMS.find(r=>r.id===tv.room)?.name} · ${tv.model}`, icon:'tv', online:true }));
    case 'music':   return [{ name:'Apple Music · 2,847 songs', icon:'music', online:true }, { name:'Up Next queue · 12 tracks', icon:'queue', online:true }];
    case 'tesla':   return [{ name:state.tesla.name, icon:'car', online:true }];
    case 'myq':     return state.garage.doors.map(d => ({ name:d.name, icon:'garage', online:true }));
    case 'outlook': return [{ name:`Today · ${state.calendar.length} events`, icon:'cal', online:true }];
    default: return [];
  }
}

// ── ADD DEVICE WIZARD ───────────────────────────────────────────────────
const AddDeviceModal = ({ ctx, integrationId, onClose, onConnect }) => {
  const { p, fonts, state } = ctx;
  const [step, setStep] = React.useState(integrationId === 'PICK' ? 'pick' : 'auth');
  const [picked, setPicked] = React.useState(integrationId === 'PICK' ? null : integrationId);
  const [progress, setProgress] = React.useState(0);

  const all = state.integrations;

  React.useEffect(() => {
    if (step === 'discover') {
      setProgress(0);
      const id = setInterval(() => setProgress(v => {
        if (v >= 100) { clearInterval(id); setStep('done'); return 100; }
        return v + 8;
      }), 80);
      return () => clearInterval(id);
    }
  }, [step]);

  const meta = all.find(i => i.id === picked);

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:60, background:'rgba(0,0,0,.55)', backdropFilter:'blur(4px)',
      display:'grid', placeItems:'center', padding:24,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width:'min(560px, 100%)', maxHeight:'min(640px, 100%)',
        background: p.surface2, border:`.5px solid ${p.border2}`, borderRadius:18,
        boxShadow:'0 32px 80px rgba(0,0,0,.4)', overflow:'hidden', display:'flex', flexDirection:'column'
      }}>
        <div style={{padding:'16px 20px', borderBottom:`.5px solid ${p.border}`, display:'flex', alignItems:'center', gap:12}}>
          <div style={{flex:1, fontFamily:fonts.display, fontSize:17, color:p.fg, fontWeight:500}}>
            {step === 'pick' ? 'Add a device' : meta ? `Connect ${meta.name}` : 'Add a device'}
          </div>
          <button onClick={onClose} style={{border:0, background:'transparent', color:p.fg3, cursor:'pointer', padding:6, fontSize:18}}>×</button>
        </div>

        <div style={{flex:1, overflow:'auto', padding:20}}>
          {step === 'pick' && (
            <>
              <div style={{fontSize:13, color:p.fg2, marginBottom:14}}>Choose what to connect. HomeCNTRD will guide you through sign-in and discovery.</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10}}>
                {all.map(i => (
                  <button key={i.id} onClick={() => { setPicked(i.id); setStep('auth'); }} disabled={i.status === 'connected'} style={{
                    padding:14, borderRadius:10, border:`.5px solid ${p.border2}`, background: i.status === 'connected' ? p.surface : p.surface2, color:p.fg, cursor: i.status === 'connected' ? 'default' : 'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:11, fontFamily:fonts.body, opacity: i.status === 'connected' ? 0.55 : 1
                  }}>
                    <div style={{width:32, height:32, borderRadius:7, background:i.color + '22', color:i.color, display:'grid', placeItems:'center', flex:'none'}}>
                      <window.Icon name={i.icon} size={16}/>
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13, fontWeight:500}}>{i.name}</div>
                      <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{i.status === 'connected' ? '✓ Connected' : 'Not connected'}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'auth' && meta && (
            <div>
              <div style={{display:'flex', alignItems:'center', gap:14, padding:14, borderRadius:11, background:p.surface, border:`.5px solid ${p.border}`}}>
                <div style={{width:44, height:44, borderRadius:10, background:meta.color + '22', color:meta.color, display:'grid', placeItems:'center', flex:'none'}}>
                  <window.Icon name={meta.icon} size={22}/>
                </div>
                <div>
                  <div style={{fontFamily:fonts.display, fontSize:16, color:p.fg, fontWeight:500}}>{meta.name}</div>
                  <div style={{fontSize:12, color:p.fg3, marginTop:2}}>{authBlurb(meta.id)}</div>
                </div>
              </div>

              <div style={{marginTop:16, padding:'14px 16px', background:p.surface, border:`.5px solid ${p.border}`, borderRadius:10}}>
                <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:10}}>Permissions</div>
                {permissionsFor(meta.id).map((perm, j) => (
                  <div key={j} style={{display:'flex', alignItems:'flex-start', gap:10, padding:'7px 0', fontSize:12}}>
                    <window.Icon name="check" size={13} style={{color:p.accent, marginTop:2, flex:'none'}}/>
                    <div style={{color:p.fg2}}>{perm}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:14, fontSize:11, color:p.fg3, lineHeight:1.5}}>
                You'll be redirected to {meta.name}'s sign-in page. HomeCNTRD never sees your password — only the access token {meta.name} returns.
              </div>

              <div style={{display:'flex', gap:10, marginTop:18}}>
                <button onClick={() => integrationId === 'PICK' ? setStep('pick') : onClose()} style={{
                  flex:1, padding:'11px 0', borderRadius:9, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, fontSize:13, cursor:'pointer', fontFamily:fonts.body
                }}>{integrationId === 'PICK' ? 'Back' : 'Cancel'}</button>
                <button onClick={() => setStep('discover')} style={{
                  flex:1.5, padding:'11px 0', borderRadius:9, border:0, background:meta.color, color:'#fff', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:fonts.body
                }}>Sign in to {meta.name}</button>
              </div>
            </div>
          )}

          {step === 'discover' && meta && (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:40}}>
              <div style={{width:64, height:64, borderRadius:14, background:meta.color + '22', color:meta.color, display:'grid', placeItems:'center', marginBottom:18}}>
                <window.Icon name={meta.icon} size={32}/>
              </div>
              <div style={{fontFamily:fonts.display, fontSize:18, color:p.fg, fontWeight:500}}>Discovering {meta.name} devices…</div>
              <div style={{fontSize:12, color:p.fg3, marginTop:6}}>Scanning your network and account</div>
              <div style={{width:'100%', maxWidth:300, height:4, background:p.border, borderRadius:2, marginTop:20, overflow:'hidden'}}>
                <div style={{width:`${progress}%`, height:'100%', background:meta.color, transition:'width .1s'}}/>
              </div>
              <div style={{fontSize:11, color:p.fg3, marginTop:12, fontVariantNumeric:'tabular-nums'}}>{progress}%</div>
              <div style={{fontSize:11, color:p.fg2, marginTop:18, fontStyle:'italic', fontFamily:fonts.display, textAlign:'center', maxWidth:280}}>
                {progress < 30 ? 'Connecting securely…' : progress < 60 ? 'Loading your account…' : progress < 90 ? `Found ${Math.floor(progress/15)} devices…` : 'Almost done…'}
              </div>
            </div>
          )}

          {step === 'done' && meta && (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'30px 20px', textAlign:'center'}}>
              <div style={{width:56, height:56, borderRadius:'50%', background:'oklch(60% 0.14 145 / .15)', color:'oklch(60% 0.14 145)', display:'grid', placeItems:'center', marginBottom:14}}>
                <window.Icon name="check" size={28} stroke={2.2}/>
              </div>
              <div style={{fontFamily:fonts.display, fontSize:20, color:p.fg, fontWeight:500}}>{meta.name} connected</div>
              <div style={{fontSize:13, color:p.fg2, marginTop:8, maxWidth:340}}>{discoveryResultText(meta.id)}</div>
              <button onClick={() => onConnect(picked)} style={{
                marginTop:22, padding:'11px 24px', borderRadius:9, border:0, background:p.accent, color:'#fff', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:fonts.body
              }}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function authBlurb(id) {
  return ({
    hue:     'Sign in with your Hue Bridge account · Bridge auto-discovered on local network',
    sonos:   'Sign in with your Sonos household ID · OAuth via sonos.com',
    ring:    'Sign in with your Ring account · two-factor required',
    nest:    'Sign in with Google · Smart Device Management API',
    appletv: 'Pair with HomeKit · open Home app on your iPhone to confirm',
    googletv:'Sign in with Google · pair with on-screen code',
    lgthinq: 'Sign in with LG ThinQ · accept the prompt on your TV',
    music:   'Sign in with your Apple ID · MusicKit access',
    tesla:   'Sign in with your Tesla account · vehicle command consent',
    myq:     'Sign in with your MyQ account · door open/close consent',
    outlook: 'Sign in with Microsoft · calendar read & focus permission',
    lutron:  'Sign in with your Lutron account · Caséta bridge required',
    ecobee:  'Sign in with your Ecobee account',
    august:  'Sign in with your August Home account',
  })[id] || 'Sign in to continue';
}

function permissionsFor(id) {
  return ({
    hue:     ['Read & control all bulbs and groups', 'Read scenes', 'Modify schedules'],
    sonos:   ['Play, pause & skip on any speaker', 'Group & ungroup speakers', 'Change volume', 'Read playback state'],
    ring:    ['View live feeds', 'Receive motion notifications', 'Save clips for 30 days'],
    nest:    ['Read temperature & humidity', 'Set target temperature & mode', 'Read schedule'],
    appletv: ['Play, pause, change input', 'Open apps', 'AirPlay routing', 'Use Siri remote'],
    googletv:['Play, pause, cast content', 'Read what\'s playing', 'Open apps', 'D-pad remote'],
    lgthinq: ['Power on/off', 'Volume & input', 'D-pad remote', 'Launch apps'],
    music:   ['Read your full library & playlists', 'Play tracks on any speaker', 'Modify playlists you own', 'Read recently played'],
    tesla:   ['Read vehicle state (charge, location, climate)', 'Lock & unlock', 'Open frunk and trunk', 'Start preconditioning', 'Set charge schedule'],
    myq:     ['Open & close garage doors', 'Read door state & history', 'Set auto-close timers'],
    outlook: ['Read your calendar events', 'Set focus / Do Not Disturb', 'Read meeting attendees'],
    lutron:  ['Read & control lights', 'Read scenes'],
    ecobee:  ['Read & control thermostat', 'Read schedule'],
    august:  ['Lock & unlock', 'Read door state'],
  })[id] || ['Connect & manage'];
}

function discoveryResultText(id) {
  return ({
    hue:     'Found 9 bulbs across 4 rooms. Imported 4 scenes.',
    sonos:   'Found 5 speakers in the Willowbrook household. Living Room and Kitchen are already grouped.',
    ring:    'Found 6 cameras: Front Door, Back Yard, Driveway, Garage, Living Room, Nursery.',
    nest:    'Found 1 thermostat (Hallway). Imported your weekly schedule.',
    appletv: 'Found 2 Apple TVs. AirPlay routing enabled.',
    googletv:'Found 1 Google TV in the office. Now Playing is available.',
    lgthinq: 'Found 1 LG OLED in the kitchen. Remote ready.',
    music:   'Connected Apple Music — 2,847 songs in your library and 24 playlists are available.',
    tesla:   "Found Frances's Model 3. Currently parked at home, 72% charged.",
    myq:     'Found 2 doors: Main and Side garage.',
    outlook: 'Synced today and the next 30 days. Found 6 events today.',
    lutron:  'Found Caséta bridge and 3 dimmers.',
    ecobee:  'Found 1 thermostat.',
    august:  'Found 1 lock.',
  })[id] || 'Connected.';
}

// Per-device room assignment editor for Hue / Sonos / Ring
const RoomAssignList = ({ ctx, integrationId }) => {
  const { p, fonts, state, setState } = ctx;
  const items = integrationId === 'hue' ? state.lights
              : integrationId === 'sonos' ? state.speakers.filter(s => s.type === 'sonos')
              : state.cameras;
  const icon = integrationId === 'hue' ? 'bulb' : integrationId === 'sonos' ? 'sonos' : 'cam';
  const stateKey = integrationId === 'hue' ? 'lights' : integrationId === 'sonos' ? 'speakers' : 'cameras';

  const setRoom = (id, room) => setState(s => ({...s, [stateKey]: s[stateKey].map(d => d.id===id ? {...d, room} : d)}));

  return (
    <div style={{display:'flex', flexDirection:'column', gap:6, marginBottom:10}}>
      <div style={{fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3, marginBottom:2}}>Assign rooms</div>
      {items.map(d => (
        <div key={d.id} style={{display:'flex', alignItems:'center', gap:8, padding:'6px 8px', borderRadius:7, background:p.surface2, border:`.5px solid ${p.border}`}}>
          <window.Icon name={icon} size={12} style={{color:p.fg3, flex:'none'}}/>
          <span style={{flex:1, fontSize:12, color:p.fg, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{d.name}</span>
          <select value={d.room} onChange={(e) => setRoom(d.id, e.target.value)} style={{
            padding:'4px 8px', borderRadius:6, border:`.5px solid ${p.border2}`,
            background:p.surface, color:p.fg, fontSize:11, fontFamily:fonts.body, cursor:'pointer', flex:'none'
          }}>
            {window.ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
};

window.DevicesView = DevicesView;
