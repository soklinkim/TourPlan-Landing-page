import { useEffect, useRef, useState } from 'react'

// Subtle fade / rise as sections enter the viewport. Respects reduced-motion
// via the .lp-reveal CSS in App.jsx.
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', immediate = false }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => immediate || typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (shown) return
    const el = ref.current
    const reveal = () => setShown(true)

    if (!el || typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }
    // Already on (or near) screen at mount — reveal without waiting for a scroll.
    if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
      reveal()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          io.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 10% 0px' }
    )
    io.observe(el)

    // Safety net: content must never stay hidden if the observer misbehaves.
    const t = setTimeout(reveal, 4000)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [shown])

  return (
    <Tag
      ref={ref}
      className={`lp-reveal ${shown ? 'lp-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

// Initials avatar.
const AVATAR_COLORS = ['#ff6b35', '#4ecdc4', '#a855f7', '#2d5a2d', '#e11d48']
export function Avatar({ name, size = 32 }) {
  const color = AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length] || '#2d5a2d'
  const initials = name ? name.slice(0, 1).toUpperCase() : 'A'
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}
