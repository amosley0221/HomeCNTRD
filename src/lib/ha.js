// ha.js — Home Assistant WebSocket client.
//
// Connects to wss://<haUrl>/api/websocket, authenticates with a long-lived
// access token, hydrates a full snapshot of all entity states, and subscribes
// to state_changed events so the snapshot stays live.
//
// API:
//   const ha = createHAClient({ url, token });
//   ha.connect();
//   ha.onSnapshot(states => ...);   // fires whenever any entity changes
//   ha.callService('light', 'turn_on', { entity_id: 'light.x', brightness_pct: 80 });
//   ha.disconnect();
//
// Reconnect: exponential backoff up to 30s. Keeps last-known states cached
// so the UI doesn't flicker through transient drops.

const HA_AUTH_REQUIRED = 'auth_required';
const HA_AUTH_OK = 'auth_ok';
const HA_AUTH_INVALID = 'auth_invalid';

function wsUrl(haUrl) {
  // haUrl like "https://homeassistant.tailcc60a4.ts.net" → "wss://.../api/websocket"
  return haUrl.replace(/^http/, 'ws').replace(/\/$/, '') + '/api/websocket';
}

function restUrl(haUrl, path) {
  return haUrl.replace(/\/$/, '') + path;
}

export function createHAClient({ url, token }) {
  if (!url || !token) {
    throw new Error('createHAClient: url and token are required');
  }

  let ws = null;
  let nextMsgId = 1;
  const pending = new Map();        // msg id → { resolve, reject }
  let snapshotListeners = [];
  let statusListeners = [];
  let states = new Map();           // entity_id → entity state object
  let connected = false;
  let backoff = 1000;
  let reconnectTimer = null;
  let manualClose = false;

  function emitSnapshot() {
    const arr = Array.from(states.values());
    for (const fn of snapshotListeners) {
      try { fn(arr); } catch (e) { console.error('[ha] listener error', e); }
    }
  }
  function emitStatus(status, detail) {
    for (const fn of statusListeners) {
      try { fn(status, detail); } catch (e) { console.error('[ha] status listener error', e); }
    }
  }

  function connect() {
    manualClose = false;
    if (ws && ws.readyState !== WebSocket.CLOSED) return;
    emitStatus('connecting');
    try {
      ws = new WebSocket(wsUrl(url));
    } catch (e) {
      scheduleReconnect();
      emitStatus('error', e.message);
      return;
    }
    ws.onmessage = (evt) => onMessage(evt.data);
    ws.onclose = () => {
      connected = false;
      emitStatus('disconnected');
      if (!manualClose) scheduleReconnect();
    };
    ws.onerror = (e) => {
      emitStatus('error', e?.message || 'WebSocket error');
    };
  }

  function disconnect() {
    manualClose = true;
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
    if (ws) ws.close();
    ws = null;
  }

  function scheduleReconnect() {
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => {
      backoff = Math.min(backoff * 2, 30000);
      connect();
    }, backoff);
  }

  function onMessage(raw) {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === HA_AUTH_REQUIRED) {
      ws.send(JSON.stringify({ type: 'auth', access_token: token }));
      return;
    }
    if (msg.type === HA_AUTH_INVALID) {
      emitStatus('auth_invalid', msg.message);
      manualClose = true;
      ws.close();
      return;
    }
    if (msg.type === HA_AUTH_OK) {
      connected = true;
      backoff = 1000;
      emitStatus('connected');
      // Hydrate initial state, then subscribe to changes.
      send({ type: 'get_states' }).then(states_ => {
        states = new Map(states_.map(s => [s.entity_id, s]));
        emitSnapshot();
      }).catch(err => emitStatus('error', err.message));
      send({ type: 'subscribe_events', event_type: 'state_changed' }).catch(err => {
        emitStatus('error', err.message);
      });
      return;
    }

    if (msg.type === 'event' && msg.event?.event_type === 'state_changed') {
      const { entity_id, new_state } = msg.event.data;
      if (new_state) states.set(entity_id, new_state);
      else states.delete(entity_id);
      emitSnapshot();
      return;
    }

    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.success === false) reject(new Error(msg.error?.message || 'HA call failed'));
      else resolve(msg.result ?? msg.event ?? null);
    }
  }

  function send(payload) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('Not connected'));
    }
    const id = nextMsgId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, ...payload }));
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────

  return {
    connect,
    disconnect,
    onSnapshot(fn) { snapshotListeners.push(fn); return () => { snapshotListeners = snapshotListeners.filter(x => x !== fn); }; },
    onStatus(fn) { statusListeners.push(fn); return () => { statusListeners = statusListeners.filter(x => x !== fn); }; },
    getState(entityId) { return states.get(entityId); },
    getAll() { return Array.from(states.values()); },
    isConnected() { return connected; },

    // Service calls — returns a promise. UI is optimistic; we don't block on
    // the round-trip. HA will fire state_changed events that flow back into
    // onSnapshot, so the UI converges on truth within ~100ms.
    callService(domain, service, serviceData = {}, target = undefined) {
      return send({
        type: 'call_service',
        domain,
        service,
        service_data: serviceData,
        ...(target ? { target } : {}),
      }).catch(err => {
        console.warn(`[ha] ${domain}.${service} failed:`, err.message);
        throw err;
      });
    },

    // REST helpers (used for things WebSocket doesn't expose cleanly, like
    // camera snapshots).
    async restGet(path) {
      const r = await fetch(restUrl(url, path), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error(`HA REST ${path} → ${r.status}`);
      return r.json();
    },
  };
}

// ── Singleton helper ─────────────────────────────────────────────────────────
//
// We allow exactly one active client at a time (per browser tab). When the
// user logs out / changes connection details, the previous client is torn
// down before a new one is created.

let _client = null;

export function getHAClient() { return _client; }

export function setupHAClient({ url, token }) {
  if (_client) _client.disconnect();
  _client = createHAClient({ url, token });
  _client.connect();
  return _client;
}

export function teardownHAClient() {
  if (_client) _client.disconnect();
  _client = null;
}

// Expose for prototype modules that look on window.
if (typeof window !== 'undefined') {
  window.ha = { setupHAClient, teardownHAClient, getHAClient };
}
