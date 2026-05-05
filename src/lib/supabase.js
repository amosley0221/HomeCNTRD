import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Fail loudly in dev; the deployed build will not start without these.
  console.error(
    '[HomeCNTRD] Missing Supabase env vars. Set VITE_SUPABASE_URL and ' +
    'VITE_SUPABASE_ANON_KEY in .env.local (dev) or in the Render service env (prod).'
  );
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'homecntrd_supabase_auth',
  },
});

// Expose for any prototype module that wants to call out directly.
window.supabase = supabase;
