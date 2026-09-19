import { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import Modal from '../shared/Modal'

export default function PaywallModal({ pkg, open, onClose, onUnlock }) {
  const [processing, setProcessing] = useState(false)
  if (!pkg) return null

  function pay() {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onUnlock(pkg)
    }, 900)
  }

  return (
    <Modal open={open} onClose={onClose} title="Unlock premium package" size="sm">
      <div style={{ textAlign: 'center' }}>
        <div className="tp-generating-icon" style={{ background: 'var(--tp-accent-tint)', color: 'var(--tp-danger)' }}>
          <FaLock />
        </div>
        <h3 style={{ margin: '0 0 6px' }}>{pkg.name}</h3>
        <p className="tp-field-hint" style={{ marginBottom: 18 }}>{pkg.tagline}</p>
        <button className="tp-btn tp-btn-primary tp-btn-block" onClick={pay} disabled={processing}>
          {processing ? 'Processing payment...' : `Pay $${pkg.price.toFixed(2)} to unlock`}
        </button>
        <p className="tp-field-hint" style={{ marginTop: 10 }}>Mock checkout — this prototype does not charge a real card.</p>
      </div>
    </Modal>
  )
}
