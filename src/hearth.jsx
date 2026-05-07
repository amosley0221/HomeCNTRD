// hearth.jsx — Shell: nav rail, page routing, agent. Building blocks live here too.

import HassContext from './lib/hass-context.js';
import { askAgent } from './lib/ai.js';
import { parseIntent } from './lib/intents.js';
import { speak as speakText, cancelSpeak } from './lib/voice.js';

const HearthApp = ({ dark, density, accent, agentTone, fontPair, bgImage, visibleDevices, settings, setSetting, user, patchUser, doLogout, narrow, openBrowser }) => {
  const hass = React.useContext(HassContext);
  const [state, setState] = window.useHomeState();
  const [page, setPage] = React.useState('home');           // home | music | cameras | calendar | car | garage | devices | settings
  const [room, setRoom] = React.useState('living');
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // for drawer mode on the new Home
  const [agentOpen, setAgentOpen] = React.useState(false);
  const [unread, setUnread] = React.useState(0);
  const [thinking, setThinking] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { who: 'agent', text: `Hi ${user?.firstName || 'there'} — ask me anything about your home, or tell me to do something. Try "set the mood for dinner" or "open Esfand on Twitch".`, t: 'now' }
  ]);
  const [draft, setDraft] = React.useState('');

  const p = palette(dark, accent);
  const fonts = FONT_PAIRS[fontPair] || FONT_PAIRS.editorial;
  const dens = DENSITY[density] || DENSITY.regular;

  // Spoken-response toggle so users can mute Jarvis from the Tweaks panel.
  const ttsEnabled = settings?.ttsAgent !== false;

  const announce = (text) => {
    if (!ttsEnabled || !text) return;
    cancelSpeak();
    speakText(text, { rate: 1.0, pitch: 1.0 });
  };

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { who: 'user', text, t: 'now' };
    setMessages(m => [...m, userMsg]);
    setDraft('');

    // Local intent parser first — catches "open <X> on Twitch" /
    // "watch <X> on YouTube" type commands without a round-trip to the
    // LLM, and routes URL intents into the embedded browser overlay
    // (handled by app.jsx via the openBrowser prop).
    const intent = parseIntent(text);
    if (intent?.type === 'open_url' && openBrowser) {
      openBrowser(intent.url, intent.label);
      const reply = `Opening ${intent.label || intent.url}.`;
      setMessages(m => [...m, { who: 'agent', text: reply, t: 'now' }]);
      announce(reply);
      if (!agentOpen) setUnread(u => u + 1);
      return;
    }
    if (intent?.type === 'speech') {
      setMessages(m => [...m, { who: 'agent', text: intent.text, t: 'now' }]);
      announce(intent.text);
      if (!agentOpen) setUnread(u => u + 1);
      return;
    }

    setThinking(true);

    // Try HA's configured conversation agent (real LLM if the user has
    // one set up under Settings → Voice Assistants). Falls back to the
    // prototype's regex parser when HA returns nothing.
    let reply = null;
    if (hass) {
      const ai = await askAgent(hass, text);
      reply = ai?.speech || null;
    }
    if (!reply) reply = window.runAgent(text, state, setState);
    if (!reply) reply = "I'm here, but no conversation agent is configured yet — set one up in HA → Settings → Voice Assistants and I'll get smarter.";

    setThinking(false);
    setMessages(m => [...m, { who: 'agent', text: reply, t: 'now' }]);
    announce(reply);
    if (!agentOpen) setUnread(u => u + 1);
  };
  const openAgent = () => { setAgentOpen(true); setUnread(0); };

  const visible = visibleDevices || { lights:true, music:true, cameras:true, climate:true, locks:true, scenes:true, calendar:true, weather:true, alarms:true, tv:true };
  const ctx = { p, fonts, dens, state, setState, room, setRoom, page, setPage, visible, accent, dark, settings, setSetting, user, patchUser, doLogout, narrow };

  return (
    <div data-screen-label="HomeCNTRD" style={{
      width:'100%', height:'100%', background: p.bg, color: p.fg,
      fontFamily: fonts.body, position:'relative', overflow:'hidden',
      backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      backgroundSize:'cover', backgroundPosition:'center',
    }}>
      {bgImage && <div style={{position:'absolute',inset:0,background:dark?'rgba(20,15,12,.78)':'rgba(248,243,235,.84)',backdropFilter:'blur(2px)'}} />}
      {state.dnd.active && <DndBanner ctx={ctx} />}
      <div style={{
        position:'relative', display:'grid',
        gridTemplateColumns: (narrow || page === 'home') ? '1fr' : '232px 1fr',
        gridTemplateRows: narrow ? '1fr 64px' : '1fr',
        height:'100%',
      }}>
        {!narrow && page !== 'home' && <Sidebar ctx={ctx} />}
        <main style={{overflow:'auto', padding: narrow ? '16px 14px 14px' : (page === 'home' ? 0 : dens.pad), display:'flex', flexDirection:'column', gap: dens.gap, paddingBottom: narrow ? 80 : undefined}}>
          {narrow && <MobileHeader ctx={ctx} />}
          {page === 'home'     && <window.PersonalDashboard ctx={ctx} onOpenMenu={() => setSidebarOpen(true)} />}
          {page === 'dashboard' && <window.HomeView ctx={ctx} />}
          {page === 'music'    && <window.MusicView ctx={ctx} />}
          {page === 'cameras'  && <window.CamerasView ctx={ctx} />}
          {page === 'calendar' && <window.CalendarView ctx={ctx} />}
          {page === 'car'      && <window.CarView ctx={ctx} />}
          {page === 'garage'   && <window.GarageView ctx={ctx} />}
          {page === 'devices'  && <window.DevicesView ctx={ctx} />}
          {page === 'automations' && <window.AutomationsView ctx={ctx} />}
          {page === 'settings' && <window.SettingsView ctx={ctx} />}
        </main>
        {narrow && <BottomNav ctx={ctx} />}
      </div>

      {/* Drawer-style sidebar — only used on the new Home (where we hide
          the inline rail to give the personal dashboard full width). Tap
          the hamburger button on the dashboard, or any nav item, to
          dismiss. */}
      {!narrow && page === 'home' && sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{
            position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:60,
            backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)',
          }}/>
          <div style={{
            position:'fixed', left:0, top:0, bottom:0, width:232, zIndex:61,
            boxShadow:'8px 0 32px rgba(0,0,0,.4)',
          }}>
            <Sidebar ctx={{ ...ctx, setPage: (id) => { setPage(id); setSidebarOpen(false); } }} />
          </div>
        </>
      )}
      <window.NowPlayingBar ctx={ctx} />
      <AgentBubble ctx={ctx} open={agentOpen} setOpen={setAgentOpen} unread={unread}
        messages={messages} thinking={thinking} draft={draft} setDraft={setDraft}
        send={send} openAgent={openAgent} agentTone={agentTone} />
    </div>
  );
};

