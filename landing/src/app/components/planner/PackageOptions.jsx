import { FaLock, FaArrowRight, FaStar } from 'react-icons/fa'
import { PACKAGES, TRIPS } from '../../mockData'

export default function PackageOptions({ recommendedId, onSelect }) {
  return (
    <div className="tp-packages">
      <h3 className="tp-packages-title">Pick a trip package</h3>
      <div className="tp-packages-grid">
        {PACKAGES.map((pkg) => {
          const trip = TRIPS[pkg.tripId]
          const isFree = pkg.price === 0
          return (
            <button
              key={pkg.id}
              className={`tp-package-card ${pkg.id === recommendedId ? 'tp-package-recommended' : ''}`}
              onClick={() => onSelect(pkg)}
            >
              <div className="tp-package-media">
                <img src={trip.cover} alt={trip.title} />
                {pkg.id === recommendedId && (
                  <span className="tp-pill tp-package-badge">
                    <FaStar /> Recommended
                  </span>
                )}
              </div>
              <div className="tp-package-body">
                <span className={`tp-pill ${isFree ? '' : 'tp-pill-accent'}`}>
                  {isFree ? 'Free' : `$${pkg.price.toFixed(2)}`}
                </span>
                <h4>{pkg.name}</h4>
                <p>{pkg.tagline}</p>
                <span className="tp-package-cta">
                  {isFree ? 'View itinerary' : (
                    <>
                      <FaLock /> Unlock package
                    </>
                  )}
                  <FaArrowRight />
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
