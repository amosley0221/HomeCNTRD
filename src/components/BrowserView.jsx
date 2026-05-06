// BrowserView.jsx — Full-screen iframe view rendered on top of the home grid.
// Used for embedded videos (Twitch / YouTube / Vimeo) and arbitrary URLs.
// A small back button in the top-left exits the view; the AI dot stays
// visible on top so the user can say "go back" or "close" hands-free.

import React from 'react';

export default function BrowserView({ url, label, onClose }) {
  if (!url) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: '#000',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 44, flex: 'none',
        display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px',
        background: 'rgba(20,18,15,.92)',
        borderBottom: '.5px solid rgba(241,234,217,.1)',
        backdropFilter: 'blur(12px)',
        color: '#f1ead9',
        fontFamily: '"Inter", system-ui, sans-serif',
      }}>
        <button onClick={onClose} style={{
          padding: '6px 10px', borderRadius: 8,
          background: 'rgba(241,234,217,.06)', border: '.5px solid rgba(241,234,217,.14)',
          color: '#f1ead9', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6"/>
          </svg>
          Back
        </button>
        <div style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {label || 'Browser'}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{
          padding: '6px 10px', borderRadius: 8,
          background: 'transparent', border: '.5px solid rgba(241,234,217,.14)',
          color: '#f1ead9', fontSize: 11.5, textDecoration: 'none', fontFamily: 'inherit',
        }}>Open in new tab</a>
      </div>

      <iframe
        key={url}
        src={url}
        title={label || 'Browser'}
        style={{ flex: 1, width: '100%', border: 0, background: '#000' }}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
