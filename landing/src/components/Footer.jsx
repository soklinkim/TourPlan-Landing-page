import logo from '../assets/logo-white.png'
import { MVP_URL } from '../config'

// NOTE: No verified public contact details for TourPlan yet.
// The values below are clearly-marked placeholders — replace before launch.
const CONTACT = {
  email: 'hello@tourplan.example', // TODO: replace with real contact email
  location: 'Phnom Penh, Cambodia',
}

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'AI Trip Planner', href: '#planner' },
      { label: 'Community', href: '#community' },
      { label: 'Trip Playlists', href: '#playlists' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

export default function Footer() {
  function go(e, href) {
    if (href === '#') return
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-brand">
          <a href={MVP_URL}>
            <img src={logo} alt="TourPlan" />
          </a>
          <p>
            TourPlan is an AI-powered travel planning platform that helps travelers
            discover places, build personalized trips, and share experiences.
          </p>
        </div>

        <div className="lp-footer-cols">
          {COLUMNS.map((col) => (
            <div className="lp-footer-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}

          <div className="lp-footer-col">
            <h4>Contact</h4>
            {/* Placeholder contact details — update before launch */}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span>{CONTACT.location}</span>
            <span className="lp-footer-note">Contact details are placeholders</span>
          </div>
        </div>
      </div>

      <div className="lp-footer-bottom">© 2026 TourPlan. All rights reserved.</div>

      <style>{`
        .lp-footer {
          background: linear-gradient(180deg, #063d12 0%, #042b0d 100%);
          color: rgba(255, 255, 255, 0.7);
        }
        .lp-footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 56px 24px 40px;
          display: grid;
          grid-template-columns: 1.1fr 2fr;
          gap: 48px;
        }
        .lp-footer-brand img { height: 88px; width: auto; display: block; margin: -20px 0 -12px -6px; }
        .lp-footer-brand p {
          margin: 8px 0 0;
          font-size: 13px;
          line-height: 1.65;
          max-width: 22rem;
        }
        .lp-footer-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .lp-footer-col { display: flex; flex-direction: column; gap: 10px; }
        .lp-footer-col h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 700;
          color: #c3e7ba;
          letter-spacing: 0.03em;
        }
        .lp-footer-col a,
        .lp-footer-col span {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .lp-footer-col a:hover { color: #fff; }
        .lp-footer-note { font-size: 11px !important; color: rgba(255,255,255,0.4) !important; }
        .lp-footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 24px;
          text-align: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 860px) {
          .lp-footer-inner { grid-template-columns: 1fr; gap: 32px; padding: 44px 24px 32px; }
          .lp-footer-cols { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 460px) {
          .lp-footer-cols { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
