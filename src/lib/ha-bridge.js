// ha-bridge.js — Translates Home Assistant entities into the prototype's
// existing state shape. Reads directly from the hass object that the HA
// frontend passes our custom panel; calls hass.callService for writes.
//
// Entity → state mapping:
//   light.*                              → state.lights[]
//   media_player.*                       → state.speakers[] / state.tvs[]
//   lock.*                               → state.locks[]
//   cover.* (device_class garage|door)   → state.garage.doors[]
//   vacuum.*                             → state.vacuum
//   climate.*                            → state.thermostat
//   weather.*                            → state.weather
//   camera.*                             → state.cameras[]
//   scene.*                              → state.scenes[]
//   automation.*                         → state.automations[]
//   alarm_control_panel.*                → state.ring

import React from 'react';

// Re-export the context defined in ha-panel for convenience. The panel
// initialises it before importing this module so the import won't be
// circular at runtime.
const HassContext = (typeof window !== 'undefined' && window.HassContext)
  ? window.HassContext
  : React.createContext(null);

function useHass() { return React.useContext(HassContext); }

// ── Helpers ─────────────────────────────────────────────────────────────────

function inferRoom(name, areaName) {
  const n = ((areaName || '') + ' ' + (name || '')).toLowerCase();
  if (/living|family\s*room|den/.test(n)) return 'living';
  if (/kitchen|dining/.test(n)) return 'kitchen';
  if (/bed|primary|guest\s*room|nursery/.test(n)) return 'bedroom';
  if (/office|study/.test(n)) return 'office';
  if (/outdoor|patio|porch|yard|garden|exterior|driveway|garage|backyard|frontyard|front\s*door/.test(n)) return 'outdoor';
  return 'living';
}

function isOn(s) { return s?.state === 'on' || s?.state === 'open' || s?.state === 'unlocked' || s?.state === 'playing'; }
function brightnessPct(attrs) {
  if (typeof attrs?.brightness === 'number') return Math.round((attrs.brightness / 255) * 100);
  return 80;
}
function rgbToHex(rgb) {
  if (!Array.isArray(rgb) || rgb.length < 3) return '#ffe0b2';
  return '#' + rgb.slice(0, 3).map(v => Math.max(0, Math.min(255, v | 0)).toString(16).padStart(2, '0')).join('');
}
function friendlyTime(iso) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
  catch { return '—'; }
}

// ── Translation: hass.states (object) → prototype state shape ──────────────

