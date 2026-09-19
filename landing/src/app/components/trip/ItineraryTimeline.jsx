import { FaSun, FaCloudSun, FaMoon, FaClock, FaTicketAlt, FaExchangeAlt } from 'react-icons/fa'
import { PLACES, CROWD_LABELS } from '../../mockData'

const SLOT_META = {
  morning: { label: 'Morning', icon: <FaSun /> },
  afternoon: { label: 'Afternoon', icon: <FaCloudSun /> },
  evening: { label: 'Evening', icon: <FaMoon /> },
}

export default function ItineraryTimeline({ day, onViewPlace, onReplacePlace }) {
  const slotKeys = ['morning', 'afternoon', 'evening']
  const hasAny = slotKeys.some((k) => day.slots[k].length > 0)

  if (!hasAny) {
    return (
      <div className="tp-empty">
        <FaClock />
        <h4>Nothing scheduled yet</h4>
        <p>This day is left open. Use Customize trip to add stops.</p>
      </div>
    )
  }

  return (
    <div className="tp-timeline">
      {slotKeys.map((slotKey) => {
        const entries = day.slots[slotKey]
        if (entries.length === 0) return null
        return (
          <div key={slotKey} className="tp-timeline-slot">
            <div className="tp-timeline-slot-label">
              {SLOT_META[slotKey].icon} {SLOT_META[slotKey].label}
            </div>
            <div className="tp-timeline-slot-items">
              {entries.map((entry) => {
                const place = PLACES[entry.placeId]
                const crowd = CROWD_LABELS[place.crowdLevel]
                return (
                  <div key={place.id} className="tp-place-card">
                    <img src={place.image} alt={place.name} onClick={() => onViewPlace(place)} />
                    <div className="tp-place-card-body">
                      <div className="tp-place-card-top">
                        <span className="tp-place-card-time">{entry.time}</span>
                        <span className={`tp-pill tp-crowd-${place.crowdLevel} tp-pill-sm`}>{crowd.label}</span>
                      </div>
                      <button className="tp-place-card-name" onClick={() => onViewPlace(place)}>
                        {place.name}
                      </button>
                      <span className="tp-place-card-category">{place.category}</span>
                      <div className="tp-place-card-meta">
                        <span><FaClock /> {place.visitDuration}</span>
                        <span><FaTicketAlt /> {place.entranceFee}</span>
                      </div>
                    </div>
                    {onReplacePlace && (
                      <button className="tp-btn-icon tp-place-card-replace" onClick={() => onReplacePlace(place)} aria-label={`Replace ${place.name}`} title="Replace this place">
                        <FaExchangeAlt />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
