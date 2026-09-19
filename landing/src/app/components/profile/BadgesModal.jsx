import Modal from '../shared/Modal'
import BadgeIcon from './BadgeIcon'
import { BADGES } from '../../mockData'

export default function BadgesModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Badges" size="md">
      <div className="tp-badges-modal-grid">
        {BADGES.map((b) => (
          <div key={b.id} className={`tp-badge-row ${b.unlocked ? '' : 'tp-badge-locked'}`}>
            <span className="tp-badge-icon">
              <BadgeIcon name={b.icon} />
            </span>
            <div>
              <strong>{b.name}</strong>
              <p>{b.description}</p>
              <span className="tp-field-hint">{b.unlocked ? 'Earned' : b.requirement}</span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
