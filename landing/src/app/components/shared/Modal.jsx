import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

export default function Modal({ open, onClose, title, size = 'md', children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="tp-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`tp-modal tp-modal-${size}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="tp-modal-header">
          <h3>{title}</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className="tp-modal-body">{children}</div>
        {footer && <div className="tp-modal-header" style={{ borderTop: '1px solid var(--tp-border-soft)', borderBottom: 'none', top: 'auto', bottom: 0 }}>{footer}</div>}
      </div>
    </div>
  )
}
