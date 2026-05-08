// home-view.jsx — Categorized home page with section visibility toggle.

import HassContext from './lib/hass-context.js';
import Hls from 'hls.js';

// Live camera player. Cloud-camera integrations (Ring, Nest, Reolink-via-
// HA) advertise streaming through one of three transports: subscribe-
// based WebRTC, legacy WebRTC, or HLS. The transports HA exposes for a
// given camera vary by integration version, so we just try each in order
// until one connects, logging the outcome to in-app diagnostics so we
// can see exactly what's available per camera.
const CameraStream = ({ entityId, hass, style }) => {
  const videoRef = React.useRef(null);
  const [error, setError] = React.useState(null);
  // hass updates on every HA state push (multiple times/sec). Keep a
  // ref so the streaming effect can read fresh values without being
  // triggered into a tear-down/setup cycle by the hass prop churn.
  const hassRef = React.useRef(hass);
  React.useEffect(() => { hassRef.current = hass; }, [hass]);

  // Only restart the stream when the entity changes or the WS
  // connection itself swaps (reconnect). hass.connection is stable
  // across normal state updates, unlike hass.
  const conn = hass?.connection;
  React.useEffect(() => {
    setError(null);
    const video = videoRef.current;
    if (!video || !conn || !entityId) return;
    const cleanup = startCameraStream(entityId, hassRef, video, setError);
    return () => { try { cleanup && cleanup(); } catch {} };
  }, [entityId, conn]);

  if (error) {
    return React.createElement('div', {
      style: { ...style, display:'grid', placeItems:'center', color:'rgba(255,255,255,0.6)', fontSize:11, padding:8, textAlign:'center' },
    }, `Live stream unavailable: ${error}`);
  }

  return React.createElement('video', {
    ref: videoRef,
    autoPlay: true,
    muted: true,
    playsInline: true,
    style: { display:'block', width:'100%', height:'100%', objectFit:'cover', ...style },
  });
};

function camDiag(entityId, msg) {
  if (typeof window === 'undefined') return;
  if (!window.__hcDiag) window.__hcDiag = [];
  window.__hcDiag.push({ ts: Date.now(), kind: 'info', message: `[cam ${entityId}] ${msg}` });
  while (window.__hcDiag.length > 50) window.__hcDiag.shift();
}

function startCameraStream(entityId, hassRef, video, setError) {
  let alive = true;
  let cleanup = null;

  const run = async () => {
    // Order matters: WebRTC works for cloud cameras (Ring/Nest/etc),
    // HLS works for local/RTSP and integrations with stream support.
    // We attempt each, fully tearing down before falling through.
    const errors = [];
    for (const method of [trySubscribeWebRTC, tryLegacyWebRTC, tryHLS]) {
      if (!alive) return;
      try {
        const result = await method(entityId, hassRef.current, video);
        if (!alive) {
          // Effect was torn down mid-await; clean up the freshly opened
          // resource so we don't leak peer connections / Hls instances.
          if (result?.cleanup) try { result.cleanup(); } catch {}
          return;
        }
        if (result) {
          camDiag(entityId, `streaming via ${result.kind}`);
          cleanup = result.cleanup;
          return;
        }
      } catch (e) {
        const msg = e?.message || String(e);
        errors.push(`${method.label || method.name}: ${msg}`);
        camDiag(entityId, `${method.label || method.name} failed — ${msg}`);
      }
    }
    if (alive) {
      setError(errors.length
        ? errors[errors.length - 1]
        : 'No supported stream method');
    }
  };
  run();

  return () => {
    alive = false;
    if (cleanup) try { cleanup(); } catch {}
  };
}

// New subscribe-based WebRTC handshake. Streams session/answer/candidate
// messages over a single WS subscription, with trickle-ICE both ways
// (local candidates POSTed back to HA as we discover them, remote
// candidates applied as they arrive). Cloud cameras (Ring, Nest) live
// behind NAT and need the TURN servers HA returns from
// camera/webrtc/get_client_config — without them, only local-network
// cameras are reachable and the rest just stall on a placeholder.
async function trySubscribeWebRTC(entityId, hass, video) {
  const config = await getWebRTCConfig(entityId, hass);
  const pc = new RTCPeerConnection(config);
  attachToVideo(pc, video);
  pc.addTransceiver('video', { direction: 'recvonly' });
  pc.addTransceiver('audio', { direction: 'recvonly' });
  await pc.setLocalDescription(await pc.createOffer());

  let sessionId = null;
  const pendingCandidates = [];
  const sendCandidate = async (cand) => {
    if (!sessionId) { pendingCandidates.push(cand); return; }
    try {
      await hass.connection.sendMessagePromise({
        type: 'camera/webrtc/candidate',
        entity_id: entityId,
        session_id: sessionId,
        candidate: { candidate: cand.candidate, sdpMid: cand.sdpMid, sdpMLineIndex: cand.sdpMLineIndex },
      });
    } catch {}
  };
  const onIce = (e) => { if (e.candidate) sendCandidate(e.candidate); };
  pc.addEventListener('icecandidate', onIce);

  let unsubError = null;
  const unsub = await hass.connection.subscribeMessage(
    async (msg) => {
      if (!msg) return;
      if (msg.type === 'session') {
        sessionId = msg.session_id;
        // Flush any candidates we gathered before HA gave us a session.
        for (const c of pendingCandidates.splice(0)) await sendCandidate(c);
      } else if (msg.type === 'answer' && msg.answer) {
        try { await pc.setRemoteDescription({ type: 'answer', sdp: msg.answer }); } catch {}
      } else if (msg.type === 'candidate' && msg.candidate) {
        try {
          const c = typeof msg.candidate === 'string' ? msg.candidate : msg.candidate.candidate;
          await pc.addIceCandidate({
            candidate: c,
            sdpMid: msg.candidate?.sdpMid ?? msg.sdpMid ?? '0',
            sdpMLineIndex: msg.candidate?.sdpMLineIndex ?? msg.sdpMLineIndex ?? 0,
          });
        } catch {}
      } else if (msg.type === 'error') {
        unsubError = msg.message || 'WebRTC error';
      }
    },
    { type: 'camera/webrtc/offer', entity_id: entityId, offer: pc.localDescription.sdp },
  );

  await waitForAnswer(pc, 8000);
  if (pc.connectionState === 'failed' || pc.iceConnectionState === 'failed' || unsubError) {
    pc.removeEventListener('icecandidate', onIce);
    try { unsub(); } catch {}
    pc.close();
    throw new Error(unsubError || 'WebRTC connection failed');
  }
  return {
    kind: 'webrtc-subscribe',
    cleanup: () => {
      pc.removeEventListener('icecandidate', onIce);
      try { unsub(); } catch {}
      teardown(pc, video);
    },
  };
}
trySubscribeWebRTC.label = 'WebRTC (subscribe)';

