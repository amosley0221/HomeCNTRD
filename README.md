# HomeCNTRD

A custom Home Assistant panel — a beautiful, opinionated dashboard for the
home you've already wired up in HA. Drops in next to HA's default Lovelace
sidebar, controls real devices through HA's existing integrations.

## Architecture

- Single-file ES module (`dist/homecntrd.js`) loaded by Home Assistant via
  `panel_custom`. No separate hosting, no auth, no CORS — HA serves the file
  and passes us its live `hass` connection.
- React 18 + Vite library build. The custom element `<homecntrd-panel>` is
  registered by the bundle and HA mounts it at the panel route.
- `src/lib/ha-bridge.js` translates `hass.states` into the prototype's
  existing state shape and routes optimistic UI writes through
  `hass.callService(...)`. Views are unchanged.

## Install on your Home Assistant

You need an HA instance you control (Home Assistant OS, Supervised, or
Container) and access to the `/config/` folder.

### 1. Build the bundle

```bash
git clone https://github.com/amosley0221/homecntrd.git
cd homecntrd
npm install
npm run build
# → dist/homecntrd.js (one file)
```

### 2. Drop the bundle in HA's www folder

`/config/www/` is HA's static-asset folder. Files under it are served at
`/local/`. Two ways to copy `dist/homecntrd.js` over:

**Via the Advanced SSH & Web Terminal add-on** (you already have this):
```bash
mkdir -p /config/www
# from the box you built on, scp / cp the file in
# or fetch directly from a GitHub release once we tag one
```

**Via the Samba add-on:** install Samba in HA's add-on store, mount your
HA's `\\<ha-ip>\config\www\` from your computer, drag-and-drop.

### 3. Register the panel

Edit `/config/configuration.yaml` and add:

```yaml
panel_custom:
  - name: homecntrd-panel
    url_path: homecntrd
    sidebar_title: HomeCNTRD
    sidebar_icon: mdi:home-roof
    module_url: /local/homecntrd.js?v=7
    require_admin: false
    embed_iframe: false
```

**Cache-busting:** the `?v=N` suffix on `module_url` forces browsers /
Companion apps to fetch a fresh JS bundle every time the number changes.
Bump it any time you replace `/config/www/homecntrd.js` and the iOS / Android
Companion app will pick up the new bundle without needing pull-to-refresh
or a frontend cache reset. Latest released version: **`v=7`**.

Then **Developer Tools → YAML → Check Configuration** (must be green)
→ **Restart**.

### 4. Open it

After HA restarts, a **HomeCNTRD** entry appears in your sidebar. Click it.
The first paint should show your real lights, media players, locks, etc.

## Use it from any device

| Device | How |
|---|---|
| iPhone / iPad | **Home Assistant Companion App** (App Store, free). Sign in once. Sidebar → HomeCNTRD. |
| Android | **Home Assistant Companion App** (Play Store, free). Sign in once. Sidebar → HomeCNTRD. |
| Mac / PC | Any browser → your Tailscale HA URL → sidebar → HomeCNTRD. |

You can set HomeCNTRD as your **default startup view** in HA so it opens
first when you launch the Companion App. Profile → *Set this dashboard as
default* (or in Companion App: Settings → Companion App → Default page).

## Adding or removing devices

We deep-link to HA's integrations page from HomeCNTRD's settings — adding a
new Hue bulb, pairing an Apple TV, or signing into Sonos happens in HA's
own UI. Daily control happens in HomeCNTRD.

Tap **Tweaks → Home Assistant → Manage devices in Home Assistant** to jump
to `/config/integrations`.

## Updating the panel

After we ship a new `homecntrd.js`:

1. Pull / download the new bundle
2. Replace `/config/www/homecntrd.js` on your HA box
3. In your browser, hard-refresh HomeCNTRD (Ctrl+Shift+R / Cmd+Shift+R)

We can later distribute via [HACS](https://hacs.xyz/) so you get an
"update available" notification right in HA's UI; that's a follow-up.

## Local dev

`npm run dev` runs Vite in watch mode and rebuilds `dist/homecntrd.js` on
every save. Symlink `/config/www/homecntrd.js` to `dist/homecntrd.js` (or
mount the dist folder via Samba) and refresh HA to see changes.

## What's bridged today

| Domain | UI tile | Controls dispatched |
|---|---|---|
| `light.*` | Lights | `light.turn_on` / `turn_off` + `brightness_pct` |
| `media_player.*` | Music + TVs (split by name/device_class) | `media_play`, `media_pause`, `volume_set`, `volume_mute`, `turn_on/off` |
| `lock.*` | Locks | `lock` / `unlock` |
| `cover.*` (garage / door) | Garage | `open_cover` / `close_cover` |
| `vacuum.*` | Vacuum tile | `start`, `pause`, `return_to_base` |
| `climate.*` | Thermostat | `set_temperature`, `set_hvac_mode` |
| `weather.*` | Weather card | (read-only) |
| `camera.*` | Cameras grid | (state + paired motion sensor) |
| `scene.*` | Scenes | `scene.turn_on` |
| `automation.*` | Automations | `automation.turn_on` / `turn_off` |
| `alarm_control_panel.*` | Ring tile | `alarm_arm_home`, `alarm_arm_away`, `alarm_disarm` |

Camera live streams, calendar events, and the LLM-backed assistant are
follow-ups.
