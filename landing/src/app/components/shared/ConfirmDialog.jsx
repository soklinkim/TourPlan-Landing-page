import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, title, body, confirmLabel = 'Confirm', danger = false, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p style={{ marginTop: 0, color: 'var(--tp-text-muted)', fontSize: 14 }}>{body}</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button className="tp-btn tp-btn-ghost" onClick={onClose}>Cancel</button>
        <button
          className={`tp-btn ${danger ? 'tp-btn-danger' : 'tp-btn-primary'}`}
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
