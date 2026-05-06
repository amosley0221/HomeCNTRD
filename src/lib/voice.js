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

export function speak(text, { rate = 1.0, pitch = 1.0, lang = 'en-US' } = {}) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
  // Cancel any in-flight utterance so responses don't queue up.
  try { window.speechSynthesis.cancel(); } catch {}
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate; u.pitch = pitch; u.lang = lang;
  window.speechSynthesis.speak(u);
}

export function cancelSpeak() {
  if (typeof window === 'undefined') return;
  try { window.speechSynthesis?.cancel(); } catch {}
}
