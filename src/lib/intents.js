// intents.js — Client-side intent parser. Catches the common "open <X> on
// <service>" / "watch <Y>" voice commands without a round-trip to the
// LLM, so the panel responds instantly for these cases. Anything that
// doesn't match falls through to HA's conversation agent (handled by ai.js).
//
// Returns an Intent object: { type, ...payload } or null.

import { embeds, isDRMBlocked } from './embeds.js';

// Patterns we recognize directly. Order matters — first match wins.
const PATTERNS = [
  // "open <name> on twitch" / "watch <name> on twitch"
  {
    re: /^(?:open|watch|put on|play|start|launch)\s+(.+?)(?:'s)?\s+(?:stream\s+)?on\s+twitch\b.*$/i,
    handler: (m) => {
      const ch = m[1].trim();
      return { type: 'open_url', label: `${ch} on Twitch`, url: embeds.twitch(ch) };
    },
  },
  {
    re: /^(?:open|watch|launch)\s+twitch(?:\s+(?:stream\s+)?(?:for|of)\s+)?\s*(.+)?$/i,
    handler: (m) => {
      const ch = (m[1] || '').trim();
      if (!ch) return { type: 'speech', text: 'Which Twitch channel?' };
      return { type: 'open_url', label: `${ch} on Twitch`, url: embeds.twitch(ch) };
    },
  },

  // "open youtube" alone
  {
    re: /^(?:open|launch)\s+youtube\s*$/i,
    handler: () => ({ type: 'open_url', label: 'YouTube', url: 'https://www.youtube.com/' }),
  },
  // "watch <something> on youtube" → search results page
  {
    re: /^(?:watch|search\s+(?:for\s+)?|find|look\s+up)\s+(.+?)\s+on\s+youtube\b.*$/i,
    handler: (m) => ({ type: 'open_url', label: `YouTube: ${m[1].trim()}`, url: embeds.youtubeSearch(m[1].trim()) }),
  },
  // "play youtube video <id>"
  {
    re: /^(?:open|play|watch)\s+youtube\s+(?:video\s+)?([\w-]{6,15})\s*$/i,
    handler: (m) => ({ type: 'open_url', label: 'YouTube', url: embeds.youtube(m[1]) }),
  },

  // Vimeo
  {
    re: /^(?:open|watch|play)\s+vimeo\s+(\d+)\s*$/i,
    handler: (m) => ({ type: 'open_url', label: 'Vimeo', url: embeds.vimeo(m[1]) }),
  },

  // DRM services — friendly bounce-out
  {
    re: /^(?:open|watch|play|put on|launch)\s+(?:something\s+on\s+)?(netflix|disney\+?|disney plus|hulu|hbo max|hbo|paramount\+?|paramount plus|peacock|prime video|apple tv\+?|apple tv plus)\b.*$/i,
    handler: (m) => ({ type: 'speech', text: `${m[1]} blocks embedded playback. Open it from the app on your TV or phone.` }),
  },

  // "go home" / "back to home"
  {
    re: /^(?:go|take me|back)\s+(?:to\s+)?home\b.*$/i,
    handler: () => ({ type: 'navigate', target: 'home' }),
  },

  // "close" / "exit" / "go back"
  {
    re: /^(?:close|exit|stop|go\s+back|done)\s*(?:the\s+)?(?:browser|video|stream|page)?\.?$/i,
    handler: () => ({ type: 'close_browser' }),
  },
];

export function parseIntent(text) {
  if (!text) return null;
  const trimmed = text.trim().replace(/[.!?]+$/, '');
  for (const { re, handler } of PATTERNS) {
    const m = trimmed.match(re);
    if (m) return handler(m);
  }
  return null;
}