// Legacy one-shot WebRTC. Older HA versions answer with a single
// camera/web_rtc_offer response containing the SDP answer. We still
// fetch ICE config first so cameras behind NAT can connect via the
// integration-supplied TURN servers.
async function tryLegacyWebRTC(entityId, hass, video) {
  const config = await getWebRTCConfig(entityId, hass);
  const pc = new RTCPeerConnection(config);
  attachToVideo(pc, video);
  pc.addTransceiver('video', { direction: 'recvonly' });
  pc.addTransceiver('audio', { direction: 'recvonly' });
  await pc.setLocalDescription(await pc.createOffer());
  // Legacy command needs the full SDP up front since there's no
  // bidirectional candidate channel.
  await waitIce(pc);

  const resp = await hass.connection.sendMessagePromise({
    type: 'camera/web_rtc_offer',
    entity_id: entityId,
    offer: pc.localDescription.sdp,
  });
  if (!resp?.answer) { pc.close(); throw new Error('no SDP answer'); }
  await pc.setRemoteDescription({ type: 'answer', sdp: resp.answer });
  await waitForAnswer(pc, 8000);
  if (pc.connectionState === 'failed' || pc.iceConnectionState === 'failed') {
    pc.close(); throw new Error('WebRTC connection failed');
  }
  return { kind: 'webrtc-legacy', cleanup: () => teardown(pc, video) };
}
tryLegacyWebRTC.label = 'WebRTC (legacy)';

// Fetch ICE servers (STUN/TURN) and transport policy from HA. The Ring
// integration populates this with the cloud TURN relay credentials
// needed to reach cameras behind NAT. Falls back to a public STUN if
// HA doesn't know how to populate the config (e.g. local-only cameras).
async function getWebRTCConfig(entityId, hass) {
  try {
    const resp = await hass.connection.sendMessagePromise({
      type: 'camera/webrtc/get_client_config',
      entity_id: entityId,
    });
    if (resp?.configuration?.iceServers?.length) return resp.configuration;
  } catch {}
  return { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
}

// HLS fallback for cameras that ARE backed by a real stream component.
async function tryHLS(entityId, hass, video) {
  const resp = await hass.connection.sendMessagePromise({
    type: 'camera/stream', entity_id: entityId, format: 'hls',
  });
  if (!resp?.url) throw new Error('no playlist URL');
  // Native HLS on Safari / iOS first.
  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = resp.url;
    video.play().catch(() => {});
    return { kind: 'hls-native', cleanup: () => { try { video.removeAttribute('src'); video.load(); } catch {} } };
  }
  if (!Hls.isSupported()) throw new Error('HLS not supported');
  const hls = new Hls({ liveDurationInfinity: true, lowLatencyMode: true });
  hls.loadSource(resp.url);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
  hls.on(Hls.Events.ERROR, (_e, data) => {
    if (data?.fatal) {
      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
      else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
      else hls.destroy();
    }
  });
  return { kind: 'hls', cleanup: () => { try { hls.destroy(); } catch {} } };
}
tryHLS.label = 'HLS';

// ── WebRTC plumbing helpers ────────────────────────────────────────────────
function newPC() {
  return new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
}
function attachToVideo(pc, video) {
  pc.ontrack = (e) => { if (e.streams?.[0]) video.srcObject = e.streams[0]; };
}
function waitIce(pc) {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === 'complete') return resolve();
    const handler = () => {
      if (pc.iceGatheringState === 'complete') {
        pc.removeEventListener('icegatheringstatechange', handler);
        resolve();
      }
    };
    pc.addEventListener('icegatheringstatechange', handler);
    setTimeout(resolve, 3000);
  });
}
function waitForAnswer(pc, ms) {
  return new Promise((resolve) => {
    if (pc.connectionState === 'connected' || pc.iceConnectionState === 'connected') return resolve();
    const handler = () => {
      if (['connected', 'completed'].includes(pc.iceConnectionState) ||
          ['connected'].includes(pc.connectionState)) {
        pc.removeEventListener('connectionstatechange', handler);
        pc.removeEventListener('iceconnectionstatechange', handler);
        resolve();
      }
    };
    pc.addEventListener('connectionstatechange', handler);
    pc.addEventListener('iceconnectionstatechange', handler);
    setTimeout(resolve, ms);
  });
}
function teardown(pc, video) {
  try { pc.close(); } catch {}
  if (video?.srcObject) {
    try { video.srcObject.getTracks().forEach(t => t.stop()); } catch {}
    video.srcObject = null;
  }
}

const SECTIONS = [
  { id:'climate',  label:'Climate' },
  { id:'lights',   label:'Lighting' },
  { id:'music',    label:'Music' },
  { id:'speakers', label:'Speaker volume' },
  { id:'tvs',      label:'TVs' },
  { id:'scenes',   label:'Scenes' },
  { id:'cameras',  label:'Cameras' },
  { id:'security', label:'Security & access' },
  { id:'car',      label:'Car' },
  { id:'today',    label:"Today's schedule" },
];

