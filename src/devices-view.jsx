// devices-view.jsx — entity browser backed by HA's live entity
// registry. Lists every meaningful device HA exposes (lights, media
// players, cameras, climate, covers, locks, switches, fans) and lets
// the user rename them inline. Rename hits HA's
// `config/entity_registry/update` WS API — the same call HA's own
// frontend uses — so a rename here propagates to HA, to HomeCNTRD's
// other views, and to any automation referencing the entity by
// friendly name.
//
// Replaces the previous prototype page, which read from a fixed
// `state.integrations` list the HA bridge never populates (hence the
// stale "0 INTEGRATIONS CONNECTED" header).

import HassContext from './lib/hass-context.js';

function pushDiag(msg) {
  if (typeof window === 'undefined') return;
  if (!window.__hcDiag) window.__hcDiag = [];
  window.__hcDiag.push({ ts: Date.now(), kind: 'info', message: msg });
  while (window.__hcDiag.length > 50) window.__hcDiag.shift();
}

// Domains we surface, in display order. Anything outside this list
// (sensor, binary_sensor, person, automation, zone, …) is hidden —
// they're either noise or already managed elsewhere in the app.
const DOMAIN_META = {
  light:        { label: 'Lights',      icon: 'bulb' },
  media_player: { label: 'Media players', icon: 'speaker' },
  camera:       { label: 'Cameras',     icon: 'cam' },
  climate:      { label: 'Thermostats', icon: 'therm' },
  cover:        { label: 'Covers',      icon: 'garage' },
  lock:         { label: 'Locks',       icon: 'lock' },
  switch:       { label: 'Switches',    icon: 'plug' },
  fan:          { label: 'Fans',        icon: 'fan' },
};
const DOMAIN_ORDER = ['light', 'media_player', 'camera', 'climate', 'cover', 'lock', 'switch', 'fan'];

const stateText = (st) => {
  const s = (st?.state || '').toString();
  if (!s || s === 'unknown') return '—';
  return s;
};

