import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import Modal from '../shared/Modal'
import Avatar from '../shared/Avatar'
import { FORUM_AUTHORS, CURRENT_USER } from '../../mockData'

export default function CommentModal({ post, open, onClose, onAddComment }) {
  const [text, setText] = useState('')
  if (!post) return null

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAddComment(post.id, text.trim())
    setText('')
  }

  return (
    <Modal open={open} onClose={onClose} title="Comments" size="sm">
      {post.comments.length === 0 ? (
        <p className="tp-field-hint">No comments yet. Be the first to reply.</p>
      ) : (
        <div className="tp-comment-list">
          {post.comments.map((c) => {
            const author = c.author === 'dara.explores' ? CURRENT_USER : FORUM_AUTHORS[c.author]
            return (
              <div key={c.id} className="tp-comment">
                <Avatar name={author.displayName} size={30} />
                <div>
                  <strong>{author.displayName}</strong>
                  <p>{c.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <form className="tp-prompt-input" style={{ padding: 0, marginTop: 16, borderTop: 'none' }} onSubmit={submit}>
        <input placeholder="Write a reply..." value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="tp-btn-icon" disabled={!text.trim()} aria-label="Send reply">
          <FaPaperPlane />
        </button>
      </form>
    </Modal>
  )
}