const HomeView = ({ ctx }) => {
  const { p, fonts, dens, state, setState, room, user, patchUser, narrow } = ctx;
  const roomMeta = window.ROOMS.find(r => r.id === room);
  const lights = state.lights.filter(l => l.room === room);
  // Per-room section visibility. Falls back to legacy global homeSections, then all-on.
  const allRoomSections = user?.roomSections || {};
  const legacy = user?.homeSections;
  const defaultMap = legacy || Object.fromEntries(SECTIONS.map(s => [s.id, true]));
  const visible = allRoomSections[room] || defaultMap;
  const setVisible = (id, v) => patchUser?.(u => {
    const cur = (u.roomSections && u.roomSections[room]) || (u.homeSections) || Object.fromEntries(SECTIONS.map(s => [s.id, true]));
    return {...u, roomSections: {...(u.roomSections || {}), [room]: {...cur, [id]: v}}};
  });
  const [picking, setPicking] = React.useState(false);

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Currently in"
        title={`The ${roomMeta?.name || 'house'}`}
        sub={`${lights.filter(l => l.on).length} lamps softly lit · ${state.thermostat.temp}° · the cat is asleep on the rug`}
        right={
          <button onClick={() => setPicking(v => !v)} style={{
            padding:'8px 14px', borderRadius:9, border:`.5px solid ${picking ? p.accent : p.border2}`,
            background: picking ? p.accentSoft : 'transparent', color: picking ? p.accent : p.fg,
            fontSize:12, cursor:'pointer', fontFamily:fonts.body, display:'inline-flex', alignItems:'center', gap:6,
          }}>
            <window.Icon name={picking ? 'check' : 'edit'} size={12}/>
            {picking ? 'Done' : 'Customize'}
          </button>
        }
      />

      {picking && (
        <window.Card p={p} style={{padding:14}}>
          <div style={{fontSize:11, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10}}>Show in {roomMeta?.name || 'this room'}</div>
          <div style={{display:'grid', gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`, gap:6}}>
            {SECTIONS.map(s => (
              <div key={s.id} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, background:p.surface, border:`.5px solid ${p.border}`}}>
                <span style={{flex:1, fontSize:12, color:p.fg}}>{s.label}</span>
                <window.Toggle p={p} on={visible[s.id] !== false} onChange={(v) => setVisible(s.id, v)} size={16}/>
              </div>
            ))}
          </div>
          <div style={{fontSize:11, color:p.fg3, fontStyle:'italic', marginTop:10}}>Each room remembers its own layout.</div>
        </window.Card>
      )}

      {visible.climate  !== false && <window.ClimateSection ctx={ctx}/>}
      {visible.lights   !== false && <window.LightsSection ctx={ctx}/>}
      {visible.music    !== false && <window.MusicSection ctx={ctx}/>}
      {visible.speakers !== false && <window.SpeakersSection ctx={ctx}/>}
      {visible.tvs      !== false && <window.TvsSection ctx={ctx}/>}
      {visible.scenes   !== false && <window.ScenesSection ctx={ctx}/>}
      {visible.cameras  !== false && <window.CamerasSection ctx={ctx}/>}
      {visible.security !== false && <window.SecuritySection ctx={ctx}/>}
      {visible.car      !== false && <window.CarSection ctx={ctx}/>}
      {visible.today    !== false && <window.TodaySection ctx={ctx}/>}
      <div style={{height:80}}/>
    </>
  );
};

// ── CLIMATE (drag-to-select dial) ───────────────────────────────────────
const ClimateSection = ({ ctx }) => {
  const { p, fonts, state, setState, narrow } = ctx;
  const t = state.thermostat;
  const set = (target) => setState(s => ({...s, thermostat:{...s.thermostat, target}}));
  const setMode = (mode) => setState(s => ({...s, thermostat:{...s.thermostat, mode}}));

  // Drag dial: 60–83°F mapped onto 270° arc
  const MIN = 60, MAX = 83;
  const ringRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const tempFromEvent = (e) => {
    const r = ringRef.current.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    let ang = Math.atan2(dy, dx) * 180/Math.PI; // -180..180, 0=right
    // We want 0% at 135° (lower-left) going clockwise 270° to 45° (lower-right)
    // Convert atan2 angle so 135° -> 0
    let a = (ang + 360) % 360;
    // arc spans from 135° clockwise (i.e. 135 -> 405 mod 360 = 45)
    let pos = (a - 135 + 360) % 360;
    if (pos > 270) pos = pos > 315 ? 0 : 270; // clamp into the gap
    const pct = pos / 270;
    return Math.round(MIN + pct * (MAX - MIN));
  };

  const onDown = (e) => { setDragging(true); ringRef.current.setPointerCapture?.(e.pointerId); set(tempFromEvent(e)); };
  const onMove = (e) => { if (dragging) set(tempFromEvent(e)); };
  const onUp   = (e) => { setDragging(false); };

  // SVG arc
  const SIZE = 220, R = 92, CX = SIZE/2, CY = SIZE/2;
  const polarToXY = (deg, r) => {
    const rad = (deg) * Math.PI / 180;
    return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
  };
  const startA = 135, endA = 405; // 270° sweep
  const valA = startA + ((t.target - MIN)/(MAX-MIN)) * 270;
  const tempA = startA + ((t.temp - MIN)/(MAX-MIN)) * 270;
  const arcPath = (a0, a1) => {
    const [x0,y0] = polarToXY(a0, R);
    const [x1,y1] = polarToXY(a1, R);
    const large = (a1 - a0) > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`;
  };
  const [hx, hy] = polarToXY(valA, R);

  return (
    <window.Section title="Climate" subtitle="Hallway · Nest" p={p} fonts={fonts}>
      <window.Card p={p} style={{padding: narrow ? 18 : 24, display:'grid', gridTemplateColumns: narrow ? '1fr' : 'auto 1fr', gap: narrow ? 18 : 30, alignItems:'center', justifyItems: narrow ? 'center' : 'stretch'}}>
        <div ref={ringRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          style={{width:SIZE, height:SIZE, position:'relative', cursor: dragging ? 'grabbing' : 'grab', touchAction:'none', userSelect:'none', flex:'none'}}>
          <svg width={SIZE} height={SIZE} style={{position:'absolute', inset:0}}>
            {/* track */}
            <path d={arcPath(startA, endA)} fill="none" stroke={p.border} strokeWidth="14" strokeLinecap="round"/>
            {/* current temp range marker (between current and target) */}
            <path d={arcPath(Math.min(tempA, valA), Math.max(tempA, valA))} fill="none" stroke={p.accentSoft} strokeWidth="14" strokeLinecap="round"/>
            {/* progress to target */}
            <path d={arcPath(startA, valA)} fill="none" stroke={p.accent} strokeWidth="3" strokeLinecap="round" opacity=".75"/>
            {/* tick marks */}
            {Array.from({length: 24}).map((_, i) => {
              const a = startA + (i/23)*270;
              const [x0,y0] = polarToXY(a, R-10);
              const [x1,y1] = polarToXY(a, R-4);
              return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={p.fg3} strokeWidth=".5" opacity={i%4===0 ? .6 : .25}/>;
            })}
            {/* handle */}
            <circle cx={hx} cy={hy} r="11" fill={p.accent} stroke={p.surface2} strokeWidth="3"/>
            {/* center labels */}
            <text x={CX} y={CY-12} textAnchor="middle" fill={p.fg3} fontSize="10" fontFamily={fonts.body} letterSpacing="2">SET TO</text>
            <text x={CX} y={CY+22} textAnchor="middle" fill={p.fg} fontSize="50" fontFamily={fonts.display} fontWeight="500">{t.target}°</text>
            <text x={CX} y={CY+44} textAnchor="middle" fill={p.fg3} fontSize="11" fontFamily={fonts.display} fontStyle="italic">now {t.temp}°</text>
          </svg>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:14, width: narrow ? '100%' : 'auto'}}>
          <div style={{display:'flex', gap:18, fontSize:12, color:p.fg2, flexWrap:'wrap'}}>
            <div><div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Inside</div><div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, marginTop:2}}>{t.temp}°</div></div>
            <div><div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Humidity</div><div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, marginTop:2}}>{t.humidity}%</div></div>
            <div><div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>Outside</div><div style={{fontFamily:fonts.display, fontSize:22, color:p.fg, marginTop:2}}>{state.weather.temp}°</div></div>
          </div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {(() => {
              // Render only the modes the underlying climate entity
              // actually supports. Nest exposes ['off', 'heat_cool'];
              // most other thermostats expose cool/heat/auto/off.
              const supported = t.hvacModes || [];
              // Avoid duplicate "Auto" rows when both heat_cool and auto
              // are advertised by the same entity (rare but possible).
              const seen = new Set();
              const rows = [];
              const order = ['cool', 'heat_cool', 'auto', 'heat', 'off', 'fan_only', 'dry'];
              const labelFor = (m) => ({
                cool: 'Cool', heat: 'Heat', heat_cool: 'Auto', auto: 'Auto',
                off: 'Off', fan_only: 'Fan', dry: 'Dry',
              })[m] || m;
              for (const m of order) {
                if (!supported.includes(m)) continue;
                const lbl = labelFor(m);
                if (seen.has(lbl)) continue;
                seen.add(lbl);
                rows.push({ id: m, label: lbl });
              }
              if (!rows.length) rows.push({ id: 'off', label: 'Off' });
              return rows.map(r => (
                <button key={r.id} onClick={() => setMode(r.id)} style={{
                  flex:'1 1 60px', padding:'10px 0',
                  border:`.5px solid ${r.id===t.mode ? p.accent : p.border2}`,
                  background: r.id===t.mode ? p.accentSoft : 'transparent',
                  color: r.id===t.mode ? p.accent : p.fg2, borderRadius:8, fontSize:12, cursor:'pointer', fontFamily:fonts.body
                }}>{r.label}</button>
              ));
            })()}
          </div>
          {/* Live HVAC action — surfaces what the system is actually
              doing (heating / cooling / idle / fan-only) right now,
              regardless of which top-level mode the user picked.
              Useful especially on Nest where the only top-level modes
              are Auto and Off. */}
          {t.action && t.action !== 'idle' && t.action !== 'off' && (
            <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:p.fg2}}>
              <span style={{
                width:8, height:8, borderRadius:'50%',
                background: t.action === 'heating' ? '#d8843e' : t.action === 'cooling' ? '#5aa6c7' : p.fg3,
                boxShadow: `0 0 10px 1px ${t.action === 'heating' ? 'rgba(216,132,62,0.55)' : t.action === 'cooling' ? 'rgba(90,166,199,0.55)' : 'transparent'}`,
                animation: 'pulseDot 1.6s ease-in-out infinite',
              }}/>
              <span style={{textTransform:'capitalize'}}>Currently {t.action}</span>
            </div>
          )}
          <div style={{fontSize:11, color:p.fg3, fontStyle:'italic', fontFamily:fonts.display}}>
            Drag the dial to set the target temperature. {state.weather.summary.toLowerCase()} outside.
          </div>
        </div>
      </window.Card>
      <style>{`@keyframes pulseDot { 0%,100% { opacity:0.6 } 50% { opacity:1 } }`}</style>
    </window.Section>
  );
};

