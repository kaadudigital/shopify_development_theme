// ProductSection.jsx — product grid / shop section
// Exports: KaaduProductSection

const PRODUCTS = [
  { name: 'Mango Snack', price: 'CHF 7.90', badge: 'Bestseller', bg: '#FFC5FF', sticker: '../../assets/stickers/mango-sticker.png' },
  { name: 'Banana Chips', price: 'CHF 6.90', badge: 'Neu', bg: '#ACFF64', sticker: '../../assets/stickers/banana-sticker.png' },
  { name: 'Mix-Paket', price: 'CHF 19.90', badge: 'Spar-Set', bg: '#B7D9FF', sticker: '../../assets/stickers/radically-fair-sticker.png' },
];

function KaaduProductSection() {
  return (
    <section id="shop" style={{ background: '#FFFFF5', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Fagies', sans-serif", fontWeight: 400, fontSize: 64,
          lineHeight: '80px', textTransform: 'uppercase', color: '#AE0000',
          textAlign: 'center', marginBottom: 16,
        }}>The Snacks That Change Lives</h2>
        <p style={{
          fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif", fontSize: 18,
          lineHeight: '28px', color: '#000', textAlign: 'center', marginBottom: 56,
        }}>
          Ohne Stress, ohne Masse – dafür mit 100 % Fokus auf Qualität.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {PRODUCTS.map(p => (
            <div key={p.name} style={{
              border: '2px solid #000', borderRadius: 12,
              overflow: 'hidden', boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
              cursor: 'pointer', transition: 'transform 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Product image area */}
              <div style={{
                background: p.bg, height: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <img src={p.sticker} style={{ height: 140, objectFit: 'contain' }} alt={p.name} />
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: '#AE0000', color: '#FFFFF5', border: '2px solid #000',
                  borderRadius: 30, padding: '4px 12px',
                  fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 12, textTransform: 'uppercase',
                }}>{p.badge}</div>
              </div>

              {/* Product info */}
              <div style={{ padding: '16px 20px', background: '#FFFFF5' }}>
                <div style={{
                  fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 16, textTransform: 'uppercase', marginBottom: 4,
                }}>{p.name}</div>
                <div style={{
                  fontFamily: "'Fagies', sans-serif", fontSize: 24, color: '#AE0000', marginBottom: 12,
                }}>{p.price}</div>
                <button style={{
                  width: '100%', background: '#FFFFF5', color: '#000',
                  border: '2px solid #000', borderRadius: 30, padding: '10px 0',
                  fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 14, textTransform: 'uppercase',
                  cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background='#AE0000'; e.currentTarget.style.color='#FFFFF5'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#FFFFF5'; e.currentTarget.style.color='#000'; }}
                >In den Warenkorb</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { KaaduProductSection });
