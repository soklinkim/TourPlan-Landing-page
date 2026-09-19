import { FaClock, FaTicketAlt } from 'react-icons/fa'
import Modal from '../shared/Modal'
import { PLACES, CROWD_LABELS } from '../../mockData'

export default function ReplacePlaceModal({ place, open, onClose, onReplace }) {
  if (!place) return null

  const alternatives = Object.values(PLACES).filter(
    (p) => p.id !== place.id && (p.category === place.category || p.preferenceMatch.some((tag) => place.preferenceMatch.includes(tag)))
  )

  return (
    <Modal open={open} onClose={onClose} title={`Replace "${place.name}"`} size="md">
      <p className="tp-field-hint" style={{ marginBottom: 16 }}>
        Based on similar atmosphere and preferences.
      </p>
      <div className="tp-replace-list">
        {alternatives.length === 0 && <p>No close alternatives found for this stop.</p>}
        {alternatives.map((alt) => {
          const crowd = CROWD_LABELS[alt.crowdLevel]
          return (
            <div key={alt.id} className="tp-replace-item">
              <img src={alt.image} alt={alt.name} />
              <div className="tp-replace-item-body">
                <strong>{alt.name}</strong>
                <span className="tp-place-card-category">{alt.category}</span>
                <div className="tp-place-card-meta">
                  <span><FaClock /> {alt.visitDuration}</span>
                  <span><FaTicketAlt /> {alt.entranceFee}</span>
                  <span className={`tp-pill tp-crowd-${alt.crowdLevel} tp-pill-sm`}>{crowd.label}</span>
                </div>
              </div>
              <button
                className="tp-btn tp-btn-ghost tp-btn-sm"
                onClick={() => {
                  onReplace(place.id, alt.id)
                  onClose()
                }}
              >
                Use this
              </button>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
