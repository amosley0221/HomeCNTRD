// sports.js — pull scoreboards from ESPN's public site API.
//
// ESPN exposes an undocumented but stable JSON endpoint per league at
// site.api.espn.com/.../scoreboard that doesn't require auth. CORS is
// permissive so we can fetch it directly from the panel.
//
// Each league returns a list of "events" (games / fight cards). We
// normalise them into a single shape so the SportsCard can render
// everything in one list, sorted favorites-first.

export const LEAGUES = [
  { id: 'nfl',     name: 'NFL', sport: 'football',   league: 'nfl',                     kind: 'team' },
  { id: 'nba',     name: 'NBA', sport: 'basketball', league: 'nba',                     kind: 'team' },
  { id: 'mlb',     name: 'MLB', sport: 'baseball',   league: 'mlb',                     kind: 'team' },
  { id: 'nhl',     name: 'NHL', sport: 'hockey',     league: 'nhl',                     kind: 'team' },
  { id: 'ncaaf',   name: 'CFB', sport: 'football',   league: 'college-football',        kind: 'team' },
  { id: 'ncaambb', name: 'CBB', sport: 'basketball', league: 'mens-college-basketball', kind: 'team' },
  { id: 'epl',     name: 'EPL', sport: 'soccer',     league: 'eng.1',                   kind: 'team' },
  { id: 'ucl',     name: 'UCL', sport: 'soccer',     league: 'uefa.champions',          kind: 'team' },
  { id: 'ufc',     name: 'UFC', sport: 'mma',        league: 'ufc',                     kind: 'combat' },
  { id: 'boxing',  name: 'Box', sport: 'boxing',     league: '',                        kind: 'combat' },
];

// Initial favorites — name is matched (case-insensitive) against the
// team's displayName / shortDisplayName / location / abbreviation.
// `leagues` restricts the match so e.g. "Miami" only matches NCAA
// football, not the Heat or the Dolphins.
const DEFAULT_FAVORITES = [
  { name: 'Philadelphia Eagles' },
  { name: 'Philadelphia Phillies' },
  { name: 'Philadelphia 76ers' },
  { name: 'Duke', leagues: ['ncaambb'] },
  { name: 'Hurricanes', leagues: ['ncaaf'] },
  { name: 'Chelsea', leagues: ['epl'] },
];

const FAVS_KEY = 'homecntrd_sports_favs_v1';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return DEFAULT_FAVORITES;
}

export function saveFavorites(favs) {
  try { localStorage.setItem(FAVS_KEY, JSON.stringify(favs)); } catch {}
}

export function resetFavoritesToDefault() {
  try { localStorage.removeItem(FAVS_KEY); } catch {}
  return DEFAULT_FAVORITES;
}

function leagueUrl(L) {
  return L.league
    ? `https://site.api.espn.com/apis/site/v2/sports/${L.sport}/${L.league}/scoreboard`
    : `https://site.api.espn.com/apis/site/v2/sports/${L.sport}/scoreboard`;
}

function teamHaystack(team) {
  return [team?.displayName, team?.shortDisplayName, team?.name, team?.location, team?.abbreviation, team?.nickname]
    .filter(Boolean).map(s => String(s).toLowerCase()).join(' | ');
}

function isFavoriteCompetitor(competitor, leagueId, favs) {
  const team = competitor?.team || competitor?.athlete || {};
  const hay = teamHaystack(team);
  return favs.some(f => {
    if (f.leagues && !f.leagues.includes(leagueId)) return false;
    return hay.includes(String(f.name || '').toLowerCase());
  });
}

function normalizeStatus(st) {
  const t = st?.type || {};
  let state = t.state || 'pre';
  if (t.completed) state = 'post';
  let label = t.shortDetail || t.detail || t.description || '';
  if (state === 'in' && st?.displayClock && st?.period) {
    label = `${st.displayClock} · ${ordinal(st.period)}`;
  }
  return { state, label };
}

