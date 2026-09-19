import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Modal from '../shared/Modal'
import ItineraryTimeline from '../trip/ItineraryTimeline'
import TripMapMock from '../trip/TripMapMock'
import PlaceDetailDrawer from '../trip/PlaceDetailDrawer'
import { PLACES } from '../../mockData'

export default function TripPreviewModal({ trip, open, onClose }) {
  const [activeDay, setActiveDay] = useState(0)
  const [viewingPlace, setViewingPlace] = useState(null)

  const tripPlaces = useMemo(() => {
    if (!trip) return []
    const ids = new Set()
    trip.days.forEach((d) => Object.values(d.slots).flat().forEach((e) => ids.add(e.placeId)))
    return [...ids].map((id) => PLACES[id])
  }, [trip])

  if (!trip) return null
  const dayPlaceIds = Object.values(trip.days[activeDay]?.slots || {}).flat().map((e) => e.placeId)

  return (
    <Modal open={open} onClose={onClose} title={trip.title} size="lg">
      <div className="tp-tabs" style={{ marginBottom: 18 }}>
        {trip.days.map((day, i) => (
          <button key={day.label} className={`tp-tab ${activeDay === i ? 'tp-active' : ''}`} onClick={() => setActiveDay(i)}>
            {day.label}
          </button>
        ))}
      </div>

      <div className="tp-trip-grid">
        <ItineraryTimeline day={trip.days[activeDay]} onViewPlace={setViewingPlace} />
        <TripMapMock places={tripPlaces} activePlaceIds={dayPlaceIds} onSelectPlace={setViewingPlace} />
      </div>

      <Link to={`/app/trip/${trip.id}`} className="tp-btn tp-btn-ghost" style={{ marginTop: 18 }}>
        <FaExternalLinkAlt /> Open full itinerary
      </Link>

      <PlaceDetailDrawer place={viewingPlace} onClose={() => setViewingPlace(null)} />
    </Modal>
  )
}
