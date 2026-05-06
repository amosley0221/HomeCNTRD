// ha-bridge.js — Translates Home Assistant entities into the prototype's
// existing state shape, and intercepts setState writes to dispatch HA
// service calls. The point of this module is to avoid rewriting any view
// file: the views still call useHomeState(), still receive `[state,
// setState]` with the same fields, still call `setState(s => ({...s, lights:
// s.lights.map(...)}))`. This module is the seam where mock data turns into
// real device state + control.
//
// Entity → state mapping (v1):
//   light.*                              → state.lights[]
//   media_player.*                       → state.speakers[] (and a TV subset)
//   lock.*                               → state.locks[]
//   cover.* (device_class: garage|door)  → state.garage.doors[]
//   vacuum.*                             → state.vacuum (first vacuum wins)
//   climate.*                            → state.thermostat (first wins)
//   weather.*                            → state.weather (first wins)
//   camera.*                             → state.cameras[]
//   scene.*                              → state.scenes[]
//   automation.*                         → state.automations[]
//   alarm_control_panel.*                → state.ring (first wins)
//
// Entity types we don't have HA equivalents for (alarms, dnd, tesla, calendar,
// integrations) keep their prototype defaults so the views render. They can
// be wired up in a follow-up.

import { getHAClient } from './ha.js';

// ── Helpers ─────────────────────────────────────────────────────────────────

const ROOMS = ['living', 'kitchen', 'bedroom', 'office', 'outdoor'];

