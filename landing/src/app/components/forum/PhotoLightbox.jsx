import { useEffect } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function PhotoLightbox({ photos, index, onClose, onNavigate }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % photos.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, photos.length, onClose, onNavigate])

  return (
    <div className="tp-lightbox" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <button className="tp-modal-close tp-lightbox-close" onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>
      <button className="tp-lightbox-nav tp-lightbox-prev" onClick={() => onNavigate((index - 1 + photos.length) % photos.length)} aria-label="Previous photo">
        <FaChevronLeft />
      </button>
      <img src={photos[index]} alt={`Photo ${index + 1} of ${photos.length}`} />
      <button className="tp-lightbox-nav tp-lightbox-next" onClick={() => onNavigate((index + 1) % photos.length)} aria-label="Next photo">
        <FaChevronRight />
      </button>
      <div className="tp-lightbox-counter">{index + 1} / {photos.length}</div>
    </div>
  )
}
