import { FaMagic } from 'react-icons/fa'

export default function GeneratingOverlay() {
  return (
    <div className="tp-generating-overlay">
      <div className="tp-generating-card">
        <div className="tp-generating-icon">
          <FaMagic />
        </div>
        <h3>Matching trip packages</h3>
        <p>Comparing your preferences against places across the city...</p>
        <div className="tp-generating-rows">
          <div className="tp-skeleton" style={{ height: 14, width: '70%' }} />
          <div className="tp-skeleton" style={{ height: 14, width: '90%' }} />
          <div className="tp-skeleton" style={{ height: 14, width: '55%' }} />
        </div>
      </div>
    </div>
  )
}
