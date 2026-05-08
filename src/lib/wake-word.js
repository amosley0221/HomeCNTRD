// wake-word.js — "Hey Jarvis" detection via OpenWakeWord ONNX models.
//
// Free + offline alternative to Picovoice Porcupine: runs three ONNX
// models in sequence (mel spectrogram → embedding → classifier) on
// audio captured at 16 kHz from the user's microphone. No account, no
// access key — just three .onnx files shipped alongside homecntrd.js.
//
// Pipeline shapes (from openwakeword v0.5.1 release):
//   PCM (1280 floats @16kHz, 80ms) → mel: 5 frames × 32 mel bins
//   76 mel frames → embedding: 96-dim vector
//   16 embeddings → classifier: scalar wake probability
//
// We feed the network 1280 samples per chunk. After the buffers fill
// (~1.28s of audio) the classifier emits a probability every chunk,
// and we fire `onWake` when it crosses WAKE_THRESHOLD with hysteresis.
//
// Lifecycle:
//   start() → request mic + load models + spin up audio worklet
//   stop()  → release mic + tear down sessions
//   onWake(cb), onStateChange(cb)
//
// Settings persistence (homecntrd:voice in localStorage) is shared with
// the older Porcupine implementation so users keep their toggle state.

import * as ort from 'onnxruntime-web/wasm';

// Serve ORT's WASM runtime from /local/ alongside our other assets,
// not from a CDN. Cross-origin dynamic imports from JSDelivr were
// hanging silently on iOS WKWebView (the Companion app), leaving the
// "Loading runtime model…" status stuck forever. Hosting locally also
// makes wake word work fully offline. We use the slim "/wasm" import
// variant of onnxruntime-web (no JSEP/WebGPU support, which we don't
// need for these models) — that one fetches `ort-wasm-simd-threaded.wasm`
// and `ort-wasm-simd-threaded.mjs`, both shipped via static/.
ort.env.wasm.wasmPaths = '/local/';
ort.env.wasm.numThreads = 1;

const MODELS_BASE = '/local/';
const SAMPLE_RATE = 16000;
const CHUNK_SAMPLES = 1280;        // 80ms @ 16kHz — one inference step
const MEL_HISTORY = 76;            // frames the embedding model wants
const EMB_HISTORY = 16;            // embeddings the classifier wants
const MEL_FRAMES_PER_CHUNK = 5;    // mel output frames per 1280-sample input
const WAKE_THRESHOLD = 0.5;
const RELEASE_THRESHOLD = 0.3;     // hysteresis: must drop below this before next wake

// ── runtime state ──────────────────────────────────────────────────────
let melSession = null;
let embSession = null;
let wakeSession = null;
let audioCtx = null;
let workletNode = null;
let micStream = null;
let micSource = null;
let silentSink = null;             // 0-gain bridge that keeps the worklet pumping

let pcmBuffer = [];                // accumulates raw mic samples, drained in 1280-sized chunks
let melBuffer = [];                // rolling [N × 32] mel frames
let embBuffer = [];                // rolling [N × 96] embeddings
let armed = true;                  // false during cooldown after a detection
let inferencing = false;           // backpressure: skip a chunk if the previous one is still running
let lastProbability = 0;           // surfaced in getState() so the UI can show a live meter

const wakeListeners = new Set();
const stateListeners = new Set();
let currentState = 'idle';   // idle | starting | listening | error
let lastError = null;
let loadStep = '';                 // surfaced for diagnostics: which model / step is in flight

function setState(next, err = null) {
  currentState = next;
  lastError = err;
  for (const cb of stateListeners) try { cb(next, err); } catch {}
}
export function getState() { return { state: currentState, error: lastError, probability: lastProbability, step: loadStep }; }
export function isRunning() { return !!workletNode; }
export function onWake(cb) { wakeListeners.add(cb); return () => wakeListeners.delete(cb); }
export function onStateChange(cb) {
  stateListeners.add(cb);
  try { cb(currentState, lastError); } catch {}
  return () => stateListeners.delete(cb);
}

// ── audio worklet (inlined as a blob URL) ───────────────────────────────
// Captures mono float32 PCM at the AudioContext's native rate (typically
// 44.1 or 48 kHz) and posts batches of ~10ms to the main thread. We
// resample to 16 kHz on the main thread because the worklet doesn't have
// access to nice resamplers; a simple linear pass is fine for speech.
const WORKLET_SOURCE = `
class CaptureProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0]?.[0];
    if (ch && ch.length) this.port.postMessage(ch.slice());
    return true;
  }
}
registerProcessor('capture', CaptureProcessor);
`;

