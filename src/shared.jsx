// shared.jsx — shared state, agent logic, icons, helpers.
// Expanded for: Apple Music library, per-speaker playback, Tesla, MyQ garage,
// Outlook calendar with DND, integrations registry.

const Icon = ({ name, size = 18, stroke = 1.6, ...rest }) => {
  const paths = {
    bulb: <><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10z"/></>,
    speaker: <><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="14" r="3.2"/><circle cx="12" cy="7" r="1"/></>,
    cam: <><path d="M3 7h12l4-3v16l-4-3H3z"/></>,
    tv: <><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    cal: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    weather: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    scene: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></>,
    therm: <><path d="M14 14V5a2 2 0 1 0-4 0v9a4 4 0 1 0 4 0z"/></>,
    play: <><path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/></>,
    pause: <><rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/></>,
    next: <><path d="M6 5l10 7-10 7z" fill="currentColor" stroke="none"/><rect x="17" y="5" width="2" height="14" fill="currentColor" stroke="none"/></>,
    prev: <><path d="M18 5L8 12l10 7z" fill="currentColor" stroke="none"/><rect x="5" y="5" width="2" height="14" fill="currentColor" stroke="none"/></>,
    chat: <><path d="M4 5h16v11H8l-4 4z"/></>,
    send: <><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></>,
    moon: <><path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <><path d="M5 12h14"/></>,
    sparkle: <><path d="M12 3l1.6 5L19 9.6l-5.4 1.4L12 16l-1.6-5L5 9.6 10.4 8z"/></>,
    chevron: <><path d="m6 9 6 6 6-6"/></>,
    chevronR: <><path d="m9 6 6 6-6 6"/></>,
    chevronL: <><path d="m15 6-6 6 6 6"/></>,
    dots: <><circle cx="6" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="18" cy="12" r="1.4" fill="currentColor"/></>,
    bell: <><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    bellOff: <><path d="M6 16V11a6 6 0 0 1 9-5M9 17l-3 3h14l-2-2v-3M3 3l18 18"/></>,
    home: <><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    droplet: <><path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z"/></>,
    cloud: <><path d="M7 18h10a4 4 0 0 0 .8-7.9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 7 18z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    movie: <><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6v12M17 6v12M3 10h4M3 14h4M17 10h4M17 14h4"/></>,
    coffee: <><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a2 2 0 0 1 0 4h-2M8 4v2M12 4v2"/></>,
    bed: <><path d="M3 18v-6a2 2 0 0 1 2-2h14v8M3 14h18M7 10V8a2 2 0 0 1 2-2h2v4"/></>,
    door: <><rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="14" cy="12" r=".8" fill="currentColor"/></>,
    package: <><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></>,
    music: <><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></>,
    apple: <><path d="M16 2c-1 1.5-2.5 2-4 2 0-1.5 1-3 4-2zM12 7c-3 0-6 2-6 6 0 5 3 9 6 9s2-1 4-1 1 1 4 1c2 0 4-3 4-6-2-1-3-3-3-5 0-1.5 1-3 2-3-1-2-3-3-5-3-2 0-3 2-6 2z" fill="currentColor" stroke="none"/></>,
    airplay: <><path d="M5 17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1M8 21l4-5 4 5z"/></>,
    leaf: <><path d="M5 19c8 0 14-6 14-14-7 0-13 4-14 11 0 1-1 1.5-1 3"/></>,
    shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></>,
    car: <><path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v5h-2v-2H5v2H3z"/><circle cx="7" cy="15" r="1.4"/><circle cx="17" cy="15" r="1.4"/></>,
    garage: <><path d="M3 11 12 5l9 6v9H3z"/><path d="M6 14h12v6H6z"/><path d="M6 17h12"/></>,
    battery: <><rect x="3" y="8" width="16" height="9" rx="1"/><path d="M21 11v3"/></>,
    plug: <><path d="M9 7v4M15 7v4M7 11h10v3a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4z M12 18v3"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    heart: <><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></>,
    queue: <><path d="M3 6h18M3 12h12M3 18h9"/><path d="m17 15 4 3-4 3z" fill="currentColor"/></>,
    repeat: <><path d="M17 2 21 6l-4 4M3 12V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4M21 12v4a2 2 0 0 1-2 2H3"/></>,
    shuffle: <><path d="M16 3h5v5M4 20l17-17M21 16v5h-5M15 15l6 6M4 4l5 5"/></>,
    library: <><path d="M3 5h4v15H3zM10 5h4v15h-4zM17 5l5 1-3 14-5-1z"/></>,
    list: <><path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/></>,
    check: <><path d="m5 12 5 5 9-10"/></>,
    x: <><path d="M6 6l12 12M18 6 6 18"/></>,
    arrowR: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    fan: <><circle cx="12" cy="12" r="2"/><path d="M12 10c0-3 1-6 3-7 1 2 1 5-1 7M12 14c0 3-1 6-3 7-1-2-1-5 1-7M14 12c3 0 6 1 7 3-2 1-5 1-7-1M10 12c-3 0-6-1-7-3 2-1 5-1 7 1"/></>,
    snowflake: <><path d="M12 3v18M3 12h18M5 5l14 14M19 5 5 19"/></>,
    bolt: <><path d="m13 2-9 13h7l-1 7 9-13h-7z"/></>,
    location: <><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></>,
    outlook: <><rect x="3" y="5" width="11" height="14" rx="1"/><path d="M14 9h7v6h-7M17 9v6"/><circle cx="8.5" cy="12" r="2.5"/></>,
    nest: <><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18" opacity=".3"/></>,
    tesla: <><path d="M5 6c2 0 5 1 7 1s5-1 7-1l-2 2c-1.5-.5-3-.7-5-.7s-3.5.2-5 .7zM12 7v14"/></>,
    ring: <><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" opacity=".3"/></>,
    hue: <><circle cx="12" cy="12" r="6"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></>,
    sonos: <><path d="M4 8c2-2 5-2 8 0s6 2 8 0M4 12c2-2 5-2 8 0s6 2 8 0M4 16c2-2 5-2 8 0s6 2 8 0"/></>,
    myq: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9v6M15 9v6M9 12h6"/></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    edit: <><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></>,
    trash: <><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

const ROOMS = [
  { id: 'living', name: 'Living Room', icon: 'home' },
  { id: 'kitchen', name: 'Kitchen', icon: 'coffee' },
  { id: 'bedroom', name: 'Bedroom', icon: 'bed' },
  { id: 'office', name: 'Office', icon: 'user' },
  { id: 'outdoor', name: 'Outdoor', icon: 'leaf' },
];

// ── APPLE MUSIC LIBRARY ──────────────────────────────────────────────────
const TRACKS = [
  { id:'t1',  title:'Cellophane',           artist:'FKA twigs',         album:'MAGDALENE',     dur:234, hue:'oklch(45% 0.12 30)' },
  { id:'t2',  title:'Motion Sickness',      artist:'Phoebe Bridgers',   album:'Stranger in the Alps', dur:248, hue:'oklch(38% 0.08 250)' },
  { id:'t3',  title:'A Sunday Kind of Love',artist:'Etta James',        album:'At Last!',      dur:185, hue:'oklch(40% 0.14 60)' },
  { id:'t4',  title:'Ribs',                 artist:'Lorde',             album:'Pure Heroine',  dur:267, hue:'oklch(35% 0.10 270)' },
  { id:'t5',  title:'Nights',               artist:'Frank Ocean',       album:'Blonde',        dur:307, hue:'oklch(50% 0.13 80)' },
  { id:'t6',  title:'Redbone',              artist:'Childish Gambino',  album:'Awaken, My Love!', dur:326, hue:'oklch(45% 0.15 25)' },
  { id:'t7',  title:'Glory Box',            artist:'Portishead',        album:'Dummy',         dur:303, hue:'oklch(28% 0.06 240)' },
  { id:'t8',  title:'Pyramids',             artist:'Frank Ocean',       album:'Channel Orange',dur:594, hue:'oklch(48% 0.18 50)' },
  { id:'t9',  title:'Two Weeks',            artist:'FKA twigs',         album:'LP1',           dur:235, hue:'oklch(35% 0.10 320)' },
  { id:'t10', title:'Liability',            artist:'Lorde',             album:'Melodrama',     dur:172, hue:'oklch(42% 0.12 340)' },
  { id:'t11', title:'Pink + White',         artist:'Frank Ocean',       album:'Blonde',        dur:184, hue:'oklch(72% 0.10 20)'  },
  { id:'t12', title:'Wading',               artist:'James Blake',       album:'Playing Robots Into Heaven', dur:215, hue:'oklch(36% 0.06 200)' },
  { id:'t13', title:'Glide',                artist:'Pleasure',          album:'Future Now',    dur:241, hue:'oklch(45% 0.13 90)' },
  { id:'t14', title:'Sun Goes Down',        artist:'Lil Nas X',         album:'Montero',       dur:171, hue:'oklch(58% 0.16 60)' },
  { id:'t15', title:'August',               artist:'Taylor Swift',      album:'folklore',      dur:261, hue:'oklch(55% 0.05 80)' },
];

const PLAYLISTS = [
  { id:'pl1', name:'Sunday Slow',     count:42, art:['oklch(45% 0.12 30)','oklch(40% 0.14 60)','oklch(35% 0.10 270)','oklch(58% 0.16 60)'], tracks:['t3','t4','t10','t11','t15'] },
  { id:'pl2', name:'Late Night',      count:28, art:['oklch(28% 0.06 240)','oklch(35% 0.10 320)','oklch(36% 0.06 200)','oklch(45% 0.12 30)'], tracks:['t1','t7','t9','t12'] },
  { id:'pl3', name:'Cooking',         count:64, art:['oklch(50% 0.13 80)','oklch(48% 0.18 50)','oklch(45% 0.13 90)','oklch(58% 0.16 60)'], tracks:['t5','t6','t8','t13','t14'] },
  { id:'pl4', name:'Frances\' Picks', count:91, art:['oklch(72% 0.10 20)','oklch(40% 0.14 60)','oklch(35% 0.10 270)','oklch(45% 0.15 25)'], tracks:['t1','t2','t3','t4','t5','t6','t11'] },
  { id:'pl5', name:'Focus',           count:37, art:['oklch(36% 0.06 200)','oklch(28% 0.06 240)','oklch(35% 0.10 270)','oklch(42% 0.12 340)'], tracks:['t7','t9','t12'] },
  { id:'pl6', name:'Dinner Party',    count:54, art:['oklch(58% 0.16 60)','oklch(45% 0.13 90)','oklch(72% 0.10 20)','oklch(50% 0.13 80)'], tracks:['t5','t8','t13','t14','t15'] },
];

const initialDevices = () => ({
  // device-add state
  integrations: [
    { id:'hue',     name:'Philips Hue',     icon:'hue',     status:'connected',    devices:9, account:'frances@home',          color:'#ffd23f' },
    { id:'sonos',   name:'Sonos',           icon:'sonos',   status:'connected',    devices:5, account:'Willowbrook Household', color:'#ff6b35' },
    { id:'ring',    name:'Ring',            icon:'ring',    status:'connected',    devices:6, account:'frances.willows@gmail', color:'#5b8cff' },
    { id:'nest',    name:'Nest',            icon:'nest',    status:'connected',    devices:1, account:'Google · frances.w',    color:'#3ec9b3' },
    { id:'appletv', name:'Apple TV',        icon:'apple',   status:'connected',    devices:2, account:'iCloud · Frances W.',   color:'#a78bfa' },
    { id:'googletv',name:'Google TV',       icon:'tv',      status:'connected',    devices:1, account:'Google · frances.w',    color:'#5b8cff' },
    { id:'lgthinq', name:'LG ThinQ',        icon:'tv',      status:'connected',    devices:1, account:'frances.w@icloud.com',  color:'#a8174e' },
    { id:'music',   name:'Apple Music',     icon:'apple',   status:'connected',    devices:'Library', account:'frances.w@icloud.com · 2,847 songs', color:'#ff5c8a' },
    { id:'tesla',   name:'Tesla',           icon:'tesla',   status:'connected',    devices:1, account:'frances.willows@gmail · Model 3', color:'#c96442' },
    { id:'myq',     name:'MyQ Garage',      icon:'myq',     status:'connected',    devices:2, account:'Willowbrook',           color:'#7d4f6b' },
    { id:'outlook', name:'Microsoft Outlook',icon:'outlook',status:'connected',    devices:'Calendar', account:'frances.w@willowstudio.com', color:'#5b8cff' },
    { id:'lutron',     name:'Lutron Caseta',  icon:'plug',    status:'available', devices:0, account:'', color:'#7a8c6c' },
    { id:'ecobee',     name:'Ecobee',         icon:'therm',   status:'available', devices:0, account:'', color:'#3ec9b3' },
    { id:'august',     name:'August Locks',   icon:'lock',    status:'available', devices:0, account:'', color:'#b8843e' },
    { id:'spotify',    name:'Spotify',        icon:'music',   status:'available', devices:0, account:'', color:'#1db954' },
    { id:'roborock',   name:'Roborock',       icon:'fan',     status:'available', devices:0, account:'', color:'#5b8cff' },
    { id:'shark',      name:'Shark Robot',    icon:'fan',     status:'connected', devices:1, account:'frances.w@icloud.com · IQ Robot R101AE', color:'#1f6feb' },
    { id:'simplisafe', name:'SimpliSafe',     icon:'shield',  status:'available', devices:0, account:'', color:'#c14d36' },
    { id:'wyze',       name:'Wyze',           icon:'cam',     status:'available', devices:0, account:'', color:'#3ec9b3' },
    { id:'homekit',    name:'Apple HomeKit',  icon:'apple',   status:'available', devices:0, account:'', color:'#a78bfa' },
    { id:'matter',     name:'Matter',         icon:'sparkle', status:'available', devices:0, account:'', color:'#7d4f6b' },
  ],
  lights: [
    { id: 'l1', room: 'living', name: 'Sofa lamp',     on: true,  brightness: 60, color: '#f3c277' },
    { id: 'l2', room: 'living', name: 'Reading nook',  on: true,  brightness: 35, color: '#e89870' },
    { id: 'l3', room: 'living', name: 'Floor lamp',    on: false, brightness: 80, color: '#ffe0b2' },
    { id: 'l4', room: 'kitchen', name: 'Island pendant', on: true, brightness: 90, color: '#ffe9c2' },
    { id: 'l5', room: 'kitchen', name: 'Under-counter',  on: true, brightness: 70, color: '#fff1cf' },
    { id: 'l6', room: 'bedroom', name: 'Bedside left',  on: false, brightness: 40, color: '#e0a878' },
    { id: 'l7', room: 'bedroom', name: 'Bedside right', on: false, brightness: 40, color: '#e0a878' },
    { id: 'l8', room: 'office',  name: 'Desk lamp',     on: true,  brightness: 100, color: '#ffffff' },
    { id: 'l9', room: 'outdoor', name: 'Porch',         on: false, brightness: 80, color: '#ffd49a' },
  ],
  // Each speaker has its OWN now-playing — different rooms can play different tracks
  speakers: [
    { id: 's1', room:'living',  name:'Living Room',  type:'sonos',   playing: true,  vol:32, group:'g1', trackId:'t1',  progress:87, queue:['t2','t4','t11','t15','t10'] },
    { id: 's2', room:'kitchen', name:'Kitchen',      type:'sonos',   playing: true,  vol:28, group:'g1', trackId:'t1',  progress:87, queue:['t2','t4','t11','t15','t10'] },
    { id: 's3', room:'bedroom', name:'Bedroom',      type:'sonos',   playing: false, vol:18, group:null, trackId:'t10', progress:0,  queue:['t11','t15','t9'] },
    { id: 's4', room:'office',  name:'Office',       type:'airplay', playing: true,  vol:25, group:null, trackId:'t12', progress:42, queue:['t7','t9','t1','t13'] },
    { id: 's5', room:'outdoor', name:'Patio',        type:'sonos',   playing: false, vol:40, group:null, trackId:'t6',  progress:0,  queue:['t13','t14','t5'] },
  ],
  ring: { mode: 'disarmed', lastChanged: '8:18 AM', changedBy: 'Frances' }, // disarmed | home | away
  cameras: [
    { id: 'c1', name: 'Front Door',   room: 'outdoor', online: true,  motion: true,  hue: 'oklch(70% 0.15 80)'  },
    { id: 'c2', name: 'Back Yard',    room: 'outdoor', online: true,  motion: false, hue: 'oklch(60% 0.10 200)' },
    { id: 'c3', name: 'Driveway',     room: 'outdoor', online: true,  motion: false, hue: 'oklch(55% 0.08 250)' },
    { id: 'c4', name: 'Garage',       room: 'outdoor', online: true,  motion: false, hue: 'oklch(40% 0.04 30)'  },
    { id: 'c5', name: 'Living Room',  room: 'living',  online: true,  motion: false, hue: 'oklch(72% 0.08 60)'  },
    { id: 'c6', name: 'Nursery',      room: 'bedroom', online: false, motion: false, hue: 'oklch(80% 0.06 320)' },
  ],
  locks: [
    { id: 'lk1', name: 'Front Door',  locked: true  },
    { id: 'lk2', name: 'Back Door',   locked: true  },
    { id: 'lk3', name: 'Side gate',   locked: false },
  ],
  tv: { on: false, source: 'Apple TV', show: 'Severance · S2E4' },
  tvs: [
    { id:'tv1', name:'Living Room TV',  brand:'appletv',  model:'Apple TV 4K',           room:'living',  on:true,  app:'Apple TV+',  show:'Severance · S2E4',         poster:'oklch(45% 0.10 280)', playing:true,  progress:1322, dur:3300, vol:24, mute:false, input:'HDMI 1' },
    { id:'tv2', name:'Bedroom TV',      brand:'appletv',  model:'Apple TV HD',           room:'bedroom', on:false, app:'Home',       show:'—',                         poster:'oklch(40% 0.06 250)', playing:false, progress:0,    dur:0,    vol:18, mute:false, input:'HDMI 1' },
    { id:'tv3', name:'Office TV',       brand:'googletv', model:'Chromecast w/ Google TV',room:'office', on:true,  app:'YouTube',    show:'Architecture Digest · 73 Q', poster:'oklch(50% 0.12 60)',  playing:true,  progress:412,  dur:1080, vol:30, mute:false, input:'Cast' },
    { id:'tv4', name:'Kitchen TV',      brand:'lgthinq',  model:'LG C3 OLED 55"',         room:'kitchen', on:true,  app:'Netflix',    show:'The Bear · S3E2',           poster:'oklch(38% 0.09 30)',  playing:false, progress:780,  dur:1740, vol:22, mute:true,  input:'HDMI 2' },
  ],
  thermostat: { temp: 71, target: 72, mode: 'auto', humidity: 42 },
  weather: { temp: 64, summary: 'Partly cloudy', high: 71, low: 52, hourly: [62,63,64,66,68,70,71,70,68,66,63,61] },
  scenes: [
    { id: 'movie',   name: 'Movie Night',   icon: 'movie',   active: false },
    { id: 'morning', name: 'Good Morning',  icon: 'coffee',  active: true  },
    { id: 'sleep',   name: 'Goodnight',     icon: 'moon',    active: false },
    { id: 'dinner',  name: 'Dinner Party',  icon: 'sparkle', active: false },
    { id: 'focus',   name: 'Focus',         icon: 'leaf',    active: false },
    { id: 'away',    name: 'Away',          icon: 'shield',  active: false },
  ],
  alarms: [
    { id: 'a1', label: 'Weekday wake-up', time: '6:45 AM', days: 'Mon–Fri', on: true },
    { id: 'a2', label: 'Sunday brunch',   time: '9:30 AM', days: 'Sun',     on: true },
    { id: 'a3', label: 'Sourdough proof', time: '2:00 PM', days: 'Sat',     on: false },
  ],
  // Outlook calendar — preMins controls the DND window before event start
  calendar: [
    { id:'e1', t:'9:00 AM',  end:'9:30 AM',  title:'Standup',          where:'Zoom',            organizer:'Maya Ortiz',    dnd:true,  preMins:5,  dot:'#c96442', accepted:'accepted' },
    { id:'e2', t:'11:30 AM', end:'12:30 PM', title:'Coffee w/ Maya',   where:'Sightglass',      organizer:'Frances W.',    dnd:false, preMins:10, dot:'#3ec9b3', accepted:'accepted' },
    { id:'e3', t:'2:00 PM',  end:'2:45 PM',  title:'Q3 planning',      where:'Teams',           organizer:'Liam Park',     dnd:true,  preMins:5,  dot:'#a78bfa', accepted:'accepted' },
    { id:'e4', t:'3:00 PM',  end:'4:00 PM',  title:'Design review',    where:'Conf Rm B',       organizer:'Kris Tan',      dnd:true,  preMins:10, dot:'#7a5d3a', accepted:'tentative' },
    { id:'e5', t:'5:00 PM',  end:'5:30 PM',  title:'1:1 w/ Sasha',     where:'Teams',           organizer:'Sasha Mendoza', dnd:true,  preMins:5,  dot:'#5b8cff', accepted:'accepted' },
    { id:'e6', t:'6:30 PM',  end:'7:30 PM',  title:'Yoga',             where:'Home',            organizer:'Frances W.',    dnd:false, preMins:0,  dot:'#a35a76', accepted:'accepted' },
  ],
  dnd: { active:false, until:null, source:null }, // global do-not-disturb state
  // Tesla Model 3
  tesla: {
    name:'Frances\' Model 3',
    locked: true,
    charging: true,
    chargePct: 72,
    chargeRate: 32,        // mph added
    pluggedIn: true,
    range: 248,            // mi
    cabin: 64,             // F
    target: 70,
    climateOn: false,
    sentry: true,
    location:'Home · Driveway',
    odometer: 18742,
    frunk: false,
    trunk: false,
    sunroof: 0,
    software:'2026.4.1',
    valet: false,
  },
  // MyQ
  garage: {
    doors: [
      { id:'g1', name:'Main door',   open: false, lastChanged:'12:42 PM' },
      { id:'g2', name:'Side garage', open: true,  lastChanged:'7:31 PM'  },
    ],
    history: [
      { t:'7:31 PM', door:'Side garage', action:'opened',  who:'Frances' },
      { t:'12:42 PM',door:'Main door',   action:'closed',  who:'Auto-close (timer)' },
      { t:'12:38 PM',door:'Main door',   action:'opened',  who:'Frances' },
      { t:'8:15 AM', door:'Main door',   action:'closed',  who:'Frances' },
      { t:'8:12 AM', door:'Main door',   action:'opened',  who:'Geofence' },
    ],
  },
  // Shark IQ Robot vacuum
  vacuum: {
    name:'Shark IQ',
    state:'docked',          // docked | cleaning | returning | paused | stuck
    battery:96,
    mode:'auto',             // auto | spot | room
    currentRoom:null,
    cleanedToday:0,          // sq ft
    bin:'empty',             // empty | full
    lastClean:'Yesterday, 2:14 PM',
    schedule:'Mon/Wed/Fri 10:00 AM',
  },
  // Automations — "if X then Y"
  automations: [
    { id:'au1', name:'Porch light on motion',
      trigger:{ type:'motion',  cameraId:'c1' },
      actions:[{ type:'light', lightId:'l9', on:true, brightness:80 }],
      enabled:true, lastRun:'7:31 PM',
      desc:'When the front door camera sees motion, turn the porch light on.' },
    { id:'au2', name:'Lock up when I leave',
      trigger:{ type:'leaveHome' },
      actions:[{ type:'lockAll' }, { type:'scene', sceneId:'away' }],
      enabled:true, lastRun:'8:18 AM',
      desc:'When everyone leaves, lock all doors and run the Away scene.' },
    { id:'au3', name:'Goodnight at 11 PM',
      trigger:{ type:'time', at:'11:00 PM' },
      actions:[{ type:'scene', sceneId:'sleep' }],
      enabled:false, lastRun:null,
      desc:'At 11:00 PM every night, run the Goodnight scene.' },
  ],
});

// ── AGENT LOGIC ──────────────────────────────────────────────────────────
function runAgent(input, state, setState) {
  const text = input.trim();
  if (!text) return null;
  const t = text.toLowerCase();

  // ── AUTOMATION CREATION (try first) ─────────────────────────────────
  // Patterns: "when/whenever/if there is motion on <camera>, turn on <light>"
  //           "every day at 7am, run goodnight"
  const auto = parseAutomation(text, state);
  if (auto) {
    setState(s => ({ ...s, automations: [...s.automations, auto] }));
    return `Saved automation: "${auto.name}". ${auto.desc} You can edit it under Automations.`;
  }

  // ── THERMOSTAT (numeric) ────────────────────────────────────────────
  const tempMatch = t.match(/(?:set|make|put|change).*(?:thermostat|temp(?:erature)?|nest|heat|cool|ac).*?(\d{2})/i)
                 || t.match(/(?:thermostat|temp(?:erature)?|nest).*?(\d{2})/i)
                 || t.match(/(\d{2})\s*(?:degrees?|°)/i);
  if (tempMatch && /thermostat|temp|nest|degree|°|warmer|colder|heat|cool|ac/i.test(t)) {
    const target = Math.max(50, Math.min(90, +tempMatch[1]));
    setState(s => ({ ...s, thermostat:{...s.thermostat, target} }));
    return `Set the Nest to ${target}°.`;
  }
  if (/warmer|hotter|heat up/i.test(t)) {
    setState(s => ({ ...s, thermostat:{...s.thermostat, target: Math.min(83, s.thermostat.target+2)} }));
    return "Bumped the thermostat up 2°.";
  }
  if (/colder|cooler|cool (it )?down/i.test(t)) {
    setState(s => ({ ...s, thermostat:{...s.thermostat, target: Math.max(60, s.thermostat.target-2)} }));
    return "Cooled it down 2°.";
  }
  const modeMatch = t.match(/(?:thermostat|nest|mode).*?(cool|heat|auto|off)/i) || t.match(/^(cool|heat|auto)\s*(?:mode|the house)?$/i);
  if (modeMatch) {
    const mode = modeMatch[1].toLowerCase();
    setState(s => ({ ...s, thermostat:{...s.thermostat, mode} }));
    return `Thermostat set to ${mode}.`;
  }

  // ── SCENES ──────────────────────────────────────────────────────────
  const scenes = [
    { match:/(movie|film|cinema)/i, id:'movie',   reply:"Setting up movie night. Dimming the living room, switching to Apple TV." },
    { match:/(good ?night|sleep|bedtime)/i, id:'sleep', reply:"Goodnight. Locking up, turning off the TV, easing the lights down." },
    { match:/(good ?morning|wake ?up)/i, id:'morning', reply:"Good morning. Brewing coffee and bringing the kitchen lights up." },
    { match:/focus|work mode/i, id:'focus', reply:"Focus on. Office cool, notifications muted." },
    { match:/(away|leaving|out)/i, id:'away',  reply:"Away mode. Doors locked, sentry armed, lights off." },
    { match:/dinner party/i, id:'dinner', reply:"Dinner party scene running." },
  ];
  for (const sc of scenes) {
    if (sc.match.test(text)) {
      setState(s => {
        const ns = { ...s, scenes: s.scenes.map(x => ({...x, active: x.id===sc.id})) };
        if (sc.id==='movie')   ns.lights = s.lights.map(l => l.room==='living' ? {...l, on:true, brightness:12} : l);
        if (sc.id==='sleep')   { ns.lights = s.lights.map(l => ({...l, on:false})); ns.locks = s.locks.map(lk => ({...lk, locked:true})); }
        if (sc.id==='morning') ns.lights = s.lights.map(l => l.room==='kitchen' ? {...l, on:true, brightness:85} : l);
        if (sc.id==='away')    { ns.locks = s.locks.map(lk => ({...lk, locked:true})); ns.lights = s.lights.map(l => ({...l, on:false})); }
        return ns;
      });
      return sc.reply;
    }
  }

  // ── LIGHTS ──────────────────────────────────────────────────────────
  const roomMatch = t.match(/\b(living|kitchen|bedroom|office|outdoor|porch)\b/i);
  const roomId = roomMatch ? (roomMatch[1].toLowerCase()==='porch' ? 'outdoor' : roomMatch[1].toLowerCase()) : null;
  const brightMatch = t.match(/(\d{1,3})\s*%/);
  const targetBright = brightMatch ? Math.max(1, Math.min(100, +brightMatch[1])) : null;
  if (/turn (?:on|up)|lights? on|brighten/i.test(t) && /light/i.test(t)) {
    setState(s => ({...s, lights: s.lights.map(l => (!roomId || l.room===roomId) ? {...l, on:true, brightness: targetBright ?? l.brightness} : l)}));
    return roomId ? `${cap(roomId)} lights on${targetBright ? ` at ${targetBright}%` : ''}.` : `Lights on${targetBright ? ` at ${targetBright}%` : ''}.`;
  }
  if (/turn (?:off|down)|lights? off/i.test(t) && /light/i.test(t)) {
    setState(s => ({...s, lights: s.lights.map(l => (!roomId || l.room===roomId) ? {...l, on:false} : l)}));
    return roomId ? `${cap(roomId)} lights off.` : "Lights off.";
  }
  if (/(dim|lower).*light/i.test(t)) {
    setState(s => ({...s, lights: s.lights.map(l => (!roomId || l.room===roomId) ? {...l, on:true, brightness: targetBright ?? 30} : l)}));
    return `Dimmed${roomId ? ` the ${roomId}` : ''} to ${targetBright ?? 30}%.`;
  }

  // ── LOCKS / SECURITY ────────────────────────────────────────────────
  if (/lock (?:up|the house|all|everything|doors)/i.test(t) || /^lock$/i.test(t.trim())) {
    setState(s => ({...s, locks: s.locks.map(l => ({...l, locked:true}))}));
    return "All doors locked. Sentry armed on the Tesla.";
  }
  // Ring alarm modes
  const ringMatch = t.match(/(?:set|put|switch|change|arm|disarm).*?ring.*?(disarm(?:ed)?|home|away|stay|night)/i)
                 || t.match(/ring.*?(disarm(?:ed)?|home|away|stay|night).*?mode/i)
                 || t.match(/^(?:arm|disarm)(?:\s+(?:to\s+)?(home|away|stay|disarmed))?$/i)
                 || t.match(/(?:arm|set).*?(?:alarm|system).*?(home|away|stay|night)/i)
                 || t.match(/(disarm)(?:\s+(?:the\s+)?(?:alarm|ring|system))?$/i);
  if (ringMatch) {
    let m = (ringMatch[1] || '').toLowerCase();
    if (m === 'stay' || m === 'night') m = 'home';
    if (m.startsWith('disarm')) m = 'disarmed';
    if (!m && /^arm/i.test(text.trim())) m = 'away';
    if (m === 'disarmed' || m === 'home' || m === 'away') {
      setState(s => ({
        ...s,
        ring: { ...(s.ring||{}), mode:m, lastChanged: new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}), changedBy:'Voice' },
        locks: m === 'away' ? s.locks.map(l => ({...l, locked:true})) : s.locks,
      }));
      const reply = {
        disarmed: "Ring disarmed. Sensors off.",
        home:     "Ring set to Home. Perimeter armed, interior bypassed so you can move around.",
        away:     "Ring armed Away. Doors locked, full system armed with a 30-second entry delay.",
      };
      return reply[m];
    }
  }
  if (/unlock front/i.test(t)) { setState(s => ({...s, locks: s.locks.map(l => l.id==='lk1' ? {...l, locked:false} : l)})); return "Unlocking the front door. I'll re-lock in five."; }
  if (/unlock back/i.test(t))  { setState(s => ({...s, locks: s.locks.map(l => l.id==='lk2' ? {...l, locked:false} : l)})); return "Back door unlocked."; }

  // ── MUSIC ───────────────────────────────────────────────────────────
  if (/(pause|stop) music/i.test(t)) { setState(s => ({...s, speakers: s.speakers.map(sp => ({...sp, playing:false}))})); return "Music paused everywhere."; }
  if (/skip|next track/i.test(t)) {
    setState(s => ({...s, speakers: s.speakers.map(sp => sp.playing ? {...sp, trackId: nextTrack(sp.trackId), progress:0} : sp)}));
    return "Skipping to the next track.";
  }
  // "play <something> [in <room>|everywhere]" — match track / album / artist / playlist
  const playM = t.match(/^(?:please\s+)?play\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i)
             || t.match(/^(?:put on|start)\s+(.+?)(?:\s+(?:in|on|to)\s+(?:the\s+)?([a-z\s]+?))?$/i);
  if (playM) {
    const what = playM[1].trim();
    const whereRaw = (playM[2] || '').trim().toLowerCase();
    const everywhere = /everywhere|whole house|all (rooms|speakers)|every room/i.test(text);
    const roomMap = { living:'living','living room':'living', kitchen:'kitchen', bedroom:'bedroom', office:'office', outdoor:'outdoor', patio:'outdoor', porch:'outdoor' };
    const targetRoom = roomMap[whereRaw] || (whereRaw && Object.keys(roomMap).find(k => whereRaw.includes(k))) || null;

    // skip generic "music" / "something" — fall through to resume below
    if (!/^(music|something|a song|tunes)$/i.test(what)) {
      // try track title, album, artist
      const lc = what.toLowerCase();
      let matched = TRACKS.find(tr => tr.title.toLowerCase() === lc)
                 || TRACKS.find(tr => tr.title.toLowerCase().includes(lc))
                 || TRACKS.find(tr => tr.album.toLowerCase().includes(lc))
                 || TRACKS.find(tr => tr.artist.toLowerCase().includes(lc));
      let queue = null, label = '';
      if (matched) {
        // build a queue: matched track + others by same artist or album
        const sameArtist = TRACKS.filter(tr => tr.id !== matched.id && tr.artist.toLowerCase() === matched.artist.toLowerCase());
        const others = TRACKS.filter(tr => tr.id !== matched.id && !sameArtist.includes(tr)).slice(0,4);
        queue = [...sameArtist, ...others].slice(0,6).map(tr => tr.id);
        label = `${matched.title} — ${matched.artist}`;
      } else {
        // try playlist
        const pl = (state.playlists || PLAYLISTS).find(p => p.name.toLowerCase().includes(lc));
        if (pl && pl.tracks.length) {
          matched = TRACKS.find(tr => tr.id === pl.tracks[0]);
          queue = pl.tracks.slice(1, 7);
          label = `playlist "${pl.name}"`;
        }
      }
      if (matched) {
        const where = everywhere ? 'all speakers' : (targetRoom ? cap(targetRoom) : 'the Living Room');
        setState(s => ({...s, speakers: s.speakers.map(sp => {
          if (everywhere || (!targetRoom && sp.room === 'living') || (targetRoom && sp.room === targetRoom)) {
            return { ...sp, trackId: matched.id, progress:0, playing:true, queue: queue || sp.queue };
          }
          return sp;
        })}));
        return `Playing ${label} in ${where}.`;
      }
    }
  }
  if (/(play|resume) music/i.test(t)) { setState(s => ({...s, speakers: s.speakers.map(sp => ({...sp, playing:true}))})); return "Music playing."; }

  // ── TESLA ──────────────────────────────────────────────────────────
  if (/precondition|warm.*car|cool.*car|preheat/i.test(t)) { setState(s => ({...s, tesla:{...s.tesla, climateOn:true, target:70}})); return "Preconditioning the Tesla to 70°."; }
  if (/charge|tesla|car/i.test(t) && /status|how/i.test(t)) return `Tesla is at ${state.tesla.chargePct}%, ${state.tesla.range} mi range, ${state.tesla.charging ? 'charging' : state.tesla.pluggedIn ? 'plugged in' : 'unplugged'}.`;
  if (/lock.*car|sentry/i.test(t)) { setState(s => ({...s, tesla:{...s.tesla, locked:true, sentry:true}})); return "Tesla locked, sentry on."; }

  // ── GARAGE ──────────────────────────────────────────────────────────
  if (/close.*garage|garage.*close/i.test(t)) {
    setState(s => ({...s, garage:{...s.garage, doors: s.garage.doors.map(d => ({...d, open:false, lastChanged:'now'}))}}));
    return "Closing all garage doors.";
  }
  if (/open.*garage|garage.*open/i.test(t)) {
    setState(s => ({...s, garage:{...s.garage, doors: s.garage.doors.map(d => d.id==='g1' ? {...d, open:true, lastChanged:'now'} : d)}}));
    return "Opening the main garage door.";
  }

  // ── VACUUM ──────────────────────────────────────────────────────────
  if (/(vacuum|shark|roomba|clean.*house|start.*clean)/i.test(t) && /(start|clean|run|begin)/i.test(t)) {
    const roomM = t.match(/\b(living|kitchen|bedroom|office|outdoor)\b/i);
    setState(s => ({...s, vacuum:{...s.vacuum, state:'cleaning', mode: roomM ? 'room' : 'auto', currentRoom: roomM ? roomM[1].toLowerCase() : null}}));
    return roomM ? `Sending the Shark to clean the ${roomM[1].toLowerCase()}.` : "Shark is starting a full-house clean.";
  }
  if (/(stop|pause).*(vacuum|shark|clean)/i.test(t)) { setState(s => ({...s, vacuum:{...s.vacuum, state:'paused'}})); return "Vacuum paused."; }
  if (/(dock|return).*(vacuum|shark)/i.test(t) || /send.*shark.*home/i.test(t)) { setState(s => ({...s, vacuum:{...s.vacuum, state:'returning'}})); return "Sending the Shark back to its dock."; }

  // ── MISC ────────────────────────────────────────────────────────────
  if (/weather/i.test(t)) return `It's ${state.weather.temp}° and ${state.weather.summary.toLowerCase()}. High of ${state.weather.high}° this afternoon.`;
  if (/alarm.*\d|wake.*\d/i.test(t)) {
    const m = t.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (m) {
      const h = +m[1], min = m[2] || '00', ap = m[3] ? m[3].toUpperCase() : (h < 8 ? 'AM' : 'PM');
      const time = `${h}:${min} ${ap}`;
      setState(s => ({...s, alarms:[{id:'new'+Date.now(), label:'Tomorrow', time, days:'Once', on:true}, ...s.alarms]}));
      return `Alarm set for ${time}.`;
    }
  }
  if (/do not disturb|dnd/i.test(t)) { setState(s => ({...s, dnd:{active:true, until:'next meeting end', source:'agent'}})); return "Do not disturb on until your next meeting ends."; }

  return null;
}