function translate(states) {
  const out = {
    lights: [], speakers: [], tvs: [], cameras: [], locks: [],
    scenes: [], automations: [], integrations: [],
    garage: { doors: [], history: [] },
    vacuum: null, thermostat: null, weather: null, ring: null,
    tv: { on: false, source: '—', show: '' },
  };

  if (!states) {
    return { ...out, ...defaults() };
  }

  const entities = Object.values(states);

  for (const e of entities) {
    const id = e.entity_id;
    const domain = id.split('.')[0];
    const name = e.attributes?.friendly_name || id;
    const room = inferRoom(name, e.attributes?.area_id);

    switch (domain) {
      case 'light':
        out.lights.push({
          id, room, name,
          on: isOn(e),
          brightness: brightnessPct(e.attributes),
          color: e.attributes?.rgb_color ? rgbToHex(e.attributes.rgb_color) : '#ffe0b2',
        });
        break;

      case 'media_player': {
        const dc = e.attributes?.device_class;
        const isTv = dc === 'tv' || /\btv\b/i.test(name) || /apple\s*tv/i.test(name) || /chromecast/i.test(name) || /webos/i.test(name);
        const playing = e.state === 'playing';
        const vol = typeof e.attributes?.volume_level === 'number'
          ? Math.round(e.attributes.volume_level * 100) : 30;
        if (isTv) {
          out.tvs.push({
            id, name, brand: dc === 'tv' ? 'tv' : 'appletv', model: name, room,
            on: e.state !== 'off' && e.state !== 'unavailable',
            app: e.attributes?.app_name || '—',
            show: e.attributes?.media_title || '—',
            poster: 'oklch(45% 0.10 280)',
            playing,
            progress: e.attributes?.media_position || 0,
            dur: e.attributes?.media_duration || 0,
            vol,
            mute: !!e.attributes?.is_volume_muted,
            input: e.attributes?.source || '—',
          });
          if (out.tv.on === false && e.state !== 'off' && e.state !== 'unavailable') {
            out.tv = { on: true, source: e.attributes?.app_name || name, show: e.attributes?.media_title || '' };
          }
        } else {
          out.speakers.push({
            id, room, name, type: 'sonos', playing, vol,
            group: e.attributes?.group_members?.[0] || null,
            trackId: null,                  // prototype expected an ID into TRACKS; we don't have that
            progress: e.attributes?.media_position || 0,
            queue: [],
            haMediaTitle: e.attributes?.media_title || null,
            haMediaArtist: e.attributes?.media_artist || null,
            haMediaAlbum: e.attributes?.media_album_name || null,
            haEntityPicture: e.attributes?.entity_picture || null,
          });
        }
        break;
      }

      case 'lock':
        out.locks.push({ id, name, locked: e.state === 'locked' });
        break;

      case 'cover': {
        const dc = e.attributes?.device_class;
        if (dc === 'garage' || dc === 'door' || /garage/i.test(name)) {
          out.garage.doors.push({
            id, name,
            open: e.state === 'open' || e.state === 'opening',
            lastChanged: friendlyTime(e.last_changed),
          });
        }
        break;
      }

      case 'vacuum':
        if (!out.vacuum) {
          out.vacuum = {
            id, name,
            state: e.state,
            battery: e.attributes?.battery_level ?? 100,
            mode: 'auto', currentRoom: null, cleanedToday: 0,
            bin: 'empty', lastClean: '—', schedule: '—',
          };
        }
        break;

      case 'climate':
        if (!out.thermostat) {
          out.thermostat = {
            id,
            temp: e.attributes?.current_temperature ?? 70,
            target: e.attributes?.temperature ?? e.attributes?.target_temp_high ?? 72,
            mode: e.state || 'auto',
            humidity: e.attributes?.current_humidity ?? 42,
          };
        }
        break;

      case 'weather':
        if (!out.weather) {
          out.weather = {
            temp: Math.round(e.attributes?.temperature ?? 64),
            summary: (e.state || 'Partly cloudy').replace(/-/g, ' '),
            high: Math.round(e.attributes?.forecast?.[0]?.temperature ?? 71),
            low: Math.round(e.attributes?.forecast?.[0]?.templow ?? 52),
            hourly: (e.attributes?.forecast || []).slice(0, 12).map(f => Math.round(f.temperature || 65)),
          };
        }
        break;

      case 'camera':
        out.cameras.push({
          id, name, room,
          online: e.state !== 'unavailable',
          motion: false,
          hue: 'oklch(60% 0.10 200)',
        });
        break;

      case 'scene':
        out.scenes.push({ id, name, icon: 'sparkle', active: false });
        break;

      case 'automation':
        out.automations.push({
          id, name,
          trigger: { type: 'ha' },
          actions: [],
          enabled: e.state === 'on',
          lastRun: friendlyTime(e.attributes?.last_triggered),
          desc: name,
        });
        break;

      case 'alarm_control_panel':
        if (!out.ring) {
          const map = { armed_home: 'home', armed_away: 'away', armed_night: 'home', disarmed: 'disarmed' };
          out.ring = {
            id,
            mode: map[e.state] || 'disarmed',
            lastChanged: friendlyTime(e.last_changed),
            changedBy: 'HA',
          };
        }
        break;
    }
  }

  // Cross-link motion to cameras via paired binary_sensor.*_motion entities.
  const motionMap = new Map();
  for (const e of entities) {
    if (e.entity_id.startsWith('binary_sensor.') && e.attributes?.device_class === 'motion') {
      const key = (e.attributes?.friendly_name || '').toLowerCase().replace(/\s*motion\s*$/, '').trim();
      if (key) motionMap.set(key, e.state === 'on');
    }
  }
  out.cameras = out.cameras.map(c => {
    const k = c.name.toLowerCase();
    return { ...c, motion: motionMap.get(k) ?? c.motion };
  });

  return { ...out, ...defaults(out) };
}

function defaults(out) {
  return {
    thermostat: out?.thermostat || { id: null, temp: 70, target: 72, mode: 'off', humidity: 42 },
    weather: out?.weather || { temp: 64, summary: 'Unavailable', high: 71, low: 52, hourly: [] },
    ring: out?.ring || { id: null, mode: 'disarmed', lastChanged: '—', changedBy: '—' },
    vacuum: out?.vacuum || {
      id: null, name: 'No vacuum', state: 'docked', battery: 100, mode: 'auto',
      currentRoom: null, cleanedToday: 0, bin: 'empty', lastClean: '—', schedule: '—',
    },
    tesla: {
      name: 'No Tesla connected', locked: true, charging: false, chargePct: 0,
      chargeRate: 0, pluggedIn: false, range: 0, cabin: 65, target: 70,
      climateOn: false, sentry: false, location: '—', odometer: 0, frunk: false,
      trunk: false, sunroof: 0, software: '—', valet: false,
    },
    alarms: [],
    calendar: [],
    dnd: { active: false, until: null, source: null },
  };
}

// ── setState diff → hass.callService ────────────────────────────────────────