// ── PALETTE ──────────────────────────────────────────────────────────────
const HEARTH_ACCENTS = {
  tangerine:  '#e87f4a',
  terracotta: '#c96442',
  ochre:      '#b8843e',
  sage:       '#7a8c6c',
  plum:       '#7d4f6b',
  slate:      '#5b7390',
};
function palette(dark, accent) {
  const a = HEARTH_ACCENTS[accent] || HEARTH_ACCENTS.tangerine;
  if (dark) return {
    bg:'#161310', surface:'#1f1b16', surface2:'#27221c', card:'#2a231b',
    fg:'#f1ead9', fg2:'rgba(241,234,217,0.7)', fg3:'rgba(241,234,217,0.45)',
    border:'rgba(241,234,217,0.08)', border2:'rgba(241,234,217,0.16)',
    accent:a, accentSoft:a+'33', accentDim:a+'22', warm:'#3a2e22', danger:'#d96450',
    dark:true,
  };
  return {
    bg:'#f5efe4', surface:'#fbf6ec', surface2:'#fff', card:'#fffaf0',
    fg:'#2a231b', fg2:'rgba(42,35,27,0.68)', fg3:'rgba(42,35,27,0.42)',
    border:'rgba(42,35,27,0.09)', border2:'rgba(42,35,27,0.18)',
    accent:a, accentSoft:a+'22', accentDim:a+'14', warm:'#efe3cf', danger:'#c14d36',
    dark:false,
  };
}
const FONT_PAIRS = {
  editorial: { display:`"Newsreader", "Iowan Old Style", Georgia, serif`, body:`"Inter", -apple-system, system-ui, sans-serif`, mono:`"JetBrains Mono", ui-monospace, monospace` },
  classic:   { display:`"Instrument Serif", "Iowan Old Style", Georgia, serif`, body:`"Inter", system-ui, sans-serif`, mono:`"JetBrains Mono", monospace` },
  modern:    { display:`"Space Grotesk", system-ui, sans-serif`, body:`"Inter", system-ui, sans-serif`, mono:`"JetBrains Mono", monospace` },
};
const DENSITY = {
  compact: { pad:'18px 22px', gap:14, tilePad:14, tileGap:10, h1:30, h2:14 },
  regular: { pad:'24px 32px', gap:18, tilePad:18, tileGap:14, h1:38, h2:15 },
  comfy:   { pad:'32px 40px', gap:24, tilePad:22, tileGap:18, h1:46, h2:16 },
};