function ordinal(n) {
  const s = ['th','st','nd','rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function competitorInfo(c) {
  const t = c?.team || c?.athlete || {};
  const logo = t.logo || (t.headshot && (t.headshot.href || t.headshot)) || (Array.isArray(t.logos) && t.logos[0]?.href) || '';
  return {
    name: t.displayName || t.shortDisplayName || t.name || 'TBD',
    abbr: t.abbreviation || '',
    logo,
    score: c?.score ?? '',
    isHome: c?.homeAway === 'home',
    winner: c?.winner === true,
    record: (c?.records && c.records[0]?.summary) || '',
  };
}

function normalizeTeamEvent(event, L, favs) {
  const comp = (event.competitions || [])[0];
  if (!comp) return null;
  const competitors = comp.competitors || [];
  if (competitors.length < 2) return null;
  const home = competitors.find(x => x.homeAway === 'home') || competitors[0];
  const away = competitors.find(x => x.homeAway === 'away') || competitors[1];
  const status = normalizeStatus(event.status || comp.status);
  const isFav = isFavoriteCompetitor(home, L.id, favs) || isFavoriteCompetitor(away, L.id, favs);
  const startTime = event.date ? new Date(event.date) : null;
  return {
    id: `${L.id}:${event.id}`,
    league: L.name, leagueId: L.id, kind: 'team',
    teamA: competitorInfo(away),
    teamB: competitorInfo(home),
    status, startTime,
    isFavorite: isFav,
  };
}

function normalizeCombatEvent(event, L, favs) {
  const comps = event.competitions || [];
  if (!comps.length) return null;
  // Use the first listed bout as the headline (ESPN typically orders the
  // main event first on MMA / boxing scoreboards).
  const fight = comps[0];
  const competitors = fight.competitors || [];
  if (competitors.length < 2) return null;
  const status = normalizeStatus(fight.status || event.status);
  // Bump the whole card if any fighter on it matches a favorite.
  const isFav = comps.some(f =>
    (f.competitors || []).some(c => isFavoriteCompetitor(c, L.id, favs))
  );
  const startTime = (fight.date || event.date) ? new Date(fight.date || event.date) : null;
  const cardName = event.shortName || event.name || '';
  return {
    id: `${L.id}:${event.id}`,
    league: cardName ? `${L.name} · ${cardName}` : L.name,
    leagueId: L.id, kind: 'combat',
    teamA: competitorInfo(competitors[0]),
    teamB: competitorInfo(competitors[1]),
    status, startTime,
    isFavorite: isFav,
  };
}

export async function fetchAllScores({ favorites = loadFavorites(), signal } = {}) {
  const all = [];
  await Promise.all(LEAGUES.map(async (L) => {
    try {
      const r = await fetch(leagueUrl(L), { signal, cache: 'no-store' });
      if (!r.ok) return;
      const j = await r.json();
      const events = j.events || [];
      for (const ev of events) {
        const norm = L.kind === 'team'
          ? normalizeTeamEvent(ev, L, favorites)
          : normalizeCombatEvent(ev, L, favorites);
        if (norm) all.push(norm);
      }
    } catch {
      // Per-league failures are silent — boxing in particular often returns
      // nothing. The card just renders without that league's games.
    }
  }));

  // Bucket: favorites → live → upcoming → completed. Within each bucket,
  // sort by start time ascending so the next thing comes first.
  const bucket = (g) => {
    if (g.isFavorite) return 0;
    if (g.status.state === 'in') return 1;
    if (g.status.state === 'pre') return 2;
    return 3;
  };
  all.sort((a, b) => {
    const ba = bucket(a), bb = bucket(b);
    if (ba !== bb) return ba - bb;
    const ta = a.startTime?.getTime() || 0;
    const tb = b.startTime?.getTime() || 0;
    return ta - tb;
  });
  return all;
}
