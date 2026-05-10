// Hero.jsx — Kaadu hero section
// Exports: KaaduHero

function KaaduHero() {
  return (
    <section style={{
      background: '#FFC5FF', minHeight: '100vh', paddingTop: 64,
      display: 'flex', alignItems: 'center', overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px', width: '100%', display: 'flex', gap: 48, alignItems: 'center' }}>

        {/* Left — product image */}
        <div style={{ flex: '0 0 50%', position: 'relative' }}>
          <div style={{
            width: '100%', aspectRatio: '1', maxWidth: 520,
            background: '#FFFFF5', borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            border: '3px solid #000', overflow: 'hidden',
            boxShadow: '6px 8px 0 #000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src="../../assets/photos/product-photo.jpg"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'rotate(-5deg) scale(1.05)' }}
              alt="Kaadu product"
            />
          </div>
          {/* Sticker overlay */}
          <img
            src="../../assets/stickers/radically-fair-sticker.png"
            style={{ position: 'absolute', bottom: -10, left: -20, width: 180, transform: 'rotate(-8deg)' }}
            alt="Radically Fair"
          />
        </div>

        {/* Right — text */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#542A76', marginBottom: 16,
          }}>Gefriergetrocknete Früchte</div>

          <h1 style={{
            fontFamily: "'Fagies', sans-serif", fontWeight: 400, fontSize: 64, lineHeight: '80px',
            textTransform: 'uppercase', color: '#AE0000', marginBottom: 24,
            letterSpacing: '-0.01em',
          }}>Snack Like You Give a Damn.</h1>

          <p style={{
            fontFamily: "'Banter Grotesk', sans-serif", fontSize: 18, lineHeight: '28px',
            color: '#000', marginBottom: 32, maxWidth: 480,
          }}>
            100 % Frucht. 0 % Ausbeutung. Fair produziert, in der Ursprungsgemeinde verarbeitet, radikal transparent.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#shop" style={{
              background: '#FFFFF5', color: '#AE0000', border: '2px solid #000',
              borderRadius: 30, padding: '16px 32px',
              fontFamily: "'Fagies', sans-serif", fontWeight: 400, fontSize: 20,
              textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 8px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 4px rgba(0,0,0,0.25)'; }}
            >Jetzt Probieren</a>
            <a href="#impact" style={{
              background: 'transparent', color: '#000', border: '2px solid #000',
              borderRadius: 30, padding: '16px 32px',
              fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 18,
              textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
              transition: 'transform 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >Shop Öffnen</a>
          </div>
        </div>
      </div>

      {/* Decorative banana sticker */}
      <img
        src="../../assets/stickers/banana-sticker.png"
        style={{ position: 'absolute', top: 80, right: 20, width: 100, transform: 'rotate(15deg)', opacity: 0.9 }}
        alt=""
      />
    </section>
  );
}

Object.assign(window, { KaaduHero });
