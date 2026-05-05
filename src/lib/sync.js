// sync.js — Offline-first persistence for the user profile.
//
// The app keeps the entire user record (firstName, plan, layout, integrations,
// members, sessions, privacy) live in React state and mutates it through the
// `patchUser` callback. This module is the I/O layer behind that:
//
//   - readCache(userId)        → cached profile from IndexedDB (fast boot)
//   - writeCache(userId, prof) → mirror state to IndexedDB so it survives reload
//   - enqueue(op)              → queue a mutation while offline
//   - drainQueue()             → replay queued mutations against Supabase
//   - upsertProfile(profile)   → write through to Supabase + cache
//
// On the network: 'online' triggers drainQueue. On boot, drainQueue runs once
// after auth resolves so any writes captured offline before reload are pushed.

import { openDB } from 'idb';
import { supabase } from './supabase.js';

const DB_NAME = 'homecntrd';
const DB_VERSION = 1;
const STORE_PROFILE = 'profile';
const STORE_QUEUE = 'pending_writes';

const dbp = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_PROFILE)) {
      db.createObjectStore(STORE_PROFILE); // keyed by userId
    }
    if (!db.objectStoreNames.contains(STORE_QUEUE)) {
      db.createObjectStore(STORE_QUEUE, { keyPath: 'id', autoIncrement: true });
    }
  },
});

// ── Profile cache ───────────────────────────────────────────────────────────

export async function readCache(userId) {
  if (!userId) return null;
  const db = await dbp;
  return (await db.get(STORE_PROFILE, userId)) || null;
}

export async function writeCache(userId, profile) {
  if (!userId) return;
  const db = await dbp;
  await db.put(STORE_PROFILE, profile, userId);
}

export async function clearCache(userId) {
  const db = await dbp;
  if (userId) await db.delete(STORE_PROFILE, userId);
  else await db.clear(STORE_PROFILE);
}

// ── Pending writes queue ────────────────────────────────────────────────────
//
// Every patch is queued so it can be replayed when the network returns. Each
// op is a *full snapshot* of the profile (last-write-wins), which keeps the
// queue logic trivial and matches how the prototype already mutates state via
// whole-record assignments.

export async function enqueue(op) {
  const db = await dbp;
  await db.add(STORE_QUEUE, { ...op, ts: Date.now() });
}

async function pendingOps() {
  const db = await dbp;
  return db.getAll(STORE_QUEUE);
}

async function clearOps(ids) {
  const db = await dbp;
  const tx = db.transaction(STORE_QUEUE, 'readwrite');
  await Promise.all(ids.map(id => tx.store.delete(id)));
  await tx.done;
}

let draining = false;

export async function drainQueue() {
  if (draining) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
  draining = true;
  try {
    const ops = await pendingOps();
    if (!ops.length) return;
    // Coalesce: keep only the latest op per userId (last-write-wins).
    const latest = new Map();
    const consumedIds = [];
    for (const op of ops) {
      consumedIds.push(op.id);
      latest.set(op.userId, op);
    }
    for (const op of latest.values()) {
      const { error } = await supabase
        .from('profiles')
        .update(op.profile)
        .eq('id', op.userId);
      if (error) {
        console.warn('[sync] drain failed, will retry on next online event', error);
        return; // bail; leave queue intact for retry
      }
    }
    await clearOps(consumedIds);
  } finally {
    draining = false;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => { drainQueue(); });
}

// ── Read-through profile fetch ──────────────────────────────────────────────

export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertProfile(userId, patch) {
  // Always cache + queue first so an offline write survives a reload before
  // the network returns.
  await enqueue({ userId, profile: patch });
  if (typeof navigator !== 'undefined' && navigator.onLine !== false) {
    // Best-effort flush right away.
    drainQueue();
  }
}
