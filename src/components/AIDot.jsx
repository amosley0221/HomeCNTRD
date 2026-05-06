// AIDot.jsx — Persistent floating mic button. Bottom-right of every view.
// Tap → record speech → run intent → either drive UI (open URL, navigate)
// or fall back to HA's conversation agent for free-text reply.
//
// On platforms where browser SpeechRecognition isn't available (notably the
// iOS Home Assistant Companion app's WKWebView, which blocks the API), the
// dot opens a text-input bubble instead so users can still type commands.
// Either path feeds the same intent → conversation-agent pipeline.
//
// States: idle | listening | thinking | typing | speaking

import React from 'react';
import { isVoiceSupported, listenOnce, speak, cancelSpeak } from '../lib/voice.js';
import { parseIntent } from '../lib/intents.js';
import { askAgent } from '../lib/ai.js';

const SIZE = 56;
const ACCENT = '#e87f4a';
const FG = '#f1ead9';
const BG = '#161310';

export default function AIDot({ hass, onOpenUrl, onCloseBrowser, onNavigate }) {
  const [state, setState] = React.useState('idle'); // idle | listening | thinking | typing
  const [bubble, setBubble] = React.useState(null); // { kind: 'user'|'agent'|'error', text }
  const [partial, setPartial] = React.useState('');
  const [typedDraft, setTypedDraft] = React.useState('');
  const supported = isVoiceSupported();
  const bubbleTimer = React.useRef(null);
  const textInputRef = React.useRef(null);

  React.useEffect(() => {
    if (state === 'typing' && textInputRef.current) textInputRef.current.focus();
  }, [state]);

  const showBubble = (b, ms = 5000) => {
    clearTimeout(bubbleTimer.current);
    setBubble(b);
    if (ms > 0) bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  };

  const handleIntent = async (intent, originalText) => {
    if (!intent) return false;
    switch (intent.type) {
      case 'open_url':
        showBubble({ kind: 'agent', text: `Opening ${intent.label || intent.url}` });
        speak(`Opening ${intent.label || 'that'}`);
        onOpenUrl?.(intent.url, intent.label);
        return true;
      case 'navigate':
        onNavigate?.(intent.target);
        return true;
      case 'close_browser':
        onCloseBrowser?.();
        showBubble({ kind: 'agent', text: 'Closed.' }, 1500);
        return true;
      case 'speech':
        showBubble({ kind: 'agent', text: intent.text });
        speak(intent.text);
        return true;
      default:
        return false;
    }
  };

  const processText = async (text) => {
    if (!text || !text.trim()) { setState('idle'); return; }
    const transcript = text.trim();
    showBubble({ kind: 'user', text: transcript }, 4000);
    setState('thinking');

    const local = parseIntent(transcript);
    console.log('[ai-dot] local intent:', local);
    if (local && await handleIntent(local, transcript)) {
      setState('idle');
      return;
    }

    console.log('[ai-dot] falling back to HA conversation agent');
    const ai = await askAgent(hass, transcript);
    console.log('[ai-dot] agent reply:', ai);
    setState('idle');
    if (ai?.speech) {
      showBubble({ kind: 'agent', text: ai.speech }, 7000);
      speak(ai.speech);
    } else {
      showBubble({ kind: 'error', text: "No reply from HA's conversation agent. Set one up in HA → Settings → Voice Assistants." });
    }
  };

  const submitTyped = (e) => {
    e?.preventDefault?.();
    const text = typedDraft;
    setTypedDraft('');
    processText(text);
  };

  const onTap = async () => {
    console.log('[ai-dot] tap, current state =', state, 'voice supported =', supported);
    if (state === 'listening') {
      setState('idle'); setPartial('');
      return;
    }
    if (state === 'typing') {
      setState('idle'); setTypedDraft('');
      return;
    }
    if (state === 'thinking') return;
    cancelSpeak();
    // No browser speech recognition? (Common case: iOS Companion app's
    // WKWebView blocks the API.) Fall through to a text input so the user
    // can type their command instead.
    if (!supported) {
      console.log('[ai-dot] no SpeechRecognition — switching to text input');
      setState('typing');
      return;
    }
    setState('listening');
    setPartial('');
    let transcript = null;
    try {
      console.log('[ai-dot] starting recognition…');
      transcript = await listenOnce({ onPartial: setPartial });
      console.log('[ai-dot] final transcript:', transcript);
    } catch (e) {
      console.warn('[ai-dot] recognition error:', e);
      setState('idle'); setPartial('');
      showBubble({ kind: 'error', text: e.message || 'Could not capture audio' });
      return;
    }
    setPartial('');
    processText(transcript);
  };

  // ── Styles ───────────────────────────────────────────────────────────────
  const dotStyle = {
    position: 'fixed',
    right: 'calc(env(safe-area-inset-right, 0px) + 18px)',
    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 18px)',
    width: SIZE, height: SIZE, borderRadius: '50%',
    background: state === 'listening' ? '#c14d36' : ACCENT,
    border: 0, color: '#fff', cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,.45), 0 0 0 4px rgba(232,127,74,.2)',
    display: 'grid', placeItems: 'center',
    zIndex: 99999,
    transition: 'background .2s, transform .15s',
    transform: state === 'listening' ? 'scale(1.05)' : 'scale(1)',
    fontFamily: '"Inter", system-ui, sans-serif',
  };

  const ringStyle = {
    position: 'absolute', inset: -8, borderRadius: '50%',
    border: `2px solid ${state === 'listening' ? '#c14d36' : ACCENT}`,
    opacity: state === 'listening' ? 0.6 : 0,
    animation: state === 'listening' ? 'aiRing 1.2s ease-out infinite' : 'none',
    pointerEvents: 'none',
  };

  return (
    <>
      <button onClick={onTap} aria-label={supported ? 'Tap to talk' : 'Tap to type a command'} style={dotStyle}>
        <span style={ringStyle} />
        {state === 'idle' && (supported ? <MicIcon /> : <ChatIcon />)}
        {state === 'listening' && <MicIcon active />}
        {state === 'thinking' && <Spinner />}
        {state === 'typing' && <ChatIcon active />}
      </button>

      {state === 'typing' && (
        <form onSubmit={submitTyped} style={{
          position: 'fixed',
          right: 'calc(env(safe-area-inset-right, 0px) + 18px)',
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${SIZE + 14}px)`,
          width: 'min(420px, calc(100vw - 36px))',
          padding: '10px 12px',
          background: 'rgba(31,27,22,.96)',
          border: '.5px solid rgba(241,234,217,.18)',
          borderRadius: 14,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 99998,
          boxShadow: '0 12px 32px rgba(0,0,0,.5)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <input
            ref={textInputRef}
            value={typedDraft}
            onChange={e => setTypedDraft(e.target.value)}
            placeholder='e.g. "open Esfand on Twitch"'
            style={{
              flex: 1, padding: '8px 10px', borderRadius: 8,
              border: '.5px solid rgba(241,234,217,.18)',
              background: 'rgba(241,234,217,.04)',
              color: FG, fontSize: 14,
              fontFamily: '"Inter", system-ui, sans-serif',
              outline: 'none',
            }}
            autoCorrect="off" autoCapitalize="none"
          />
          <button type="submit" style={{
            padding: '8px 14px', borderRadius: 8, border: 0,
            background: ACCENT, color: '#fff',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'inherit',
          }}>Send</button>
        </form>
      )}

      {(bubble || partial) && (
        <div style={{
          position: 'fixed',
          right: 'calc(env(safe-area-inset-right, 0px) + 18px)',
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${SIZE + 30}px)`,
          maxWidth: 'min(360px, calc(100vw - 36px))',
          padding: '12px 14px',
          background: bubble?.kind === 'error' ? 'rgba(217,100,80,.18)' : 'rgba(31,27,22,.96)',
          color: bubble?.kind === 'error' ? '#ec8b78' : FG,
          border: bubble?.kind === 'error' ? '.5px solid rgba(217,100,80,.4)' : '.5px solid rgba(241,234,217,.14)',
          borderRadius: 14,
          fontSize: 13, lineHeight: 1.4,
          fontFamily: '"Inter", system-ui, sans-serif',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 99998,
          boxShadow: '0 12px 32px rgba(0,0,0,.5)',
          animation: 'aiBubble .18s ease-out',
        }}>
          {partial && (
            <div style={{ color: 'rgba(241,234,217,0.55)', fontStyle: 'italic' }}>{partial}…</div>
          )}
          {bubble && (
            <>
              {bubble.kind === 'user' && (
                <div style={{ fontSize: 10.5, color: 'rgba(241,234,217,.45)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>You</div>
              )}
              <div>{bubble.text}</div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes aiRing {
          0%   { transform: scale(1);   opacity: .6; }
          100% { transform: scale(1.6); opacity: 0;  }
        }
        @keyframes aiBubble {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes aiSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

function MicIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="12" rx="3" fill={active ? 'currentColor' : 'none'} />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

function ChatIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H8l-4 4z" fill={active ? 'currentColor' : 'none'} />
    </svg>
  );
}

function Spinner() {
  return (
    <span style={{
      width: 22, height: 22, borderRadius: '50%',
      border: '2.5px solid rgba(255,255,255,.35)', borderTopColor: '#fff',
      animation: 'aiSpin .9s linear infinite',
      display: 'inline-block',
    }} />
  );
}
