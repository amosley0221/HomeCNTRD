// AIDot.jsx — Persistent floating mic button. Bottom-right of every view.
// Tap → record speech → run intent → either drive UI (open URL, navigate)
// or fall back to HA's conversation agent for free-text reply.
//
// States: idle | listening | thinking | speaking
// While in any non-idle state we show a pulsing/spinning indicator.
// After a reply we briefly show a speech bubble with the response text.

import React from 'react';
import { isVoiceSupported, listenOnce, speak, cancelSpeak } from '../lib/voice.js';
import { parseIntent } from '../lib/intents.js';
import { askAgent } from '../lib/ai.js';

const SIZE = 56;
const ACCENT = '#e87f4a';
const FG = '#f1ead9';
const BG = '#161310';

export default function AIDot({ hass, onOpenUrl, onCloseBrowser, onNavigate }) {
  const [state, setState] = React.useState('idle'); // idle | listening | thinking | speaking
  const [bubble, setBubble] = React.useState(null); // { kind: 'user'|'agent'|'error', text }
  const [partial, setPartial] = React.useState('');
  const supported = isVoiceSupported();
  const bubbleTimer = React.useRef(null);

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

  const onTap = async () => {
    if (state === 'listening') {
      // Tap-to-cancel.
      setState('idle'); setPartial('');
      return;
    }
    if (state === 'thinking') return;
    cancelSpeak();
    if (!supported) {
      showBubble({ kind: 'error', text: 'Voice input not supported in this browser. Try Safari or Chrome.' });
      return;
    }
    setState('listening');
    setPartial('');
    let transcript = null;
    try {
      transcript = await listenOnce({ onPartial: setPartial });
    } catch (e) {
      setState('idle'); setPartial('');
      showBubble({ kind: 'error', text: e.message || 'Could not capture audio' });
      return;
    }
    setPartial('');
    showBubble({ kind: 'user', text: transcript }, 4000);
    setState('thinking');

    // 1) Try local intent first (instant for streaming-service commands).
    const local = parseIntent(transcript);
    if (local && await handleIntent(local, transcript)) {
      setState('idle');
      return;
    }

    // 2) Fall back to HA's conversation agent for everything else.
    const ai = await askAgent(hass, transcript);
    setState('idle');
    if (ai?.speech) {
      showBubble({ kind: 'agent', text: ai.speech }, 7000);
      speak(ai.speech);
    } else {
      showBubble({ kind: 'error', text: "I didn't get a reply from the agent. Configure one under HA → Settings → Voice Assistants." });
    }
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
      <button onClick={onTap} aria-label="Tap to talk" style={dotStyle}>
        <span style={ringStyle} />
        {state === 'idle' && <MicIcon />}
        {state === 'listening' && <MicIcon active />}
        {state === 'thinking' && <Spinner />}
        {state === 'speaking' && <MicIcon />}
      </button>

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
