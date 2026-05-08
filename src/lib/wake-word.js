// wake-word.js — "Hey Jarvis" detection via Picovoice Porcupine.
//
// We use the built-in JARVIS keyword (no custom .ppn needed); the only
// asset that has to ship alongside the bundle is the Porcupine model
// file (porcupine_params.pv), which Vite copies from static/ into dist/.
//
// Lifecycle:
//   start(accessKey) → singleton init, mic prompt, listening
//   stop()          → release mic + worker
//   onWake(cb)      → subscribe to wake events; returns unsubscribe
//
// The first call to start() must happen inside a user-gesture handler
// on iOS Safari (taps, clicks). After that, subsequent reconnects are
// silent. Use markUserGesture() if the gesture isn't directly the
// caller of start() — e.g., the user hit a "Enable" button that then
// kicks off async init.
//
// The Porcupine `.pv` model file is fetched from /local/porcupine_params.pv
// by default (HA's static folder). Override via the second arg if
// hosting elsewhere.

import { PorcupineWorker, BuiltInKeyword } from '@picovoice/porcupine-web';
import { WebVoiceProcessor } from '@picovoice/web-voice-processor';

let worker = null;
let starting = null;        // promise while a start() is in flight
let lastError = null;
const listeners = new Set();
const stateListeners = new Set();
let currentState = 'idle';   // idle | starting | listening | error

function setState(next, err = null) {
  currentState = next;
  lastError = err;
  for (const cb of stateListeners) try { cb(next, err); } catch {}
}

export function getState() { return { state: currentState, error: lastError }; }

export function onWake(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function onStateChange(cb) {
  stateListeners.add(cb);
  // Push current state immediately so subscribers don't miss the first one.
  try { cb(currentState, lastError); } catch {}
  return () => stateListeners.delete(cb);
}

const DEFAULT_MODEL_PATH = '/local/porcupine_params.pv';

export async function start(accessKey, modelPath = DEFAULT_MODEL_PATH) {
  if (worker) return;        // already running
  if (starting) return starting;
  if (!accessKey) {
    setState('error', new Error('Picovoice access key required'));
    throw new Error('Picovoice access key required');
  }

  setState('starting');
  starting = (async () => {
    try {
      worker = await PorcupineWorker.create(
        accessKey,
        BuiltInKeyword.Jarvis,
        (detection) => {
          for (const cb of listeners) try { cb(detection); } catch {}
        },
        { publicPath: modelPath, forceWrite: false }
      );
      await WebVoiceProcessor.subscribe(worker);
      setState('listening');
    } catch (e) {
      worker = null;
      setState('error', e);
      throw e;
    } finally {
      starting = null;
    }
  })();
  return starting;
}

export async function stop() {
  if (starting) {
    try { await starting; } catch {}
  }
  if (!worker) { setState('idle'); return; }
  try { await WebVoiceProcessor.unsubscribe(worker); } catch {}
  try { worker.terminate(); } catch {}
  worker = null;
  setState('idle');
}

export function isRunning() {
  return !!worker;
}

// ── Settings persistence ───────────────────────────────────────────────
// Stored separately from the tweak/EDITMODE system because it has to
// survive across deploys regardless of how the host persists tweaks.
const VOICE_KEY = 'homecntrd:voice';
const VOICE_EVT = 'homecntrd:voice:change';

export function loadVoiceSettings() {
  try {
    const raw = localStorage.getItem(VOICE_KEY);
    if (!raw) return { accessKey: '', enabled: true };
    const o = JSON.parse(raw);
    return {
      accessKey: typeof o.accessKey === 'string' ? o.accessKey : '',
      enabled: o.enabled !== false,
    };
  } catch { return { accessKey: '', enabled: true }; }
}

export function saveVoiceSettings(patch) {
  const cur = loadVoiceSettings();
  const next = { ...cur, ...patch };
  try { localStorage.setItem(VOICE_KEY, JSON.stringify(next)); } catch {}
  try { window.dispatchEvent(new CustomEvent(VOICE_EVT, { detail: next })); } catch {}
  return next;
}

export function onVoiceSettingsChange(cb) {
  const handler = (e) => { try { cb(e.detail || loadVoiceSettings()); } catch {} };
  window.addEventListener(VOICE_EVT, handler);
  return () => window.removeEventListener(VOICE_EVT, handler);
}
