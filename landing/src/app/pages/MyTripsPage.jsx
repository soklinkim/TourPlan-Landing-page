import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaPlus, FaSuitcaseRolling, FaUsers } from 'react-icons/fa'
import { TRIPS, CURRENT_USER } from '../mockData'
import TripCard from '../components/trips/TripCard'
import TripPreviewModal from '../components/trips/TripPreviewModal'
import CommunityInspiration from '../components/trips/CommunityInspiration'
import ConfirmDialog from '../components/shared/ConfirmDialog'
import EmptyState from '../components/shared/EmptyState'

const TABS = ['All', 'Upcoming', 'Saved', 'Past']

export default function MyTripsPage() {
  const [tab, setTab] = useState('All')
  const [query, setQuery] = useState('')
  const [savedScope, setSavedScope] = useState('mine')
  const [trips, setTrips] = useState(Object.values(TRIPS))
  const [previewTrip, setPreviewTrip] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let list = trips
    if (tab === 'Upcoming') list = list.filter((t) => t.status === 'upcoming')
    if (tab === 'Saved') {
      list = list.filter((t) => t.status === 'saved')
      list = list.filter((t) => (savedScope === 'mine' ? !t.fromCommunity : t.fromCommunity))
    }
    if (tab === 'Past') list = list.filter((t) => t.status === 'past')
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)))
    }
    return list
  }, [trips, tab, savedScope, query])

  return (
    <div className="tp-page">
      <div className="tp-page-head">
        <div>
          <h1 className="tp-page-title">My Trips</h1>
          <p className="tp-page-sub">
            {CURRENT_USER.stats.tripsPublished} published &middot; {trips.length} saved trips total
          </p>
        </div>
        <button className="tp-btn tp-btn-primary" onClick={() => navigate('/app/planner')}>
          <FaPlus /> New Trip
        </button>
      </div>

      <div className="tp-search" style={{ maxWidth: 360, marginBottom: 18 }}>
        <FaSearch />
        <input placeholder="Search your trips" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="tp-tabs" style={{ marginBottom: 20 }}>
        {TABS.map((t) => (
          <button key={t} className={`tp-tab ${tab === t ? 'tp-active' : ''}`} onClick={() => setTab(t)}>
            {t}
            <span className="tp-tab-count">
              {t === 'All' ? trips.length : trips.filter((tr) => (t === 'Upcoming' ? tr.status === 'upcoming' : t === 'Saved' ? tr.status === 'saved' : tr.status === 'past')).length}
            </span>
          </button>
        ))}
      </div>

      {tab === 'Saved' && (
        <div className="tp-mode-toggle" style={{ marginBottom: 18 }}>
          <button className={`tp-mode-tab ${savedScope === 'mine' ? 'tp-active' : ''}`} onClick={() => setSavedScope('mine')}>
            My saved trips
          </button>
          <button className={`tp-mode-tab ${savedScope === 'community' ? 'tp-active' : ''}`} onClick={() => setSavedScope('community')}>
            <FaUsers /> Saved from community
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FaSuitcaseRolling />}
          title="No trips here yet"
          body="Trips you plan or save will show up in this tab."
          action={
            <button className="tp-btn tp-btn-primary" onClick={() => navigate('/app/planner')}>
              Plan a trip
            </button>
          }
        />
      ) : (
        <div className="tp-trip-card-grid">
          {filtered.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              showCountdown={trip.status === 'upcoming'}
              onView={setPreviewTrip}
              onEdit={(t) => navigate(`/app/trip/${t.id}`)}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <CommunityInspiration />

      <TripPreviewModal trip={previewTrip} open={!!previewTrip} onClose={() => setPreviewTrip(null)} />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete this trip?"
        body={deleteTarget ? `"${deleteTarget.title}" will be removed from My Trips.` : ''}
        confirmLabel="Delete trip"
        danger
        onConfirm={() => setTrips((cur) => cur.filter((t) => t.id !== deleteTarget.id))}
      />
    </div>
  )
}
