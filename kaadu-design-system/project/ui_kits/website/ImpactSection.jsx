// ImpactSection.jsx — Fairness / farmer impact sections
// Exports: KaaduImpactSection, KaaduFarmerSection, KaaduWomenSection

function KaaduImpactSection() {
  return (
    <section id="impact" style={{ background: '#B7D9FF', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Fagies', sans-serif", fontWeight: 400, fontSize: 64,
          lineHeight: '80px', textTransform: 'uppercase', color: '#542A76',
          textAlign: 'center', marginBottom: 16,
        }}>Fairness für Kleinbauern</h2>
        <p style={{
          fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 20,
          textTransform: 'uppercase', color: '#542A76', textAlign: 'center', marginBottom: 48,
        }}>Marktpreise schwanken, unsere nicht</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Banter Grotesk', sans-serif", fontSize: 18, lineHeight: '28px', color: '#542A76', marginBottom: 32 }}>
              Kaadu zahlt Kleinbauern stabile, transparente Preise – deutlich über dem Markt. So schaffen wir Planungssicherheit und schützen sie vor Preisschwankungen.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { val: '30–40%', label: 'über Marktpreis' },
                { val: '100%', label: 'Höhere Löhne' },
                { val: '100%', label: 'Ownership Ziel' },
              ].map(stat => (
                <div key={stat.val} style={{
                  background: '#FFFFF5', border: '2px solid #000', borderRadius: 12,
                  padding: '16px 20px', boxShadow: '0 4px 4px rgba(0,0,0,0.25)', minWidth: 120,
                }}>
                  <div style={{ fontFamily: "'Fagies', sans-serif", fontSize: 36, color: '#AE0000', lineHeight: 1 }}>{stat.val}</div>
                  <div style={{ fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: '#542A76', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Price chart visualization */}
          <div style={{ background: '#FFFFF5', border: '4px solid #542A76', borderRadius: 12, padding: 24, boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}>
            <div style={{ fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 14, textTransform: 'uppercase', color: '#542A76', marginBottom: 16 }}>Preisstabilität</div>
            {/* Simple bar chart */}
            {[
              { label: 'Marktpreis', val: 60, color: '#AE0000' },
              { label: 'Kaadu Preis', val: 90, color: '#ACFF64' },
            ].map(bar => (
              <div key={bar.label} style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: "'Banter Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: '#542A76', marginBottom: 4 }}>{bar.label}</div>
                <div style={{ background: '#E6E6E6', borderRadius: 4, height: 24, overflow: 'hidden', border: '1px solid #000' }}>
                  <div style={{ background: bar.color, width: `${bar.val}%`, height: '100%', borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function KaaduWomenSection() {
  return (
    <section style={{ background: '#542A76', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <h2 style={{
            fontFamily: "'Fagies', sans-serif", fontWeight: 400, fontSize: 64,
            lineHeight: '80px', textTransform: 'uppercase', color: '#FFFFF5', marginBottom: 24,
          }}>Starke Jobs für lokale Frauen</h2>
          <p style={{ fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 18, lineHeight: '28px', color: '#FFFFF5', marginBottom: 24 }}>
            Wir beschäftigen gezielt Frauen aus einkommensschwachen Haushalten der Region.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Doppelter Lohn', '+ Boni & Umsatzbeteiligung', '+ Mitarbeiter-Fonds', '+ Miteigentum (langfristig)'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#ACFF64', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#FFFFF5', textTransform: 'uppercase' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#FFC5FF', borderRadius: 16, border: '3px solid #000', overflow: 'hidden', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="../../assets/photos/product-photo-2.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Workers" />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { KaaduImpactSection, KaaduWomenSection });
