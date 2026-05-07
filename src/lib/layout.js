// layout.js — persistent dashboard tile layout.
//
// The Personal Dashboard renders its main column from a list of tiles that
// the user can reorder, resize between small (1 col) and large (2 col),
// and hide. The layout lives in localStorage so it survives reloads.
//
// We keep the tile registry separate from the layout state so the two
// can drift safely: adding a new tile bumps DEFAULT_LAYOUT but doesn't
// invalidate the user's saved layout — we just append the missing tile
// to the end so it shows up.

export const TILE_REGISTRY = {
  weather: { name: 'Weather', defaultColSpan: 2 },
  car:     { name: 'Car',     defaultColSpan: 2 },
  sports:  { name: 'Sports',  defaultColSpan: 1 },
  news:    { name: 'News',    defaultColSpan: 1 },
  todo:    { name: 'To-do',   defaultColSpan: 2 },
  notes:   { name: 'Notes',   defaultColSpan: 2 },
};

export const DEFAULT_LAYOUT = [
  { id: 'weather', colSpan: 2, hidden: false },
  { id: 'car',     colSpan: 2, hidden: false },
  { id: 'sports',  colSpan: 1, hidden: false },
  { id: 'news',    colSpan: 1, hidden: false },
  { id: 'todo',    colSpan: 2, hidden: false },
  { id: 'notes',   colSpan: 2, hidden: false },
];

const LAYOUT_KEY = 'homecntrd_layout_v1';

function clone(layout) {
  return layout.map(t => ({ ...t }));
}

function reconcile(saved) {
  // Drop unknown ids (a tile was removed in code), then append any
  // newly-introduced default tiles so they show up after upgrade.
  const known = new Set(Object.keys(TILE_REGISTRY));
  const filtered = saved.filter(t => known.has(t.id));
  const have = new Set(filtered.map(t => t.id));
  for (const def of DEFAULT_LAYOUT) {
    if (!have.has(def.id)) filtered.push({ ...def });
  }
  // Normalise colSpan to 1 or 2.
  return filtered.map(t => ({
    id: t.id,
    colSpan: t.colSpan === 2 ? 2 : 1,
    hidden: !!t.hidden,
  }));
}

export function loadLayout() {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return reconcile(parsed);
    }
  } catch {}
  return clone(DEFAULT_LAYOUT);
}

export function saveLayout(layout) {
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout)); } catch {}
}

export function resetLayout() {
  try { localStorage.removeItem(LAYOUT_KEY); } catch {}
  return clone(DEFAULT_LAYOUT);
}

export function moveTile(layout, sourceId, targetId) {
  if (sourceId === targetId) return layout;
  const next = clone(layout);
  const fromIdx = next.findIndex(t => t.id === sourceId);
  const toIdx = next.findIndex(t => t.id === targetId);
  if (fromIdx === -1 || toIdx === -1) return layout;
  const [moved] = next.splice(fromIdx, 1);
  // Insert at the target's index. If we removed something earlier in the
  // list, the toIdx is still correct because splice shifts everything.
  next.splice(toIdx, 0, moved);
  return next;
}

export function moveTileUp(layout, id) {
  const idx = layout.findIndex(t => t.id === id);
  if (idx <= 0) return layout;
  const next = clone(layout);
  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
  return next;
}

export function moveTileDown(layout, id) {
  const idx = layout.findIndex(t => t.id === id);
  if (idx === -1 || idx >= layout.length - 1) return layout;
  const next = clone(layout);
  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
  return next;
}

export function setTileSpan(layout, id, colSpan) {
  return clone(layout).map(t => t.id === id ? { ...t, colSpan: colSpan === 2 ? 2 : 1 } : t);
}

export function setTileHidden(layout, id, hidden) {
  return clone(layout).map(t => t.id === id ? { ...t, hidden: !!hidden } : t);
}
