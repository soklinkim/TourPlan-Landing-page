import { useState } from 'react'
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import Modal from '../shared/Modal'
import { TRIPS } from '../../mockData'

const STEPS = ['Select Trip', 'Add Details', 'Preview & Publish']

export default function TripPlaylistShareModal({ open, onClose, onPublish }) {
  const [step, setStep] = useState(0)
  const [tripId, setTripId] = useState(null)
  const [caption, setCaption] = useState('')

  const trip = tripId ? TRIPS[tripId] : null

  function close() {
    setStep(0)
    setTripId(null)
    setCaption('')
    onClose()
  }

  return (
    <Modal open={open} onClose={close} title="Share a trip playlist" size="md">
      <div className="tp-wizard-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`tp-wizard-step ${i === step ? 'tp-active' : ''} ${i < step ? 'tp-done' : ''}`}>
            <span>{i < step ? <FaCheckCircle /> : i + 1}</span> {s}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="tp-replace-list">
          {Object.values(TRIPS).filter((t) => t.published !== false).map((t) => (
            <button
              key={t.id}
              className={`tp-replace-item tp-wizard-trip-option ${tripId === t.id ? 'tp-wizard-trip-selected' : ''}`}
              onClick={() => setTripId(t.id)}
            >
              <img src={t.cover} alt={t.title} />
              <div className="tp-replace-item-body">
                <strong>{t.title}</strong>
                <span className="tp-place-card-category">{t.days.length} day{t.days.length > 1 ? 's' : ''}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 1 && trip && (
        <div className="tp-field">
          <label htmlFor="playlist-caption">Add a caption</label>
          <textarea
            id="playlist-caption"
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`Tell the community about "${trip.title}"...`}
          />
        </div>
      )}

      {step === 2 && trip && (
        <div className="tp-wizard-preview">
          <img src={trip.cover} alt={trip.title} />
          <div>
            <strong>{trip.title}</strong>
            <p>{caption || 'No caption added.'}</p>
          </div>
        </div>
      )}

      <div className="tp-wizard-actions">
        {step > 0 && (
          <button className="tp-btn tp-btn-ghost" onClick={() => setStep((s) => s - 1)}>
            <FaArrowLeft /> Back
          </button>
        )}
        {step < 2 ? (
          <button className="tp-btn tp-btn-primary" disabled={step === 0 && !tripId} onClick={() => setStep((s) => s + 1)}>
            Next <FaArrowRight />
          </button>
        ) : (
          <button
            className="tp-btn tp-btn-primary"
            onClick={() => {
              onPublish({ tripId, caption })
              close()
            }}
          >
            Publish to Forum
          </button>
        )}
      </div>
    </Modal>
  )
}
