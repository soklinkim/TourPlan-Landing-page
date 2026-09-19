import { useState } from 'react'
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa'
import Avatar from '../shared/Avatar'
import { TRIPS, PLACES } from '../../mockData'

export default function PostCard({ post, author, onOpenProfile, onOpenComments, onOpenTrip, onOpenPhoto, onVote }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [localLikes, setLocalLikes] = useState(post.likes)
  const [votedOption, setVotedOption] = useState(post.myVote || null)

  function toggleLike() {
    setLiked((l) => !l)
    setLocalLikes((n) => (liked ? n - 1 : n + 1))
  }

  function vote(optionId) {
    if (votedOption) return
    setVotedOption(optionId)
    onVote(post.id, optionId)
  }

  const totalVotes = post.type === 'poll' ? post.options.reduce((s, o) => s + o.votes + (votedOption === o.id ? 1 : 0), 0) : 0

  return (
    <article className="tp-card tp-card-pad tp-post">
      <header className="tp-post-header">
        <button className="tp-post-author" onClick={() => onOpenProfile(author)}>
          <Avatar name={author.displayName} size={38} />
          <div>
            <strong>{author.displayName}</strong>
            <span className="tp-field-hint">{post.date}</span>
          </div>
        </button>
      </header>

      {post.type === 'trip' && (
        <TripPostBody post={post} onOpenTrip={onOpenTrip} />
      )}

      {post.type === 'discussion' && (
        <div className="tp-post-body">
          <h3 className="tp-post-title">{post.title}</h3>
          <p>{post.body}</p>
          <div className="tp-chip-select">
            {post.tags.map((t) => (
              <span key={t} className="tp-pill tp-pill-muted">#{t}</span>
            ))}
          </div>
        </div>
      )}

      {post.type === 'photo' && (
        <div className="tp-post-body">
          <p>{post.caption}</p>
          {post.location && (
            <span className="tp-field-hint">
              <FaMapMarkerAlt /> {post.location}
            </span>
          )}
          <div className="tp-photo-grid">
            {post.photos.slice(0, 5).map((src, i) => (
              <button key={i} className="tp-photo-grid-item" onClick={() => onOpenPhoto(post, i)}>
                <img src={src} alt={`${post.caption} photo ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {post.type === 'poll' && (
        <div className="tp-post-body">
          <h3 className="tp-post-title">{post.question}</h3>
          <div className="tp-poll-options">
            {post.options.map((o) => {
              const votes = o.votes + (votedOption === o.id ? 1 : 0)
              const pct = totalVotes ? Math.round((votes / totalVotes) * 100) : 0
              return (
                <button
                  key={o.id}
                  className={`tp-poll-option ${votedOption === o.id ? 'tp-poll-option-picked' : ''}`}
                  onClick={() => vote(o.id)}
                  disabled={!!votedOption}
                >
                  <span className="tp-poll-option-fill" style={{ transform: `scaleX(${votedOption ? pct / 100 : 0})` }} />
                  <span className="tp-poll-option-label">{o.label}</span>
                  {votedOption && <span className="tp-poll-option-pct">{pct}%</span>}
                </button>
              )
            })}
          </div>
          {votedOption && <span className="tp-field-hint">{totalVotes} votes</span>}
        </div>
      )}

      {post.type === 'event' && (
        <div className="tp-post-body">
          <h3 className="tp-post-title">{post.title}</h3>
          <div className="tp-trip-meta" style={{ margin: '6px 0 10px' }}>
            <span><FaCalendarAlt /> {post.eventDate}</span>
            <span><FaClock /> {post.eventTime}</span>
            <span><FaMapMarkerAlt /> {post.location}</span>
          </div>
          <p>{post.body}</p>
        </div>
      )}

      {post.type === 'status' && (
        <div className="tp-post-body">
          <p>{post.body}</p>
        </div>
      )}

      <footer className="tp-post-footer">
        <button className="tp-post-action" onClick={toggleLike}>
          {liked ? <FaHeart color="var(--tp-accent)" /> : <FaRegHeart />} {localLikes}
        </button>
        <button className="tp-post-action" onClick={() => onOpenComments(post)}>
          <FaRegComment /> {post.comments.length}
        </button>
        <button className="tp-post-action" onClick={() => setSaved((s) => !s)}>
          {saved ? <FaBookmark /> : <FaRegBookmark />} {saved ? 'Saved' : 'Save'}
        </button>
        <button className="tp-post-action">
          <FaShare /> Share
        </button>
      </footer>
    </article>
  )
}

function TripPostBody({ post, onOpenTrip }) {
  const trip = TRIPS[post.tripId]
  return (
    <div className="tp-post-body">
      <p>{post.caption}</p>
      <button className="tp-trip-post-card" onClick={() => onOpenTrip(trip)}>
        <img src={trip.cover} alt={trip.title} />
        <div className="tp-trip-post-card-body">
          <strong>{trip.title}</strong>
          <span className="tp-field-hint">{trip.days.length} day{trip.days.length > 1 ? 's' : ''} &middot; {trip.tags.join(', ')}</span>
          {trip.days.length > 1 && (
            <div className="tp-trip-post-strip">
              {trip.days.map((d) => {
                const firstEntry = Object.values(d.slots).flat()[0]
                if (!firstEntry) return null
                const place = PLACES[firstEntry.placeId]
                return (
                  <div key={d.label} className="tp-trip-post-strip-day">
                    <img src={place.image} alt={`${d.label} preview`} />
                    <span>{d.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <span className="tp-btn tp-btn-primary tp-btn-sm">View Trip</span>
      </button>
    </div>
  )
}
