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
import HassContext from './hass-context.js';

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
    todos: [], sports: [], news: [], calendar: [], calendarEvents: [],
  };

  if (!states) {
    return { ...out, ...defaults() };
  }

  const entities = Object.values(states);

  // Detect the Tessie-managed Tesla up front so we can keep its
  // car-climate entity out of state.thermostat (the house thermostat).
  // The Tesla cabin climate is handled separately under state.tesla and
  // the Car page; mixing it into the Nest tile means the Dashboard dial
  // unintentionally sets the car's HVAC.
  const teslaPrefix = detectTeslaPrefix(states);
  const teslaClimateId = teslaPrefix ? `climate.${teslaPrefix}_climate` : null;

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
        // Skip the Tesla cabin media_player exposed by Tessie. It's
        // already represented under state.tesla and listing it here
        // (with cars under "speakers") confuses the music page —
        // grouping fails because Tesla's entity doesn't support join.
        if (teslaPrefix && id === `media_player.${teslaPrefix}_media_player`) break;
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
            duration: e.attributes?.media_duration || 0,
            queue: [],
            // supported_features bitmask — used by the music page to
            // gate group/ungroup actions (only speakers with the
            // GROUPING feature flag = 524288 should participate).
            supportedFeatures: e.attributes?.supported_features || 0,
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
        // Skip the Tesla cabin-climate entity — it's already represented
        // on the Car page via state.tesla, and using it as the house
        // thermostat would route Dashboard dial drags into the car HVAC.
        if (teslaClimateId && id === teslaClimateId) break;
        if (!out.thermostat) {
          const a = e.attributes || {};
          // HA's TARGET_TEMPERATURE_RANGE bit (2) marks support for the
          // dual-setpoint API. Nest in HEAT_COOL mode often DOESN'T set
          // it — the integration only accepts a single `temperature`,
          // not target_temp_low/high. We use this flag in the dispatcher
          // below to pick the right service shape.
          const features = a.supported_features || 0;
          const supportsRange = (features & 2) !== 0;
          const target = a.temperature
            ?? ((a.target_temp_low != null && a.target_temp_high != null)
                ? Math.round((a.target_temp_low + a.target_temp_high) / 2)
                : 72);
          out.thermostat = {
            id,
            temp: a.current_temperature ?? 70,
            target,
            targetLow: a.target_temp_low ?? null,
            targetHigh: a.target_temp_high ?? null,
            mode: e.state || 'auto',
            action: a.hvac_action || null, // 'heating' | 'cooling' | 'idle' | null
            hvacModes: a.hvac_modes || ['off', 'heat_cool', 'cool', 'heat', 'auto'],
            supportsRange,
            minTemp: a.min_temp ?? 50,
            maxTemp: a.max_temp ?? 90,
            humidity: a.current_humidity ?? null,
          };
        }
        break;

      case 'weather':
        if (!out.weather) {
          out.weather = {
            id,
            condition: e.state || 'unknown',
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
          // HA exposes a snapshot at entity_picture with a signed token —
          // safe to drop straight into an <img src>. Relative URLs resolve
          // against the HA origin (which is what's serving our panel).
          picture: e.attributes?.entity_picture || null,
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
          // HA's alarm states cover steady states (disarmed/armed_home/away/
          // night/vacation) plus transitional ones (arming/pending/disarming/
          // triggered). Our 3-mode UI is home/away/disarmed, so map the
          // transitionals to a best-guess steady state — preferring
          // attributes.next_state when the integration exposes it — instead
          // of falling through to "disarmed" (which would visibly flip the
          // pill back during the 30 s arming countdown).
          const st = e.state;
          const next = e.attributes?.next_state;
          let mode;
          if (st === 'disarmed' || st === 'disarming') mode = 'disarmed';
          else if (st === 'armed_away' || st === 'armed_vacation') mode = 'away';
          else if (st && st.startsWith('armed_')) mode = 'home';
          else if (st === 'arming' || st === 'pending') {
            mode = next === 'armed_away' || next === 'armed_vacation' ? 'away' : 'home';
          }
          else if (st === 'triggered') mode = 'home';
          else mode = 'disarmed';
          out.ring = {
            id, mode,
            lastChanged: friendlyTime(e.last_changed),
            changedBy: 'HA',
          };
        }
        break;

      case 'todo': {
        // HA exposes a todo list's open-item count as the entity state.
        // The actual items list is fetched via a separate WS call; for the
        // dashboard tile we just show the list name + count.
        const count = parseInt(e.state, 10);
        out.todos.push({
          id, name,
          count: Number.isFinite(count) ? count : 0,
        });
        break;
      }

      case 'calendar':
        // Each calendar entity reports its NEXT event in attributes. We
        // collect them all into calendarEvents so the right-column list
        // can show several at once. PersonalDashboard ALSO fetches a
        // multi-day list via the REST API for richer display.
        out.calendar.push({ id, name });
        if (e.attributes?.message && (e.attributes?.start_time || e.attributes?.start)) {
          const startStr = e.attributes.start_time || e.attributes.start;
          const start = new Date(startStr);
          // Prefer the explicit all_day attribute when HA provides it;
          // otherwise look for an actual time component in the string.
          // Some HA integrations return "YYYY-MM-DD HH:MM:SS" (space, not T)
          // — checking for "T" alone misclassifies those as all-day.
          const hasTime = typeof startStr === 'string' && /\d{2}:\d{2}/.test(startStr);
          const isAllDay = e.attributes.all_day === true ||
            (typeof startStr === 'string' && !hasTime);
          out.calendarEvents.push({
            id: `${id}-next`,
            title: e.attributes.message,
            where: e.attributes.location || '',
            kind: /birthday|bday/i.test(e.attributes.message) ? 'birthday' : 'event',
            start: startStr,
            isAllDay,
            day: start.getDate(),
            monthShort: start.toLocaleDateString([], { month: 'short' }).toUpperCase(),
            timeStr: isAllDay ? 'All day' : start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            sortKey: start.getTime(),
          });
        }
        break;

      case 'sensor': {
        // Sports — TeamTracker exposes team_state etc.; ESPN integrations
        // similar. Heuristic: friendly_name has team-vs-team OR attributes
        // contain opponent + team_score.
        const a = e.attributes || {};
        if (a.team_homeaway && a.team_score !== undefined) {
          // ESPN-style attributes
          out.sports.push({
            id, team: a.team_name || name, opponent: a.opponent_name || 'Opponent',
            teamScore: a.team_score, oppScore: a.opponent_score,
            state: e.state, live: e.state === 'IN' || e.state === 'in_progress',
          });
        } else if (a.team_abbr && a.opponent_abbr) {
          // TeamTracker-style attributes
          const live = /^(IN|HALF|END)$/.test(e.state);
          out.sports.push({
            id, team: a.team_abbr, opponent: a.opponent_abbr,
            teamScore: a.team_score, oppScore: a.opponent_score,
            state: live ? `${a.clock || ''} Q${a.quarter || ''}`.trim() : (e.state || ''),
            live,
          });
        }
        break;
      }

      case 'event': {
        // HA's feedreader integration creates event.feedreader entities
        // when an RSS update fires. The integration also exposes recent
        // entries via attributes.
        if (id.startsWith('event.feedreader') || /feedreader|rss/i.test(name)) {
          const entries = Array.isArray(e.attributes?.entries) ? e.attributes.entries : [];
          for (const entry of entries.slice(0, 5)) {
            out.news.push({
              id: `${id}-${entry.id || entry.link || entry.title}`,
              title: entry.title || 'Untitled',
              url: entry.link || '#',
              source: e.attributes?.feed_title || name,
              timeAgo: friendlyTime(entry.published || entry.updated || e.last_changed),
            });
          }
        }
        break;
      }
    }
  }

  // Sort upcoming events soonest-first.
  out.calendarEvents.sort((a, b) => (a.sortKey || 0) - (b.sortKey || 0));

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

  // Tesla via Tessie. teslaPrefix was detected up top so we could exclude
  // the car-climate entity from state.thermostat; here we use it again
  // to actually populate state.tesla.
  if (teslaPrefix) {
    out.tesla = buildTesla(states, teslaPrefix);
  }

  return { ...out, ...defaults(out) };
}

