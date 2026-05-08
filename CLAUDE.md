# CLAUDE.md — context for assistant sessions

This file is read by Claude Code on session start. It captures the
non-obvious architecture, deploy flow, and history that the README
doesn't cover. Update it when load-bearing decisions change.

## What HomeCNTRD is

A custom Home Assistant panel — a single ES module bundle
(`dist/homecntrd.js`) loaded by HA's `panel_custom` integration. HA
serves the file from `/config/www/` at `/local/homecntrd.js` and
mounts the `<homecntrd-panel>` custom element it registers.
React 18 + Vite library build, no separate hosting, no auth, no CORS.

## Repo layout

- `src/ha-panel.jsx` — Vite entry point. Registers the custom element.
- `src/app.jsx` — top-level React app, mounts HearthApp. Holds the
  EDITMODE-block tweak defaults.
- `src/hearth.jsx` — main shell: nav, page routing, agent bubble,
  wake-word lifecycle bootstrap. Building blocks (Card, Section,
  Toggle, etc.) live here too.
- `src/settings-view.jsx` — full Settings page. Section switching is
  state-based (no scrollIntoView — unreliable in HA's nested scroll).
  Wake-word settings UI lives here as `WakeWordSettings`.
- `src/lib/wake-word.js` — OpenWakeWord pipeline. AudioWorklet capture
  → resample to 16 kHz → 3-model ONNX inference chain.
- `src/lib/voice.js` — TTS wrapper + `listenOnce()` SpeechRecognition
  helper. iOS WKWebView fallback to a text-input bubble.
- `src/lib/intents.js` — local regex-based intent parser, runs before
  HA's conversation agent.
- `src/lib/ai.js` — `askAgent(hass, text)` — calls HA's configured
  conversation agent via the websocket API.
- `src/lib/ha-bridge.js` — translates `hass.states` into the
  prototype's state shape, routes optimistic UI writes through
  `hass.callService(...)`.
- `src/lib/hass-context.js` — React context for the live HA connection.
- `src/tweaks-panel.jsx` — `useTweaks` hook + tweaks panel. Persists
  via `__edit_mode_set_keys` postMessage (works only in the deck-stage
  editor; on real HA installs tweaks reset on reload — use
  `localStorage` directly for anything that has to survive reloads).
- `static/` — files copied verbatim into `dist/` (Vite `publicDir`).
  Currently the three OpenWakeWord ONNX models.
- `vite.config.js` — single-file bundle config. Notes inline.

## Deploy flow

The user runs HAOS in VirtualBox on a Windows PC, accessed via
`http://192.168.68.76:8123` (Tailscale also works). They use the
**Advanced SSH & Web Terminal** add-on for shell access. There is **no
auto-deploy**; every release is a manual `wget` from
`raw.githubusercontent.com`.

Per-release flow:

```
cd /config/www
wget -O homecntrd.js https://raw.githubusercontent.com/amosley0221/homecntrd/main/dist/homecntrd.js
# (one-time) also wget the three .onnx files for wake word
nano /config/configuration.yaml      # bump ?v=N on the panel_custom module_url
ha core restart                      # ~30s
```

### Files that must live in `/config/www/`

1. `homecntrd.js`
2. `melspectrogram.onnx`
3. `embedding_model.onnx`
4. `hey_jarvis.onnx`
5. `ort-wasm-simd-threaded.wasm` — onnxruntime-web's WASM runtime
6. `ort-wasm-simd-threaded.mjs` — Emscripten loader for the WASM

Files 2–6 are stable artefacts that don't change between HomeCNTRD
releases. Only re-wget `homecntrd.js` for normal updates. Re-wget the
ORT files only when bumping the `onnxruntime-web` dep.

### `panel_custom` block (in `configuration.yaml`)

```yaml
panel_custom:
  - name: homecntrd-panel
    url_path: homecntrd
    sidebar_title: HomeCNTRD
    sidebar_icon: mdi:home-roof
    module_url: /local/homecntrd.js?v=63
    require_admin: false
    embed_iframe: false
```

The `?v=N` is a cache buster — bump it every release or
iOS/Companion will serve the old bundle.

### Roll-back

Every commit on `main` includes its `dist/*.js` in git history. To
revert:

```
wget -O homecntrd.js https://raw.githubusercontent.com/amosley0221/homecntrd/<sha>/dist/homecntrd.js
```

Pick any SHA from `git log --oneline -- dist/homecntrd.js`.

## Wake word — OpenWakeWord, NOT Porcupine

**Why:** Picovoice (Porcupine) requires a free AccessKey from
`console.picovoice.ai`. Their signup form rejects Gmail / iCloud /
Outlook / etc. as "not a valid company email." Switching path was
faster than getting the user a custom-domain email.

### Architecture

Three ONNX models chained, all from
`github.com/dscripka/openWakeWord` releases v0.5.1:

| Step | Input shape | Output shape | Model |
|---|---|---|---|
| Mel spectrogram | `[1, 1280]` int16-range float32 (one 80 ms chunk) | `[1, 1, 5, 32]` mel frames | `melspectrogram.onnx` |
| Embedding | `[1, 76, 32, 1]` mel window | `[1, 1, 1, 96]` embedding | `embedding_model.onnx` |
| Classifier | `[1, 16, 96]` embeddings | `[1, 1]` wake probability | `hey_jarvis.onnx` |

Per-chunk: push 5 mel frames (scaled `(x/10)+2` per OpenWakeWord
convention) into a 76-frame rolling buffer; once full, run embedding
on the trailing 76 frames; push that one embedding into a 16-deep
buffer; once full, run the classifier; threshold 0.5 with hysteresis
(must drop below 0.3 to re-arm).

### Audio capture

- `getUserMedia({ audio: { channelCount: 1, echoCancellation, ... } })`
- AudioContext at native rate (typically 44.1 / 48 kHz)
- Inline AudioWorklet (blob URL) posts mono float32 batches to main
  thread; main thread does linear resample to 16 kHz
- Critical: AudioWorkletNode `process()` only runs while a downstream
  node consumes its output. We bridge through a `GainNode(0)` into
  `audioCtx.destination` so the graph keeps pumping (silent, no
  feedback). Without this, the worklet sits idle on iOS and no PCM
  ever reaches inference even though the status says "Listening."

### ORT runtime

`onnxruntime-web` ships its WASM either inlined as base64 (default,
~70 MB bundled) or as external files (via the
`onnxruntime-web-use-extern-wasm` export condition). Vite's
`resolve.conditions` in `vite.config.js` picks the external variant.
We import from the `onnxruntime-web/wasm` subpath — this is the slim
build without JSEP/WebGPU support, which we don't need for these
models and which fetches just two runtime files:
`ort-wasm-simd-threaded.wasm` (~13 MB) and `.mjs` (~24 KB).

**WASM is hosted locally at `/local/`, not from a CDN.** First attempt
used JSDelivr; iOS Companion (WKWebView) silently hung on the
cross-origin dynamic import of the WASM loader, leaving the UI on
"Loading runtime model…" forever with no error surfaced. Local hosting
also makes wake word work offline, consistent with the rest of
HomeCNTRD. Both ORT files ship via `static/` like the .onnx models.

If you bump the `onnxruntime-web` dep, re-copy the two
`ort-wasm-simd-threaded.{wasm,mjs}` files from
`node_modules/onnxruntime-web/dist/` into `static/`.

### Lifecycle

- `start()` is gated behind a user gesture on iOS — `getUserMedia`
  refuses without one. The Settings toggle calls `start()`
  synchronously inside its `onChange` handler.
- On page load, `HearthApp` attempts a silent `start()` if
  `localStorage.homecntrd:voice` says enabled. iOS usually permits
  this once the user has previously granted mic permission; if it
  fails, status flips to error and the user re-toggles.
- After a wake detection: `stop()` (release mic), open agent panel,
  TTS "Yes?", `listenOnce()` for one utterance, feed transcript
  through `send()`, then `start()` again to re-arm.

## Settings persistence

Two systems, easy to confuse:

- **Tweaks** (`useTweaks` hook in `tweaks-panel.jsx`) — sends
  `__edit_mode_set_keys` postMessage to the parent window. Persists
  only in the deck-stage editor environment. **In a real HA install
  these are RAM-only and reset on reload.** Don't store anything
  durable here.
- **`localStorage`** — for anything the user expects to survive
  reloads: voice toggle (`homecntrd:voice`), Apple Music token
  (`INFINITY_KEY`), browse hidden flags (`BROWSE_HIDDEN_KEY`), etc.
  Key prefix convention: `homecntrd:<thing>` for new settings.

## iOS / Companion-app quirks

- HA Companion app on iOS uses **WKWebView**, not Safari. Not all
  Safari APIs are present.
- **`SpeechRecognition`** is missing from WKWebView. `voice.js`
  detects this via `isVoiceSupported()` and falls back to a text input
  bubble. Tap-to-talk paths (the chat mic button + the wake-word
  detection handler) go through `listenOnce()`, which throws on iOS
  Companion — callers should handle that gracefully.
- **`getUserMedia` is silently dropped by HA Companion's WKWebView**
  for `panel_custom` content. The promise neither resolves nor
  rejects — it just hangs. Granting Microphone permission to the HA
  Companion app at the iOS level does not fix it; Companion's webview
  delegate doesn't forward the permission request for embedded panels
  (only for HA's first-party Assist UI). Confirmed with a fresh
  reinstall of Companion in May 2026.
  - Detection: `isHACompanionApp()` in `src/lib/voice.js` checks for
    `window.webkit.messageHandlers.externalBus` and a `home assistant`
    user-agent marker.
  - We hide the wake-word toggle in Companion and show a "use Safari +
    Add to Home Screen" notice instead. Don't try to make wake word
    work in Companion — it can't.
  - Safari + Add to Home Screen produces a standalone WebKit window
    that does support `getUserMedia` for HomeCNTRD, with the same
    full-screen feel as Companion.
- **`getUserMedia` in regular Safari** works (iOS 14.3+) but requires
  a user gesture on the *first* call. Subsequent calls in the same
  session are silent.
- **AudioWorklet** works but needs the destination-sink trick above.
- **`SharedArrayBuffer`** isn't available unless the page is served
  with COOP/COEP headers, which HA doesn't set. ORT and similar libs
  must run single-threaded (`ort.env.wasm.numThreads = 1`).

## Bundling discipline

The project deliberately ships a single JS file. `vite.config.js`
sets `inlineDynamicImports: true` and uses lib mode. Things that
break this:

- Default-importing libraries that inline large binary assets as
  base64 (e.g. `onnxruntime-web` bloated the bundle to 70 MB until we
  set the right export condition).
- Asset imports without a configured emit name — Vite gives them
  hashed filenames the user has to manually copy.

When in doubt, prefer external assets via `static/` (gets copied
verbatim into `dist/`) over inlined base64.

## Common things future-Claude will get wrong

1. **Forgetting the `?v=N` cache-bust.** The user *must* bump it; HA
   serves stale bundles otherwise. iOS Companion is especially sticky.
2. **Assuming there's an auto-deploy.** There isn't. Every change
   requires a manual `wget` on the HA box.
3. **Trying to use `SpeechRecognition` directly.** Always go through
   `voice.js`'s `isVoiceSupported()` + `listenOnce()`.
4. **Adding `console.log` for debugging.** The user is debugging on
   an iPad without easy access to the console. Surface diagnostics
   in the UI (status rows, error text) instead.
5. **Suggesting Picovoice / Porcupine.** It's been tried; the signup
   blocks personal email. Don't suggest it again.
6. **Recommending TodoWrite for trivial tasks.** The user doesn't
   need progress tracking on routine edits — only on multi-stage
   work where they'd genuinely benefit from seeing structure.

## Useful environment facts

- **HA box:** HAOS in VirtualBox on a Windows PC, IP `192.168.68.76`,
  Tailscale also reaches it.
- **User's primary device:** iPad running HA Companion app, the
  HomeCNTRD panel set as default.
- **User's dev machine:** MacBook Air. They typically only use the
  Terminal add-on, not local builds.
- **Branch convention:** all work on `main`. The branch name
  `claude/implement-index-html-PekYP` referenced in some session
  contexts is leftover scaffolding — push to `main`.
