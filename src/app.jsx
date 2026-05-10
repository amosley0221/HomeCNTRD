// app.jsx — Mounts the Hearth UI inside the Home Assistant custom panel.
// All auth, profile sync, and onboarding are handled by HA itself, so the
// component tree is simple: render the existing HearthApp with whatever
// settings the user has tweaked, plus a tiny ErrorBoundary so a crash
// inside a view shows on-screen instead of going white.

import React from 'react';
import BrowserView from './components/BrowserView.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "density": "regular",
  "hearthAccent": "tangerine",
  "agentTone": "jarvis",
  "fontPair": "editorial",
  "bgImage": "",
  "showLights": true,
  "showMusic": true,
  "showCameras": true,
  "showClimate": true,
  "showLocks": true,
  "showScenes": true,
  "showCalendar": true,
  "showWeather": true,
  "showAlarms": true,
  "showTv": true,
  "ttsAgent": true,
  "dashboardLight": false
}/*EDITMODE-END*/;

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('[boundary]', error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          width:'100%', height:'100%', display:'grid', placeItems:'center',
          background:'#161310', color:'#f1ead9',
          fontFamily:'"Inter", system-ui, sans-serif',
          padding:24, textAlign:'left', overflow:'auto',
        }}>
          <div style={{maxWidth:520, width:'100%'}}>
            <div style={{
              fontFamily:'"Newsreader", Georgia, serif', fontStyle:'italic',
              fontSize:28, color:'#e87f4a', marginBottom:16, textAlign:'center',
            }}>HomeCNTRD</div>
            <div style={{
              padding:16, fontSize:13, color:'#ec8b78',
              background:'rgba(217,100,80,.08)', border:'.5px solid rgba(217,100,80,.4)',
              borderRadius:8, lineHeight:1.5, whiteSpace:'pre-wrap', wordBreak:'break-word',
            }}>
              <div style={{fontWeight:600, marginBottom:8, color:'#f1ead9'}}>Render error</div>
              {String(this.state.error?.message || this.state.error)}
              {this.state.error?.stack && (
                <details style={{marginTop:12, fontSize:11, color:'rgba(241,234,217,0.6)'}}>
                  <summary style={{cursor:'pointer'}}>Stack</summary>
                  <pre style={{fontSize:10, overflowX:'auto', marginTop:6}}>{this.state.error.stack}</pre>
                </details>
              )}
            </div>
            <button onClick={() => this.setState({ error: null })} style={{
              marginTop:16, padding:'10px 16px', borderRadius:8, border:0,
              background:'#e87f4a', color:'#fff', fontSize:13, cursor:'pointer',
              fontFamily:'inherit',
            }}>Try again</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App({ hass, narrow, panel }) {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [browser, setBrowser] = React.useState(null); // { url, label } | null

  // Surface the user's HA display name into the same `user` prop the
  // existing views expect. No Supabase identity; HA owns the user.
  const user = React.useMemo(() => {
    const haUser = hass?.user || {};
    return {
      firstName: (haUser.name || '').split(' ')[0] || 'there',
      email: haUser.name || '',
      plan: 'home-assistant',
      layout: null,
      integrations: null,
      members: [],
      sessions: [],
      privacy: {
        cameraIndoorRecording: false, shareWithApple: false,
        shareWithGoogle: false, analytics: false, voiceTraining: false,
      },
      // Pulled from HA's own config so the sidebar wordmark reads the
      // user's actual location instead of the prototype's "Willowbrook".
      location: hass?.config?.location_name || 'Home',
      createdAt: '',
    };
  }, [hass?.user, hass?.config?.location_name]);

  // User-state patches (per-room section toggles via roomSections,
  // per-room device blacklists via roomDeviceHidden, etc.) live in
  // localStorage as a fast cold-load mirror AND in HA's
  // frontend/{get,set}_user_data store so they survive iOS Companion
  // dropping site data between deploys (which the user reports does
  // happen) and follow the user across any device they sign into HA on.
  //
  // Order:
  //   1. Init from localStorage (instant render).
  //   2. Once hass is ready, fetch HA's saved value; if present, it
  //      overrides the localStorage mirror.
  //   3. Every patch writes to localStorage immediately + debounces
  //      600 ms then syncs to HA.
  const USER_PATCHES_KEY = 'homecntrd:user-patches';
  const USER_PATCHES_HA_KEY = 'homecntrd_user_patches';
  const [localPatches, setLocalPatches] = React.useState(() => {
    try {
      const raw = localStorage.getItem(USER_PATCHES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {}
    return {};
  });
  const haLoaded = React.useRef(false);
  const patchTimer = React.useRef(null);
  const hassRef = React.useRef(hass);
  hassRef.current = hass;
  const hassReady = Boolean(hass && typeof hass.callWS === 'function');
  React.useEffect(() => {
    if (haLoaded.current || !hassReady) return;
    let alive = true;
    hass.callWS({ type: 'frontend/get_user_data', key: USER_PATCHES_HA_KEY })
      .then((res) => {
        if (!alive) return;
        haLoaded.current = true;
        const fromHa = res?.value && typeof res.value === 'object' ? res.value : null;
        if (fromHa && Object.keys(fromHa).length > 0) {
          setLocalPatches(fromHa);
          try { localStorage.setItem(USER_PATCHES_KEY, JSON.stringify(fromHa)); } catch {}
        }
      })
      .catch(() => { haLoaded.current = true; });
    return () => { alive = false; };
  }, [hassReady]);

  const patchUser = React.useCallback((patch) => {
    setLocalPatches(prev => {
      const base = { ...user, ...prev };
      const merged = typeof patch === 'function'
        ? patch(base)
        : { ...prev, ...patch };
      // Strip the read-only fields from `user` that the patch function
      // pulls in via `...u` spread — we only want to persist the
      // genuinely-edited keys, otherwise we'd snapshot a stale firstName
      // / email / location and ignore future hass updates.
      const { firstName, email, plan, location, createdAt, ...editable } = merged;
      try { localStorage.setItem(USER_PATCHES_KEY, JSON.stringify(editable)); } catch {}
      // Debounce the HA-side write so a flurry of toggles doesn't fire
      // a set_user_data per click. Read hass through the ref so we
      // always use the latest connection without re-binding setTweak.
      clearTimeout(patchTimer.current);
      patchTimer.current = setTimeout(() => {
        const h = hassRef.current;
        if (typeof h?.callWS !== 'function') return;
        h.callWS({ type: 'frontend/set_user_data', key: USER_PATCHES_HA_KEY, value: editable })
          .catch((err) => console.warn('[user-patches] HA sync failed', err?.message || err));
      }, 600);
      return editable;
    });
  }, [user]);
  const userMerged = { ...user, ...localPatches };

  const visibleDevices = {
    lights: t.showLights, music: t.showMusic, cameras: t.showCameras,
    climate: t.showClimate, locks: t.showLocks, scenes: t.showScenes,
    calendar: t.showCalendar, weather: t.showWeather, alarms: t.showAlarms, tv: t.showTv,
  };

  const doLogout = () => {
    // Inside HA's frontend we don't run our own auth. The "logout" affordance
    // jumps to HA's logout flow.
    if (typeof window !== 'undefined') window.location.assign('/?auth_callback=1');
  };

  return (
    <ErrorBoundary>
      <div style={{ width:'100%', height:'100%' }}>
        <window.HearthApp
          dark={t.dark} density={t.density} accent={t.hearthAccent}
          agentTone={t.agentTone} fontPair={t.fontPair}
          bgImage={t.bgImage} visibleDevices={visibleDevices}
          settings={t} setSetting={setTweak}
          user={userMerged} patchUser={patchUser} doLogout={doLogout}
          narrow={!!narrow}
          openBrowser={(url, label) => setBrowser({ url, label })}
        />
      </div>

      {/* Embedded browser overlay — opened from a chat command like
          "open Esfand on Twitch" / "watch X on YouTube". The chat
          itself lives inside HearthApp via <AgentBubble/>. */}
      <BrowserView
        url={browser?.url}
        label={browser?.label}
        onClose={() => setBrowser(null)}
      />

      <window.TweaksPanel>
        <window.TweakSection label="Mode" />
        <window.TweakToggle label="Dark mode" value={t.dark} onChange={v => setTweak('dark', v)} />
        <window.TweakRadio  label="Density" value={t.density}
          options={['compact','regular','comfy']}
          onChange={v => setTweak('density', v)} />

        <window.TweakSection label="Theme" />
        <window.TweakColor label="Accent" value={hearthSwatch(t.hearthAccent)}
          options={['#e87f4a','#c96442','#b8843e','#7a8c6c','#7d4f6b','#5b7390']}
          onChange={hex => setTweak('hearthAccent', hearthFromSwatch(hex))} />
        <window.TweakSelect label="Typography" value={t.fontPair}
          options={[
            { value:'editorial', label:'Editorial · Newsreader' },
            { value:'classic',   label:'Classic · Instrument'   },
            { value:'modern',    label:'Modern · Space Grotesk' },
          ]}
          onChange={v => setTweak('fontPair', v)} />

        <window.TweakSection label="Agent" />
        <window.TweakSelect label="Personality" value={t.agentTone}
          options={[
            { value:'jarvis',  label:'Jarvis-y (warm)'    },
            { value:'terse',   label:'Terse (terminal)'   },
            { value:'playful', label:'Playful (Pip)'      },
          ]}
          onChange={v => setTweak('agentTone', v)} />
        <window.TweakToggle label="Speak responses" value={t.ttsAgent !== false}
          onChange={v => setTweak('ttsAgent', v)} />

        <window.TweakSection label="Home Assistant" />
        <window.TweakButton onClick={() => window.location.assign('/config/integrations')}>
          Manage devices in Home Assistant
        </window.TweakButton>

        <window.TweakSection label="Account" />
        <window.TweakButton onClick={doLogout}>Sign out · {userMerged.email || 'HA user'}</window.TweakButton>
      </window.TweaksPanel>
    </ErrorBoundary>
  );
}

const HEARTH_MAP = { tangerine:'#e87f4a', terracotta:'#c96442', ochre:'#b8843e', sage:'#7a8c6c', plum:'#7d4f6b', slate:'#5b7390' };
function hearthSwatch(name) { return HEARTH_MAP[name] || HEARTH_MAP.tangerine; }
function hearthFromSwatch(hex) { return Object.entries(HEARTH_MAP).find(([,v]) => v === hex)?.[0] || 'tangerine'; }

window.App = App;