// ── SIDEBAR ──────────────────────────────────────────────────────────────
const Sidebar = ({ ctx }) => {
  const { p, fonts, page, setPage, room, setRoom, state, user } = ctx;
  const Section = ({ children }) => (
    <div style={{padding:'10px 14px 4px', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:p.fg3, fontWeight:500}}>{children}</div>
  );
  const Item = ({ active, onClick, icon, label, count, badge }) => (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:11, width:'calc(100% - 16px)', margin:'1px 8px',
      padding:'8px 12px', borderRadius:8, border:0, cursor:'pointer',
      background: active ? p.warm : 'transparent', color: active ? p.fg : p.fg2,
      fontFamily: fonts.body, fontSize:13.5, textAlign:'left', fontWeight: active ? 500 : 400,
      borderLeft: active ? `2px solid ${p.accent}` : '2px solid transparent',
    }}>
      <window.Icon name={icon} size={16} stroke={1.5} />
      <span style={{flex:1}}>{label}</span>
      {count !== undefined && count !== '' && <span style={{fontSize:11, color:p.fg3, fontVariantNumeric:'tabular-nums'}}>{count}</span>}
      {badge && <span style={{fontSize:9, padding:'2px 6px', borderRadius:999, background:p.accent, color:'#fff', fontWeight:600}}>{badge}</span>}
    </button>
  );

  const camsLive   = state.cameras.filter(c => c.online).length;
  const playingNow = state.speakers.filter(s => s.playing).length;
  const todayLeft  = state.calendar.length;
  const garageOpen = state.garage.doors.filter(d => d.open).length;

  return (
    <aside style={{borderRight:`.5px solid ${p.border}`, background: p.surface, display:'flex', flexDirection:'column', minHeight:0}}>
      <div style={{padding:'20px 22px 16px', borderBottom:`.5px solid ${p.border}`}}>
        <div style={{fontFamily:fonts.display, fontSize:22, fontStyle:'italic', color:p.accent, lineHeight:1}}>HomeCNTRD</div>
        <div style={{fontSize:11, color:p.fg3, marginTop:6, letterSpacing:'.05em'}}>
          {(user?.location || 'HOME').toUpperCase()} · {new Date().toLocaleDateString([], { weekday: 'long' })}
        </div>
      </div>
      <div style={{padding:'16px 22px 4px'}}>
        <div style={{fontFamily:fonts.display, fontSize:22, lineHeight:1.15, color:p.fg, fontWeight:500}}>Good evening,<br/><em style={{fontStyle:'italic', color:p.accent, fontWeight:400}}>{user?.firstName || 'there'}.</em></div>
      </div>

      <div style={{flex:1, overflow:'auto', paddingBottom:14, marginTop:6}}>
        <Section>View</Section>
        <Item active={page==='home'}      onClick={() => setPage('home')}      icon="home"   label="Home"     />
        <Item active={page==='dashboard'} onClick={() => setPage('dashboard')} icon="grid"   label="Dashboard" />
        <Item active={page==='music'}     onClick={() => setPage('music')}     icon="music"  label="Music"    count={playingNow ? `${playingNow} playing` : ''} />
        <Item active={page==='cameras'}  onClick={() => setPage('cameras')}  icon="cam"    label="Cameras"  count={`${camsLive}/${state.cameras.length}`} />
        <Item active={page==='calendar'} onClick={() => setPage('calendar')} icon="cal"    label="Calendar" count={todayLeft} />
        <Item active={page==='car'}      onClick={() => setPage('car')}      icon="car"    label="Car"      count={`${state.tesla.chargePct}%`} />
        <Item active={page==='garage'}   onClick={() => setPage('garage')}   icon="garage" label="Garage"   badge={garageOpen ? 'OPEN' : ''} />
        <Item active={page==='devices'}  onClick={() => setPage('devices')}  icon="grid"   label="Devices"  count={state.integrations.filter(i=>i.status==='connected').length} />
        <Item active={page==='automations'} onClick={() => setPage('automations')} icon="sparkle" label="Automations" count={state.automations.filter(a=>a.enabled).length} />

        {page==='dashboard' && <>
          <Section>Rooms</Section>
          {window.ROOMS.map(r => {
            const rl = state.lights.filter(l => l.room === r.id && l.on).length;
            return <Item key={r.id} active={room === r.id} onClick={() => setRoom(r.id)} icon={r.icon} label={r.name} count={rl > 0 ? rl : ''} />;
          })}
          <Section>Quick scenes</Section>
          {state.scenes.slice(0,4).map(sc => <Item key={sc.id} icon={sc.icon} label={sc.name} active={sc.active} />)}
        </>}
      </div>
      <div style={{borderTop:`.5px solid ${p.border}`, padding:8}}>
        <Item active={page==='settings'} onClick={() => setPage('settings')} icon="settings" label="Settings" />
        <div style={{padding:'10px 14px 4px', display:'flex', alignItems:'center', gap:10, fontSize:11, color:p.fg2}}>
          <div style={{width:8, height:8, borderRadius:'50%', background:'oklch(60% 0.15 145)'}} />
          <span>32 devices · all online</span>
        </div>
      </div>
    </aside>
  );
};

