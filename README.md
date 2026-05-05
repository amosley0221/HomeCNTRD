# HomeCNTRD

Smart-home control surface — installable PWA with real Supabase auth and
offline-first sync.

## Stack

- **Vite + React 18** — production build via `vite build`
- **Supabase** — email/password auth + Postgres profile per user
- **IndexedDB cache + write queue** — every patch persists locally and replays
  to Supabase when the network returns
- **vite-plugin-pwa / Workbox** — installable manifest + service worker that
  precaches the app shell and runtime-caches Supabase responses

## One-time setup

### 1. Create a Supabase project

1. Sign up at https://supabase.com and create a new project.
2. **Project Settings → API** — copy `Project URL` and `anon public` key.
3. **SQL Editor** — paste and run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   This creates the `profiles` table, RLS policies, and the auth-trigger that
   inserts a profile row on signup.
4. **Authentication → Providers** — enable Email, decide whether to require
   email confirmation. (Off is fine for testing; on is recommended for prod.)

### 2. Configure local env

```bash
cp .env.example .env.local
# edit .env.local with your Supabase URL + anon key
```

### 3. Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs ./dist
npm run preview  # serves ./dist locally
```

## Deploy to Render

The repo's `render.yaml` defines a Static Site Blueprint:

1. Render dashboard → **New → Blueprint** → select this repo.
2. Render will prompt for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` —
   paste the values from Supabase Project Settings → API. They're build-time
   variables (inlined into the JS bundle); the anon key is safe to ship
   because Supabase RLS enforces access control at the row level.
3. Push to the watched branch — Render builds (`npm ci && npm run build`) and
   publishes `./dist`.

## PWA / install on home screen

Once deployed over HTTPS, the app advertises a manifest and service worker:

- **iOS Safari**: open the site → Share → *Add to Home Screen*.
- **Android Chrome**: address bar → install icon, or menu → *Install app*.
- **Desktop Chrome/Edge**: address-bar install icon.

After install:

- App shell, fonts, and previously-fetched Supabase responses are cached, so
  the app opens **without a network**.
- Mutations (toggling devices, editing layout, household members, privacy
  settings, etc.) are written to IndexedDB and queued; they replay against
  Supabase when the device comes back online.

## Project layout

```
.
├── index.html                    # Vite entry HTML
├── public/
│   ├── favicon.svg
│   └── icons/icon-{192,512,maskable}.png
├── src/
│   ├── main.jsx                  # Vite entry: sets window.React, mounts <App/>
│   ├── lib/
│   │   ├── supabase.js           # Supabase client
│   │   └── sync.js               # IndexedDB cache + offline write queue
│   ├── auth.jsx                  # Real Supabase auth + AuthScreen UI
│   └── …                         # ported prototype views (window.X registry)
├── supabase/migrations/
│   └── 0001_init.sql             # profiles table + RLS + trigger
├── render.yaml                   # Render Static Site blueprint
├── vite.config.js                # Vite + vite-plugin-pwa configuration
└── package.json
```

## Data model

A single `public.profiles` row per `auth.users` row, holding everything the
prototype kept on the in-memory `user` object:

| column          | type        | notes                                                     |
| --------------- | ----------- | --------------------------------------------------------- |
| `id`            | uuid PK     | references `auth.users(id)`                               |
| `first_name`    | text        | from signup                                               |
| `plan`          | text        | `'free' \| 'plus-annual' \| …`                            |
| `layout`        | jsonb       | home tile layout                                          |
| `integrations`  | jsonb       | connected services                                        |
| `members`       | jsonb       | household members and their permissions                   |
| `sessions`      | jsonb       | trusted devices (advisory; distinct from Supabase tokens) |
| `privacy`       | jsonb       | privacy toggles                                           |
| `created_at`    | timestamptz |                                                           |
| `updated_at`    | timestamptz | bumped by trigger on every update                         |

RLS: `auth.uid() = id` for select/insert/update — a user can only ever read
or write their own profile.

## How auth + sync works

1. **Boot** — `useAuth()` calls `supabase.auth.getSession()`. While the
   session resolves, `App` renders a brief "HomeCNTRD" splash so there's no
   flash of `<AuthScreen/>`.
2. **Hydrate** — if there's a session, the cached profile from IndexedDB is
   shown immediately, then a fresh fetch from `public.profiles` overrides
   it. The current device is stamped into `sessions[]`.
3. **Mutate** — every `patchUser(...)` call applies optimistically to React
   state, mirrors to IndexedDB, and queues an upsert to Supabase. The view
   code (which uses `patchUser` for layout, members, privacy, etc.) didn't
   need to change.
4. **Offline** — if `navigator.onLine === false`, the upsert is queued and
   the app keeps running off the IndexedDB cache. On the next `online`
   event, the queue drains last-write-wins.

## Notes

- The `sessions[]` list on the profile is *advisory* — these are the trusted
  devices a user sees and can revoke from Settings. The actual Supabase auth
  tokens live in localStorage under `homecntrd_supabase_auth` and are
  managed by `@supabase/supabase-js`. Revoking a row in `sessions[]` does
  not invalidate a real Supabase session; for that, use Supabase's
  `signOut({ scope: 'global' })` (TODO if you want it).
- The PWA icons in `public/icons/` are placeholder programmatic renders —
  swap in real branded artwork before launch.
