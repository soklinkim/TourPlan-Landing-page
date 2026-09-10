// ─────────────────────────────────────────────────────────────────────────────
// The one thing you may need to change.
//
// Every call-to-action on the landing page (Start Planning, Log in,
// Generate My Trip, the forum + playlist cards, the final CTA) sends the
// visitor to this URL — your live TourPlan MVP.
// ─────────────────────────────────────────────────────────────────────────────
export const MVP_URL = 'https://tour-plan-7x3jp1v2r-tour-plan.vercel.app/'

// Send the visitor to the MVP. Full-page navigation (not a new tab) so it
// feels like one product.
export function goToApp() {
  window.location.href = MVP_URL
}
