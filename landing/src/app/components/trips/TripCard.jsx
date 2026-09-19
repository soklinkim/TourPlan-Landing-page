import { FaCalendarAlt, FaUsers, FaHeart, FaRegHeart, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react'

export default function TripCard({ trip, onView, onEdit, onDelete, showCountdown }) {
  const [liked, setLiked] = useState(false)

  const daysUntil = trip.startDate
    ? Math.ceil((new Date(trip.startDate) - new Date('2026-09-19')) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="tp-card tp-trip-card">
      <div className="tp-trip-card-media">
        <img src={trip.cover} alt={trip.title} />
        {trip.status === 'past' && <span className="tp-pill tp-pill-muted tp-trip-card-badge">Completed</span>}
        {showCountdown && daysUntil !== null && daysUntil >= 0 && (
          <span className="tp-pill tp-trip-card-badge">In {daysUntil} day{daysUntil === 1 ? '' : 's'}</span>
        )}
        {trip.fromCommunity && <span className="tp-pill tp-pill-accent tp-trip-card-badge tp-trip-card-badge-right">From community</span>}
      </div>
      <div className="tp-trip-card-body">
        <button className="tp-place-card-name" style={{ fontSize: 16 }} onClick={() => onView(trip)}>
          {trip.title}
        </button>
        <div className="tp-chip-select" style={{ margin: '4px 0 8px' }}>
          {trip.tags.slice(0, 3).map((t) => (
            <span key={t} className="tp-pill tp-pill-sm">{t}</span>
          ))}
        </div>
        <div className="tp-trip-meta" style={{ marginBottom: 12, fontSize: 12.5 }}>
          <span><FaCalendarAlt /> {trip.startDate ? trip.startDate : 'No date yet'}</span>
          <span><FaUsers /> {trip.travelers}</span>
        </div>
        <div className="tp-trip-card-actions">
          <button className="tp-btn tp-btn-ghost tp-btn-sm" onClick={() => onView(trip)}>
            <FaEye /> View
          </button>
          {onEdit && (
            <button className="tp-btn-icon" onClick={() => onEdit(trip)} aria-label="Edit trip">
              <FaEdit />
            </button>
          )}
          <button className="tp-btn-icon" onClick={() => setLiked((l) => !l)} aria-label="Like trip">
            {liked ? <FaHeart color="var(--tp-accent)" /> : <FaRegHeart />}
          </button>
          {onDelete && (
            <button className="tp-btn-icon" onClick={() => onDelete(trip)} aria-label="Delete trip">
              <FaTrashAlt />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
