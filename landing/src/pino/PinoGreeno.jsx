import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { EXPRESSIONS, WAVING_IMAGE, findAnswer, findContextTip, suggestionsFor } from './pinoData'

const SEEN_KEY = 'tp_pino_seen'

function readLocal(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
function writeLocal(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private browsing or storage disabled — welcome popup just reappears next visit */
  }
}
function readSession(key) {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}
function writeSession(key, value) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    /* ditto */
  }
}

export default function PinoGreeno() {
  const location = useLocation()
  const navigate = useNavigate()

  const [expressionIndex, setExpressionIndex] = useState(0)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [tip, setTip] = useState(null)
  const [messages, setMessages] = useState([
    { from: 'pino', text: "Hi, I'm Pino Greeno! Choose a TourPlan question below and I'll help you out." },
  ])
  const [pos, setPos] = useState(null) // {left, top} once dragged; null = default CSS bottom-right
  const threadRef = useRef(null)
  const widgetRef = useRef(null)
  const dragRef = useRef({ dragging: false, moved: false, startX: 0, startY: 0, startLeft: 0, startTop: 0 })

  // Idle: cycle expression every 5s, forever.
  useEffect(() => {
    const id = setInterval(() => {
      setExpressionIndex((i) => (i + 1) % EXPRESSIONS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  // First-ever visit: pop up the welcome card right away.
  useEffect(() => {
    if (readLocal(SEEN_KEY)) return
    const t = setTimeout(() => setWelcomeOpen(true), 300)
    return () => clearTimeout(t)
  }, [])

  // One contextual tip per route family per session.
  useEffect(() => {
    const found = findContextTip(location.pathname)
    if (!found) {
      setTip(null)
      return
    }
    const key = `tp_pino_tip_${found.prefix}`
    if (readSession(key)) {
      setTip(null)
      return
    }
    const show = setTimeout(() => {
      setTip(found.text)
      writeSession(key, '1')
    }, 900)
    const hide = setTimeout(() => setTip(null), 10000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [location.pathname])

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Keep a dragged position on-screen if the viewport is resized afterwards.
  useEffect(() => {
    function onResize() {
      const el = widgetRef.current
      if (!el) return
      setPos((cur) => {
        if (!cur) return cur
        const rect = el.getBoundingClientRect()
        const maxLeft = Math.max(window.innerWidth - rect.width - 8, 8)
        const maxTop = Math.max(window.innerHeight - rect.height - 8, 8)
        return { left: Math.min(cur.left, maxLeft), top: Math.min(cur.top, maxTop) }
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function dismissWelcome() {
    setWelcomeOpen(false)
    writeLocal(SEEN_KEY, '1')
  }

  function startTour() {
    dismissWelcome()
    navigate('/app/planner')
    setChatOpen(true)
    setMessages((m) => [
      ...m,
      { from: 'pino', text: 'Try Prompt Mode below, describe your trip in plain English, or switch to Guided Mode for a form.' },
    ])
  }

  function toggleChat() {
    setChatOpen((o) => !o)
    setTip(null)
  }

  // Drag the whole widget anywhere on the page. A pointerdown that never
  // moves past the threshold still opens/closes the chat as a normal click.
  function onAvatarPointerDown(e) {
    const el = widgetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    dragRef.current = {
      dragging: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: rect.left,
      startTop: rect.top,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onAvatarPointerMove(e) {
    const d = dragRef.current
    if (!d.dragging) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.moved && Math.hypot(dx, dy) < 4) return
    d.moved = true

    const el = widgetRef.current
    const rect = el.getBoundingClientRect()
    const maxLeft = Math.max(window.innerWidth - rect.width - 8, 8)
    const maxTop = Math.max(window.innerHeight - rect.height - 8, 8)
    const left = Math.min(Math.max(d.startLeft + dx, 8), maxLeft)
    const top = Math.min(Math.max(d.startTop + dy, 8), maxTop)
    setPos({ left, top })
  }

  function onAvatarPointerUp(e) {
    dragRef.current.dragging = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* pointer capture may already be released */
    }
  }

  function onAvatarClick() {
    if (dragRef.current.moved) {
      dragRef.current.moved = false
      return
    }
    toggleChat()
  }

  function ask(text) {
    setMessages((m) => [...m, { from: 'user', text }, { from: 'pino', text: findAnswer(text) }])
  }

  const suggestions = suggestionsFor(location.pathname)

  return (
    <>
      {welcomeOpen && (
        <div className="pg-welcome-overlay" onClick={dismissWelcome}>
          <div className="pg-welcome-bubble" onClick={(e) => e.stopPropagation()}>
            <img src={WAVING_IMAGE} alt="Pino Greeno waving hello" className="pg-welcome-bubble-image" />
            <div className="pg-welcome-cloud">
              <p>Hi, I&apos;m Pino Greeno! Want a quick tour of Prompt Mode, Guided Mode, and editing a trip?</p>
              <div className="pg-welcome-cloud-actions">
                <button className="pg-icon-btn pg-icon-btn-no" onClick={dismissWelcome} aria-label="No thanks">
                  <FaTimes />
                </button>
                <button className="pg-icon-btn pg-icon-btn-yes" onClick={startTour} aria-label="Yes, show me around">
                  <FaCheck />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pg-widget" ref={widgetRef} style={pos ? { left: pos.left, top: pos.top, right: 'auto', bottom: 'auto' } : undefined}>
        {tip && !chatOpen && (
          <button className="pg-tip" onClick={toggleChat}>
            {tip}
          </button>
        )}

        {chatOpen && (
          <div className="pg-panel" role="dialog" aria-label="Chat with Pino Greeno">
            <div className="pg-panel-header">
              <img src={EXPRESSIONS[expressionIndex]} alt="" className="pg-panel-avatar" />
              <div className="pg-panel-heading">
                <strong>Pino Greeno</strong>
                <span>Your TourPlan guide</span>
              </div>
              <button className="pg-panel-close" onClick={() => setChatOpen(false)} aria-label="Close chat">
                <FaTimes />
              </button>
            </div>

            <div className="pg-panel-thread" ref={threadRef}>
              {messages.map((m, i) => (
                <div key={i} className={`pg-msg ${m.from === 'user' ? 'pg-msg-user' : ''}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="pg-panel-suggestions">
              {suggestions.map((t) => (
                <button key={t.id} className="tp-chip" onClick={() => ask(t.question)}>
                  {t.question}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="pg-avatar"
          onClick={onAvatarClick}
          onPointerDown={onAvatarPointerDown}
          onPointerMove={onAvatarPointerMove}
          onPointerUp={onAvatarPointerUp}
          aria-label="Chat with Pino Greeno, your TourPlan guide (drag to move)"
        >
          <img src={EXPRESSIONS[expressionIndex]} alt="" />
        </button>
      </div>
    </>
  )
}
