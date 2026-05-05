// dnd-grid.jsx — Drag-to-reorder + resize tile grid.
// Pointer events (works on touch and mouse). Auto-flow grid with three tile sizes.
// Each tile occupies a number of columns: S=2, M=3, L=6. The grid is 6 cols at desktop,
// collapses to 4 then 2 on small screens (S=2/M=4/L=4 at narrow widths).
//
// Layout shape:
//   layout: { items: [{ id, size: 'S'|'M'|'L' }, ...] }
// The render function receives (id, size, isEditing, gridPx) and returns a tile.

const TILE_SPAN = { S: 2, M: 3, L: 6 };
const NARROW_TILE_SPAN = { S: 2, M: 4, L: 4 };

const DragGrid = ({ layout, onLayoutChange, render, editing, ctx, narrow }) => {
  const { p, fonts } = ctx;
  const cols = narrow ? 4 : 6;
  const span = narrow ? NARROW_TILE_SPAN : TILE_SPAN;
  const [drag, setDrag] = React.useState(null);
  // drag = { id, from, x, y, dx, dy, w, h, target }
  const ghostRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const items = layout?.items || [];

  // ── Pointer interaction ──
  const onPointerDown = (e, id, idx) => {
    if (!editing) return;
    if (e.target.closest('[data-tile-resize]')) return; // resize handled separately
    e.preventDefault();
    const tileEl = e.currentTarget;
    const rect = tileEl.getBoundingClientRect();
    const cont = containerRef.current.getBoundingClientRect();
    tileEl.setPointerCapture?.(e.pointerId);
    setDrag({
      id, from: idx, pointerId: e.pointerId,
      x: e.clientX - cont.left, y: e.clientY - cont.top,
      offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top,
      w: rect.width, h: rect.height,
      target: idx,
    });
    if (navigator.vibrate) navigator.vibrate(8);
  };

  const onPointerMove = (e) => {
    if (!drag) return;
    const cont = containerRef.current.getBoundingClientRect();
    const x = e.clientX - cont.left;
    const y = e.clientY - cont.top;
    setDrag(d => ({ ...d, x, y }));
    // Find the tile the pointer is over by hit-testing siblings
    const els = containerRef.current.querySelectorAll('[data-tile-id]');
    let target = drag.target;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        const id = el.getAttribute('data-tile-id');
        if (id === drag.id) continue;
        target = items.findIndex(it => it.id === id);
        break;
      }
    }
    if (target !== drag.target) setDrag(d => ({ ...d, target }));
  };
  const onPointerUp = (e) => {
    if (!drag) return;
    if (drag.target !== drag.from) {
      const next = [...items];
      const [moved] = next.splice(drag.from, 1);
      next.splice(drag.target, 0, moved);
      onLayoutChange({ ...layout, items: next });
    }
    setDrag(null);
  };

  // ── Resize cycling ──
  const cycleSize = (id) => {
    const order = ['S', 'M', 'L'];
    const next = items.map(it => it.id === id ? { ...it, size: order[(order.indexOf(it.size) + 1) % 3] } : it);
    onLayoutChange({ ...layout, items: next });
  };

  React.useEffect(() => {
    if (!drag) return;
    const onMove = (e) => onPointerMove(e);
    const onUp = (e) => onPointerUp(e);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [drag]);

  // Compute display order with target slot = drag's hovered position
  let displayOrder = items.map((it, i) => ({ ...it, _i: i }));
  if (drag) {
    const next = [...displayOrder];
    const [moved] = next.splice(drag.from, 1);
    next.splice(drag.target, 0, moved);
    displayOrder = next;
  }

  return (
    <div ref={containerRef} style={{
      position:'relative',
      display:'grid',
      gridTemplateColumns:`repeat(${cols}, 1fr)`,
      gap: 14,
      gridAutoRows: 'minmax(116px, auto)',
      gridAutoFlow: 'dense',
      touchAction: editing ? 'none' : 'auto',
    }}>
      {displayOrder.map(it => {
        const colSpan = Math.min(span[it.size] || 2, cols);
        const isDragging = drag && drag.id === it.id;
        return (
          <div
            key={it.id}
            data-tile-id={it.id}
            onPointerDown={editing ? (e) => onPointerDown(e, it.id, items.findIndex(x => x.id === it.id)) : undefined}
            style={{
              gridColumn: `span ${colSpan}`,
              position:'relative',
              opacity: isDragging ? 0.0 : 1,
              cursor: editing ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: drag ? 'transform .25s cubic-bezier(.2,.7,.4,1)' : 'none',
              outline: editing ? `1.5px dashed ${p.border2}` : 'none',
              outlineOffset: editing ? 4 : 0,
              borderRadius: 14,
            }}
          >
            {render(it.id, it.size, editing)}
            {editing && (
              <>
                <button
                  data-tile-resize
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => cycleSize(it.id)}
                  style={{
                    position:'absolute', top:8, right:8, zIndex:5,
                    width:30, height:30, borderRadius:'50%',
                    border:`.5px solid ${p.border2}`, background:p.surface2, color:p.fg2,
                    cursor:'pointer', display:'grid', placeItems:'center', fontSize:11, fontFamily:fonts.body, fontWeight:500,
                    boxShadow:'0 4px 12px rgba(0,0,0,.18)',
                  }}
                  title={`Size: ${it.size} · click to cycle`}
                >{it.size}</button>
                <div style={{
                  position:'absolute', top:8, left:8, zIndex:5,
                  width:24, height:24, borderRadius:6, background:p.surface2, border:`.5px solid ${p.border2}`,
                  display:'grid', placeItems:'center', color:p.fg3, pointerEvents:'none',
                }}>
                  <window.Icon name="grip" size={11}/>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Floating ghost while dragging */}
      {drag && (
        <div ref={ghostRef} style={{
          position:'absolute', pointerEvents:'none',
          left: drag.x - drag.offsetX, top: drag.y - drag.offsetY,
          width: drag.w, height: drag.h,
          transform: 'rotate(-1deg) scale(1.02)',
          boxShadow:'0 24px 60px rgba(0,0,0,.45)',
          borderRadius: 14, zIndex: 100,
          opacity: 0.95,
        }}>
          {render(drag.id, items.find(x => x.id === drag.id)?.size, true)}
        </div>
      )}
    </div>
  );
};

// Add a `grip` icon to the shared registry (for the editing-mode handle)
// We can patch the icon paths from here:
(() => {
  // Defer to next tick so Icon is defined
  setTimeout(() => {
    if (window.Icon && !window.__gripPatched) {
      window.__gripPatched = true;
      // Wrap original Icon to add 'grip'
      const Original = window.Icon;
      const Patched = (props) => {
        if (props.name === 'grip') {
          return (
            <svg width={props.size||18} height={props.size||18} viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <circle cx="9"  cy="6"  r="1.4"/><circle cx="15" cy="6"  r="1.4"/>
              <circle cx="9"  cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/>
              <circle cx="9"  cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>
            </svg>
          );
        }
        return <Original {...props}/>;
      };
      window.Icon = Patched;
    }
  }, 0);
})();

Object.assign(window, { DragGrid, TILE_SPAN });
