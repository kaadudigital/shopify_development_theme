// Footer.jsx — Kaadu website footer
// Exports: KaaduFooter

function KaaduFooter() {
  return (
    <footer style={{ background: '#000', color: '#FFFFF5', padding: '48px 32px 32px', borderTop: '2px solid #AE0000' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="../../assets/logo/Kaadu_favicon_purple.svg" style={{ height: 36, filter: 'brightness(10)' }} alt="Kaadu" />
              <span style={{ fontFamily: "'Fagies', sans-serif", fontSize: 24, textTransform: 'uppercase', color: '#AE0000' }}>Kaadu</span>
            </div>
            <p style={{ fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif", fontSize: 14, lineHeight: '22px', color: '#FFFFF5', opacity: 0.7, maxWidth: 260 }}>
              Gefriergetrocknete Früchte — fair produziert, radikal transparent.
            </p>
          </div>

          {/* Links */}
          {[
            { title: 'Shop', links: ['Alle Produkte', 'Mango', 'Banana', 'Mix-Pakete'] },
            { title: 'Über uns', links: ['Mission', 'Impact', 'Team', 'Blog'] },
            { title: 'Info', links: ['Versand', 'Rückgabe', 'FAQ', 'Kontakt'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFF5', marginBottom: 14 }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: 'block', fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif", fontSize: 14, color: '#FFFFF5', opacity: 0.65, textDecoration: 'none', marginBottom: 8 }}
                  onMouseEnter={e => e.target.style.opacity = 1}
                  onMouseLeave={e => e.target.style.opacity = 0.65}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif", fontSize: 12, color: '#FFFFF5', opacity: 0.5 }}>© 2025 Kaadu. Justice never tasted so sweet.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Instagram', 'TikTok', 'LinkedIn'].map(s => (
              <a key={s} href="#" style={{ fontFamily: "'Banter Grotesk', 'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: '#FFFFF5', opacity: 0.6, textDecoration: 'none', letterSpacing: '0.05em' }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.6}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { KaaduFooter });