// ── LIGHTS ──────────────────────────────────────────────────────────────
const LightsSection = ({ ctx }) => {
  const { p, fonts, dens, state, setState, room } = ctx;
  const lights = state.lights.filter(l => l.room === room);
  const allOn = lights.every(l => l.on);
  return (
    <window.Section title="Lighting" subtitle={`${lights.filter(l=>l.on).length} of ${lights.length} on`} p={p} fonts={fonts}
      action={<button onClick={() => setState(s => ({...s, lights: s.lights.map(l => l.room===room ? {...l, on: !allOn} : l)}))} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>{allOn ? 'All off' : 'All on'}</button>}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(190px, 1fr))', gap:dens.tileGap}}>
        {lights.map(l => (
          <window.Card key={l.id} p={p} style={{padding:14, position:'relative', overflow:'hidden'}}>
            {l.on && <div style={{position:'absolute', right:-20, top:-20, width:80, height:80, borderRadius:'50%', background:`radial-gradient(circle, ${l.color}77, transparent 70%)`}}/>}
            <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', position:'relative'}}>
              <window.Icon name="bulb" size={18} stroke={1.4} style={{color: l.on ? l.color : p.fg3}}/>
              <window.Toggle p={p} on={l.on} size={18} onChange={() => setState(s => ({...s, lights: s.lights.map(x => x.id===l.id ? {...x, on:!x.on} : x)}))}/>
            </div>
            <div style={{fontSize:13, color:p.fg, marginTop:10, fontWeight:500}}>{l.name}</div>
            <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{l.on ? `${l.brightness}%` : 'off'}</div>
            {l.on && (
              <input type="range" min="1" max="100" value={l.brightness} onChange={(e) => setState(s => ({...s, lights: s.lights.map(x => x.id===l.id ? {...x, brightness:+e.target.value} : x)}))}
                style={{width:'100%', marginTop:8, accentColor:p.accent}}/>
            )}
          </window.Card>
        ))}
      </div>
    </window.Section>
  );
};

