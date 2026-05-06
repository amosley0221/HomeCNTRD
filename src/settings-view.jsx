// settings-view.jsx — Full settings page (mirrors Tweaks but as a real settings page)

const SettingsView = ({ ctx }) => {
  const { p, fonts, dens } = ctx;
  // settings live on parent App via setTweak; here we expose them through a context prop
  const settings = ctx.settings || {};
  const setSetting = ctx.setSetting || (() => {});
  // State-based section selection — the original scrollIntoView path was
  // unreliable inside the HA panel's nested scroll containers, so we just
  // show one section at a time and switch on click.
  const [activeSection, setActiveSection] = React.useState('appearance');

  const accents = [
    { id:'tangerine',  name:'Tangerine',  hex:'#e87f4a' },
    { id:'terracotta', name:'Terracotta', hex:'#c96442' },
    { id:'ochre',      name:'Ochre',      hex:'#b8843e' },
    { id:'sage',       name:'Sage',       hex:'#7a8c6c' },
    { id:'plum',       name:'Plum',       hex:'#7d4f6b' },
    { id:'slate',      name:'Slate',      hex:'#5b7390' },
  ];
  const personalities = [
    { id:'jarvis',  name:'Jarvis-y',  desc:'Warm, capable, conversational' },
    { id:'terse',   name:'Terse',     desc:'Brief terminal-style replies' },
    { id:'playful', name:'Playful',   desc:'Cheeky, light, friendly (Pip)' },
  ];
  const fontOptions = [
    { id:'editorial', name:'Editorial',   desc:'Newsreader · Inter' },
    { id:'classic',   name:'Classic',     desc:'Instrument Serif · Inter' },
    { id:'modern',    name:'Modern',      desc:'Space Grotesk · Inter' },
  ];

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Preferences"
        title="Settings"
        sub="Personal · this device · this household"
      />

      <div style={{display:'grid', gridTemplateColumns:'200px 1fr', gap:dens.gap, alignItems:'start'}}>
        <window.Card p={p} style={{padding:'12px 8px', position:'sticky', top:0}}>
          {[
            { id:'appearance', icon:'sun',      label:'Appearance' },
            { id:'agent',      icon:'sparkle',  label:'Agent' },
            { id:'devices',    icon:'grid',     label:'Devices' },
            { id:'home',       icon:'home',     label:'Household' },
            { id:'notifications', icon:'bell',  label:'Notifications' },
            { id:'account',    icon:'user',     label:'Account' },
          ].map(s => {
            const isActive = activeSection === s.id;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'8px 12px', margin:'2px 4px',
                borderRadius:7, border:0,
                background: isActive ? p.warm : 'transparent',
                color: isActive ? p.accent : p.fg2,
                fontWeight: isActive ? 500 : 400,
                fontFamily:fonts.body, fontSize:13, cursor:'pointer', width:'calc(100% - 8px)', textAlign:'left'
              }}>
                <window.Icon name={s.icon} size={14} stroke={1.5}/>
                <span style={{flex:1}}>{s.label}</span>
              </button>
            );
          })}
        </window.Card>

        <div style={{display:'flex', flexDirection:'column', gap:dens.gap}}>
          {/* APPEARANCE */}
          {activeSection==='appearance' && <window.Card p={p} id="setting-appearance" style={{padding:22}}>
            <SettingHeader p={p} fonts={fonts} title="Appearance" sub="How HomeCNTRD looks on this device"/>
            <SettingRow p={p} fonts={fonts} label="Theme" desc="Light, dark, or follow system">
              <div style={{display:'flex', gap:8}}>
                {[
                  { id:false, name:'Light', icon:'sun' },
                  { id:true,  name:'Dark',  icon:'moon' },
                ].map(opt => (
                  <button key={String(opt.id)} onClick={() => setSetting('dark', opt.id)} style={{
                    display:'flex', alignItems:'center', gap:7, padding:'8px 14px', borderRadius:9,
                    border:`.5px solid ${settings.dark === opt.id ? p.accent : p.border2}`,
                    background: settings.dark === opt.id ? p.accentSoft : 'transparent',
                    color: settings.dark === opt.id ? p.accent : p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body
                  }}>
                    <window.Icon name={opt.icon} size={13}/> {opt.name}
                  </button>
                ))}
              </div>
            </SettingRow>

            <SettingRow p={p} fonts={fonts} label="Accent color" desc="Used across the app for highlights and status">
              <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
                {accents.map(a => (
                  <button key={a.id} onClick={() => setSetting('hearthAccent', a.id)} style={{
                    display:'flex', alignItems:'center', gap:8, padding:'7px 10px 7px 7px', borderRadius:999,
                    border:`.5px solid ${settings.hearthAccent === a.id ? p.fg : p.border2}`,
                    background: settings.hearthAccent === a.id ? p.warm : 'transparent',
                    color:p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body
                  }}>
                    <span style={{width:18, height:18, borderRadius:'50%', background:a.hex, border:`.5px solid ${p.border2}`}}/>
                    {a.name}
                  </button>
                ))}
              </div>
            </SettingRow>

            <SettingRow p={p} fonts={fonts} label="Density" desc="How tightly information is packed">
              <div style={{display:'flex', gap:8}}>
                {['compact','regular','comfy'].map(d => (
                  <button key={d} onClick={() => setSetting('density', d)} style={{
                    padding:'8px 16px', borderRadius:9, textTransform:'capitalize',
                    border:`.5px solid ${settings.density === d ? p.accent : p.border2}`,
                    background: settings.density === d ? p.accentSoft : 'transparent',
                    color: settings.density === d ? p.accent : p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body
                  }}>{d}</button>
                ))}
              </div>
            </SettingRow>

            <SettingRow p={p} fonts={fonts} label="Typography" desc="Headline pairing">
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {fontOptions.map(f => (
                  <button key={f.id} onClick={() => setSetting('fontPair', f.id)} style={{
                    padding:'10px 14px', borderRadius:9, textAlign:'left',
                    border:`.5px solid ${settings.fontPair === f.id ? p.accent : p.border2}`,
                    background: settings.fontPair === f.id ? p.accentSoft : 'transparent',
                    color: p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body
                  }}>
                    <div style={{fontWeight:500, color: settings.fontPair === f.id ? p.accent : p.fg}}>{f.name}</div>
                    <div style={{fontSize:10, color:p.fg3, marginTop:2}}>{f.desc}</div>
                  </button>
                ))}
              </div>
            </SettingRow>
          </window.Card>}

          {/* AGENT */}
          {activeSection==='agent' && <window.Card p={p} id="setting-agent" style={{padding:22}}>
            <SettingHeader p={p} fonts={fonts} title="Agent" sub="How HomeCNTRD speaks to you"/>
            <SettingRow p={p} fonts={fonts} label="Personality" desc="Persona used when chatting and reading status">
              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                {personalities.map(per => (
                  <button key={per.id} onClick={() => setSetting('agentTone', per.id)} style={{
                    display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:9, textAlign:'left',
                    border:`.5px solid ${settings.agentTone === per.id ? p.accent : p.border2}`,
                    background: settings.agentTone === per.id ? p.accentSoft : 'transparent',
                    color:p.fg, cursor:'pointer', fontFamily:fonts.body
                  }}>
                    <div style={{width:22, height:22, borderRadius:'50%', background:p.accent, color:'#fff', display:'grid', placeItems:'center', flex:'none'}}>
                      <window.Icon name="sparkle" size={11}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13, fontWeight: settings.agentTone === per.id ? 500 : 400}}>{per.name}</div>
                      <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{per.desc}</div>
                    </div>
                    {settings.agentTone === per.id && <window.Icon name="check" size={14} style={{color:p.accent}}/>}
                  </button>
                ))}
              </div>
            </SettingRow>

            <SettingRow p={p} fonts={fonts} label="Voice activation" desc="Wake on 'Hey HomeCNTRD'" inline>
              <window.Toggle p={p} on={settings.wake !== false} onChange={(v) => setSetting('wake', v)}/>
            </SettingRow>
            <SettingRow p={p} fonts={fonts} label="Suggestions on home" desc="Show suggested commands when you open the agent" inline>
              <window.Toggle p={p} on={settings.suggestions !== false} onChange={(v) => setSetting('suggestions', v)}/>
            </SettingRow>
          </window.Card>}

          {/* DEVICES */}
          {activeSection==='devices' && <window.Card p={p} id="setting-devices" style={{padding:22}}>
            <SettingHeader p={p} fonts={fonts} title="Devices on home screen" sub="Choose which categories appear on the dashboard"/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              {[
                { k:'showLights',    icon:'bulb',  name:'Lighting' },
                { k:'showMusic',     icon:'music', name:'Music & speakers' },
                { k:'showCameras',   icon:'cam',   name:'Cameras' },
                { k:'showClimate',   icon:'therm', name:'Climate' },
                { k:'showLocks',     icon:'lock',  name:'Locks & security' },
                { k:'showScenes',    icon:'scene', name:'Scenes' },
                { k:'showCalendar',  icon:'cal',   name:'Calendar' },
                { k:'showAlarms',    icon:'bell',  name:'Alarms' },
                { k:'showTv',        icon:'tv',    name:'TV' },
                { k:'showWeather',   icon:'cloud', name:'Weather' },
              ].map(item => (
                <div key={item.k} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:9, border:`.5px solid ${p.border}`, background:p.surface}}>
                  <window.Icon name={item.icon} size={15} style={{color:p.fg3}}/>
                  <div style={{flex:1, fontSize:13, color:p.fg}}>{item.name}</div>
                  <window.Toggle p={p} on={settings[item.k] !== false} onChange={(v) => setSetting(item.k, v)}/>
                </div>
              ))}
            </div>
          </window.Card>}

          {/* HOUSEHOLD */}
          {activeSection==='home' && <window.Card p={p} id="setting-home" style={{padding:22}}>
            <SettingHeader p={p} fonts={fonts} title="Household" sub="People & places"/>
            <SettingRow p={p} fonts={fonts} label="Members">
              <div style={{display:'flex', flexDirection:'column', gap:6}}>
                {[
                  { name:'Frances Willows', role:'Owner', mail:'frances.w@willowstudio.com' },
                  { name:'Jamie Willows',   role:'Member', mail:'jamie.w@willowstudio.com' },
                  { name:'Guests',          role:'Door codes', mail:'2 active codes' },
                ].map(m => (
                  <div key={m.mail} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:9, border:`.5px solid ${p.border}`, background:p.surface}}>
                    <div style={{width:32, height:32, borderRadius:'50%', background:p.warm, color:p.accent, display:'grid', placeItems:'center', fontFamily:fonts.display, fontWeight:500, flex:'none'}}>{m.name[0]}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13, color:p.fg}}>{m.name}</div>
                      <div style={{fontSize:11, color:p.fg3}}>{m.mail}</div>
                    </div>
                    <span style={{fontSize:11, color:p.fg3}}>{m.role}</span>
                  </div>
                ))}
                <button style={{padding:'8px 12px', borderRadius:8, border:`1px dashed ${p.border2}`, background:'transparent', color:p.fg2, fontSize:12, cursor:'pointer', fontFamily:fonts.body, display:'flex', alignItems:'center', gap:6, alignSelf:'flex-start'}}><window.Icon name="plus" size={11}/> Invite a member</button>
              </div>
            </SettingRow>
            <SettingRow p={p} fonts={fonts} label="Address" inline>
              <span style={{fontSize:13, color:p.fg2}}>Willowbrook · Bernal Heights, SF</span>
            </SettingRow>
            <SettingRow p={p} fonts={fonts} label="Time zone" inline>
              <span style={{fontSize:13, color:p.fg2}}>Pacific · GMT−8</span>
            </SettingRow>
          </window.Card>}

          {/* NOTIFICATIONS */}
          {activeSection==='notifications' && <window.Card p={p} id="setting-notifications" style={{padding:22}}>
            <SettingHeader p={p} fonts={fonts} title="Notifications" sub="What HomeCNTRD chimes for"/>
            {[
              { k:'notifMotion',  name:'Motion at the front door',     desc:'Ring chime + push' },
              { k:'notifPackage', name:'Package detected',             desc:'Once per delivery, all rooms' },
              { k:'notifLeak',    name:'Water leak / freeze warning',  desc:'Critical · breaks DND' },
              { k:'notifCharge',  name:'Tesla finished charging',      desc:'Once per session' },
              { k:'notifGarage',  name:'Garage left open > 10 min',    desc:'Repeats every 5 min until closed' },
              { k:'notifBriefing',name:'Morning briefing',             desc:'7:30 AM · weather + first meeting + traffic' },
            ].map(n => (
              <div key={n.k} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderTop:`.5px solid ${p.border}`}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, color:p.fg}}>{n.name}</div>
                  <div style={{fontSize:11, color:p.fg3, marginTop:2}}>{n.desc}</div>
                </div>
                <window.Toggle p={p} on={settings[n.k] !== false} onChange={(v) => setSetting(n.k, v)}/>
              </div>
            ))}
          </window.Card>}

          {/* ACCOUNT */}
          {activeSection==='account' && <window.Card p={p} id="setting-account" style={{padding:22}}>
            <SettingHeader p={p} fonts={fonts} title="Account" sub="HomeCNTRD account · sign-in"/>
            <div style={{display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:11, background:p.surface, border:`.5px solid ${p.border}`}}>
              <div style={{width:46, height:46, borderRadius:'50%', background:p.warm, color:p.accent, display:'grid', placeItems:'center', fontFamily:fonts.display, fontSize:22, fontWeight:500, flex:'none'}}>{(ctx.user?.firstName || 'F')[0]}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:fonts.display, fontSize:16, color:p.fg, fontWeight:500}}>{ctx.user?.firstName || 'Frances'}</div>
                <div style={{fontSize:12, color:p.fg3, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ctx.user?.email || 'frances@home.com'} · since {ctx.user?.createdAt || '2024-05-12'}</div>
              </div>
              <button onClick={() => ctx.doLogout?.()} style={{padding:'7px 12px', borderRadius:8, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg, fontSize:12, cursor:'pointer', fontFamily:fonts.body}}>Sign out</button>
            </div>

            <SettingRow p={p} fonts={fonts} label="Active sessions" desc="Devices currently signed in to your HomeCNTRD account">
              <div style={{display:'flex', flexDirection:'column', gap:6}}>
                {(ctx.user?.sessions || []).map(s => (
                  <div key={s.id} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:9, background:p.surface, border:`.5px solid ${p.border}`}}>
                    <div style={{width:30, height:30, borderRadius:7, background:p.warm, color:p.accent, display:'grid', placeItems:'center', flex:'none'}}>
                      <window.Icon name={s.device.includes('iPhone') ? 'mic' : s.device.includes('Mac') ? 'grid' : s.device.includes('iPad') ? 'tv' : 'home'} size={14}/>
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13, color:p.fg, fontWeight: s.current ? 500 : 400, display:'flex', alignItems:'center', gap:6}}>{s.device}{s.current && <span style={{fontSize:9, padding:'1px 6px', borderRadius:999, background:p.accent, color:'#fff'}}>THIS DEVICE</span>}</div>
                      <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{s.os} · {s.loc} · {s.last}</div>
                    </div>
                    {!s.current && <button onClick={() => ctx.patchUser?.(u => ({...u, sessions: u.sessions.filter(x => x.id !== s.id)}))} style={{padding:'5px 9px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.danger, fontSize:11, cursor:'pointer'}}>End</button>}
                  </div>
                ))}
                <button onClick={() => ctx.patchUser?.(u => ({...u, sessions: u.sessions.filter(s => s.current)}))} style={{padding:'8px 12px', borderRadius:8, border:`1px dashed ${p.border2}`, background:'transparent', color:p.danger, fontSize:12, cursor:'pointer', fontFamily:fonts.body, alignSelf:'flex-start'}}>Sign out everywhere else</button>
              </div>
            </SettingRow>

            <SettingRow p={p} fonts={fonts} label="Connected services" desc="Mirrors what's set up in Devices">
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:6}}>
                {ctx.state.integrations.filter(i => i.status === 'connected').map(i => (
                  <div key={i.id} style={{display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, background:p.surface, border:`.5px solid ${p.border}`}}>
                    <div style={{width:22, height:22, borderRadius:6, background:i.color + '22', color:i.color, display:'grid', placeItems:'center', flex:'none'}}>
                      <window.Icon name={i.icon} size={11}/>
                    </div>
                    <div style={{fontSize:11, color:p.fg, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{i.name}</div>
                  </div>
                ))}
              </div>
            </SettingRow>

            <SettingRow p={p} fonts={fonts} label="Privacy" desc="What HomeCNTRD shares and stores">
              <div style={{display:'flex', flexDirection:'column'}}>
                {[
                  { k:'cameraIndoorRecording', name:'Record indoor cameras when home',     desc:'Turn off to only record when Away mode is active' },
                  { k:'shareWithApple',        name:'Share routines with Apple Home',      desc:'Lets HomeKit see scenes and trigger them' },
                  { k:'shareWithGoogle',       name:'Share with Google Home',              desc:'Off · no devices currently linked to Google' },
                  { k:'analytics',             name:'Anonymous usage analytics',           desc:'Helps improve suggestions · no audio or video' },
                  { k:'voiceTraining',         name:'Use my voice to train the assistant', desc:'Off · voice samples are deleted after each session' },
                ].map((it, j) => (
                  <div key={it.k} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderTop: j ? `.5px solid ${p.border}` : 'none'}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13, color:p.fg}}>{it.name}</div>
                      <div style={{fontSize:11, color:p.fg3, marginTop:2}}>{it.desc}</div>
                    </div>
                    <window.Toggle p={p} on={!!ctx.user?.privacy?.[it.k]} onChange={(v) => ctx.patchUser?.(u => ({...u, privacy:{...u.privacy, [it.k]: v}}))}/>
                  </div>
                ))}
              </div>
            </SettingRow>

            <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderTop:`.5px solid ${p.border}`, marginTop:14, fontSize:12}}>
              <span style={{color:p.fg2}}>Plan</span><span style={{color:p.fg}}>HomeCNTRD {ctx.user?.plan === 'plus-annual' ? 'Plus · annual' : ctx.user?.plan === 'free' ? 'Free' : 'Plus'}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderTop:`.5px solid ${p.border}`, fontSize:12}}>
              <span style={{color:p.fg2}}>Version</span><span style={{color:p.fg3, fontVariantNumeric:'tabular-nums'}}>2.1.4 (1842)</span>
            </div>
          </window.Card>}
        </div>
      </div>
      <div style={{height:60}}/>
    </>
  );
};

const SettingHeader = ({ p, fonts, title, sub }) => (
  <div style={{marginBottom:16}}>
    <div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, fontWeight:500}}>{title}</div>
    {sub && <div style={{fontSize:12, color:p.fg3, marginTop:3, fontStyle:'italic', fontFamily:fonts.display}}>{sub}</div>}
  </div>
);
const SettingRow = ({ p, fonts, label, desc, children, inline }) => (
  <div style={{padding:'14px 0', borderTop:`.5px solid ${p.border}`, display: inline ? 'flex' : 'block', alignItems: inline ? 'center' : 'stretch', gap:14}}>
    <div style={{flex: inline ? 1 : 'auto', marginBottom: inline ? 0 : 12}}>
      <div style={{fontSize:13, color:p.fg, fontWeight:500}}>{label}</div>
      {desc && <div style={{fontSize:11, color:p.fg3, marginTop:3}}>{desc}</div>}
    </div>
    {children}
  </div>
);

window.SettingsView = SettingsView;