const DevicesView = ({ ctx }) => {
  const { p, fonts, dens } = ctx;
  const hass = React.useContext(HassContext);
  const [filter, setFilter] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(() => new Set());
  // Optimistic per-entity rename overrides — let the new name show
  // immediately while HA processes the registry update. Cleared once
  // HA's pushed value matches.
  const [pendingNames, setPendingNames] = React.useState({});

  const toggle = (d) => setCollapsed(prev => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    return n;
  });

  const groups = React.useMemo(() => {
    const out = {};
    for (const d of DOMAIN_ORDER) out[d] = [];
    if (!hass?.states) return out;
    const q = filter.trim().toLowerCase();
    for (const [entityId, st] of Object.entries(hass.states)) {
      const dot = entityId.indexOf('.');
      const domain = entityId.slice(0, dot);
      if (!out[domain]) continue;
      const reg = hass.entities?.[entityId];
      const haName = reg?.name || st.attributes?.friendly_name || entityId;
      const name = pendingNames[entityId] !== undefined
        ? (pendingNames[entityId] || st.attributes?.friendly_name || entityId)
        : haName;
      if (q) {
        const matched = name.toLowerCase().includes(q) || entityId.toLowerCase().includes(q);
        if (!matched) continue;
      }
      out[domain].push({
        entityId, name,
        haName,
        originalName: reg?.original_name || st.attributes?.friendly_name || entityId,
        unavailable: st.state === 'unavailable',
        stateText: stateText(st),
        platform: reg?.platform || null,
      });
    }
    for (const d in out) out[d].sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [hass?.states, hass?.entities, filter, pendingNames]);

  // Drop a pending override once HA's pushed name matches it.
  React.useEffect(() => {
    if (!Object.keys(pendingNames).length) return;
    const stale = [];
    for (const [eid, pending] of Object.entries(pendingNames)) {
      const reg = hass?.entities?.[eid];
      const live = reg?.name || hass?.states?.[eid]?.attributes?.friendly_name || '';
      if (live === (pending || '')) stale.push(eid);
    }
    if (stale.length) {
      setPendingNames(prev => {
        const n = { ...prev };
        for (const e of stale) delete n[e];
        return n;
      });
    }
  }, [hass?.entities, hass?.states, pendingNames]);

  const totalCount = DOMAIN_ORDER.reduce((sum, d) => sum + (groups[d]?.length || 0), 0);
  const onlineCount = DOMAIN_ORDER.reduce(
    (sum, d) => sum + (groups[d]?.filter(e => !e.unavailable).length || 0), 0);

  const renameEntity = React.useCallback(async (entityId, newName) => {
    if (!hass?.callWS) return;
    const trimmed = (newName || '').trim();
    setPendingNames(prev => ({ ...prev, [entityId]: trimmed }));
    try {
      await hass.callWS({
        type: 'config/entity_registry/update',
        entity_id: entityId,
        name: trimmed || null,
      });
    } catch (e) {
      pushDiag(`devices: rename ${entityId} failed — ${e?.message || e}`);
      setPendingNames(prev => { const n = { ...prev }; delete n[entityId]; return n; });
    }
  }, [hass]);

  return (
    <>
      <window.PageHead ctx={ctx}
        eyebrow="Devices"
        title="All devices"
        sub={`${totalCount} entities · ${onlineCount} online`}
        right={null}
      />
      <div style={{display:'flex', gap:10, alignItems:'center', marginBottom: dens.gap}}>
        <div style={{position:'relative', flex:1, maxWidth: 460}}>
          <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:p.fg3, display:'flex'}}>
            <window.Icon name="search" size={14}/>
          </span>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name or entity id…"
            style={{
              width:'100%', padding:'10px 14px 10px 36px', borderRadius:9,
              border:`.5px solid ${p.border2}`, background:p.surface2, color:p.fg,
              fontFamily:fonts.body, fontSize:13, outline:'none',
              boxSizing:'border-box',
            }}/>
        </div>
      </div>

      {totalCount === 0 && (
        <div style={{
          padding:'40px 20px', textAlign:'center', color:p.fg3,
          border:`.5px dashed ${p.border2}`, borderRadius:12, background:p.surface,
        }}>
          {filter ? 'No matches.' : 'No devices yet — wire up integrations in HA → Settings → Devices & Services.'}
        </div>
      )}

      <div style={{display:'flex', flexDirection:'column', gap:dens.gap}}>
        {DOMAIN_ORDER.map(domain => {
          const list = groups[domain] || [];
          if (!list.length) return null;
          const meta = DOMAIN_META[domain];
          const open = !collapsed.has(domain);
          return (
            <section key={domain} style={{
              borderRadius:12, border:`.5px solid ${p.border}`, background:p.surface2, overflow:'hidden',
            }}>
              <button onClick={() => toggle(domain)} style={{
                width:'100%', padding:'14px 16px', border:0, background:'transparent',
                cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:10,
                color:p.fg, fontFamily:fonts.body,
              }}>
                <window.Icon name={meta.icon} size={14} style={{color:p.fg2}}/>
                <span style={{fontFamily:fonts.display, fontSize:15, fontWeight:500}}>{meta.label}</span>
                <span style={{fontSize:11, color:p.fg3, fontVariantNumeric:'tabular-nums'}}>{list.length}</span>
                <span style={{flex:1}}/>
                <span style={{fontSize:11, color:p.fg3, transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition:'transform 120ms ease', display:'inline-block'}}>▾</span>
              </button>
              {open && (
                <div style={{borderTop:`.5px solid ${p.border}`}}>
                  {list.map((e, i) => (
                    <DeviceRow
                      key={e.entityId}
                      entity={e}
                      ctx={ctx}
                      onRename={renameEntity}
                      isLast={i === list.length - 1}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <div style={{height:60}}/>
    </>
  );
};

const DeviceRow = ({ entity, ctx, onRename, isLast }) => {
  const { p, fonts } = ctx;
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(entity.name);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editing) {
      setDraft(entity.name);
      // Focus + select on the next frame so the input is mounted.
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select?.();
      }, 0);
    }
  }, [editing]);

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === entity.name) { setEditing(false); return; }
    onRename(entity.entityId, trimmed);
    setEditing(false);
  };
  const resetToOriginal = () => {
    if (entity.haName === entity.originalName) return;
    onRename(entity.entityId, '');  // empty → clears the registry override
  };

  return (
    <div style={{
      padding:'10px 16px', display:'flex', alignItems:'center', gap:12,
      borderBottom: isLast ? 0 : `.5px solid ${p.border}`,
      color:p.fg, minHeight: 56,
    }}>
      <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:2}}>
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') { setEditing(false); setDraft(entity.name); }
            }}
            style={{
              padding:'4px 8px', borderRadius:6,
              border:`.5px solid ${p.accent}`,
              background:p.surface, color:p.fg,
              fontFamily:fonts.body, fontSize:13.5,
              outline:'none', width:'100%', boxSizing:'border-box',
            }}/>
        ) : (
          <div
            onClick={() => setEditing(true)}
            title="Tap to rename"
            style={{
              fontSize:13.5,
              color: entity.unavailable ? p.fg3 : p.fg,
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
              cursor:'text',
            }}>
            {entity.name}
          </div>
        )}
        <div style={{
          fontSize:11, color:p.fg3,
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
          fontFamily:'ui-monospace, "JetBrains Mono", monospace',
        }}>
          {entity.entityId}
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8, flex:'none'}}>
        <span style={{
          fontSize:10, color: entity.unavailable ? p.danger : p.fg3,
          textTransform:'uppercase', letterSpacing:'.06em', fontWeight:500,
        }}>
          {entity.unavailable ? 'offline' : entity.stateText}
        </span>
        {entity.haName !== entity.originalName && !editing && (
          <button
            onClick={resetToOriginal}
            title={`Reset to "${entity.originalName}"`}
            style={{
              padding:'4px 8px', borderRadius:6, border:`.5px solid ${p.border2}`,
              background:'transparent', color:p.fg3, cursor:'pointer',
              fontFamily:fonts.body, fontSize:10,
            }}>
            Reset
          </button>
        )}
        <button
          onClick={() => setEditing(v => !v)}
          title={editing ? 'Cancel' : 'Rename'}
          style={{
            padding:6, borderRadius:6, border:`.5px solid ${p.border2}`,
            background:'transparent', color:p.fg2, cursor:'pointer',
            display:'inline-flex', alignItems:'center',
          }}>
          <window.Icon name={editing ? 'x' : 'edit'} size={12}/>
        </button>
      </div>
    </div>
  );
};

window.DevicesView = DevicesView;
