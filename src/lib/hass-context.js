// hass-context.js — single source of truth for the React Context that
// carries Home Assistant's `hass` connection through the tree.
//
// MUST live in its own module. Previously it was created independently in
// both ha-panel.jsx (Provider) and ha-bridge.js (consumer) — those were
// two distinct Context objects, so Provider/consumer never connected and
// every service call silently fell through ("hass not available — skipping
// dispatch" in the console). Sharing the import means both halves of the
// app reference the *same* Context instance.

import React from 'react';

const HassContext = React.createContext(null);

export default HassContext;
