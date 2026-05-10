// Ticker.jsx — scrolling protest text marquee
// Exports: KaaduTicker

function KaaduTicker({ text = "ITS NOT FAIR! ITS NOT FAIR! ITS NOT FAIR! ITS NOT FAIR! ITS NOT FAIR!", bg = "#ACFF64", color = "#AE0000" }) {
  return (
    <div style={{
      background: bg, borderTop: '2px solid #000', borderBottom: '2px solid #000',
      overflow: 'hidden', height: 56, display: 'flex', alignItems: 'center',
    }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-inner { display: flex; gap: 0; animation: ticker 18s linear infinite; white-space: nowrap; will-change: transform; }
      `}</style>
      <div className="ticker-inner">
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{
            fontFamily: "'Fagies', sans-serif", fontWeight: 400,
            fontSize: 28, textTransform: 'uppercase', color,
            padding: '0 24px', lineHeight: '56px', display: 'inline-block',
          }}>{text}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { KaaduTicker });