function detectTeslaPrefix(states) {
  // The pair we need to be certain it's a car: battery level + battery
  // range at the same prefix. The lock can have varying suffixes between
  // Tessie versions (lock.<prefix>, lock.<prefix>_doors, lock.<prefix>_lock)
  // so we don't gate detection on it.
  for (const id of Object.keys(states)) {
    const m = id.match(/^sensor\.(.+)_battery_range$/);
    if (!m) continue;
    const prefix = m[1];
    if (states[`sensor.${prefix}_battery_level`]) return prefix;
  }
  return null;
}

// Tessie's lock entity varies across integration versions. Check the
// common shapes in priority order so the rest of the app can target
// whatever Tessie picked.
function detectTeslaLockId(states, prefix) {
  const candidates = [
    `lock.${prefix}`,
    `lock.${prefix}_doors`,
    `lock.${prefix}_lock`,
  ];
  for (const id of candidates) if (states[id]) return id;
  // Fallback: any lock entity whose id contains the prefix.
  for (const id of Object.keys(states)) {
    if (id.startsWith('lock.') && id.includes(prefix)) return id;
  }
  return null;
}

function buildTesla(states, prefix) {
  const s = (id) => states[id];
  const numState = (id) => {
    const x = s(id);
    if (!x || x.state === 'unknown' || x.state === 'unavailable') return null;
    const n = Number(x.state);
    return Number.isFinite(n) ? n : null;
  };
  const lockId = detectTeslaLockId(states, prefix);
  const lockEntity = lockId ? s(lockId) : null;
  const battEntity = s(`sensor.${prefix}_battery_level`);
  const rangeEntity = s(`sensor.${prefix}_battery_range`);
  const climateEntity = s(`climate.${prefix}_climate`);
  const insideEntity = s(`sensor.${prefix}_inside_temperature`);
  const odoEntity = s(`sensor.${prefix}_odometer`);
  const tracker = s(`device_tracker.${prefix}_location`);
  const carName = battEntity?.attributes?.friendly_name?.replace(/ Battery level$/i, '')
    || rangeEntity?.attributes?.friendly_name?.replace(/ Battery range$/i, '')
    || 'Tesla';

  return {
    id: prefix,
    lockEntityId: lockId,
    name: carName,
    locked: lockEntity?.state === 'locked',
    chargePct: Math.round(numState(`sensor.${prefix}_battery_level`) ?? 0),
    range: Math.round(numState(`sensor.${prefix}_battery_range`) ?? 0),
    rangeUnit: rangeEntity?.attributes?.unit_of_measurement || 'mi',
    charging: s(`sensor.${prefix}_charging`)?.state === 'Charging',
    chargeRate: Math.round(numState(`sensor.${prefix}_charge_rate_mph`) ?? numState(`sensor.${prefix}_charging_speed`) ?? 0),
    pluggedIn: s(`binary_sensor.${prefix}_charge_cable`)?.state === 'on',
    cabin: Math.round(numState(`sensor.${prefix}_inside_temperature`) ?? 0),
    outside: Math.round(numState(`sensor.${prefix}_outside_temperature`) ?? 0),
    tempUnit: insideEntity?.attributes?.unit_of_measurement || '°F',
    target: Math.round(climateEntity?.attributes?.temperature ?? 70),
    targetMin: climateEntity?.attributes?.min_temp ?? 60,
    targetMax: climateEntity?.attributes?.max_temp ?? 82,
    climateOn: !!climateEntity && !['off','unavailable','unknown'].includes(climateEntity.state),
    climateMode: climateEntity?.state || 'off',
    sentry: s(`switch.${prefix}_sentry_mode`)?.state === 'on',
    valet: s(`switch.${prefix}_valet_mode`)?.state === 'on',
    defrost: s(`switch.${prefix}_defrost`)?.state === 'on',
    location: tracker?.attributes?.friendly_name || (typeof tracker?.state === 'string' && !/^[\d.\-,]+$/.test(tracker.state) ? tracker.state : '—'),
    odometer: Math.round(numState(`sensor.${prefix}_odometer`) ?? 0),
    odometerUnit: odoEntity?.attributes?.unit_of_measurement || 'mi',
    frunk: s(`cover.${prefix}_frunk`)?.state === 'open',
    trunk: s(`cover.${prefix}_trunk`)?.state === 'open',
    chargePortOpen: s(`cover.${prefix}_charge_port_door`)?.state === 'open',
    sunroof: 0,
    software: s(`update.${prefix}_software_update`)?.attributes?.installed_version
      || s(`sensor.${prefix}_software_version`)?.state || '—',
    chargeLimit: Math.round(numState(`number.${prefix}_charge_limit`) ?? 80),
    chargingAmps: numState(`number.${prefix}_charging_amps`)
      ?? numState(`sensor.${prefix}_charger_actual_current`) ?? null,
    voltage: numState(`sensor.${prefix}_charger_voltage`) ?? null,
    energyAdded: numState(`sensor.${prefix}_charge_energy_added`) ?? null,
    timeToFull: numState(`sensor.${prefix}_time_to_full_charge`) ?? null,
  };
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
    tesla: out?.tesla || {
      id: null,
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

// In-memory ring buffer of the last N service calls + their results.
// Lets the in-app Diagnostics section show what HA is actually doing
// without forcing the user to open browser DevTools (impractical on a phone).
const DIAG_MAX = 50;
if (typeof window !== 'undefined' && !window.__hcDiag) window.__hcDiag = [];
function diagPush(entry) {
  if (typeof window === 'undefined') return;
  const list = window.__hcDiag;
  list.push(entry);
  while (list.length > DIAG_MAX) list.shift();
}

function diffAndDispatch(prev, next, hass) {
  if (!hass || typeof hass.callService !== 'function') {
    console.warn('[ha-bridge] hass not available — skipping dispatch');
    diagPush({ ts: Date.now(), kind: 'skip', message: 'hass not available' });
    return;
  }
  const call = (domain, service, data) => {
    const entry = { ts: Date.now(), kind: 'call', domain, service, data, status: 'pending' };
    diagPush(entry);
    console.log(`[ha-bridge] → ${domain}.${service}`, data);
    try {
      const p = hass.callService(domain, service, data);
      if (p && typeof p.then === 'function') {
        p.then(
          () => { entry.status = 'ok'; console.log(`[ha-bridge] ✓ ${domain}.${service}`); },
          (err) => {
            entry.status = 'error';
            entry.error = err?.message || String(err);
            console.warn(`[ha-bridge] ✗ ${domain}.${service} rejected:`, err?.message || err, err);
          },
        );
      } else {
        entry.status = 'ok';
      }
    } catch (e) {
      entry.status = 'error';
      entry.error = e?.message || String(e);
      console.warn(`[ha-bridge] ✗ ${domain}.${service} threw:`, e);
    }
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
  if (prev.thermostat && (
      prev.thermostat.target !== next.thermostat.target ||
      prev.thermostat.mode !== next.thermostat.mode)) {
    if (!next.thermostat?.id) {
      diagPush({ ts: Date.now(), kind: 'skip',
        message: `thermostat change ignored — no climate.* entity in HA. Add a climate integration (Nest/Ecobee/etc.) and the dial will start firing set_temperature.` });
    } else {
      const id = next.thermostat.id;
      const supported = next.thermostat.hvacModes || [];
      const target = next.thermostat.target;
      // Build the right set_temperature payload for the active mode.
      // Dual-setpoint modes (heat_cool/auto) need target_temp_low and
      // target_temp_high; single-setpoint modes use temperature. Nest
      // in particular rejects {temperature: x} when in heat_cool mode.
      const setTempForMode = (mode) => {
        // Dual-setpoint payload only when the entity actually advertises
        // TARGET_TEMPERATURE_RANGE. Nest in heat_cool mode commonly
        // exposes hvac_modes=['off','heat_cool'] but supported_features=1
        // (single setpoint) — sending target_temp_low/high then trips
        // HA's "entity does not support it" validator.
        if ((mode === 'heat_cool' || mode === 'auto') && next.thermostat.supportsRange) {
          return { entity_id: id, target_temp_low: target - 2, target_temp_high: target + 2 };
        }
        return { entity_id: id, temperature: target };
      };

      if (prev.thermostat.mode !== next.thermostat.mode) {
        if (supported.length && !supported.includes(next.thermostat.mode)) {
          diagPush({ ts: Date.now(), kind: 'skip',
            message: `HVAC mode "${next.thermostat.mode}" not supported by this thermostat. Supported: ${supported.join(', ')}.` });
        } else {
          call('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: next.thermostat.mode });
        }
      }
      if (prev.thermostat.target !== next.thermostat.target) {
        // If currently off (or unavailable), pick a reasonable supported
        // mode to switch into so the new target actually sticks.
        const wasOff = prev.thermostat.mode === 'off' || prev.thermostat.mode === 'unavailable';
        let activeMode = next.thermostat.mode;
        if (wasOff || activeMode === 'off' || activeMode === 'unavailable') {
          activeMode =
            (supported.includes('heat_cool') && 'heat_cool') ||
            (supported.includes('auto') && 'auto') ||
            (supported.includes('cool') && 'cool') ||
            (supported.includes('heat') && 'heat') ||
            null;
          if (activeMode) call('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: activeMode });
        }
        if (activeMode) call('climate', 'set_temperature', setTempForMode(activeMode));
      }
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

  // Ring / alarm_control_panel mode changes are dispatched directly from
  // RingModeSwitcher (so we get proper error visibility for the
  // open-sensors / bypass case) — intentionally not handled here.

  // Tesla via Tessie. Watch state.tesla diffs and route them to the
  // matching HA entity. The id field is the entity prefix (e.g. "tone").
  if (next.tesla?.id && prev.tesla?.id === next.tesla.id) {
    const t = next.tesla, pt = prev.tesla;
    const lockId = t.lockEntityId || `lock.${t.id}`;
    const climateId = `climate.${t.id}_climate`;
    const frunkId = `cover.${t.id}_frunk`;
    const trunkId = `cover.${t.id}_trunk`;
    const sentryId = `switch.${t.id}_sentry_mode`;
    const defrostId = `switch.${t.id}_defrost`;
    if (pt.locked !== t.locked) call('lock', t.locked ? 'lock' : 'unlock', { entity_id: lockId });
    if (pt.climateOn !== t.climateOn) call('climate', t.climateOn ? 'turn_on' : 'turn_off', { entity_id: climateId });
    if (pt.target !== t.target) call('climate', 'set_temperature', { entity_id: climateId, temperature: t.target });
    if (pt.frunk !== t.frunk) call('cover', t.frunk ? 'open_cover' : 'close_cover', { entity_id: frunkId });
    if (pt.trunk !== t.trunk) call('cover', t.trunk ? 'open_cover' : 'close_cover', { entity_id: trunkId });
    if (pt.sentry !== t.sentry) call('switch', t.sentry ? 'turn_on' : 'turn_off', { entity_id: sentryId });
    if (pt.defrost !== t.defrost) call('switch', t.defrost ? 'turn_on' : 'turn_off', { entity_id: defrostId });
  }
}

// ── Hook the prototype calls (same signature as the original useHomeState) ──

function useHomeStateHA() {
  const hass = useHass();
  const states = hass?.states || null;

  // Memoise the translation so views only re-render when an entity that
  // matters to us actually changes.
  const baseState = React.useMemo(() => translate(states), [states]);

  // Once-per-mount entity inventory dropped into diagnostics so the user
  // can see at a glance what HA actually exposes (and which integrations
  // are missing). Helps explain why some tiles 'don't work' — usually
  // because no entity of that domain exists.
  const inventoryLogged = React.useRef(false);
  React.useEffect(() => {
    if (inventoryLogged.current || !states) return;
    inventoryLogged.current = true;
    const counts = {};
    for (const id of Object.keys(states)) {
      const d = id.split('.')[0];
      counts[d] = (counts[d] || 0) + 1;
    }
    const summary = Object.entries(counts).sort().map(([k, v]) => `${k}=${v}`).join(' ');
    diagPush({ ts: Date.now(), kind: 'info', message: `HA entity inventory: ${summary || 'none'}` });
    if (!counts.climate) diagPush({ ts: Date.now(), kind: 'info', message: '↑ no climate.* — thermostat tile will be read-only' });
    if (!counts.alarm_control_panel) diagPush({ ts: Date.now(), kind: 'info', message: '↑ no alarm_control_panel.* — Ring tile will be read-only' });
    if (!counts.cover) diagPush({ ts: Date.now(), kind: 'info', message: '↑ no cover.* — garage tile will be read-only' });
    if (!counts.vacuum) diagPush({ ts: Date.now(), kind: 'info', message: '↑ no vacuum.* — vacuum tile will be read-only' });
  }, [states]);

  // Local optimistic overlay so taps feel instant. Cleared shortly after
  // the dispatch debounce + HA round-trip completes so hass becomes the
  // source of truth again.
  const [overlay, setOverlay] = React.useState(null);
  const merged = overlay || baseState;

  const overlayTimer = React.useRef(null);
  // Trailing-edge dispatch debounce. Without this, dragging the
  // thermostat dial fires 5–10 climate.set_temperature calls in <1s,
  // immediately tripping Nest SDM API rate limits (HTTP 429
  // RESOURCE_EXHAUSTED). With debounce, only the *final* value after the
  // user stops interacting is sent — one call instead of ten.
  const dispatchTimer = React.useRef(null);
  const dispatchPending = React.useRef(null);

  const setState = React.useCallback((updater) => {
    setOverlay(prev => {
      const base = prev || baseState;
      const next = typeof updater === 'function' ? updater(base) : { ...base, ...updater };

      // Capture the original `base` on the first change in a batch, but
      // always overwrite the trailing `next` so we dispatch against the
      // final state.
      if (!dispatchPending.current) dispatchPending.current = { base, hass };
      dispatchPending.current.next = next;

      clearTimeout(dispatchTimer.current);
      dispatchTimer.current = setTimeout(() => {
        const p = dispatchPending.current;
        if (p) diffAndDispatch(p.base, p.next, p.hass);
        dispatchPending.current = null;
        dispatchTimer.current = null;
      }, 400);

      return next;
    });
    // Hold the optimistic overlay long enough for the debounce + HA
    // round-trip to land. Otherwise the dial visibly jumps back to the
    // pre-drag value while waiting for HA's state_changed event.
    clearTimeout(overlayTimer.current);
    overlayTimer.current = setTimeout(() => setOverlay(null), 3000);
  }, [hass, baseState]);

  // When hass updates underneath us, drop the overlay so fresh truth wins.
  React.useEffect(() => {
    if (!overlay) return;
    const t = setTimeout(() => setOverlay(null), 3000);
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
