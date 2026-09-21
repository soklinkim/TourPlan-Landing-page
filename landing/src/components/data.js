// ─────────────────────────────────────────────────────────────────────────────
// Landing page content — marketing / discovery data only.
//
// This is a standalone landing page with no backend, so these are hand-written
// highlights. If you later want them to reflect real MVP data, replace the two
// arrays below with values pulled from your own API / CMS. The section
// components read the keys directly, so keep the shapes stable.
// ─────────────────────────────────────────────────────────────────────────────

// Travel imagery — bundled locally (src/assets/img) so the deployed page makes
// no external image requests and never shows a broken image. Swap the files
// (keep the names) or point these at your own URLs.
import beach from '../assets/img/beach_1.webp'
import foodTable from '../assets/img/food-table.jpg'
import riceTerraces from '../assets/img/rice-terraces.jpg'
import templeGarden from '../assets/img/temple-garden.jpg'
import restaurant from '../assets/img/restaurant.jpg'
import templeOrnate from '../assets/img/temple-ornate.jpg'

export const DEMO_URL = 'https://tour-plan-7x3jp1v2r-tour-plan.vercel.app/'

export const IMG = {
  riverside: beach,
  temple: templeOrnate,
  templeCity: templeGarden,
  market: restaurant,
  food: foodTable,
  scenic: riceTerraces,
}

// ── Forum / community highlights — exactly 3 ─────────────────────────────────
export const FORUM_HIGHLIGHTS = [
  {
    id: 'fh-1',
    category: 'Travel Story',
    title: '3 unforgettable days along the Mekong riverside',
    excerpt:
      'Sunrise at the promenade, a slow lunch in BKK1, and golden hour from a rooftop — here is exactly how we spent our long weekend in Phnom Penh.',
    author: 'wanderlust_kh',
    date: '2026-08-24',
    likes: 88,
    replies: 12,
    cover: IMG.riverside,
  },
  {
    id: 'fh-2',
    category: 'Food',
    title: 'Where to find the best num banh chok in BKK1',
    excerpt:
      'After a week of taste-testing, these are the three stalls locals kept pointing me to. Go early — the good ones sell out before 9am.',
    author: 'foodie_explorer',
    date: '2026-08-28',
    likes: 51,
    replies: 19,
    cover: IMG.market,
  },
  {
    id: 'fh-3',
    category: 'Tips',
    title: 'Best time to visit Phnom Penh in the dry season?',
    excerpt:
      'Planning a first trip and trying to dodge the heat. What months worked best for you, and what should I absolutely not miss?',
    author: 'travelwithme',
    date: '2026-08-30',
    likes: 42,
    replies: 28,
    cover: IMG.scenic,
  },
]

// ── Trip playlist highlights — exactly 3, most-saved first ───────────────────
export const TRIP_PLAYLISTS = [
  {
    id: 'pl-1',
    title: '3 Days in Phnom Penh',
    destination: 'Phnom Penh',
    days: 3,
    places: 12,
    creator: 'Sopheak',
    tags: ['Culture', 'Food', 'Riverside'],
    saves: 1240,
    cover: IMG.templeCity,
  },
  {
    id: 'pl-2',
    title: 'Phnom Penh Food Crawl',
    destination: 'Phnom Penh',
    days: 2,
    places: 9,
    creator: 'Dara',
    tags: ['Food', 'Street Food', 'Cafés'],
    saves: 980,
    cover: IMG.food,
  },
  {
    id: 'pl-3',
    title: 'Riverside & Temples Weekend',
    destination: 'Phnom Penh',
    days: 2,
    places: 8,
    creator: 'Mealea',
    tags: ['Culture', 'Relaxed', 'Heritage'],
    saves: 760,
    cover: IMG.temple,
  },
]

