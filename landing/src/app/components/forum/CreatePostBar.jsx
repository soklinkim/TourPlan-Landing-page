import { FaComments, FaImage, FaPoll, FaCalendarPlus, FaMusic } from 'react-icons/fa'
import Avatar from '../shared/Avatar'
import { CURRENT_USER } from '../../mockData'

const TYPES = [
  { type: 'discussion', label: 'Discussion', icon: <FaComments /> },
  { type: 'photo', label: 'Photo', icon: <FaImage /> },
  { type: 'poll', label: 'Poll', icon: <FaPoll /> },
  { type: 'event', label: 'Event', icon: <FaCalendarPlus /> },
]

export default function CreatePostBar({ onOpenComposer, onOpenPlaylistShare }) {
  return (
    <div className="tp-card tp-card-pad tp-create-post-bar">
      <div className="tp-create-post-top">
        <Avatar name={CURRENT_USER.displayName} size={38} />
        <button className="tp-create-post-input" onClick={() => onOpenComposer('status')}>
          What&apos;s on your mind?
        </button>
      </div>
      <div className="tp-create-post-actions">
        {TYPES.map((t) => (
          <button key={t.type} className="tp-btn tp-btn-ghost tp-btn-sm" onClick={() => onOpenComposer(t.type)}>
            {t.icon} {t.label}
          </button>
        ))}
        <button className="tp-btn tp-btn-ghost tp-btn-sm" onClick={onOpenPlaylistShare}>
          <FaMusic /> Share a trip
        </button>
      </div>
    </div>
  )
}