function inferRoom(name) {
  const n = (name || '').toLowerCase();
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

// ── HA → prototype state translation ────────────────────────────────────────

function translate(entities) {
  const out = {
    lights: [],
    speakers: [],
    tvs: [],
    cameras: [],
    locks: [],
    scenes: [],
    automations: [],
    garage: { doors: [], history: [] },
    vacuum: null,
    thermostat: null,
    weather: null,
    ring: null,
    integrations: [],
    // The prototype expects a `tv` summary; first online TV wins.
    tv: { on: false, source: '—', show: '' },
  };

  for (const e of entities) {
    const id = e.entity_id;
    const domain = id.split('.')[0];
    const name = e.attributes?.friendly_name || id;
    const room = inferRoom(name);

    switch (domain) {
      case 'light':
        out.lights.push({
          id,
          room,
          name,
          on: isOn(e),
          brightness: brightnessPct(e.attributes),
          color: e.attributes?.rgb_color ? rgbToHex(e.attributes.rgb_color) : '#ffe0b2',
        });
        break;

      case 'media_player': {
        const dc = e.attributes?.device_class;
        const isTv = dc === 'tv' || /\btv\b/i.test(name) || /apple\s*tv/i.test(name) || /chromecast/i.test(name);
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
            out.tv = {
              on: true,
              source: e.attributes?.app_name || name,
              show: e.attributes?.media_title || '',
            };
          }
        } else {
          out.speakers.push({
            id, room, name, type: 'sonos', playing, vol,
            group: e.attributes?.group_members?.[0] || null,
            trackId: e.attributes?.media_title || null,
            progress: e.attributes?.media_position || 0,
            queue: [],
            // Extra HA-only metadata used by the music view if present
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
            state: e.state, // docked | cleaning | returning | paused | error
            battery: e.attributes?.battery_level ?? 100,
            mode: 'auto',
            currentRoom: null,
            cleanedToday: 0,
            bin: 'empty',
            lastClean: '—',
            schedule: '—',
          };
        }
        break;

      case 'climate':
        if (!out.thermostat) {
          out.thermostat = {
            id,
            temp: e.attributes?.current_temperature ?? 70,
            target: e.attributes?.temperature
              ?? e.attributes?.target_temp_high
              ?? 72,
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
            hourly: (e.attributes?.forecast || []).slice(0, 12)
              .map(f => Math.round(f.temperature || 65)),
          };
        }
        break;

      case 'camera':
        out.cameras.push({
          id, name, room,
          online: e.state !== 'unavailable',
          motion: false, // updated below from binary_sensor.* if present
          hue: 'oklch(60% 0.10 200)',
        });
        break;

      case 'scene':
        out.scenes.push({
          id, name,
          icon: 'sparkle',
          active: false,
        });
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

  // Cross-link motion to cameras (binary_sensor.*_motion linked by friendly name).
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

  // Provide sensible defaults for prototype state we don't bridge yet so the
  // existing views still render without crashing.
  return {
    ...out,
    // When no entity exists, surface a reasonable default object so views
    // that read `state.thermostat.target` etc. don't throw.
    thermostat: out.thermostat || { id: null, temp: 70, target: 72, mode: 'off', humidity: 42 },
    weather: out.weather || { temp: 64, summary: 'Unavailable', high: 71, low: 52, hourly: [] },
    ring: out.ring || { id: null, mode: 'disarmed', lastChanged: '—', changedBy: '—' },
    vacuum: out.vacuum || {
      id: null, name: 'No vacuum', state: 'docked', battery: 100, mode: 'auto',
      currentRoom: null, cleanedToday: 0, bin: 'empty', lastClean: '—', schedule: '—',
    },
    // Prototype-only state we don't read from HA. Empty arrays / sane defaults.
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

function friendlyTime(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } catch {
    return '—';
  }
}

// ── setState diff → HA service calls ────────────────────────────────────────

function diffAndDispatch(prev, next) {
  const ha = getHAClient();
  if (!ha || !ha.isConnected()) return;

  // Lights
  for (const n of next.lights || []) {
    const p = prev.lights?.find(x => x.id === n.id);
    if (!p) continue;
    if (p.on !== n.on) {
      ha.callService('light', n.on ? 'turn_on' : 'turn_off', {}, { entity_id: n.id }).catch(() => {});
    } else if (n.on && p.brightness !== n.brightness) {
      ha.callService('light', 'turn_on', { brightness_pct: n.brightness }, { entity_id: n.id }).catch(() => {});
    }
  }

  // Speakers / TVs (media_player)
  const allMP = [...(next.speakers || []), ...(next.tvs || [])];
  const allMPPrev = [...(prev.speakers || []), ...(prev.tvs || [])];
  for (const n of allMP) {
    const p = allMPPrev.find(x => x.id === n.id);
    if (!p) continue;
    if (p.playing !== n.playing) {
      ha.callService('media_player', n.playing ? 'media_play' : 'media_pause', {}, { entity_id: n.id }).catch(() => {});
    }
    if (p.vol !== n.vol && typeof n.vol === 'number') {
      ha.callService('media_player', 'volume_set', { volume_level: n.vol / 100 }, { entity_id: n.id }).catch(() => {});
    }
    if ('mute' in n && p.mute !== n.mute) {
      ha.callService('media_player', 'volume_mute', { is_volume_muted: !!n.mute }, { entity_id: n.id }).catch(() => {});
    }
    if ('on' in n && p.on !== n.on) {
      ha.callService('media_player', n.on ? 'turn_on' : 'turn_off', {}, { entity_id: n.id }).catch(() => {});
    }
  }

  // Locks
  for (const n of next.locks || []) {
    const p = prev.locks?.find(x => x.id === n.id);
    if (!p || p.locked === n.locked) continue;
    ha.callService('lock', n.locked ? 'lock' : 'unlock', {}, { entity_id: n.id }).catch(() => {});
  }

  // Garage doors (cover)
  for (const n of next.garage?.doors || []) {
    const p = prev.garage?.doors?.find(x => x.id === n.id);
    if (!p || p.open === n.open) continue;
    ha.callService('cover', n.open ? 'open_cover' : 'close_cover', {}, { entity_id: n.id }).catch(() => {});
  }

  // Vacuum
  if (next.vacuum && prev.vacuum && next.vacuum.id) {
    if (prev.vacuum.state !== next.vacuum.state) {
      const map = { cleaning: 'start', paused: 'pause', returning: 'return_to_base', docked: 'return_to_base' };
      const svc = map[next.vacuum.state];
      if (svc) ha.callService('vacuum', svc, {}, { entity_id: next.vacuum.id }).catch(() => {});
    }
  }

  // Climate
  if (next.thermostat && prev.thermostat && next.thermostat.id) {
    if (prev.thermostat.target !== next.thermostat.target) {
      ha.callService('climate', 'set_temperature', { temperature: next.thermostat.target }, { entity_id: next.thermostat.id }).catch(() => {});
    }
    if (prev.thermostat.mode !== next.thermostat.mode) {
      ha.callService('climate', 'set_hvac_mode', { hvac_mode: next.thermostat.mode }, { entity_id: next.thermostat.id }).catch(() => {});
    }
  }

  // Scenes — when one toggles to active, activate it via HA
  for (const n of next.scenes || []) {
    const p = prev.scenes?.find(x => x.id === n.id);
    if (p && !p.active && n.active) {
      ha.callService('scene', 'turn_on', {}, { entity_id: n.id }).catch(() => {});
    }
  }

  // Automations — toggle enabled
  for (const n of next.automations || []) {
    const p = prev.automations?.find(x => x.id === n.id);
    if (!p || p.enabled === n.enabled) continue;
    ha.callService('automation', n.enabled ? 'turn_on' : 'turn_off', {}, { entity_id: n.id }).catch(() => {});
  }

  // Ring / alarm_control_panel
  if (next.ring && prev.ring && next.ring.id) {
    const modeMap = { home: 'alarm_arm_home', away: 'alarm_arm_away', disarmed: 'alarm_disarm' };
    if (prev.ring.mode !== next.ring.mode) {
      const svc = modeMap[next.ring.mode];
      if (svc) ha.callService('alarm_control_panel', svc, {}, { entity_id: next.ring.id }).catch(() => {});
    }
  }
}

// ── React hook ──────────────────────────────────────────────────────────────

export function useHomeStateHA() {
  const [snapshot, setSnapshot] = React.useState(() => translate([]));
  const [pristine, setPristine] = React.useState(true);

  React.useEffect(() => {
    const ha = getHAClient();
    if (!ha) return;
    const unsub = ha.onSnapshot(entities => {
      setSnapshot(translate(entities));
      setPristine(false);
    });
    // Seed with whatever we already cached.
    if (ha.getAll().length) setSnapshot(translate(ha.getAll()));
    return unsub;
  }, []);

  // Local optimistic overlay so toggles feel instant. HA state_changed events
  // overwrite it shortly after, so it converges on truth.
  const [overlay, setOverlay] = React.useState(null);
  const merged = overlay || snapshot;

  const setState = React.useCallback((updater) => {
    setOverlay(prev => {
      const base = prev || snapshot;
      const next = typeof updater === 'function' ? updater(base) : { ...base, ...updater };
      // Fire HA service calls for whatever changed.
      diffAndDispatch(base, next);
      return next;
    });
    // Clear the overlay after a short window so HA's own state_changed events
    // become the source of truth again.
    clearTimeout(setState._t);
    setState._t = setTimeout(() => setOverlay(null), 1500);
  }, [snapshot]);

  return [merged, setState, { pristine }];
}

if (typeof window !== 'undefined') {
  window.useHomeStateHA = useHomeStateHA;
}
