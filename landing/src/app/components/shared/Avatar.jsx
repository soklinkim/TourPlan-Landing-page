const AVATAR_COLORS = ['#174222', '#2d5a2d', '#ff6b35', '#4ecdc4', '#a855f7', '#2563eb']

export default function Avatar({ name, size = 36 }) {
  const color = AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length]
  const initials = name ? name.trim().slice(0, 1).toUpperCase() : '?'
  return (
    <div
      className="tp-avatar"
      style={{ width: size, height: size, background: color, fontSize: size * 0.42 }}
    >
      {initials}
    </div>
  )
}
