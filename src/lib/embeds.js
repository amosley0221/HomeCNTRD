// embeds.js — URL builders for video services that allow iframe embedding.
//
// Twitch and YouTube provide official iframe embeds. We construct the right
// URL with the required parameters (Twitch needs `parent` to match the host
// of the page hosting the iframe; YouTube doesn't).
//
// DRM services (Netflix, Disney+, Hulu, paid Apple TV+, HBO Max) refuse to
// render in iframes by spec — embedFor() returns null for those, and the
// caller can fall back to a deep-link or "open in app" message.

const PARENT_HOSTS = (() => {
  // Twitch's `parent` param must match the hostname of the page embedding
  // the iframe. We collect all plausible hosts our HA frontend might be
  // served from so the panel works whether you reach it via Tailscale,
  // homeassistant.local, or LAN IP.
  if (typeof window === 'undefined') return ['localhost'];
  const seen = new Set();
  const here = window.location.hostname || 'localhost';
  seen.add(here);
  // Fallbacks the user is likely to hit:
  seen.add('homeassistant.local');
  if (/\.ts\.net$/.test(here)) seen.add(here);
  return Array.from(seen);
})();

function twitchEmbed(channel, opts = {}) {
  const slug = channel.toLowerCase().replace(/\s+/g, '');
  const parents = PARENT_HOSTS.map(h => `parent=${encodeURIComponent(h)}`).join('&');
  return `https://player.twitch.tv/?channel=${encodeURIComponent(slug)}&${parents}&muted=${opts.muted ? 'true' : 'false'}`;
}

function youtubeEmbed(videoId, opts = {}) {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=${opts.autoplay === false ? 0 : 1}`;
}

function youtubeChannelEmbed(channelHandle) {
  // Live stream of a channel handle (no @ prefix). YouTube handles this via
  // the live_stream embed.
  const handle = channelHandle.replace(/^@/, '');
  return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(handle)}&autoplay=1`;
}

function youtubeSearchEmbed(query) {
  // YouTube doesn't have a direct "search and play first result" embed, but
  // we can open results in a new tab. For Phase 4 MVP, when the LLM tells
  // us a topic without a specific video ID, we fall back to a search URL
  // that the user can pick from.
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function vimeoEmbed(videoId) {
  return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?autoplay=1`;
}

// Services that block iframe embedding entirely. We list them so the caller
// can show a friendly "must open in app" message.
const DRM_BLOCKED = ['netflix', 'disneyplus', 'disney+', 'disney plus', 'hulu', 'hbomax', 'hbo max', 'paramountplus', 'paramount+', 'paramount plus', 'peacock', 'amazon prime', 'prime video', 'apple tv plus', 'apple tv+'];

export function isDRMBlocked(serviceName) {
  const s = (serviceName || '').toLowerCase();
  return DRM_BLOCKED.some(x => s.includes(x));
}

export const embeds = {
  twitch: twitchEmbed,
  youtube: youtubeEmbed,
  youtubeChannel: youtubeChannelEmbed,
  youtubeSearch: youtubeSearchEmbed,
  vimeo: vimeoEmbed,
};

// Convenience: given a free-text URL, return it if it's already an embeddable
// URL, or null if it's a known DRM service.
export function safeEmbedUrl(url) {
  if (!url) return null;
  if (isDRMBlocked(url)) return null;
  return url;
}