function linearResample(input, fromRate, toRate) {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const outLen = Math.floor(input.length / ratio);
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const src = i * ratio;
    const idx = Math.floor(src);
    const frac = src - idx;
    out[i] = (input[idx] || 0) * (1 - frac) + (input[idx + 1] || 0) * frac;
  }
  return out;
}

// ── inference helpers ───────────────────────────────────────────────────
// Wraps a promise with a timeout so a stuck network fetch (e.g. ORT
// failing to fetch its WASM, or HA serving an .onnx with the wrong MIME)
// surfaces as an error instead of leaving the UI on "Loading models…"
// forever.
function withTimeout(p, ms, label) {
  return Promise.race([
    p,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`${label} timed out after ${ms}ms`)), ms)),
  ]);
}

async function loadModels() {
  if (melSession) return;
  const opts = { executionProviders: ['wasm'] };
  // Sequential, not Promise.all, so the loadStep value tells us which
  // file is in flight when something goes wrong.
  loadStep = 'mel'; setState('starting');
  melSession = await withTimeout(ort.InferenceSession.create(MODELS_BASE + 'melspectrogram.onnx', opts), 30000, 'mel-spec model');
  loadStep = 'embed'; setState('starting');
  embSession = await withTimeout(ort.InferenceSession.create(MODELS_BASE + 'embedding_model.onnx', opts), 30000, 'embedding model');
  loadStep = 'wake'; setState('starting');
  wakeSession = await withTimeout(ort.InferenceSession.create(MODELS_BASE + 'hey_jarvis.onnx', opts), 30000, 'wake model');
  loadStep = '';
}

// Run a single chunk through the pipeline; returns a wake probability or null
// if we don't yet have enough buffered context to make a prediction.
async function inferChunk(chunk) {
  // 1) Mel spectrogram: input [1, N_samples] float32 → [1, 1, N_frames, 32]
  const melIn = new ort.Tensor('float32', chunk, [1, chunk.length]);
  const melOutMap = await melSession.run({ [melSession.inputNames[0]]: melIn });
  const melOut = melOutMap[melSession.outputNames[0]];
  // Per OpenWakeWord, the mel output values are scaled before feeding the
  // embedding net: (x / 10) + 2. We push frames into our rolling buffer.
  const melData = melOut.data;
  const dims = melOut.dims; // expected [1, 1, frames, 32]
  const frames = dims[dims.length - 2];
  const bins = dims[dims.length - 1];
  for (let f = 0; f < frames; f++) {
    const frame = new Float32Array(bins);
    for (let b = 0; b < bins; b++) frame[b] = (melData[f * bins + b] / 10) + 2;
    melBuffer.push(frame);
  }
  if (melBuffer.length > MEL_HISTORY + MEL_FRAMES_PER_CHUNK * 4) {
    melBuffer.splice(0, melBuffer.length - MEL_HISTORY - MEL_FRAMES_PER_CHUNK * 4);
  }
  if (melBuffer.length < MEL_HISTORY) return null;

  // 2) Embedding: input [1, 76, 32, 1] → [1, 1, 1, 96]
  const window = melBuffer.slice(melBuffer.length - MEL_HISTORY);
  const embIn = new Float32Array(MEL_HISTORY * 32);
  for (let f = 0; f < MEL_HISTORY; f++) {
    for (let b = 0; b < 32; b++) embIn[f * 32 + b] = window[f][b];
  }
  const embTensor = new ort.Tensor('float32', embIn, [1, MEL_HISTORY, 32, 1]);
  const embOutMap = await embSession.run({ [embSession.inputNames[0]]: embTensor });
  const embOut = embOutMap[embSession.outputNames[0]];
  // Embedding output is one 96-dim vector; flatten and push.
  embBuffer.push(new Float32Array(embOut.data));
  if (embBuffer.length > EMB_HISTORY) embBuffer.splice(0, embBuffer.length - EMB_HISTORY);
  if (embBuffer.length < EMB_HISTORY) return null;

  // 3) Classifier: input [1, 16, 96] → [1, 1] probability
  const wakeIn = new Float32Array(EMB_HISTORY * 96);
  for (let i = 0; i < EMB_HISTORY; i++) wakeIn.set(embBuffer[i], i * 96);
  const wakeTensor = new ort.Tensor('float32', wakeIn, [1, EMB_HISTORY, 96]);
  const wakeOutMap = await wakeSession.run({ [wakeSession.inputNames[0]]: wakeTensor });
  const wakeOut = wakeOutMap[wakeSession.outputNames[0]];
  return wakeOut.data[0];
}