const cap = s => s ? s.charAt(0).toUpperCase()+s.slice(1) : s;
function nextTrack(id) { const i = TRACKS.findIndex(t => t.id===id); return TRACKS[(i+1) % TRACKS.length].id; }

// ── AUTOMATION PARSER ────────────────────────────────────────────────────
function parseAutomation(text, state) {
  const t = text.toLowerCase();
  // Must have a conditional
  if (!/^(when(?:ever)?|if|every (?:day|night|morning|evening))\b/i.test(text.trim())) return null;

  let trigger = null, triggerName = '';
  // Motion on a camera
  const motionM = t.match(/motion (?:on|at|in front of|by|near)\s*(?:the\s*)?([a-z\s]+?)(?:\s*(?:cam(?:era)?|cam))?(?:[,]|\s+then|\s+turn|\s+do|\s+set|\s+lock|\s+open|\s+close|\s+run|$)/i);
  if (motionM || /motion/i.test(t)) {
    const camName = motionM?.[1]?.trim();
    let cam = state.cameras.find(c => camName && c.name.toLowerCase().includes(camName));
    if (!cam) cam = state.cameras.find(c => /front/i.test(c.name)) || state.cameras[0];
    trigger = { type:'motion', cameraId:cam.id };
    triggerName = `motion at ${cam.name}`;
  }
  // Time
  const timeM = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!trigger && timeM) {
    const h = +timeM[1], m = timeM[2] || '00', ap = timeM[3].toUpperCase();
    const at = `${h}:${m} ${ap}`;
    trigger = { type:'time', at };
    triggerName = `${at}`;
  }
  // Door / lock events
  if (!trigger && /(?:i|we|someone)\s+(?:get home|arrive|come home)/i.test(t)) { trigger = {type:'arriveHome'}; triggerName='I arrive home'; }
  if (!trigger && /(?:i|we|everyone)\s+(?:leave|go away)/i.test(t)) { trigger = {type:'leaveHome'}; triggerName='I leave home'; }
  if (!trigger) return null;

  // Parse actions
  const actions = [];
  const actionNames = [];
  // light on/off (optionally a room or named light)
  const lightOn = t.match(/turn (?:on|up)\s+(?:the\s+)?([a-z\s]+?)\s*(?:light|lights|lamp)/i);
  if (lightOn) {
    const name = lightOn[1].trim();
    const light = state.lights.find(l => name && (l.name.toLowerCase().includes(name) || l.room.toLowerCase().includes(name)));
    if (light) { actions.push({type:'light', lightId:light.id, on:true, brightness:80}); actionNames.push(`turn on ${light.name}`); }
    else { actions.push({type:'allLights', on:true}); actionNames.push('turn lights on'); }
  } else if (/turn (?:on|up).*light/i.test(t)) {
    actions.push({type:'allLights', on:true}); actionNames.push('turn lights on');
  }
  if (/turn (?:off|down).*light|lights? off/i.test(t)) {
    actions.push({type:'allLights', on:false}); actionNames.push('turn lights off');
  }
  if (/lock (?:up|the door|all|everything|doors)|lock the house/i.test(t)) {
    actions.push({type:'lockAll'}); actionNames.push('lock everything');
  }
  if (/run\s+(?:the\s+)?(goodnight|sleep|movie|away|focus|morning|dinner)/i.test(t)) {
    const sceneId = t.match(/run\s+(?:the\s+)?(goodnight|sleep|movie|away|focus|morning|dinner)/i)[1];
    const id = sceneId==='goodnight' ? 'sleep' : sceneId;
    actions.push({type:'scene', sceneId:id}); actionNames.push(`run ${sceneId}`);
  }
  if (/precondition|warm.*car/i.test(t)) { actions.push({type:'precondition'}); actionNames.push('precondition the Tesla'); }
  if (/close.*garage/i.test(t)) { actions.push({type:'closeGarage'}); actionNames.push('close the garage'); }
  const setTemp = t.match(/(?:set|make).*(?:thermostat|nest|temp).*?(\d{2})/i);
  if (setTemp) { actions.push({type:'thermostat', target:+setTemp[1]}); actionNames.push(`set thermostat to ${setTemp[1]}°`); }

  if (!actions.length) return null;

  return {
    id: 'au'+Date.now(),
    name: `${cap(triggerName)} → ${actionNames[0]}`,
    trigger,
    actions,
    enabled: true,
    lastRun: null,
    desc: `When ${triggerName}, ${actionNames.join(' and ')}.`,
  };
}

