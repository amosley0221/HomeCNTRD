-- Phase 3: Home Assistant connection.
--
-- Adds the URL + access token a user pasted into the "Connect Home Assistant"
-- onboarding step. The token authenticates HA's REST + WebSocket APIs and is
-- functionally equivalent to a password, so it's protected by the same RLS
-- policies as the rest of the profile (auth.uid() = id).
--
-- Note: token lives in plain text in the row. RLS prevents any other user
-- from reading it, and Supabase encrypts the database at rest. If you want
-- defense-in-depth (column-level encryption via pgsodium), it's a follow-up
-- migration — for v1 the RLS guarantee is the same posture as the auth
-- session token already stored client-side.

alter table public.profiles
  add column if not exists ha_url   text,
  add column if not exists ha_token text;
