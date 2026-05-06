// app.jsx — Mounts the Hearth prototype with auth + shared Tweaks.

import { setupHAClient, teardownHAClient, getHAClient } from './lib/ha.js';

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
  "showTv": true
}/*EDITMODE-END*/;

function useNarrow() {
  const [narrow, setNarrow] = React.useState(() => window.innerWidth < 760);
  React.useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 760);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return narrow;
}

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const auth = window.useAuth();
  const narrow = useNarrow();
  const haConn = window.useHomeAssistantConnect(auth.user, auth.patchUser);

  // (Re)initialize the HA WebSocket client whenever the user has a URL+token.
  React.useEffect(() => {
    if (auth.user?.ha_url && auth.user?.ha_token) {
      setupHAClient({ url: auth.user.ha_url, token: auth.user.ha_token });
    } else {
      teardownHAClient();
    }
    return () => { /* keep the singleton on unmount; teardown happens on logout/reconnect */ };
  }, [auth.user?.ha_url, auth.user?.ha_token]);

  const visibleDevices = {
    lights: t.showLights, music: t.showMusic, cameras: t.showCameras,
    climate: t.showClimate, locks: t.showLocks, scenes: t.showScenes,
    calendar: t.showCalendar, weather: t.showWeather, alarms: t.showAlarms, tv: t.showTv,
  };

  // Hydration splash — avoids a flash of <AuthScreen/> when a cached
  // Supabase session is being resolved.
  if (auth.loading) {
    return (
      <div style={{
        width:'100vw', height:'100vh', display:'grid', placeItems:'center',
        background:'#161310', color:'#e87f4a',
        fontFamily:'"Newsreader","Iowan Old Style",Georgia,serif',
        fontStyle:'italic', fontSize:28, letterSpacing:'.01em',
      }}>HomeCNTRD</div>
    );
  }

  // Auth gate
  if (!auth.user) {
    return (
      <div style={{ width:'100vw', height:'100vh' }}>
        <window.AuthScreen
          onSignup={auth.doSignup} onLogin={auth.doLogin}
          busy={auth.busy} err={auth.err} setErr={auth.setErr}
        />
      </div>
    );
  }

  // HA connection gate — every user must connect their Home Assistant
  // before the app can render anything meaningful.
  if (!auth.user.ha_url || !auth.user.ha_token) {
    return (
      <div style={{ width:'100vw', height:'100vh' }}>
        <window.ConnectHomeAssistant
          defaultUrl={auth.user.ha_url} defaultToken={auth.user.ha_token}
          busy={haConn.busy} err={haConn.err} setErr={haConn.setErr}
          onConnect={haConn.onConnect}
        />
      </div>
    );
  }

  return (
    <>
      <div style={{ width:'100vw', height:'100vh' }}>
        <window.HearthApp
          dark={t.dark} density={t.density} accent={t.hearthAccent}
          agentTone={t.agentTone} fontPair={t.fontPair}
          bgImage={t.bgImage} visibleDevices={visibleDevices}
          settings={t} setSetting={setTweak}
          user={auth.user} patchUser={auth.patchUser} doLogout={auth.doLogout}
          narrow={narrow}
        />
      </div>

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

        <window.TweakSection label="Home Assistant" />
        <window.TweakButton onClick={() => auth.patchUser(u => ({ ...u, ha_url: null, ha_token: null }))}>
          Reconnect Home Assistant
        </window.TweakButton>

        <window.TweakSection label="Account" />
        <window.TweakButton onClick={auth.doLogout}>Sign out · {auth.user.email}</window.TweakButton>
      </window.TweaksPanel>
    </>
  );
}

const HEARTH_MAP = { tangerine:'#e87f4a', terracotta:'#c96442', ochre:'#b8843e', sage:'#7a8c6c', plum:'#7d4f6b', slate:'#5b7390' };
function hearthSwatch(name) { return HEARTH_MAP[name] || HEARTH_MAP.tangerine; }
function hearthFromSwatch(hex) { return Object.entries(HEARTH_MAP).find(([,v]) => v === hex)?.[0] || 'tangerine'; }

// Mount happens in main.jsx (after window.React / window.ReactDOM are set).
window.App = App;
