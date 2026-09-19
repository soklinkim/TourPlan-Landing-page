import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaEdit, FaEye, FaHeart, FaComment, FaMedal } from 'react-icons/fa'
import { CURRENT_USER, TRIPS, BADGES, LIKED_TRIPS } from '../mockData'
import Avatar from '../components/shared/Avatar'
import BadgeIcon from '../components/profile/BadgeIcon'
import BadgesModal from '../components/profile/BadgesModal'
import EditProfileModal from '../components/profile/EditProfileModal'
import ConfirmDialog from '../components/shared/ConfirmDialog'
import TripPreviewModal from '../components/trips/TripPreviewModal'

export default function ProfilePage() {
  const [user, setUser] = useState(CURRENT_USER)
  const [editOpen, setEditOpen] = useState(false)
  const [badgesOpen, setBadgesOpen] = useState(false)
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [previewTrip, setPreviewTrip] = useState(null)
  const navigate = useNavigate()

  const ownTrips = Object.values(TRIPS).filter((t) => !t.fromCommunity)
  const unlockedBadges = BADGES.filter((b) => b.unlocked)

  return (
    <div className="tp-page">
      <div className="tp-page-head">
        <h1 className="tp-page-title">Profile</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="tp-btn tp-btn-ghost" onClick={() => setEditOpen(true)}>
            <FaEdit /> Edit Profile
          </button>
          <button className="tp-btn tp-btn-danger" onClick={() => setSignOutOpen(true)}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      <div className="tp-card tp-card-pad tp-profile-card">
        <Avatar name={user.displayName} size={72} />
        <div className="tp-profile-card-info">
          <h2>{user.displayName}</h2>
          <span className="tp-field-hint">@{user.username} &middot; {user.location} &middot; {user.email}</span>
          <p className="tp-drawer-desc">{user.bio}</p>
          <div className="tp-chip-select">
            {user.travelStyleTags.map((t) => (
              <span key={t} className="tp-pill">{t}</span>
            ))}
          </div>
        </div>
        <div className="tp-profile-stats">
          <div><strong>{user.stats.tripsPublished}</strong><span>Trips Published</span></div>
          <div><strong>{user.stats.placesVisited}</strong><span>Places Visited</span></div>
          <div><strong>{user.stats.tripsLiked}</strong><span>Trips Liked</span></div>
        </div>
      </div>

      <div className="tp-profile-row-2">
        <div className="tp-card tp-card-pad">
          <h3 className="tp-post-title">Followers</h3>
          <div className="tp-stacked-avatars">
            {user.followerPreview.map((name) => (
              <Avatar key={name} name={name} size={34} />
            ))}
          </div>
          <span className="tp-field-hint">{user.followers} followers</span>
        </div>
        <div className="tp-card tp-card-pad">
          <h3 className="tp-post-title">Following</h3>
          <div className="tp-stacked-avatars">
            {user.followingPreview.map((name) => (
              <Avatar key={name} name={name} size={34} />
            ))}
          </div>
          <span className="tp-field-hint">{user.following} following</span>
        </div>
      </div>

      <section className="tp-profile-section">
        <div className="tp-page-head" style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 17, color: 'var(--tp-green)' }}>Badges</h3>
          <button className="tp-btn tp-btn-ghost tp-btn-sm" onClick={() => setBadgesOpen(true)}>
            <FaMedal /> Badges Info
          </button>
        </div>
        <div className="tp-badges-grid">
          {BADGES.map((b) => (
            <div key={b.id} className={`tp-badge-tile ${b.unlocked ? '' : 'tp-badge-locked'}`} title={b.unlocked ? 'Earned' : b.requirement}>
              <BadgeIcon name={b.icon} />
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="tp-profile-section">
        <h3 style={{ marginBottom: 12, fontSize: 17, color: 'var(--tp-green)' }}>My Shared Trip Lists</h3>
        <div className="tp-shared-trips-row">
          {ownTrips.map((trip) => (
            <button key={trip.id} className="tp-shared-trip-card" onClick={() => setPreviewTrip(trip)}>
              <div className="tp-shared-trip-media">
                <img src={trip.cover} alt={trip.title} />
                <span className={`tp-pill ${trip.published ? '' : 'tp-pill-muted'} tp-trip-card-badge`}>
                  {trip.published ? 'Published' : 'Draft'}
                </span>
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
      </section>

      <section className="tp-profile-section">
        <h3 style={{ marginBottom: 12, fontSize: 17, color: 'var(--tp-green)' }}>Trip Lists You Liked</h3>
        <div className="tp-liked-trip-list">
          {LIKED_TRIPS.map((lt) => (
            <div key={lt.title} className="tp-liked-trip-row">
              <img src={lt.cover} alt={lt.title} />
              <div className="tp-liked-trip-body">
                <strong>{lt.title}</strong>
                <span className="tp-field-hint">by {lt.creator}</span>
              </div>
              <div className="tp-chip-select">
                {lt.tags.map((t) => (
                  <span key={t} className="tp-pill tp-pill-sm">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} user={user} onSave={(patch) => setUser((u) => ({ ...u, ...patch }))} />
      <BadgesModal open={badgesOpen} onClose={() => setBadgesOpen(false)} />
      <TripPreviewModal trip={previewTrip} open={!!previewTrip} onClose={() => setPreviewTrip(null)} />
      <ConfirmDialog
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        title="Sign out of TourPlan?"
        body="You'll need to log back in to access your trips."
        confirmLabel="Sign out"
        danger
        onConfirm={() => navigate('/')}
      />
    </div>
  )
}
