import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaUserPlus, FaUserCheck, FaArrowLeft, FaEye, FaHeart, FaComment, FaUserSlash } from 'react-icons/fa'
import { FORUM_AUTHORS, FORUM_POSTS, TRIPS } from '../mockData'
import Avatar from '../components/shared/Avatar'
import EmptyState from '../components/shared/EmptyState'
import TripPreviewModal from '../components/trips/TripPreviewModal'

export default function PublicProfilePage() {
  const { username } = useParams()
  const author = FORUM_AUTHORS[username]
  const [following, setFollowing] = useState(author?.isFollowing ?? false)
  const [previewTrip, setPreviewTrip] = useState(null)

  if (!author) {
    return (
      <div className="tp-page">
        <EmptyState icon={<FaUserSlash />} title="Profile not found" body="This user doesn't exist in this prototype." />
      </div>
    )
  }

  const sharedTripIds = FORUM_POSTS.filter((p) => p.type === 'trip' && p.author === username).map((p) => p.tripId)
  const sharedTrips = sharedTripIds.map((id) => TRIPS[id]).filter(Boolean)

  return (
    <div className="tp-page">
      <Link to="/app/forum" className="tp-nav-back">
        <FaArrowLeft /> Back to Forum
      </Link>

      <div className="tp-card tp-card-pad tp-profile-card" style={{ marginTop: 16 }}>
        <Avatar name={author.displayName} size={72} />
        <div className="tp-profile-card-info">
          <h2>{author.displayName}</h2>
          <span className="tp-field-hint">@{author.username} &middot; {author.location}</span>
          <p className="tp-drawer-desc">{author.bio}</p>
          <div className="tp-chip-select">
            {author.travelStyleTags.map((t) => (
              <span key={t} className="tp-pill">{t}</span>
            ))}
          </div>
        </div>
        <div className="tp-profile-stats">
          <div><strong>{author.stats.tripsPublished}</strong><span>Trips</span></div>
          <div><strong>{author.followers}</strong><span>Followers</span></div>
          <div><strong>{author.following}</strong><span>Following</span></div>
        </div>
      </div>

      <div style={{ margin: '18px 0 28px' }}>
        <button className={`tp-btn ${following ? 'tp-btn-ghost' : 'tp-btn-primary'}`} onClick={() => setFollowing((f) => !f)}>
          {following ? <FaUserCheck /> : <FaUserPlus />} {following ? 'Following' : 'Follow'}
        </button>
      </div>

      <section className="tp-profile-section">
        <h3 style={{ marginBottom: 12, fontSize: 17, color: 'var(--tp-green)' }}>Trips shared to the forum</h3>
        {sharedTrips.length === 0 ? (
          <EmptyState title="No shared trips yet" body="" />
        ) : (
          <div className="tp-shared-trips-row">
            {sharedTrips.map((trip) => (
              <button key={trip.id} className="tp-shared-trip-card" onClick={() => setPreviewTrip(trip)}>
                <div className="tp-shared-trip-media">
                  <img src={trip.cover} alt={trip.title} />
                </div>
                <div className="tp-shared-trip-body">
                  <strong>{trip.title}</strong>
                  <div className="tp-trip-meta" style={{ fontSize: 12 }}>
                    <span><FaEye /> {trip.views}</span>
                    <span><FaHeart /> {trip.likes}</span>
                    <span><FaComment /> {trip.comments}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <TripPreviewModal trip={previewTrip} open={!!previewTrip} onClose={() => setPreviewTrip(null)} />
    </div>
  )
}
