// Nav.jsx — Kaadu website navigation
// Exports: KaaduNav

function KaaduNav({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#FFFFF5', borderBottom: '2px solid #000',
      height: 64, display: 'flex', alignItems: 'center',
      padding: '0 32px', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <img src="../../assets/logo/Kaadu_favicon_purple.svg" style={{ height: 36 }} alt="Kaadu" />
        <span style={{
          fontFamily: "'Fagies', sans-serif", fontWeight: 400, fontSize: 22,
          textTransform: 'uppercase', color: '#AE0000', letterSpacing: '0.02em'
        }}>Kaadu</span>
      </a>

      {/* Desktop nav links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
        {['Shop', 'Über uns', 'Impact', 'Blog'].map(link => (
          <a key={link} href="#" style={{
            fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 14,
            textTransform: 'uppercase', letterSpacing: '0.05em',
            color: '#000', textDecoration: 'none', opacity: 0.85,
          }}
            onMouseEnter={e => e.target.style.color = '#AE0000'}
            onMouseLeave={e => e.target.style.color = '#000'}
          >{link}</a>
        ))}
      </div>

      {/* Cart + CTA */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 14,
          textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>🛒</span>
          {cartCount > 0 && <span style={{
            background: '#AE0000', color: '#FFFFF5', borderRadius: '50%',
            width: 18, height: 18, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{cartCount}</span>}
        </button>
        <a href="#shop" style={{
          background: '#AE0000', color: '#FFFFF5', border: '2px solid #000',
          borderRadius: 30, padding: '8px 18px',
          fontFamily: "'Banter Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
          textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'transform 0.15s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >Shop</a>
      </div>
    </nav>
  );
}

Object.assign(window, { KaaduNav });
