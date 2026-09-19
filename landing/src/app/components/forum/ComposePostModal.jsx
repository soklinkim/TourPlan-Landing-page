import { useEffect, useState } from 'react'
import Modal from '../shared/Modal'

const TABS = ['status', 'discussion', 'photo', 'poll', 'event']
const TAB_LABEL = { status: 'Status', discussion: 'Discussion', photo: 'Photo', poll: 'Poll', event: 'Event' }

export default function ComposePostModal({ open, initialType, onClose, onSubmit }) {
  const [type, setType] = useState(initialType || 'status')
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')

  useEffect(() => {
    if (open) setType(initialType || 'status')
  }, [open, initialType])

  function reset() {
    setBody('')
    setTitle('')
    setLocation('')
    setPollOptions(['', ''])
    setEventDate('')
    setEventTime('')
  }

  function submit(e) {
    e.preventDefault()
    if (type === 'poll') {
      const options = pollOptions.filter((o) => o.trim())
      if (options.length < 2) return
      onSubmit({ type, question: title || 'Untitled poll', options })
    } else if (type === 'event') {
      if (!title.trim()) return
      onSubmit({ type, title, eventDate, eventTime, location, body })
    } else if (type === 'discussion') {
      if (!title.trim() && !body.trim()) return
      onSubmit({ type, title: title || 'Untitled discussion', body, tags: [] })
    } else if (type === 'photo') {
      if (!body.trim()) return
      onSubmit({ type, caption: body, location })
    } else {
      if (!body.trim()) return
      onSubmit({ type, body })
    }
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Create post" size="md">
      <div className="tp-tabs" style={{ marginBottom: 18 }}>
        {TABS.map((t) => (
          <button key={t} type="button" className={`tp-tab ${type === t ? 'tp-active' : ''}`} onClick={() => setType(t)}>
            {TAB_LABEL[t]}
          </button>
        ))}
      </div>

      <form onSubmit={submit}>
        {(type === 'discussion' || type === 'event') && (
          <div className="tp-field">
            <label htmlFor="cp-title">Title</label>
            <input id="cp-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={type === 'event' ? 'Event name' : 'Give it a title'} />
          </div>
        )}

        {type === 'poll' && (
          <div className="tp-field">
            <label htmlFor="cp-question">Question</label>
            <input id="cp-question" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ask the community something" />
            {pollOptions.map((opt, i) => (
              <input
                key={i}
                value={opt}
                onChange={(e) => setPollOptions((cur) => cur.map((o, idx) => (idx === i ? e.target.value : o)))}
                placeholder={`Option ${i + 1}`}
                style={{ marginTop: 8 }}
              />
            ))}
            <button type="button" className="tp-btn tp-btn-ghost tp-btn-sm" style={{ marginTop: 8, alignSelf: 'flex-start' }} onClick={() => setPollOptions((cur) => [...cur, ''])}>
              Add option
            </button>
          </div>
        )}

        {type === 'event' && (
          <>
            <div className="tp-form-row">
              <div className="tp-field">
                <label htmlFor="cp-date">Date</label>
                <input id="cp-date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div className="tp-field">
                <label htmlFor="cp-time">Time</label>
                <input id="cp-time" type="text" placeholder="5:00 PM - 10:00 PM" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
              </div>
            </div>
            <div className="tp-field">
              <label htmlFor="cp-location">Location</label>
              <input id="cp-location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </>
        )}

        {type === 'photo' && (
          <div className="tp-field">
            <label>Photos</label>
            <div className="tp-photo-upload-placeholder">This mockup doesn&apos;t upload real files, your caption below will post with sample photos.</div>
            <label htmlFor="cp-location-photo" style={{ marginTop: 10 }}>Location tag</label>
            <input id="cp-location-photo" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where was this?" />
          </div>
        )}

        {type !== 'poll' && (
          <div className="tp-field">
            <label htmlFor="cp-body">{type === 'photo' ? 'Caption' : type === 'event' ? 'Details' : type === 'discussion' ? 'Details' : 'What\'s on your mind?'}</label>
            <textarea id="cp-body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
        )}

        <button type="submit" className="tp-btn tp-btn-primary tp-btn-block">
          Post
        </button>
      </form>
    </Modal>
  )
}