// ── MUSIC ───────────────────────────────────────────────────────────────
const MusicSection = ({ ctx }) => {
  const { p, fonts, state, room, setPage } = ctx;
  const hass = React.useContext(HassContext);
  if (!state.speakers?.length) return null;

  // Pick the speaker to feature: prefer any speaker actually playing,
  // then anything in the current room, otherwise the first one.
  const playing = state.speakers.find(s => s.playing);
  const inRoom = state.speakers.find(s => s.room === room);
  const speaker = playing || inRoom || state.speakers[0];

  const title = speaker.haMediaTitle;
  const artist = speaker.haMediaArtist;
  const album = speaker.haMediaAlbum;
  const art = speaker.haEntityPicture;
  const dur = speaker.duration || 0;
  const hasMedia = !!(title || artist || album);

  // Live progress — HA sends a snapshot + updated_at, we extrapolate
  // forward in real time so the bar moves between pushes.
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    if (!speaker.playing) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [speaker.playing, speaker.id]);
  const livePos = speaker.playing && speaker.progressUpdatedAt
    ? speaker.progress + (now - speaker.progressUpdatedAt) / 1000
    : speaker.progress;
  const pct = dur > 0 ? Math.min(100, (livePos / dur) * 100) : 0;
  const remaining = Math.max(0, dur - livePos);

  const callMP = (service) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: speaker.id }); } catch {}
  };
  const togglePlay = () => callMP(speaker.playing ? 'media_pause' : 'media_play');

  const playingCount = state.speakers.filter(s => s.playing).length;
  return (
    <window.Section title="Music" subtitle={`${playingCount} speaker${playingCount === 1 ? '' : 's'} playing`} p={p} fonts={fonts}
      action={<button onClick={() => setPage('music')} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Library →</button>}>
      <window.Card p={p} style={{padding:18, display:'flex', gap:16, alignItems:'center'}}>
        <div style={{width:90, height:90, borderRadius:10, flex:'none', overflow:'hidden',
          background: art
            ? `center/cover no-repeat url("${art}"), oklch(20% 0.05 25)`
            : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`,
        }}/>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase'}}>
            {hasMedia ? `Now playing · ${speaker.name}` : speaker.name}
          </div>
          <div style={{fontFamily:fonts.display, fontSize:20, color:p.fg, fontWeight:500, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
            {title || 'Nothing playing'}
          </div>
          {(artist || album) && (
            <div style={{fontSize:12, color:p.fg2, fontStyle:'italic', marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
              {[artist, album].filter(Boolean).join(' · ')}
            </div>
          )}
          {dur > 0 && (
            <>
              <div style={{height:3, background:p.border, borderRadius:2, marginTop:12, position:'relative'}}>
                <div style={{position:'absolute', inset:0, width:`${pct}%`, background:p.accent, borderRadius:2}}/>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:p.fg3, marginTop:4}}>
                <span>{window.fmtTime(livePos)}</span><span>−{window.fmtTime(remaining)}</span>
              </div>
            </>
          )}
        </div>
        <div style={{display:'flex', gap:6, flex:'none'}}>
          <button onClick={() => callMP('media_previous_track')} disabled={!hasMedia}
            style={{width:34, height:34, borderRadius:8, background:'transparent', border:`.5px solid ${p.border2}`,
              color:p.fg2, cursor: hasMedia ? 'pointer' : 'not-allowed', opacity: hasMedia ? 1 : .4}}>
            <window.Icon name="prev" size={14}/>
          </button>
          <button onClick={togglePlay} disabled={!hasMedia && !speaker.playing}
            style={{width:42, height:42, borderRadius:'50%', background:p.accent, color:'#fff', border:0,
              cursor: 'pointer', display:'grid', placeItems:'center', opacity: hasMedia || speaker.playing ? 1 : .4}}>
            <window.Icon name={speaker.playing ? 'pause' : 'play'} size={16}/>
          </button>
          <button onClick={() => callMP('media_next_track')} disabled={!hasMedia}
            style={{width:34, height:34, borderRadius:8, background:'transparent', border:`.5px solid ${p.border2}`,
              color:p.fg2, cursor: hasMedia ? 'pointer' : 'not-allowed', opacity: hasMedia ? 1 : .4}}>
            <window.Icon name="next" size={14}/>
          </button>
        </div>
      </window.Card>
    </window.Section>
  );
};

// ── SPEAKERS — per-Sonos volume tiles ──────────────────────────────────
const SpeakersSection = ({ ctx }) => {
  const { p, fonts, dens, state } = ctx;
  const hass = React.useContext(HassContext);

  // Dedupe Sonos + Music Assistant entries by name. When an MA mirror
  // exists for a room, prefer it (matches the Music page logic).
  const speakers = React.useMemo(() => {
    if (!state.speakers?.length) return [];
    let pool = state.speakers.filter(s => s.isMAAttr || s.isSonosAttr);
    if (!pool.length) pool = state.speakers;
    if (pool.some(s => s.isMAAttr)) pool = pool.filter(s => s.isMAAttr);
    const seen = new Map();
    for (const s of pool) {
      const key = (s.name || s.id).toLowerCase().trim();
      const existing = seen.get(key);
      if (!existing || (s.isMAAttr && !existing.isMAAttr)) seen.set(key, s);
    }
    return Array.from(seen.values());
  }, [state.speakers]);

  // Optimistic local volume override during slider drag — Sonos rate-
  // limits volume_set, so we debounce the HA call and let the slider
  // track the thumb instead of waiting on the round-trip.
  const [volOverrides, setVolOverrides] = React.useState({});
  const volTimers = React.useRef({});
  const callMP = (id, service, data) => {
    if (!hass?.callService) return;
    try { hass.callService('media_player', service, { entity_id: id, ...data }); } catch {}
  };
  const setVolume = (sp, pct) => {
    setVolOverrides(prev => ({ ...prev, [sp.id]: pct }));
    clearTimeout(volTimers.current[sp.id]);
    volTimers.current[sp.id] = setTimeout(() => {
      callMP(sp.id, 'volume_set', { volume_level: pct / 100 });
      // Drop the override shortly after so HA's reported value resumes.
      setTimeout(() => setVolOverrides(prev => {
        const n = { ...prev }; delete n[sp.id]; return n;
      }), 1200);
    }, 180);
  };

  if (!speakers.length) return null;
  const playingCount = speakers.filter(s => s.playing).length;

  return (
    <window.Section title="Speakers" subtitle={`${playingCount} of ${speakers.length} playing`} p={p} fonts={fonts}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:dens.tileGap}}>
        {speakers.map(sp => {
          const v = volOverrides[sp.id] ?? sp.vol ?? 0;
          const subtitle = sp.playing && sp.haMediaTitle
            ? [sp.haMediaTitle, sp.haMediaArtist].filter(Boolean).join(' · ')
            : 'Idle';
          return (
            <window.Card key={sp.id} p={p} style={{padding:14, display:'flex', flexDirection:'column', gap:12}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{width:42, height:42, borderRadius:7, flex:'none', overflow:'hidden',
                  background: sp.haEntityPicture
                    ? `center/cover no-repeat url("${sp.haEntityPicture}"), oklch(20% 0.05 25)`
                    : `linear-gradient(135deg, ${p.surface2}, ${p.surface})`}}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500, color:p.fg,
                    whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{sp.name}</div>
                  <div style={{fontSize:11, color:p.fg3, marginTop:1,
                    whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{subtitle}</div>
                </div>
                <button onClick={() => callMP(sp.id, sp.playing ? 'media_pause' : 'media_play')}
                  style={{width:32, height:32, borderRadius:'50%',
                    background: sp.playing ? p.accentSoft : p.accent,
                    color: sp.playing ? p.accent : '#fff',
                    border:0, cursor:'pointer', display:'grid', placeItems:'center', flex:'none'}}>
                  <window.Icon name={sp.playing ? 'pause' : 'play'} size={12}/>
                </button>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <window.Icon name="speaker" size={11} style={{color:p.fg3}}/>
                <input type="range" min={0} max={100} value={v}
                  onChange={(e) => setVolume(sp, parseInt(e.target.value, 10))}
                  style={{flex:1, accentColor: p.accent}}/>
                <span style={{fontSize:11, color:p.fg3, fontVariantNumeric:'tabular-nums', width:30, textAlign:'right'}}>
                  {Math.round(v)}
                </span>
              </div>
            </window.Card>
          );
        })}
      </div>
    </window.Section>
  );
};

// ── SCENES ──────────────────────────────────────────────────────────────
const ScenesSection = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  return (
    <window.Section title="Scenes" subtitle="Tap to activate" p={p} fonts={fonts}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:dens.tileGap}}>
        {state.scenes.map(sc => (
          <button key={sc.id} onClick={() => setState(s => ({...s, scenes: s.scenes.map(x => ({...x, active: x.id===sc.id}))}))} style={{
            padding:14, borderRadius:11, cursor:'pointer', textAlign:'left', fontFamily:fonts.body,
            background: sc.active ? p.accent : p.surface2, color: sc.active ? '#fff' : p.fg,
            border:`.5px solid ${sc.active ? p.accent : p.border}`,
            display:'flex', flexDirection:'column', gap:8,
          }}>
            <window.Icon name={sc.icon} size={22} stroke={1.4}/>
            <div style={{fontFamily:fonts.display, fontSize:14, fontWeight:500}}>{sc.name}</div>
            <div style={{fontSize:10, opacity:.7}}>{sc.active ? 'Active' : 'Tap to run'}</div>
          </button>
        ))}
      </div>
    </window.Section>
  );
};

// ── CAMERAS ─────────────────────────────────────────────────────────────
const CamerasSection = ({ ctx }) => {
  const { p, fonts, dens, state, setPage } = ctx;
  return (
    <window.Section title="Cameras" subtitle={`${state.cameras.filter(c=>c.online).length} live · ${state.cameras.filter(c=>c.motion).length} motion`} p={p} fonts={fonts}
      action={<button onClick={() => setPage('cameras')} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Open feeds →</button>}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:dens.tileGap}}>
        {state.cameras.map(c => <window.CamThumb key={c.id} c={c} ctx={ctx}/>)}
      </div>
    </window.Section>
  );
};

// ── RING MODE SWITCHER (shared) ─────────────────────────────────────────
const RING_MODES = [
  { id:'disarmed', label:'Disarmed', icon:'shield',  desc:'Sensors off · all clear',                color:'oklch(55% 0.05 80)' },
  { id:'home',     label:'Home',     icon:'home',    desc:'Perimeter armed · interior bypassed',     color:'oklch(60% 0.13 145)' },
  { id:'away',     label:'Away',     icon:'lock',    desc:'Full system armed · entry delay 30s',     color:'oklch(58% 0.16 30)' },
];

const RingModeSwitcher = ({ ctx, compact }) => {
  const { p, fonts, state, setState } = ctx;
  const hass = React.useContext(HassContext);
  const cur = state.ring?.mode || 'disarmed';
  const meta = RING_MODES.find(m => m.id === cur);

  // Bypass dialog state. Triggered when arming fails outright (service
  // call rejected) OR when the entity stays disarmed long enough that
  // Ring almost certainly refused due to an open zone.
  const [bypassPrompt, setBypassPrompt] = React.useState(null);
  // Most-recent error text from a failed service call, surfaced inline.
  const [errorText, setErrorText] = React.useState(null);
  const pendingRef = React.useRef(null);
  // Keep a fresh hass reference so the watchdog reads the live state
  // even if the click closure has aged.
  const hassRef = React.useRef(hass);
  React.useEffect(() => { hassRef.current = hass; }, [hass]);

  const SVC = { home: 'alarm_arm_home', away: 'alarm_arm_away', disarmed: 'alarm_disarm' };

  const directCall = async (service) => {
    if (!hass?.callService || !state.ring?.id) {
      return { ok: false, error: 'Alarm entity not detected in HA' };
    }
    try {
      await hass.callService('alarm_control_panel', service, { entity_id: state.ring.id });
      return { ok: true };
    } catch (e) {
      const msg = e?.message || e?.error || String(e);
      console.warn(`[ring] ${service} failed:`, msg);
      return { ok: false, error: msg };
    }
  };

  const onClick = async (id) => {
    setErrorText(null);
    if (pendingRef.current) clearTimeout(pendingRef.current);

    // Optimistic UI for snappy feedback.
    setState(s => ({
      ...s,
      ring: { ...(s.ring||{}), mode: id, lastChanged: new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}), changedBy:'You' },
      locks: id === 'away' ? s.locks.map(l => ({...l, locked:true})) : s.locks,
    }));

    const svc = SVC[id];
    const result = await directCall(svc);
    if (!result.ok) {
      // Hard rejection from HA: usually means an open zone for arm
      // commands. Offer the bypass option directly.
      if (id !== 'disarmed') setBypassPrompt({ mode: id, reason: result.error });
      else setErrorText(result.error);
      return;
    }

    // Service accepted — but Ring sometimes silently no-ops when sensors
    // are open. Watch for the entity to actually move off disarmed
    // within ~6 s and raise the bypass dialog if it doesn't.
    if (id === 'disarmed') return;
    pendingRef.current = setTimeout(() => {
      const ent = hassRef.current?.states?.[state.ring?.id];
      const st = ent?.state || 'unknown';
      const stillDisarmed = st === 'disarmed' || st === 'unavailable' || st === 'unknown';
      if (stillDisarmed) {
        setBypassPrompt({ mode: id, reason: 'Ring did not arm — likely an open door, window, or motion sensor.' });
      }
    }, 6000);
  };

  React.useEffect(() => () => { if (pendingRef.current) clearTimeout(pendingRef.current); }, []);

  const confirmBypass = async () => {
    const id = bypassPrompt?.mode;
    setBypassPrompt(null);
    if (!id) return;
    // HA's standard "arm and bypass open zones" service. Ring's
    // integration maps this to the same arm action with bypass enabled.
    const result = await directCall('alarm_arm_custom_bypass');
    if (!result.ok) {
      // Fallback: retry the regular arm in case this integration
      // version doesn't expose the bypass variant.
      const retry = await directCall(SVC[id]);
      if (!retry.ok) setErrorText(retry.error || 'Arming failed');
    }
  };

  return (
    <>
    <window.Card p={p} style={{padding: compact ? 12 : 16}}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
        <div style={{width:24, height:24, borderRadius:5, background:'#1f1f1f', color:'#fff', display:'grid', placeItems:'center', fontSize:9, fontWeight:700, flex:'none'}}>R</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:12, color:p.fg, fontWeight:500}}>Ring Alarm</div>
          <div style={{fontSize:10, color:p.fg3}}>{meta.desc} · {state.ring?.lastChanged} by {state.ring?.changedBy}</div>
        </div>
        <div style={{width:7, height:7, borderRadius:'50%', background:meta.color}}/>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6}}>
        {RING_MODES.map(m => {
          const active = m.id === cur;
          return (
            <button key={m.id} onClick={() => onClick(m.id)} style={{
              padding: compact ? '8px 6px' : '10px 8px', borderRadius:8,
              border:`.5px solid ${active ? m.color : p.border2}`,
              background: active ? `color-mix(in oklch, ${m.color} 14%, transparent)` : p.surface,
              color: active ? m.color : p.fg, cursor:'pointer', fontFamily:fonts.body,
              display:'flex', flexDirection:'column', alignItems:'center', gap:4,
              transition:'border-color .15s, background .15s',
            }}>
              <window.Icon name={m.icon} size={14}/>
              <span style={{fontSize:11, fontWeight: active ? 600 : 500}}>{m.label}</span>
            </button>
          );
        })}
      </div>
      {errorText && (
        <div style={{
          marginTop: 10, padding: '8px 10px', borderRadius: 8,
          background: 'rgba(193,77,54,0.12)', border: '.5px solid rgba(193,77,54,0.45)',
          color: '#e0a89a', fontSize: 11, lineHeight: 1.4,
        }}>{errorText}</div>
      )}
    </window.Card>

    {bypassPrompt && (
      <BypassDialog
        mode={bypassPrompt.mode}
        reason={bypassPrompt.reason}
        p={p} fonts={fonts}
        onCancel={() => setBypassPrompt(null)}
        onConfirm={confirmBypass}
      />
    )}
    </>
  );
};

const BypassDialog = ({ mode, reason, p, fonts, onCancel, onConfirm }) => (
  <div
    onClick={onCancel}
    style={{
      position:'fixed', inset:0, zIndex:200,
      background:'rgba(0,0,0,0.55)', backdropFilter:'blur(4px)',
      display:'grid', placeItems:'center', padding:'16px',
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth:380, width:'100%',
        background:p.surface, color:p.fg,
        border:`.5px solid ${p.border2}`, borderRadius:14,
        padding:20, fontFamily:fonts.body,
        boxShadow:'0 18px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{fontFamily:fonts.display, fontSize:18, color:p.fg, marginBottom:8, fontWeight:500}}>
        Arming failed — open sensors
      </div>
      <div style={{fontSize:13, color:p.fg2, lineHeight:1.5, marginBottom:16}}>
        {reason || (
          <>Ring couldn't arm <strong style={{color:p.fg}}>{mode === 'home' ? 'Home' : 'Away'}</strong> because at least one sensor is open.</>
        )}
        <div style={{marginTop:8, color:p.fg3, fontSize:12}}>
          Bypass the open sensors and arm <strong style={{color:p.fg2}}>{mode === 'home' ? 'Home' : 'Away'}</strong> anyway?
        </div>
      </div>
      <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
        <button onClick={onCancel} style={{
          padding:'8px 14px', borderRadius:8,
          background:'transparent', border:`.5px solid ${p.border2}`,
          color:p.fg, cursor:'pointer', fontFamily:'inherit', fontSize:12,
        }}>Cancel</button>
        <button onClick={onConfirm} style={{
          padding:'8px 14px', borderRadius:8,
          background:p.accent, border:`.5px solid ${p.accent}`,
          color:'#fff', cursor:'pointer', fontFamily:'inherit', fontSize:12, fontWeight:500,
        }}>Bypass &amp; arm</button>
      </div>
    </div>
  </div>
);

// ── SECURITY ────────────────────────────────────────────────────────────
const SecuritySection = ({ ctx }) => {
  const { p, fonts, dens, state, setState } = ctx;
  const allLocked = state.locks.every(l => l.locked);
  const ringMode = state.ring?.mode || 'disarmed';
  const ringMeta = RING_MODES.find(m => m.id === ringMode);
  return (
    <window.Section title="Security & access" subtitle={`${ringMeta.label} · ${allLocked ? 'all locked' : 'something is open'}`} p={p} fonts={fonts}
      action={<button onClick={() => setState(s => ({...s, locks: s.locks.map(l => ({...l, locked:true}))}))} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Lock all</button>}>
      {state.ring?.id && (
        <div style={{marginBottom:dens.tileGap}}>
          <RingModeSwitcher ctx={ctx}/>
        </div>
      )}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:dens.tileGap}}>
        {state.locks.map(l => (
          <window.Card key={l.id} p={p} style={{padding:14, display:'flex', alignItems:'center', gap:12}}>
            <window.Icon name="lock" size={20} style={{color: l.locked ? 'oklch(60% 0.13 145)' : p.accent}}/>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, color:p.fg, fontWeight:500}}>{l.name}</div>
              <div style={{fontSize:11, color:p.fg3, marginTop:1}}>{l.locked ? 'Locked' : 'Unlocked'}</div>
            </div>
            <button onClick={() => setState(s => ({...s, locks: s.locks.map(x => x.id===l.id ? {...x, locked:!x.locked} : x)}))} style={{padding:'5px 10px', borderRadius:999, border:`.5px solid ${l.locked ? p.border2 : p.accent}`, background: l.locked ? 'transparent' : p.accentSoft, color: l.locked ? p.fg2 : p.accent, fontSize:11, cursor:'pointer'}}>{l.locked ? 'Unlock' : 'Lock'}</button>
          </window.Card>
        ))}
      </div>
    </window.Section>
  );
};

// ── CAR ─────────────────────────────────────────────────────────────────
const CarSection = ({ ctx }) => {
  const { p, fonts, state, setPage } = ctx;
  const t = state.tesla;
  if (!t.id) return null;
  return (
    <window.Section title="Car" p={p} fonts={fonts}>
      <window.Card p={p} style={{padding:16, cursor:'pointer'}} onClick={() => setPage('car')}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:p.fg3}}>{t.name}</div>
          <window.Icon name="car" size={14} style={{color:p.fg3}}/>
        </div>
        <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:10}}>
          <div style={{fontFamily:fonts.display, fontSize:34, color:p.fg, fontWeight:500, lineHeight:1}}>{t.chargePct}<span style={{fontSize:14, color:p.fg2}}>%</span></div>
          <div style={{fontSize:12, color:p.fg2}}>{t.range} {t.rangeUnit || 'mi'} · {t.charging ? `+${t.chargeRate} mph` : t.pluggedIn ? 'plugged in' : 'unplugged'}</div>
        </div>
        <div style={{height:5, background:p.border, borderRadius:3, marginTop:12, overflow:'hidden'}}>
          <div style={{width:`${t.chargePct}%`, height:'100%', background:t.charging ? p.accent : 'oklch(60% 0.14 145)'}}/>
        </div>
        <div style={{fontSize:11, color:p.fg3, marginTop:8, display:'flex', alignItems:'center', gap:5}}><window.Icon name="location" size={10}/> {t.location}</div>
      </window.Card>
    </window.Section>
  );
};

// ── TODAY ───────────────────────────────────────────────────────────────
const TodaySection = ({ ctx }) => {
  const { p, fonts, dens, state, setPage, narrow } = ctx;
  return (
    <window.Section title="Today" subtitle={`${state.calendar.length} events · ${state.alarms.filter(a=>a.on).length} alarms`} p={p} fonts={fonts}
      action={<button onClick={() => setPage('calendar')} style={{padding:'6px 12px', borderRadius:7, border:`.5px solid ${p.border2}`, background:'transparent', color:p.fg2, fontSize:11, cursor:'pointer', fontFamily:fonts.body}}>Calendar →</button>}>
      <div style={{display:'grid', gridTemplateColumns: narrow ? '1fr' : '2fr 1fr', gap:dens.tileGap}}>
        <window.Card p={p} style={{padding:16}}>
          <div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10}}>Schedule</div>
          {state.calendar.slice(0,5).map((e, i) => (
            <div key={e.id} style={{display:'flex', gap:12, padding:'8px 0', borderTop: i ? `.5px solid ${p.border}` : 'none', alignItems:'baseline'}}>
              <div style={{width:64, fontSize:12, color:p.fg2, fontVariantNumeric:'tabular-nums'}}>{e.t}</div>
              <div style={{width:3, height:18, borderRadius:2, background:e.dot, alignSelf:'center'}}/>
              <div style={{flex:1, fontSize:13, color:p.fg}}>{e.title}<span style={{fontSize:11, color:p.fg3, marginLeft:8}}>{e.where}</span></div>
              {e.dnd && <span style={{fontSize:9, padding:'1px 6px', borderRadius:999, background:p.accentSoft, color:p.accent}}>DND</span>}
            </div>
          ))}
        </window.Card>
        <window.Card p={p} style={{padding:16}}>
          <div style={{fontSize:10, color:p.fg3, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10}}>Alarms</div>
          {state.alarms.map((a, i) => (
            <div key={a.id} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderTop: i ? `.5px solid ${p.border}` : 'none'}}>
              <div>
                <div style={{fontFamily:fonts.display, fontSize:15, color: a.on ? p.fg : p.fg3, fontVariantNumeric:'tabular-nums'}}>{a.time}</div>
                <div style={{fontSize:10, color:p.fg3}}>{a.label}</div>
              </div>
              <div style={{flex:1}}/>
              <window.Toggle p={p} on={a.on} size={16} onChange={(v) => ctx.setState(s => ({...s, alarms: s.alarms.map(x => x.id===a.id ? {...x, on:v} : x)}))}/>
            </div>
          ))}
        </window.Card>
      </div>
    </window.Section>
  );
};

const CamThumb = ({ c, ctx, live }) => {
  const { p, fonts } = ctx;
  const hass = React.useContext(HassContext);
  // Cache-bust the snapshot every 10 s so a still thumb still looks
  // current. Skipped when we're rendering the live HLS player.
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (live || !c.picture) return;
    const t = setInterval(() => setTick(x => x + 1), 10000);
    return () => clearInterval(t);
  }, [c.picture, live]);
  const stillSrc = c.picture
    ? (c.picture + (c.picture.includes('?') ? '&' : '?') + 'hc=' + tick)
    : null;
  const showLive = !!live && c.online && hass;

  return (
    <div style={{aspectRatio:'16/10', borderRadius:10, position:'relative', overflow:'hidden', background:`linear-gradient(135deg, ${c.hue}, oklch(20% 0.04 25))`, color:'#fff'}}>
      {showLive ? (
        <CameraStream
          entityId={c.id}
          hass={hass}
          style={{position:'absolute', inset:0}}
        />
      ) : stillSrc ? (
        <img
          src={stillSrc}
          alt={c.name}
          style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block'}}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div style={{position:'absolute', inset:0, backgroundImage:`repeating-linear-gradient(110deg, rgba(255,255,255,0.05) 0 12px, transparent 12px 24px)`}}/>
      )}
      {/* Dark gradient at top and bottom so the LIVE pill and label stay
          legible over bright frames. */}
      {(showLive || stillSrc) && <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)', pointerEvents:'none'}}/>}
      <div style={{position:'absolute', top:8, left:8, fontSize:10, padding:'2px 7px', borderRadius:999, background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', gap:5}}>
        <span style={{width:5, height:5, borderRadius:'50%', background: c.online ? '#ff5c5c' : '#666'}}/>{c.online ? 'LIVE' : 'OFF'}
      </div>
      {c.motion && <div style={{position:'absolute', top:8, right:8, fontSize:10, padding:'2px 7px', borderRadius:999, background:'rgba(255,92,92,.85)'}}>MOTION</div>}
      <div style={{position:'absolute', bottom:8, left:10, fontFamily:fonts.display, fontSize:13, fontStyle:'italic', textShadow:'0 1px 4px rgba(0,0,0,.7)'}}>{c.name}</div>
    </div>
  );
};

Object.assign(window, { HomeView, ClimateSection, LightsSection, MusicSection, SpeakersSection, ScenesSection, CamerasSection, SecuritySection, CarSection, TodaySection, CamThumb, RingModeSwitcher });