// Apply an automation's actions immediately (used by manual "Run" button)
function runAutomation(auto, state, setState) {
  setState(s => {
    let ns = {...s};
    for (const a of auto.actions) {
      if (a.type==='light')      ns.lights = ns.lights.map(l => l.id===a.lightId ? {...l, on:a.on, brightness:a.brightness ?? l.brightness} : l);
      if (a.type==='allLights')  ns.lights = ns.lights.map(l => ({...l, on:a.on}));
      if (a.type==='lockAll')    ns.locks  = ns.locks.map(l => ({...l, locked:true}));
      if (a.type==='scene')      ns.scenes = ns.scenes.map(sc => ({...sc, active: sc.id===a.sceneId}));
      if (a.type==='precondition') ns.tesla = {...ns.tesla, climateOn:true, target:70};
      if (a.type==='closeGarage') ns.garage = {...ns.garage, doors: ns.garage.doors.map(d => ({...d, open:false, lastChanged:'now'}))};
      if (a.type==='thermostat') ns.thermostat = {...ns.thermostat, target:a.target};
    }
    ns.automations = ns.automations.map(x => x.id===auto.id ? {...x, lastRun:'now'} : x);
    return ns;
  });
}

async function callClaude(userText, history, personality, mockReply) {
  const persona = {
    jarvis: "You are HomeCNTRD, a warm, capable home AI like Jarvis. Be conversational but efficient. 1-3 short sentences unless answering a how-to or recipe question.",
    terse:  "You are HomeCNTRD, a terse terminal-style home AI. Reply in <12 words. Lowercase. End with a period.",
    playful:"You are HomeCNTRD, a playful, slightly cheeky home AI named Pip. Warm, upbeat, light humor.",
  }[personality] || "You are HomeCNTRD, a friendly home AI.";

  // Detect informational queries (recipes, how-to, ideas) where we want web links
  const wantsLinks = /\b(recipe|recipes|cook|make|bake|how to|how do i|what is|where can i|find|search|news|article|review|best|top \d|near me|restaurant|movie|song|music)\b/i.test(userText);

  const msgs = [{ role: 'user', content:
`${persona}

Connected: Hue lights, Sonos & AirPlay, Ring cams, Apple TV, Nest thermostat, Tesla Model 3, MyQ garage, Apple Music, Outlook calendar, Shark vacuum.

Recent:
${history.slice(-6).map(m => `${m.who === 'user' ? 'User' : 'You'}: ${m.text}`).join('\n')}

User: "${userText}"

${wantsLinks ? `This is an informational question. Answer warmly in 2-4 sentences, then on NEW lines list 2-4 useful web links in this exact format (no markdown, one per line):
LINK: <Title> | <https://full-url.com>
Pick popular, real sites (NYTimes Cooking, Bon Appétit, Serious Eats, Wikipedia, official sites, etc).` : 'Respond naturally as the assistant.'}` }];

  try {
    if (window.claude && window.claude.complete) {
      const r = await window.claude.complete({ messages: msgs });
      if (r && typeof r === 'string') return r.trim();
    }
  } catch (e) {}
  return mockReply || "I'm offline at the moment, but I noted that.";
}

function useHomeState() {
  const [state, setState] = React.useState(() => initialDevices());
  React.useEffect(() => {
    const id = setInterval(() => {
      setState(s => ({
        ...s,
        speakers: s.speakers.map(sp => sp.playing ? { ...sp, progress: (sp.progress + 1) % (TRACKS.find(t => t.id === sp.trackId)?.dur || 240) } : sp)
      }));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return [state, setState];
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
function trackById(id) { return TRACKS.find(t => t.id === id) || TRACKS[0]; }

Object.assign(window, { Icon, ROOMS, TRACKS, PLAYLISTS, initialDevices, runAgent, runAutomation, parseAutomation, callClaude, useHomeState, fmtTime, trackById });
