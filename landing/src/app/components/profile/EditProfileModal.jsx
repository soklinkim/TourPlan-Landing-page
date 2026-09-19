import { useState } from 'react'
import Modal from '../shared/Modal'
import Avatar from '../shared/Avatar'

const ALL_STYLE_TAGS = ['Foodie', 'Backpacker', 'Night Owl', 'Culture Lover', 'Photographer', 'Solo Traveler', 'Luxury Seeker']

export default function EditProfileModal({ open, onClose, user, onSave }) {
  const [displayName, setDisplayName] = useState(user.displayName)
  const [username, setUsername] = useState(user.username)
  const [location, setLocation] = useState(user.location)
  const [bio, setBio] = useState(user.bio)
  const [tags, setTags] = useState(user.travelStyleTags)

  function toggleTag(tag) {
    setTags((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]))
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile" size="sm">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <Avatar name={displayName} size={64} />
      </div>

      <div className="tp-field">
        <label htmlFor="ep-name">Display name</label>
        <input id="ep-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </div>
      <div className="tp-field">
        <label htmlFor="ep-username">Username</label>
        <input id="ep-username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="tp-field">
        <label htmlFor="ep-location">Location</label>
        <input id="ep-location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="tp-field">
        <label htmlFor="ep-bio">Bio</label>
        <textarea id="ep-bio" rows={3} maxLength={160} value={bio} onChange={(e) => setBio(e.target.value)} />
        <span className="tp-field-hint">{bio.length} / 160</span>
      </div>
      <div className="tp-field">
        <label>Travel style</label>
        <div className="tp-chip-select">
          {ALL_STYLE_TAGS.map((tag) => (
            <button type="button" key={tag} className={`tp-chip ${tags.includes(tag) ? 'tp-chip-selected' : ''}`} onClick={() => toggleTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        className="tp-btn tp-btn-primary tp-btn-block"
        onClick={() => {
          onSave({ displayName, username, location, bio, travelStyleTags: tags })
          onClose()
        }}
      >
        Save changes
      </button>
    </Modal>
  )
}
