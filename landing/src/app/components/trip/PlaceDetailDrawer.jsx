import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaChair, FaTimes } from 'react-icons/fa'
import { CROWD_LABELS } from '../../mockData'

export default function PlaceDetailDrawer({ place, onClose, onReplace }) {
  if (!place) return null
  const crowd = CROWD_LABELS[place.crowdLevel]

  return (
    <div className="tp-drawer-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="tp-drawer" aria-label={`${place.name} details`}>
        <button className="tp-modal-close tp-drawer-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <img src={place.image} alt={place.name} className="tp-drawer-image" />
        <div className="tp-drawer-body">
          <span className="tp-pill tp-pill-muted">{place.category}</span>
          <h3>{place.name}</h3>
          <p className="tp-drawer-desc">{place.description}</p>

          <div className="tp-drawer-meta">
            <span><FaClock /> {place.visitDuration}</span>
            <span><FaTicketAlt /> {place.entranceFee}</span>
          </div>

          <div className="tp-drawer-section">
            <h4>Atmosphere</h4>
            <div className="tp-chip-select">
              {place.atmosphere.map((a) => (
                <span key={a} className="tp-pill">{a}</span>
              ))}
            </div>
          </div>

          <div className="tp-drawer-section">
            <h4>Good match for</h4>
            <div className="tp-chip-select">
              {place.preferenceMatch.map((p) => (
                <span key={p} className="tp-pill tp-pill-accent">{p}</span>
              ))}
            </div>
          </div>

          <div className="tp-drawer-section">
            <h4>What travelers say</h4>
            <ul className="tp-drawer-keywords">
              {place.keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>

          <div className="tp-drawer-section">
            <h4>Right now</h4>
            <div className="tp-crowd-radar">
              <span className={`tp-pill tp-crowd-${place.crowdLevel}`}>
                <FaMapMarkerAlt /> {crowd.label}
              </span>
              {place.seatAvailability && (
                <span className="tp-pill tp-pill-muted">
                  <FaChair /> {place.seatAvailability === 'plenty' ? 'Plenty of seats' : place.seatAvailability === 'limited' ? 'Limited seats' : 'Fully seated'}
                </span>
              )}
              <span className="tp-field-hint">{crowd.hint}</span>
            </div>
          </div>

          {onReplace && (
            <button className="tp-btn tp-btn-ghost tp-btn-block" onClick={() => onReplace(place)}>
              Replace this place
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}
