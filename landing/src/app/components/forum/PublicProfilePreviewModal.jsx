import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserPlus, FaUserCheck, FaExternalLinkAlt } from 'react-icons/fa'
import Modal from '../shared/Modal'
import Avatar from '../shared/Avatar'

export default function PublicProfilePreviewModal({ author, open, onClose }) {
  const [following, setFollowing] = useState(author?.isFollowing ?? false)
  if (!author) return null

  return (
    <Modal open={open} onClose={onClose} title="Profile" size="sm">
      <div className="tp-profile-preview">
        <Avatar name={author.displayName} size={56} />
        <h3>{author.displayName}</h3>
        <span className="tp-field-hint">@{author.username} &middot; {author.location}</span>
        <p className="tp-drawer-desc" style={{ textAlign: 'center' }}>{author.bio}</p>

        <div className="tp-chip-select" style={{ justifyContent: 'center' }}>
          {author.travelStyleTags.map((t) => (
            <span key={t} className="tp-pill">{t}</span>
          ))}
        </div>

        <div className="tp-profile-preview-stats">
          <div><strong>{author.stats.tripsPublished}</strong><span>Trips</span></div>
          <div><strong>{author.followers}</strong><span>Followers</span></div>
          <div><strong>{author.following}</strong><span>Following</span></div>
        </div>

        <div className="tp-profile-preview-actions">
          <button className={`tp-btn ${following ? 'tp-btn-ghost' : 'tp-btn-primary'}`} onClick={() => setFollowing((f) => !f)}>
            {following ? <FaUserCheck /> : <FaUserPlus />} {following ? 'Following' : 'Follow'}
          </button>
          <Link to={`/app/u/${author.username}`} className="tp-btn tp-btn-ghost" onClick={onClose}>
            <FaExternalLinkAlt /> View full profile
          </Link>
        </div>
      </div>
    </Modal>
  )
}
