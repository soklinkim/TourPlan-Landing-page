// ─────────────────────────────────────────────────────────────────────────────
// Pino Greeno — the site-wide mascot/guide. Expression sprites are standalone
// PNGs in src/assets/pino-greeno/expressions/ (one file per pose).
// ─────────────────────────────────────────────────────────────────────────────

import happy from '../assets/pino-greeno/expressions/pino-happy.png'
import thinking from '../assets/pino-greeno/expressions/pino-thinking-1.png'
import excited from '../assets/pino-greeno/expressions/pino-hero.png'
import reading from '../assets/pino-greeno/expressions/pino-reading.png'
import winking from '../assets/pino-greeno/expressions/pino-winking.png'
import surprised from '../assets/pino-greeno/expressions/pino-surprised.png'
import confident from '../assets/pino-greeno/expressions/pino-serious.png'
import curious from '../assets/pino-greeno/expressions/pino-thinking-2.png'
import laughing from '../assets/pino-greeno/expressions/pino-laughing.png'

// Reuses the "happy" (waving) sprite — same pose as pino-greeno.jpg, but a
// transparent PNG instead of a flat-background JPG, so it doesn't show a
// white box at the larger sizes the welcome bubble displays it at.
export const WAVING_IMAGE = happy

// Cycled for the idle floating avatar, roughly alternating calm / lively poses.
export const EXPRESSIONS = [
  happy,
  curious,
  winking,
  excited,
  thinking,
  confident,
  laughing,
  reading,
  surprised,
]

export const HELP_TOPICS = [
  {
    id: 'prompt-mode',
    match: /prompt mode|prompt|chat|type/i,
    question: 'How does Prompt Mode work?',
    answer:
      'Just type what you want in plain English, like "3 days, love food and temples". I\'ll match it to a budget, pace and interests, then show you trip packages, no forms needed.',
  },
  {
    id: 'guided-mode',
    match: /guided mode|guided|form/i,
    question: "What's Guided Mode?",
    answer:
      'Guided Mode is a short form instead of a chat: dates, travelers, budget, interests, pace and stay type. Good if you already know exactly what you want.',
  },
  {
    id: 'packages',
    match: /package|pricing|pay|unlock|free|premium|cost/i,
    question: 'What are trip packages?',
    answer:
      "After you plan a trip I'll show you 3 ready-made packages. Two are free, and one premium package unlocks for a small one-time fee.",
  },
  {
    id: 'edit-trip',
    match: /edit|customize|change|modify|adjust/i,
    question: 'How do I edit my trip?',
    answer:
      'Open a trip and hit "Customize trip" to change dates, budget or pace, or click the small swap icon on any place card to replace it with something similar.',
  },
  {
    id: 'replace-place',
    match: /replace|swap|remove a place|alternative/i,
    question: 'Can I swap out a place?',
    answer: "Yes — click the swap icon next to any stop in your itinerary and I'll show you similar alternatives nearby.",
  },
  {
    id: 'my-trips',
    match: /my trips|saved|upcoming|past trip/i,
    question: 'Where do I find my saved trips?',
    answer: 'Head to "My Trips" in the top nav. You can filter by Upcoming, Saved and Past, and see trips saved from the community too.',
  },
  {
    id: 'forum',
    match: /forum|community|post|share/i,
    question: 'What can I do in the Forum?',
    answer: 'Share a trip as a "playlist", post photos or a discussion, run a poll, or just browse what other travelers have planned.',
  },
]

export const FALLBACK_ANSWER =
  "I'm still learning that one! Try asking about Prompt Mode, Guided Mode, trip packages, or editing a trip."

// One-time contextual tips, keyed by route. Prefix-matched so /app/trip/:id
// all share the same tip.
export const CONTEXT_TIPS = [
  { prefix: '/app/planner', text: 'New here? Try Prompt Mode for a quick chat, or Guided Mode if you prefer a form.' },
  { prefix: '/app/trip/', text: 'Tap "Customize trip" to adjust dates and budget, or the swap icon to replace any stop.' },
  { prefix: '/app/trips', text: 'Use the tabs to filter Upcoming, Saved and Past trips, or open one to see the full itinerary.' },
  { prefix: '/app/forum', text: 'Try "Share a trip" to publish one of your itineraries as a playlist the community can see.' },
  { prefix: '/app/profile', text: 'Edit your profile, check your badges, or see the trips you\'ve shared here.' },
]

export function findContextTip(pathname) {
  return CONTEXT_TIPS.find((t) => pathname.startsWith(t.prefix))
}

export function findAnswer(text) {
  const topic = HELP_TOPICS.find((t) => t.match.test(text))
  return topic ? topic.answer : FALLBACK_ANSWER
}

const SUGGESTIONS_BY_PREFIX = [
  { prefix: '/app/trip/', ids: ['edit-trip', 'replace-place', 'packages'] },
  { prefix: '/app/trips', ids: ['my-trips', 'edit-trip', 'packages'] },
  { prefix: '/app/forum', ids: ['forum', 'my-trips', 'prompt-mode'] },
  { prefix: '/app/planner', ids: ['prompt-mode', 'guided-mode', 'packages'] },
]
const DEFAULT_SUGGESTIONS = ['prompt-mode', 'guided-mode', 'edit-trip']

export function suggestionsFor(pathname) {
  const match = SUGGESTIONS_BY_PREFIX.find((s) => pathname.startsWith(s.prefix))
  const ids = match ? match.ids : DEFAULT_SUGGESTIONS
  return ids.map((id) => HELP_TOPICS.find((t) => t.id === id)).filter(Boolean)
}
