// main.jsx — Vite entry. Exposes React/ReactDOM as window globals so the
// existing prototype modules (which assume React is global, the way the
// original index.html loaded it via UMD) work without rewriting their
// internals. Each module is imported for side-effects in the same order
// the original index.html loaded its <script> tags; each registers its
// components onto window. Then we mount <App/> ourselves.

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

// Side-effect imports register components on window. Module bodies don't
// reference React directly — only the functions inside them do — so it's
// safe that window.React isn't set until after these imports resolve.
import './tweaks-panel.jsx';
import './shared.jsx';
import './auth.jsx';
import './dnd-grid.jsx';
import './hearth.jsx';
import './home-view.jsx';
import './music-view.jsx';
import './cameras-view.jsx';
import './calendar-view.jsx';
import './car-view.jsx';
import './garage-view.jsx';
import './devices-view.jsx';
import './automations-view.jsx';
import './settings-view.jsx';
import './tvs-section.jsx';
import './now-playing-bar.jsx';
import './app.jsx';

// Now that all modules have evaluated and registered onto window, install
// React globals and mount.
window.React = React;
window.ReactDOM = { ...ReactDOMClient };

ReactDOMClient
  .createRoot(document.getElementById('root'))
  .render(React.createElement(window.App));
