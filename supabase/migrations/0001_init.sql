-- HomeCNTRD initial schema.
--
-- One profiles row per auth.users row, holding everything the prototype used
-- to keep on `user.X` in localStorage. JSONB columns mirror the existing
-- in-app shapes 1:1 so we don't have to refactor the views.
--
-- RLS: a user can only read/write their own profile.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  plan text not null default 'free',
  layout jsonb,
  integrations jsonb,
  members jsonb not null default '[]'::jsonb,
  sessions jsonb not null default '[]'::jsonb,
  privacy jsonb not null default jsonb_build_object(
    'cameraIndoorRecording', false,
    'shareWithApple',        false,
    'shareWithGoogle',       false,
    'analytics',             true,
    'voiceTraining',         false
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create a profile row when a new auth user signs up. Pulls the
-- first_name out of raw_user_meta_data, which the client passes during signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Touch updated_at on every profile mutation.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.touch_updated_at();
