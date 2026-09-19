import { useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import {
  FaUsers,
  FaWallet,
  FaTachometerAlt,
  FaCalendarAlt,
  FaSlidersH,
  FaBookmark,
  FaRegBookmark,
  FaGlobeAsia,
  FaTrashAlt,
  FaCamera,
  FaPen,
  FaCheck,
  FaMagic,
  FaPlus,
} from 'react-icons/fa'
import { TRIPS, PLACES } from '../mockData'
import ItineraryTimeline from '../components/trip/ItineraryTimeline'
import TripMapMock from '../components/trip/TripMapMock'
import PlaceDetailDrawer from '../components/trip/PlaceDetailDrawer'
import CustomizeTripModal from '../components/trip/CustomizeTripModal'
import ReplacePlaceModal from '../components/trip/ReplacePlaceModal'
import ConfirmDialog from '../components/shared/ConfirmDialog'
import EmptyState from '../components/shared/EmptyState'

export default function TripResultPage() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const source = TRIPS[tripId]
  const overrides = location.state?.overrides

  const [trip, setTrip] = useState(() => {
    if (!source) return null
    const clone = structuredClone(source)
    return overrides ? { ...clone, ...overrides } : clone
  })
  const [activeDay, setActiveDay] = useState(0)
  const [viewingPlace, setViewingPlace] = useState(null)
  const [replacingPlace, setReplacingPlace] = useState(null)
  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [saved, setSaved] = useState(true)
  const [published, setPublished] = useState(source?.published ?? false)
  const [dismissedAddOn, setDismissedAddOn] = useState(false)

  const tripPlaces = useMemo(() => {
    if (!trip) return []
    const ids = new Set()
    trip.days.forEach((d) => Object.values(d.slots).flat().forEach((e) => ids.add(e.placeId)))
    return [...ids].map((id) => PLACES[id])
  }, [trip])

  const dayPlaceIds = trip ? Object.values(trip.days[activeDay].slots).flat().map((e) => e.placeId) : []

  if (!trip) {
    return (
      <div className="tp-page">
        <EmptyState
          icon={<FaGlobeAsia />}
          title="Trip not found"
          body="This itinerary may have been deleted."
          action={
            <Link className="tp-btn tp-btn-primary" to="/app/trips">
              Back to My Trips
            </Link>
          }
        />
      </div>
    )
  }

  function replacePlace(oldId, newId) {
    setTrip((t) => {
      const clone = structuredClone(t)
      clone.days.forEach((d) => {
        Object.keys(d.slots).forEach((slot) => {
          d.slots[slot] = d.slots[slot].map((e) => (e.placeId === oldId ? { ...e, placeId: newId } : e))
        })
      })
      return clone
    })
  }

  function cycleCover() {
    setTrip((t) => {
      const options = tripPlaces.map((p) => p.image)
      const idx = options.indexOf(t.cover)
      const next = options[(idx + 1) % options.length] || t.cover
      return { ...t, cover: next }
    })
  }

  return (
    <div className="tp-page tp-trip-result">
      <div className="tp-trip-hero">
        <div className="tp-trip-hero-media">
          <img src={trip.cover} alt={trip.title} />
          <button className="tp-btn-icon tp-trip-cover-btn" onClick={cycleCover} title="Change cover photo" aria-label="Change cover photo">
            <FaCamera />
          </button>
        </div>

        <div className="tp-trip-hero-info">
          {editingTitle ? (
            <form
              className="tp-trip-title-edit"
              onSubmit={(e) => {
                e.preventDefault()
                setEditingTitle(false)
              }}
            >
              <input
                autoFocus
                value={trip.title}
                onChange={(e) => setTrip((t) => ({ ...t, title: e.target.value }))}
              />
              <button type="submit" className="tp-btn-icon" aria-label="Save title">
                <FaCheck />
              </button>
            </form>
          ) : (
            <h1 className="tp-page-title tp-trip-title" onClick={() => setEditingTitle(true)}>
              {trip.title} <FaPen className="tp-trip-title-pen" />
            </h1>
          )}

          <div className="tp-chip-select" style={{ marginBottom: 14 }}>
            {trip.tags.map((tag) => (
              <span key={tag} className="tp-pill">{tag}</span>
            ))}
          </div>

          <div className="tp-trip-meta">
            <span><FaCalendarAlt /> {trip.startDate ? `${trip.startDate} to ${trip.endDate}` : 'No dates set'}</span>
            <span><FaUsers /> {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
            <span><FaWallet /> {trip.budget}</span>
            <span><FaTachometerAlt /> {trip.pace} pace</span>
          </div>

          <div className="tp-trip-actions">
            <button className="tp-btn tp-btn-ghost" onClick={() => setCustomizeOpen(true)}>
              <FaSlidersH /> Customize trip
            </button>
            <button className="tp-btn tp-btn-ghost" onClick={() => setSaved((s) => !s)}>
              {saved ? <FaBookmark /> : <FaRegBookmark />} {saved ? 'Saved' : 'Save'}
            </button>
            <button className="tp-btn tp-btn-ghost" onClick={() => setPublished((p) => !p)}>
              <FaGlobeAsia /> {published ? 'Published' : 'Publish'}
            </button>
            <button className="tp-btn tp-btn-danger" onClick={() => setDeleteOpen(true)}>
              <FaTrashAlt /> Delete
            </button>
          </div>
        </div>
      </div>

      {trip.suggestedAddOn && !dismissedAddOn && (
        <div className="tp-addon-banner">
          <img src={PLACES[trip.suggestedAddOn].image} alt="" />
          <div className="tp-addon-banner-body">
            <strong>Have extra days? Add the {PLACES[trip.suggestedAddOn].name}.</strong>
            <p>{PLACES[trip.suggestedAddOn].description}</p>
          </div>
          <div className="tp-addon-banner-actions">
            <button className="tp-btn tp-btn-primary tp-btn-sm" onClick={() => setViewingPlace(PLACES[trip.suggestedAddOn])}>
              <FaPlus /> View details
            </button>
            <button className="tp-btn tp-btn-ghost tp-btn-sm" onClick={() => setDismissedAddOn(true)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="tp-tabs" style={{ marginBottom: 20 }}>
        {trip.days.map((day, i) => (
          <button key={day.label} className={`tp-tab ${activeDay === i ? 'tp-active' : ''}`} onClick={() => setActiveDay(i)}>
            {day.label}
          </button>
        ))}
      </div>

      <div className="tp-trip-grid">
        <ItineraryTimeline
          day={trip.days[activeDay]}
          onViewPlace={setViewingPlace}
          onReplacePlace={setReplacingPlace}
        />
        <TripMapMock places={tripPlaces} activePlaceIds={dayPlaceIds} onSelectPlace={setViewingPlace} />
      </div>

      <div className="tp-trip-refine">
        <button className="tp-btn tp-btn-ghost" onClick={() => navigate('/app/planner')}>
          <FaMagic /> Continue refining in AI Planner
        </button>
      </div>

      <PlaceDetailDrawer place={viewingPlace} onClose={() => setViewingPlace(null)} onReplace={setReplacingPlace} />

      <ReplacePlaceModal
        place={replacingPlace}
        open={!!replacingPlace}
        onClose={() => setReplacingPlace(null)}
        onReplace={replacePlace}
      />

      <CustomizeTripModal
        trip={trip}
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        onSave={(patch) => setTrip((t) => ({ ...t, ...patch }))}
      />

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete this trip?"
        body="This removes it from My Trips. This mockup does not persist the change after a page refresh."
        confirmLabel="Delete trip"
        danger
        onConfirm={() => navigate('/app/trips')}
      />
    </div>
  )
}