// ── Trip packages — curated, ready-made experiences (mock data, UI only) ─────
export const TRIP_PACKAGES = [
  {
    id: 'tp-1',
    title: 'Daun Penh Full-Day Experience',
    location: 'Phnom Penh',
    description:
      "Explore culture, local food, cafés, and the city's highlights in one curated day.",
    duration: '1 Day',
    rating: 4.8,
    price: 'From $35 / person',
    cover: IMG.templeCity,
  },
  {
    id: 'tp-2',
    title: 'Phnom Penh Food & Café Day',
    location: 'Phnom Penh',
    description:
      'A curated day of local flavors, popular cafés, and hidden food spots.',
    duration: '1 Day',
    rating: 4.7,
    price: 'From $28 / person',
    cover: IMG.food,
  },
  {
    id: 'tp-3',
    title: 'Weekend Escape',
    location: 'Cambodia',
    description:
      'A relaxed weekend experience combining local attractions, food, and activities.',
    duration: '2 Days',
    rating: 4.9,
    price: 'From $45 / person',
    cover: IMG.scenic,
  },
]

// ── Local business partnership — collage tiles + benefits (mock data, UI only) ─
export const PARTNER_TILES = [
  { id: 'pt-1', label: 'Café', cover: IMG.food },
  { id: 'pt-2', label: 'Restaurant', cover: IMG.market },
  { id: 'pt-3', label: 'Local Experience', cover: IMG.riverside },
  { id: 'pt-4', label: 'Activity', cover: IMG.scenic },
]

export const PARTNER_BENEFITS = [
  {
    id: 'pb-1',
    title: 'Reach More Travelers',
    body: 'Get discovered by travelers actively planning their next experience.',
  },
  {
    id: 'pb-2',
    title: 'Be Part of Curated Trips',
    body: "Your business can become part of TourPlan's recommended experiences and trip packages.",
  },
  {
    id: 'pb-3',
    title: 'Connect With New Customers',
    body: 'Turn traveler discovery into real opportunities for your local business.',
  },
]

// ── How it works ────────────────────────────────────────────────────────────
export const STEPS = [
  {
    num: '01',
    title: 'Tell us your trip',
    body: 'Choose your destination, budget, interests, travel pace, and preferences.',
  },
  {
    num: '02',
    title: 'Let AI build your itinerary',
    body: 'TourPlan creates a personalized day-by-day travel plan.',
  },
  {
    num: '03',
    title: 'Explore, edit & share',
    body: 'Discover places, manage your trip, and share your travel experiences with the community.',
  },
]

// ── FAQ — answers reflect real MVP capabilities only ────────────────────────
export const FAQS = [
  {
    q: 'What is TourPlan?',
    a: 'TourPlan is an AI-powered travel planning platform that helps travelers create personalized itineraries based on their destination, budget, interests, and travel preferences.',
  },
  {
    q: 'How does TourPlan create my itinerary?',
    a: 'You share a few details about your trip — either by describing it in Prompt Mode or answering a short set of questions in Guided Mode — and TourPlan uses AI to generate a personalized day-by-day itinerary.',
  },
  {
    q: 'Do I need an account to create a trip?',
    a: 'Yes. Starting the trip planning process takes you to the TourPlan sign-in page, where you can create a free account or log in.',
  },
  {
    q: 'Can I customize my itinerary?',
    a: 'Yes. After TourPlan generates your plan you can refine it with AI, edit trip details, reorder places, and adjust the number of days from the trip view.',
  },
  {
    q: 'Can I share my trip?',
    a: 'Yes. You can share an itinerary with the community as a trip playlist that other travelers can browse and save.',
  },
  {
    q: 'Can I discover trips created by other travelers?',
    a: 'Yes. TourPlan includes a community forum and trip playlists where travelers share stories, recommendations, and full itineraries you can explore for inspiration.',
  },
]

// ── Planner card preview values (visual reference to the real planner) ──────
export const PLANNER_PREVIEW = {
  destination: 'Phnom Penh',
  duration: '3 Days',
  travelers: '2 Travelers',
  budget: '$30/day',
  pace: 'Relaxed',
  interests: ['Culture & History', 'Local Khmer Food'],
}

// ── Small formatting helpers shared by the section components ───────────────
export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function compact(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}
