// voice.js — Browser speech-to-text + text-to-speech wrappers.
//
// We use the Web Speech API for tap-to-talk:
//   - SpeechRecognition (webkit-prefixed on Safari)
//   - SpeechSynthesis for spoken responses
//
// Wake-word / always-listening is intentionally NOT implemented here —
// browsers throttle background mic access (iOS Safari blocks it
// entirely). For always-listening, dedicated voice hardware on the
// HA network is the right answer (HA Voice Preview Edition, ESP32
// satellites, etc.). This module covers tap-to-talk only.

export function isVoiceSupported() {
  return typeof window !== 'undefined'
    && (window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Returns a promise that resolves with the final transcript or rejects
// with an error. The caller can also pass an onPartial callback to get
// interim results for live UI feedback.
export function listenOnce({ lang = 'en-US', onPartial } = {}) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return Promise.reject(new Error('SpeechRecognition not supported in this browser'));
  const rec = new SR();
  rec.lang = lang;
  rec.continuous = false;
  rec.interimResults = !!onPartial;
  rec.maxAlternatives = 1;

  return new Promise((resolve, reject) => {
    let finalText = '';
    let timer = null;
    const cleanup = () => { clearTimeout(timer); rec.onresult = rec.onerror = rec.onend = null; };

    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else interim += t;
      }
      if (onPartial && interim) onPartial(interim);
    };
    rec.onerror = (e) => { cleanup(); reject(new Error(e.error || 'Recognition error')); };
    rec.onend = () => { cleanup(); finalText.trim() ? resolve(finalText.trim()) : reject(new Error('No speech detected')); };

    // 12 s max — many browsers stop on their own at ~10 s of silence; this
    // is a hard upper bound just in case.
    timer = setTimeout(() => { try { rec.stop(); } catch {} }, 12000);

    try { rec.start(); }
    catch (e) { cleanup(); reject(e); }
  });
}

// Pick the highest-quality voice available, preferring British male voices
// for the Jarvis aesthetic. Browsers ship a wide range of TTS voices, but
// SpeechSynthesisUtterance.voice defaults to the OS's lowest-quality fallback
// unless we explicitly pick something nicer.
//
// Quality tiers (rough heuristic from voice name):
//   "Neural" / "Natural" / "Online" / "Premium" / "Enhanced"  →  best
//   "Siri" / specific named voices on Apple platforms          →  great
//   default OS voices                                          →  robotic
let _cachedVoice = null;
let _voicesReady = false;

function loadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  const v = window.speechSynthesis.getVoices();
  if (v && v.length) _voicesReady = true;
  return v || [];
}

// Voices load asynchronously in some browsers. Subscribe to the change
// event so the cache is ready by the time speak() is called.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => { loadVoices(); };
}

function pickBestVoice(voices) {
  if (!voices.length) return null;

  // Score each English voice by name keywords. Higher is better.
  const score = (v) => {
    const n = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    if (!lang.startsWith('en')) return -1;
    let s = 0;
    // British → bonus (Jarvis is British)
    if (lang === 'en-gb' || /uk|british|england/.test(n)) s += 50;
    // Specific high-quality voice names
    if (/daniel|oliver|arthur|ryan|george|brian/.test(n)) s += 40;     // British male names
    if (/aria|jenny|samantha|emma|libby|sonia/.test(n)) s += 25;       // Female premium
    if (/siri/.test(n)) s += 35;
    // Quality-tier keywords
    if (/neural|natural|online/.test(n)) s += 30;
    if (/premium|enhanced/.test(n)) s += 20;
    if (/google/.test(n)) s += 10;
    // Penalise default low-quality fallbacks
    if (/^microsoft (david|mark|zira|hazel)$/.test(v.name)) s -= 30;
    return s;
  };

  return voices
    .filter(v => (v.lang || '').toLowerCase().startsWith('en'))
    .sort((a, b) => score(b) - score(a))[0] || voices[0];
}

function getVoice() {
  if (_cachedVoice) return _cachedVoice;
  const voices = loadVoices();
  _cachedVoice = pickBestVoice(voices);
  return _cachedVoice;
}

export function speak(text, { rate = 1.0, pitch = 1.0, lang = 'en-US' } = {}) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
  // Cancel any in-flight utterance so responses don't queue up.
  try { window.speechSynthesis.cancel(); } catch {}
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate;
  u.pitch = pitch;
  u.lang = lang;
  const voice = getVoice();
  if (voice) {
    u.voice = voice;
    // Match voice's native lang so the engine picks the right phonemes.
    if (voice.lang) u.lang = voice.lang;
  }
  window.speechSynthesis.speak(u);
}

export function cancelSpeak() {
  if (typeof window === 'undefined') return;
  try { window.speechSynthesis?.cancel(); } catch {}
}
