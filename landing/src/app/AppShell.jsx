import { NavLink, Outlet } from 'react-router-dom'
import { FaMagic, FaSuitcaseRolling, FaComments, FaUserCircle } from 'react-icons/fa'
import logo from '../assets/logo-dark.png'
import Avatar from './components/shared/Avatar'
import { CURRENT_USER } from './mockData'

const NAV = [
  { to: '/app/planner', label: 'AI Planner', icon: <FaMagic /> },
  { to: '/app/trips', label: 'My Trips', icon: <FaSuitcaseRolling /> },
  { to: '/app/forum', label: 'Forum', icon: <FaComments /> },
]

export default function AppShell() {
  return (
    <div className="tp-app">
      <header className="tp-nav">
        <div className="tp-nav-inner">
          <NavLink to="/app/planner" className="tp-nav-brand">
            <img src={logo} alt="TourPlan" />
          </NavLink>

          <nav className="tp-nav-links">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `tp-nav-link ${isActive ? 'tp-active' : ''}`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="tp-nav-right">
            <NavLink to="/app/profile" aria-label="Your profile" className="tp-nav-avatar-link">
              {({ isActive }) => (
                <span className="tp-nav-avatar-wrap" style={{ background: isActive ? 'var(--tp-green-tint)' : 'transparent' }}>
                  <Avatar name={CURRENT_USER.displayName} size={32} />
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      <main className="tp-container tp-page-with-mobile-nav">
        <Outlet />
      </main>

      <nav className="tp-mobile-nav" aria-label="Primary">
        {[...NAV, { to: '/app/profile', label: 'Profile', icon: <FaUserCircle /> }].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `tp-mobile-nav-link ${isActive ? 'tp-active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
