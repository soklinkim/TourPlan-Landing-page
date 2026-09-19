export default function EmptyState({ icon, title, body, action }) {
  return (
    <div className="tp-empty">
      {icon}
      <h4>{title}</h4>
      {body && <p>{body}</p>}
      {action}
    </div>
  )
}