async function pumpInference() {
  if (inferencing) return;
  if (pcmBuffer.length < CHUNK_SAMPLES) return;
  // Don't let the buffer grow unbounded if inference falls behind real-time.
  if (pcmBuffer.length > CHUNK_SAMPLES * 6) {
    pcmBuffer.splice(0, pcmBuffer.length - CHUNK_SAMPLES * 4);
  }
  inferencing = true;
  try {
    while (pcmBuffer.length >= CHUNK_SAMPLES) {
      // OpenWakeWord's mel-spec ONNX expects int16-range float32 (i.e. mic
      // samples in [-1,1] scaled by 32768), not normalised audio. Without
      // this scaling the mel features are ~30 dB too quiet and the
      // classifier never crosses the threshold.
      const chunk = new Float32Array(CHUNK_SAMPLES);
      for (let i = 0; i < CHUNK_SAMPLES; i++) chunk[i] = pcmBuffer[i] * 32768;
      pcmBuffer.splice(0, CHUNK_SAMPLES);
      const prob = await inferChunk(chunk);
      if (prob == null) continue;
      lastProbability = prob;
      // Re-emit listening state so subscribers (the settings status row)
      // see updated probability values without manually polling.
      if (currentState === 'listening') {
        for (const cb of stateListeners) try { cb('listening', null); } catch {}
      }
      if (armed && prob >= WAKE_THRESHOLD) {
        armed = false;
        for (const cb of wakeListeners) try { cb({ probability: prob }); } catch {}
      } else if (!armed && prob < RELEASE_THRESHOLD) {
        armed = true;
      }
    }
  } catch (e) {
    setState('error', e);
  } finally {
    inferencing = false;
  }
}

// ── lifecycle ───────────────────────────────────────────────────────────
let starting = null;
export async function start() {
  if (workletNode) return;
  if (starting) return starting;
  setState('starting');
  starting = (async () => {
    try {
      await loadModels();
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const blobUrl = URL.createObjectURL(new Blob([WORKLET_SOURCE], { type: 'application/javascript' }));
      await audioCtx.audioWorklet.addModule(blobUrl);
      URL.revokeObjectURL(blobUrl);
      micSource = audioCtx.createMediaStreamSource(micStream);
      workletNode = new AudioWorkletNode(audioCtx, 'capture');
      const ctxRate = audioCtx.sampleRate;
      workletNode.port.onmessage = (e) => {
        const samples = linearResample(e.data, ctxRate, SAMPLE_RATE);
        for (let i = 0; i < samples.length; i++) pcmBuffer.push(samples[i]);
        pumpInference();
      };
      micSource.connect(workletNode);
      // Force the audio graph to keep pumping. AudioWorkletNode.process()
      // only runs while a downstream node consumes its output, so without
      // a sink the worklet stays idle — no PCM ever reaches the inference
      // chain. We bridge through a 0-gain GainNode so destination plays
      // silence and we don't get mic feedback.
      silentSink = audioCtx.createGain();
      silentSink.gain.value = 0;
      workletNode.connect(silentSink);
      silentSink.connect(audioCtx.destination);
      setState('listening');
    } catch (e) {
      await stop().catch(() => {});
      setState('error', e);
      throw e;
    } finally {
      starting = null;
    }
  })();
  return starting;
}

export async function stop() {
  if (starting) { try { await starting; } catch {} }
  try { workletNode?.port.close(); } catch {}
  try { workletNode?.disconnect(); } catch {}
  try { silentSink?.disconnect(); } catch {}
  try { micSource?.disconnect(); } catch {}
  try { micStream?.getTracks().forEach(t => t.stop()); } catch {}
  try { await audioCtx?.close(); } catch {}
  workletNode = null;
  silentSink = null;
  micSource = null;
  micStream = null;
  audioCtx = null;
  pcmBuffer.length = 0;
  melBuffer.length = 0;
  embBuffer.length = 0;
  armed = true;
  if (currentState !== 'error') setState('idle');
}

// ── settings persistence ───────────────────────────────────────────────
const VOICE_KEY = 'homecntrd:voice';
const VOICE_EVT = 'homecntrd:voice:change';

export function loadVoiceSettings() {
  try {
    const raw = localStorage.getItem(VOICE_KEY);
    if (!raw) return { enabled: false };          // off by default — wake needs explicit user gesture
    const o = JSON.parse(raw);
    return { enabled: o.enabled === true };
  } catch { return { enabled: false }; }
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