// ── MOBILE NAV ──────────────────────────────────────────────────────────
const MobileHeader = ({ ctx }) => {
  const { p, fonts, user, room, setRoom, page } = ctx;
  // Only render on the rooms-based Dashboard. The new Home (personal
  // dashboard) has its own header inside <PersonalDashboard/>.
  if (page !== 'dashboard') return null;
  return (
    <div style={{padding:'4px 2px 8px'}}>
      <div style={{fontFamily:fonts.display, fontSize:22, fontStyle:'italic', color:p.accent, lineHeight:1}}>HomeCNTRD</div>
      <div style={{fontFamily:fonts.display, fontSize:24, color:p.fg, fontWeight:500, marginTop:6}}>
        Evening, <em style={{fontStyle:'italic', color:p.accent, fontWeight:400}}>{user?.firstName || 'there'}.</em>
      </div>
      <div style={{display:'flex', gap:6, overflowX:'auto', marginTop:14, paddingBottom:4}}>
        {window.ROOMS.map(r => (
          <button key={r.id} onClick={() => setRoom(r.id)} style={{
            padding:'6px 12px', borderRadius:999, border:`.5px solid ${room===r.id ? p.accent : p.border2}`,
            background: room===r.id ? p.accentSoft : 'transparent', color: room===r.id ? p.accent : p.fg2,
            fontSize:12, cursor:'pointer', whiteSpace:'nowrap', flex:'none', fontFamily:fonts.body,
            display:'inline-flex', alignItems:'center', gap:5,
          }}>
            <window.Icon name={r.icon} size={11}/> {r.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const BottomNav = ({ ctx }) => {
  const { p, fonts, page, setPage } = ctx;
  const items = [
    { id:'home',      icon:'home',     label:'Home' },
    { id:'dashboard', icon:'grid',     label:'Dashboard' },
    { id:'music',     icon:'music',    label:'Music' },
    { id:'cameras',   icon:'cam',      label:'Cams' },
    { id:'settings',  icon:'settings', label:'Settings' },
  ];
  return (
    <nav style={{
      gridColumn: '1 / -1', display:'flex', borderTop:`.5px solid ${p.border}`,
      background: p.surface, paddingBottom:'env(safe-area-inset-bottom)',
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => setPage(it.id)} style={{
          flex:1, padding:'10px 4px', border:0, background:'transparent',
          color: page===it.id ? p.accent : p.fg3, cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:3, fontFamily:fonts.body,
        }}>
          <window.Icon name={it.icon} size={18} stroke={1.6}/>
          <span style={{fontSize:10, fontWeight: page===it.id ? 500 : 400}}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
};

// ── BUILDING BLOCKS ─────────────────────────────────────────────────────
const Card = ({ p, children, style, ...rest }) => (
  <div {...rest} style={{
    background:p.surface2, border:`.5px solid ${p.border}`, borderRadius:14,
    padding:18, color:p.fg, ...style
  }}>{children}</div>
);
const Section = ({ title, subtitle, p, fonts, children, action }) => (
  <section>
    <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12}}>
      <div style={{display:'flex', alignItems:'baseline', gap:12}}>
        <h2 style={{margin:0, fontFamily:fonts.display, fontSize:20, fontWeight:500, color:p.fg}}>{title}</h2>
        {subtitle && <span style={{fontSize:12, color:p.fg3, fontStyle:'italic'}}>{subtitle}</span>}
      </div>
      {action}
    </div>
    {children}
  </section>
);
const PageHead = ({ ctx, eyebrow, title, sub, right }) => {
  const w = ctx.state.weather;
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 19;
  const wIcon = isNight ? 'moon' : /cloud/i.test(w.summary) ? 'cloud' : /rain/i.test(w.summary) ? 'droplet' : 'sun';
  return (
  <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:24, marginBottom:14, flexWrap:'wrap'}}>
    <div style={{flex:'1 1 320px', minWidth:0}}>
      <div style={{fontSize:11, color:ctx.p.fg3, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:6}}>{eyebrow}</div>
      <h1 style={{margin:0, fontFamily:ctx.fonts.display, fontSize:ctx.dens.h1, fontWeight:500, lineHeight:1.15, color:ctx.p.fg, textWrap:'balance'}}>
        {title}<span style={{color:ctx.p.accent, fontStyle:'italic'}}>.</span>
      </h1>
      {sub && <div style={{fontSize:14, color:ctx.p.fg2, marginTop:14, fontStyle:'italic', fontFamily:ctx.fonts.display, lineHeight:1.4}}>{sub}</div>}
    </div>
    <div style={{flex:'none', alignSelf:'flex-start', marginTop:4, display:'flex', alignItems:'center', gap:10}}>
      <div title={`${w.summary} · H ${w.high}° L ${w.low}°`} style={{
        display:'flex', alignItems:'center', gap:9, padding:'8px 12px', borderRadius:10,
        border:`.5px solid ${ctx.p.border}`, background:ctx.p.surface2, fontFamily:ctx.fonts.body,
      }}>
        <window.Icon name={wIcon} size={16} style={{color:ctx.p.accent}}/>
        <div style={{display:'flex', flexDirection:'column', lineHeight:1.1}}>
          <span style={{fontSize:14, color:ctx.p.fg, fontWeight:500, fontVariantNumeric:'tabular-nums'}}>{w.temp}°F</span>
          <span style={{fontSize:10, color:ctx.p.fg3, letterSpacing:'.04em'}}>{w.summary} · H{w.high}° L{w.low}°</span>
        </div>
      </div>
      {right}
    </div>
  </div>
  );
};
const PillBtn = ({ p, fonts, active, onClick, children, danger, style }) => (
  <button onClick={onClick} style={{
    padding:'7px 12px', borderRadius:8, cursor:'pointer', fontFamily:fonts.body, fontSize:12,
    border:`.5px solid ${danger ? p.danger : active ? p.accent : p.border2}`,
    background: danger ? p.danger : active ? p.accentSoft : 'transparent',
    color: danger ? '#fff' : active ? p.accent : p.fg, ...style,
  }}>{children}</button>
);
const Toggle = ({ p, on, onChange, size = 20 }) => (
  <button onClick={() => onChange(!on)} style={{
    width: size*1.7, height: size, borderRadius:999, border:0, cursor:'pointer', position:'relative',
    background: on ? p.accent : p.border2, transition:'.2s'
  }}>
    <span style={{position:'absolute', top:2, left: on ? size*0.7+2 : 2, width: size-4, height: size-4, borderRadius:'50%', background:'#fff', transition:'.2s'}}/>
  </button>
);

// ── DND BANNER ──────────────────────────────────────────────────────────
const DndBanner = ({ ctx }) => {
  const { p, fonts, state, setState } = ctx;
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, zIndex:30, padding:'8px 18px',
      background: p.accent, color:'#fff', fontSize:12, fontFamily:fonts.body,
      display:'flex', alignItems:'center', gap:10,
    }}>
      <window.Icon name="bellOff" size={14} />
      <span><b>Do not disturb</b> · until {state.dnd.until || 'meeting ends'}</span>
      <span style={{flex:1}}/>
      <button onClick={() => setState(s => ({...s, dnd:{active:false, until:null, source:null}}))} style={{
        background:'rgba(255,255,255,.18)', border:0, color:'#fff', padding:'3px 10px', borderRadius:6, fontSize:11, cursor:'pointer'
      }}>End now</button>
    </div>
  );
};

// ── AGENT BUBBLE ────────────────────────────────────────────────────────
const AgentBubble = ({ ctx, open, setOpen, unread, messages, thinking, draft, setDraft, send, openAgent, agentTone }) => {
  const { p, fonts, narrow } = ctx;
  const inputRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [browser, setBrowser] = React.useState(null); // { url, title }
  React.useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, thinking]);

  // On narrow viewports the BottomNav owns ~64px at the bottom. Lift the
  // floating button (and the expanded chat panel) above it so the dot
  // doesn't overlap the nav and so the chat doesn't run off the screen.
  const dotBottom = narrow ? 84 : 24;
  const panelBottom = narrow ? 152 : 92;

  const suggestions = [
    'Find me a chocolate chip cookie recipe',
    'Set up movie night',
    'Lock the house',
    'Precondition the Tesla',
    'Best Italian recipes for tonight',
  ];
  const personaName = { jarvis: 'Jarvis', terse: 'CTRL', playful: 'Pip' }[agentTone] || 'Jarvis';

  return (
    <>
      <button onClick={() => open ? setOpen(false) : openAgent()} style={{
        position:'absolute', right:24, bottom:dotBottom, width:56, height:56, borderRadius:'50%',
        background: open ? p.surface2 : p.accent, color: open ? p.fg : '#fff',
        border:`.5px solid ${p.border}`, cursor:'pointer', display:'grid', placeItems:'center',
        boxShadow: open ? '0 4px 16px rgba(0,0,0,.15)' : `0 8px 28px ${p.accent}66, 0 1px 0 rgba(255,255,255,.3) inset`,
        zIndex: 50,
      }}>
        <window.Icon name={open ? 'chevron' : 'sparkle'} size={20} stroke={1.6} />
        {!open && unread > 0 && <span style={{position:'absolute', top:-4, right:-4, minWidth:20, height:20, padding:'0 6px', borderRadius:999, background:'#fff', color:p.accent, fontSize:11, fontWeight:600, display:'grid', placeItems:'center'}}>{unread}</span>}
      </button>
      {open && (
        <div style={{
          position:'absolute', right:24, bottom:panelBottom, width:380, maxHeight:'min(560px, calc(100% - 180px))',
          background: p.surface2, border:`.5px solid ${p.border}`, borderRadius:18,
          boxShadow:'0 24px 64px rgba(0,0,0,.18), 0 1px 0 rgba(255,255,255,.4) inset',
          display:'flex', flexDirection:'column', zIndex:50, overflow:'hidden',
        }}>
          <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:`.5px solid ${p.border}`}}>
            <div style={{width:32, height:32, borderRadius:'50%', background:`radial-gradient(circle at 30% 30%, ${p.accent}, oklch(40% 0.1 25))`, display:'grid', placeItems:'center', color:'#fff'}}>
              <window.Icon name="sparkle" size={14} />
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:fonts.display, fontSize:15, color:p.fg, fontWeight:500}}>{personaName}</div>
              <div style={{fontSize:11, color:p.fg3}}><span style={{color:'oklch(60% 0.13 145)'}}>●</span> Listening · everything online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{border:0, background:'transparent', color:p.fg3, cursor:'pointer', padding:6, fontSize:18}}>×</button>
          </div>
          <div ref={scrollRef} style={{flex:1, overflow:'auto', padding:'14px 16px', display:'flex', flexDirection:'column', gap:10}}>
            {messages.map((m, i) => <Msg key={i} m={m} p={p} fonts={fonts} onOpen={(url, title) => setBrowser({url, title})} />)}
            {thinking && <Thinking p={p} fonts={fonts} />}
          </div>
          {messages.length <= 1 && (
            <div style={{padding:'0 16px 8px', display:'flex', flexWrap:'wrap', gap:6}}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{padding:'5px 10px', borderRadius:999, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>{s}</button>
              ))}
            </div>
          )}
          <form onSubmit={e => { e.preventDefault(); send(draft); }} style={{padding:12, borderTop:`.5px solid ${p.border}`, display:'flex', alignItems:'center', gap:8}}>
            <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)} placeholder={`Ask ${personaName} anything…`} style={{
              flex:1, padding:'10px 12px', borderRadius:10, border:`.5px solid ${p.border2}`,
              background:p.surface, color:p.fg, fontSize:13, fontFamily:fonts.body, outline:'none'
            }}/>
            <button type="button" style={{width:36, height:36, borderRadius:9, background:'transparent', border:`.5px solid ${p.border2}`, color:p.fg2, cursor:'pointer', display:'grid', placeItems:'center'}}><window.Icon name="mic" size={16}/></button>
            <button type="submit" style={{width:36, height:36, borderRadius:9, background:p.accent, border:0, color:'#fff', cursor:'pointer', display:'grid', placeItems:'center'}}><window.Icon name="send" size={15}/></button>
          </form>
        </div>
      )}
      {browser && <InAppBrowser p={p} fonts={fonts} url={browser.url} title={browser.title} onClose={() => setBrowser(null)}/>}
    </>
  );
};
const Msg = ({ m, p, fonts, onOpen }) => {
  const isUser = m.who === 'user';
  // Parse LINK: Title | url lines out of agent text
  const lines = (m.text || '').split('\n');
  const links = [];
  const bodyLines = [];
  for (const ln of lines) {
    const lm = ln.match(/^\s*LINK:\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/i);
    if (lm) links.push({ title: lm[1], url: lm[2] });
    else bodyLines.push(ln);
  }
  const body = bodyLines.join('\n').trim();
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap:5, maxWidth:'92%'}}>
      {body && (
        <div style={{
          maxWidth:'100%', padding:'9px 13px', borderRadius:14,
          background: isUser ? p.accent : p.warm,
          color: isUser ? '#fff' : p.fg,
          fontSize:13, lineHeight:1.45, whiteSpace:'pre-wrap',
          borderBottomRightRadius: isUser ? 4 : 14,
          borderBottomLeftRadius: isUser ? 14 : 4,
        }}>{body}</div>
      )}
      {links.length > 0 && (
        <div style={{display:'flex', flexDirection:'column', gap:5, width:'100%'}}>
          {links.map((l, i) => (
            <button key={i} onClick={() => onOpen?.(l.url, l.title)} style={{
              padding:'8px 11px', borderRadius:9, border:`.5px solid ${p.border2}`,
              background:p.surface, color:p.fg, cursor:'pointer', textAlign:'left',
              display:'flex', alignItems:'center', gap:8, fontFamily:fonts.body,
            }}>
              <window.Icon name="search" size={11} style={{color:p.accent, flex:'none'}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:12, color:p.fg, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{l.title}</div>
                <div style={{fontSize:10, color:p.fg3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{(l.url||'').replace(/^https?:\/\//,'').replace(/\/.*/,'')}</div>
              </div>
              <window.Icon name="arrowR" size={11} style={{color:p.fg3, flex:'none'}}/>
            </button>
          ))}
        </div>
      )}
      <div style={{fontSize:10, color:p.fg3}}>{m.t}</div>
    </div>
  );
};

// In-app browser overlay
const InAppBrowser = ({ p, fonts, url, title, onClose }) => (
  <div style={{position:'absolute', inset:0, zIndex:70, background:p.bg, display:'flex', flexDirection:'column'}}>
    <div style={{padding:'10px 14px', borderBottom:`.5px solid ${p.border}`, display:'flex', alignItems:'center', gap:10, background:p.surface2}}>
      <button onClick={onClose} style={{border:0, background:'transparent', color:p.fg, cursor:'pointer', padding:6, fontSize:18, display:'flex', alignItems:'center', gap:4, fontFamily:fonts.body, fontSize:13}}>
        <window.Icon name="chevronL" size={14}/> Back
      </button>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13, color:p.fg, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{title}</div>
        <div style={{fontSize:10, color:p.fg3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{url}</div>
      </div>
      <a href={url} target="_blank" rel="noreferrer" style={{padding:'6px 10px', borderRadius:7, border:`.5px solid ${p.border2}`, color:p.fg2, fontSize:11, textDecoration:'none', fontFamily:fonts.body}}>Open external</a>
    </div>
    <iframe src={url} title={title} style={{flex:1, border:0, background:'#fff'}} sandbox="allow-scripts allow-same-origin allow-forms allow-popups"/>
  </div>
);
const Thinking = ({ p, fonts }) => (
  <div style={{display:'flex', alignItems:'center', gap:8, color:p.fg3, fontSize:12}}>
    <span style={{display:'inline-flex', gap:3}}>
      {[0,1,2].map(i => <span key={i} style={{width:6, height:6, borderRadius:'50%', background:p.accent, animation:`hearthDot 1s ${i*0.15}s infinite ease-in-out`, opacity:0.5}}/>)}
    </span>
    <span style={{fontStyle:'italic', fontFamily:fonts.display}}>thinking…</span>
    <style>{`@keyframes hearthDot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}`}</style>
  </div>
);

Object.assign(window, { HearthApp, Card, Section, PageHead, PillBtn, Toggle, palette, FONT_PAIRS, DENSITY });