function diffAndDispatch(prev, next, hass) {
  if (!hass || typeof hass.callService !== 'function') return;
  const call = (domain, service, data, target) => {
    try { hass.callService(domain, service, data, target); }
    catch (e) { console.warn(`[ha-bridge] ${domain}.${service} failed`, e); }
  };

  // Lights
  for (const n of next.lights || []) {
    const p = prev.lights?.find(x => x.id === n.id);
    if (!p) continue;
    if (p.on !== n.on) {
      call('light', n.on ? 'turn_on' : 'turn_off', { entity_id: n.id });
    } else if (n.on && p.brightness !== n.brightness) {
      call('light', 'turn_on', { entity_id: n.id, brightness_pct: n.brightness });
    }
  }

  // Speakers + TVs (media_player)
  const allMP = [...(next.speakers || []), ...(next.tvs || [])];
  const allMPPrev = [...(prev.speakers || []), ...(prev.tvs || [])];
  for (const n of allMP) {
    const p = allMPPrev.find(x => x.id === n.id);
    if (!p) continue;
    if (p.playing !== n.playing) call('media_player', n.playing ? 'media_play' : 'media_pause', { entity_id: n.id });
    if (p.vol !== n.vol && typeof n.vol === 'number') call('media_player', 'volume_set', { entity_id: n.id, volume_level: n.vol / 100 });
    if ('mute' in n && p.mute !== n.mute) call('media_player', 'volume_mute', { entity_id: n.id, is_volume_muted: !!n.mute });
    if ('on' in n && p.on !== n.on) call('media_player', n.on ? 'turn_on' : 'turn_off', { entity_id: n.id });
  }

  // Locks
  for (const n of next.locks || []) {
    const p = prev.locks?.find(x => x.id === n.id);
    if (!p || p.locked === n.locked) continue;
    call('lock', n.locked ? 'lock' : 'unlock', { entity_id: n.id });
  }

  // Garage doors (cover)
  for (const n of next.garage?.doors || []) {
    const p = prev.garage?.doors?.find(x => x.id === n.id);
    if (!p || p.open === n.open) continue;
    call('cover', n.open ? 'open_cover' : 'close_cover', { entity_id: n.id });
  }

  // Vacuum
  if (next.vacuum?.id && prev.vacuum && prev.vacuum.state !== next.vacuum.state) {
    const map = { cleaning: 'start', paused: 'pause', returning: 'return_to_base', docked: 'return_to_base' };
    const svc = map[next.vacuum.state];
    if (svc) call('vacuum', svc, { entity_id: next.vacuum.id });
  }

  // Climate
  if (next.thermostat?.id && prev.thermostat) {
    if (prev.thermostat.target !== next.thermostat.target) {
      call('climate', 'set_temperature', { entity_id: next.thermostat.id, temperature: next.thermostat.target });
    }
    if (prev.thermostat.mode !== next.thermostat.mode) {
      call('climate', 'set_hvac_mode', { entity_id: next.thermostat.id, hvac_mode: next.thermostat.mode });
    }
  }

  // Scenes (only fire when transitioning to active)
  for (const n of next.scenes || []) {
    const p = prev.scenes?.find(x => x.id === n.id);
    if (p && !p.active && n.active) call('scene', 'turn_on', { entity_id: n.id });
  }

  // Automations
  for (const n of next.automations || []) {
    const p = prev.automations?.find(x => x.id === n.id);
    if (!p || p.enabled === n.enabled) continue;
    call('automation', n.enabled ? 'turn_on' : 'turn_off', { entity_id: n.id });
  }

  // Ring / alarm_control_panel
  if (next.ring?.id && prev.ring && prev.ring.mode !== next.ring.mode) {
    const map = { home: 'alarm_arm_home', away: 'alarm_arm_away', disarmed: 'alarm_disarm' };
    const svc = map[next.ring.mode];
    if (svc) call('alarm_control_panel', svc, { entity_id: next.ring.id });
  }
}

// ── Hook the prototype calls (same signature as the original useHomeState) ──

function useHomeStateHA() {
  const hass = useHass();
  const states = hass?.states || null;

  // Memoise the translation so views only re-render when an entity that
  // matters to us actually changes.
  const baseState = React.useMemo(() => translate(states), [states]);

  // Local optimistic overlay so taps feel instant. Cleared shortly after so
  // hass becomes the source of truth again.
  const [overlay, setOverlay] = React.useState(null);
  const merged = overlay || baseState;

  const overlayTimer = React.useRef(null);

  const setState = React.useCallback((updater) => {
    setOverlay(prev => {
      const base = prev || baseState;
      const next = typeof updater === 'function' ? updater(base) : { ...base, ...updater };
      diffAndDispatch(base, next, hass);
      return next;
    });
    clearTimeout(overlayTimer.current);
    overlayTimer.current = setTimeout(() => setOverlay(null), 1500);
  }, [hass, baseState]);

  // When hass updates underneath us, drop the overlay so fresh truth wins.
  React.useEffect(() => {
    if (!overlay) return;
    const t = setTimeout(() => setOverlay(null), 1500);
    return () => clearTimeout(t);
  }, [states]); // eslint-disable-line react-hooks/exhaustive-deps

  return [merged, setState];
}

if (typeof window !== 'undefined') {
  // The prototype calls window.useHomeState() inside view components. Override
  // it with the HA-backed version. shared.jsx defines the original earlier in
  // the import chain; this overrides it.
  window.useHomeState = useHomeStateHA;
  window.useHomeStateHA = useHomeStateHA;
  window.useHass = useHass;
}
