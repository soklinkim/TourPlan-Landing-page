import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo-dark.png'
import { DEMO_URL } from './data'

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Community', href: '#community' },
  { label: 'Trip Playlists', href: '#playlists' },
  { label: 'Packages', href: '#packages' },
  { label: 'About Us', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(e, href) {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''}`}>
      <div className="lp-nav-inner">
        <a href="#top" className="lp-nav-brand" onClick={(e) => go(e, '#top')}>
          <img src={logo} alt="TourPlan" />
        </a>

        <nav className="lp-nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="lp-nav-actions">
          <a className="lp-btn-primary" href={DEMO_URL}>
            Go Live
          </a>
        </div>

        <button
          className="lp-nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="lp-nav-mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a className="lp-btn-primary" href={DEMO_URL} onClick={() => setMenuOpen(false)}>
            Go Live
          </a>
        </div>
      )}

      <style>{`
        .lp-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          background: rgba(248, 250, 248, 0.7);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid transparent;
        }
        .lp-nav-scrolled {
          background: rgba(255, 255, 255, 0.9);
          border-bottom-color: #e6eee3;
          box-shadow: 0 1px 12px rgba(15, 51, 32, 0.05);
        }
        .lp-nav-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .lp-nav-brand { display: flex; align-items: center; flex-shrink: 0; }
        .lp-nav-brand img { height: 40px; width: auto; display: block; }
        .lp-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-left: 8px;
        }
        .lp-nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .lp-nav-links a:hover { color: #174222; }
        .lp-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }
        .lp-btn-primary {
          border: none;
          background: #174222;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .lp-btn-primary:hover { background: #0f3320; transform: translateY(-1px); }
        .lp-btn-ghost {
          border: 1px solid #dbe8d9;
          background: #fff;
          color: #174222;
          font-weight: 600;
          font-size: 14px;
          padding: 9px 18px;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .lp-btn-ghost:hover { border-color: #2d5a2d; background: #f0f7ee; }
        .lp-nav-toggle {
          display: none;
          margin-left: auto;
          border: 1px solid #dbe8d9;
          background: #fff;
          color: #174222;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
        }
        .lp-nav-mobile {
          display: none;
          flex-direction: column;
          gap: 6px;
          padding: 8px 24px 18px;
          background: #fff;
          border-bottom: 1px solid #e6eee3;
        }
        .lp-nav-mobile a {
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          padding: 10px 4px;
          border-bottom: 1px solid #f0f4f0;
        }
        .lp-nav-mobile .lp-btn-primary,
        .lp-nav-mobile .lp-btn-ghost { margin-top: 8px; width: 100%; }

        @media (max-width: 900px) {
          .lp-nav-links, .lp-nav-actions { display: none; }
          .lp-nav-toggle { display: flex; }
          .lp-nav-mobile { display: flex; }
          .lp-nav-mobile .lp-btn-primary {
            background: #fff;
            color: #174222;
            border: 1px solid #dbe8d9;
          }
          .lp-nav-mobile .lp-btn-primary:hover {
            background: #f0f7ee;
            border-color: #2d5a2d;
          }
        }
      `}</style>
    </header>
  )
}
