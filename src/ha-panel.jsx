// ha-panel.jsx — Home Assistant custom panel entry.

// Browser polyfill: some npm packages reference `process` even when they
// claim to be browser-safe. Vite's `define` config replaces literal
// `process.env.NODE_ENV` references at build time, but bare `process` reads
// will still throw. This guarantees a benign object exists.
if (typeof globalThis !== 'undefined' && typeof globalThis.process === 'undefined') {
  globalThis.process = { env: { NODE_ENV: 'production' } };
}

//
// Home Assistant loads this file as an ES module and instantiates the
// <homecntrd-panel> custom element wherever the user navigates to the panel.
// HA passes us four properties on every state change:
//
//   hass    — the live Home Assistant connection (states, callService, user, …)
//   narrow  — boolean, true when HA's frontend is in mobile layout
//   panel   — the panel config from configuration.yaml
//   route   — the current sub-route within our panel
//
// We mount the existing React app inside the element and re-render whenever
// hass updates. No auth, no Supabase, no token entry — HA already authed the
// user and gave us a connection.

import React from 'react';
import { createRoot } from 'react-dom/client';

// Import every prototype module for side-effects (each registers components
// onto window). Order matches the original index.html script tag order.
import './tweaks-panel.jsx';
import './shared.jsx';
import './lib/ha-bridge.js';
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

// Make React available globally for prototype modules that reference
// `React.useState` etc. as a bare identifier (the modules originally ran
// with React loaded via UMD <script>). Vite dedupes — this is the same
// React instance.
window.React = React;

// Single shared context so anything in the React tree can read hass without
// prop-drilling through the HearthApp tree.
export const HassContext = React.createContext(null);
window.HassContext = HassContext;

class HomeCNTRDPanel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._narrow = false;
    this._panel = null;
    this._route = null;
    this._mount = null;
    this._root = null;
  }

  // HA writes these as JS properties (not attributes), so use setters.
  set hass(value)   { this._hass = value;   this._render(); }
  set narrow(value) { this._narrow = !!value; this._render(); }
  set panel(value)  { this._panel = value;  this._render(); }
  set route(value)  { this._route = value;  /* not used yet */ }

  connectedCallback() {
    if (this._mount) return;
    // Custom elements default to display:inline with no intrinsic size.
    // Force the host to fill the panel area HA gives us, otherwise the
    // React tree (which uses height:100%) renders into a 0-pixel box.
    this.style.cssText = [
      'display:block',
      'position:absolute',
      'inset:0',
      'width:100%',
      'height:100%',
      'overflow:hidden',
      'background:#161310',
    ].join(';');

    this._mount = document.createElement('div');
    this._mount.style.cssText = 'width:100%;height:100%;display:block;background:#161310';
    this.appendChild(this._mount);

    // Visible fallback so the user sees *something* while React mounts.
    // Replaced by the React tree on first _render().
    this._mount.innerHTML = '<div style="width:100%;height:100%;display:grid;place-items:center;color:#e87f4a;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:28px;letter-spacing:.01em;">HomeCNTRD</div>';

    this._root = createRoot(this._mount);
    this._render();
  }

  disconnectedCallback() {
    if (this._root) { this._root.unmount(); this._root = null; }
    if (this._mount && this._mount.parentNode) this._mount.parentNode.removeChild(this._mount);
    this._mount = null;
  }

  _render() {
    if (!this._root) return;
    const App = window.App;
    if (!App) return; // app.jsx hasn't registered yet (shouldn't happen given import order)
    this._root.render(
      React.createElement(
        HassContext.Provider,
        { value: this._hass },
        React.createElement(App, {
          hass: this._hass,
          narrow: this._narrow,
          panel: this._panel,
        })
      )
    );
  }
}

if (!customElements.get('homecntrd-panel')) {
  customElements.define('homecntrd-panel', HomeCNTRDPanel);
}
