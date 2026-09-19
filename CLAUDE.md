# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Vite + React 19 project with two parts, both **front-end only — no backend,
no environment variables, no database**:

1. **The marketing landing page** at `/` (`src/App.jsx` + `src/components/`).
   Every call-to-action navigates into the `/app` product mockup (`navigate('/app/planner')`
   in `App.jsx`). There is no external MVP deployment link anymore — that was
   removed along with `src/config.js` when the CTAs were rewired to route
   internally.
2. **A clickable product mockup** at `/app/*` (`src/app/`) covering the
   customer-facing side of the real TourPlan product (AI Planner, Trip
   Result, My Trips, Forum, Profile) per the product functions spec. This is
   a front-end prototype only: all data is hand-written fixture data in
   `src/app/mockData.js`, and nothing persists past a page refresh.
3. **Pino Greeno** (`src/pino/`) — a mascot/guide widget rendered once in
   `main.jsx` as a sibling of `<Routes>`, so it persists across the landing
   page and every `/app/*` screen. See below.

The actual app lives in the `landing/` subdirectory, not the repo root.

## Pino Greeno (mascot widget)

`src/pino/PinoGreeno.jsx` + `pinoData.js` + `pino.css` (class prefix `pg-`).
Expression sprites are standalone PNGs in `src/assets/pino-greeno/expressions/`
(`pino-happy.png`, `pino-hero.png`, `pino-laughing.png`, `pino-reading.png`,
`pino-serious.png`, `pino-surprised.png`, `pino-thinking-1.png`,
`pino-thinking-2.png`, `pino-winking.png`), imported and named per-pose in
`pinoData.js` (e.g. `pino-serious.png` is imported as `confident`,
`pino-thinking-2.png` as `curious` — the import name is the semantic role,
not the filename). They're downscaled to 360px on the long edge (originals
were ~1250px full-character renders); if new art is dropped in, resize it the
same way before committing, there's no build-time image pipeline for this.
`WAVING_IMAGE` (used in the welcome bubble) reuses the `happy` sprite
(`pino-happy.png`) rather than the older `pino-greeno.jpg` in the parent
folder — that file is a flat-background JPG with no alpha channel, which
showed as a visible white box once the welcome bubble's image grew past
~100px. `pino-greeno.jpg` is still on disk (unreferenced) in case it's
needed for something non-transparent later.

- **Idle**: a floating avatar (default bottom-right, all pages), shown at its
  natural transparent-PNG silhouette (no circular crop/border), cycles
  through `EXPRESSIONS` every 5s via `setInterval`, plus a continuous
  `pg-float` CSS animation (small constant motion, not a bounce) that's
  disabled under `prefers-reduced-motion`.
- **Draggable**: pointer handlers on the avatar (`onAvatarPointerDown/Move/Up`
  in `PinoGreeno.jsx`) let visitors drag it anywhere in the viewport; a move
  under a 4px threshold is still treated as a click (opens/closes chat), past
  that it repositions instead. Position is plain React state (`pos`), not
  persisted anywhere — it resets to the default corner on reload. `.pg-widget`
  has no explicit size so it shrink-wraps to just the avatar; the tip and
  chat panel are `position: absolute` against that box (not stacked in flow
  above it), so dragging behaves the same whether one of them is open or not,
  and they always reopen anchored to wherever Pino currently is. The welcome
  popup (below) is deliberately NOT part of this box — it's centered on the
  page independent of wherever the avatar has been dragged to.
- **First visit**: a `pg-welcome-overlay` (dimmed backdrop, `rgba` green tint,
  click to dismiss) centers `pg-welcome-bubble` — Pino's waving image next to
  a speech bubble with a CSS-drawn pointed tail — in the middle of the
  viewport, gated by `localStorage['tp_pino_seen']`. Its two circular icon
  buttons are a cross (dismiss) and a check (`startTour()`: navigates to
  `/app/planner` and opens the chat panel with a starter tip). This does use
  a dimming backdrop (unlike the tip/chat panel), but still not the shared
  `Modal` component — it's Pino-and-bubble centered directly on a custom
  overlay, not a white card.
- **Contextual tips**: `findContextTip()` in `pinoData.js` maps route
  prefixes (`/app/planner`, `/app/trip/`, `/app/trips`, `/app/forum`,
  `/app/profile`) to a one-line tip shown as a speech bubble once per route
  per browser tab (`sessionStorage`), then auto-hides.
- **Chat**: clicking the avatar opens a panel with a few route-relevant
  suggestion chips (`suggestionsFor()`) plus free text. Answers are rule-based
  keyword matching (`HELP_TOPICS` in `pinoData.js`) against a fixed set of
  topics (Prompt Mode, Guided Mode, packages, editing a trip, replacing a
  place, My Trips, Forum) with a fallback answer — same "mock AI" pattern as
  `PromptMode.jsx`'s `detectIntent()`, not a real backend call.

## The `/app` product mockup

Routing lives in `src/main.jsx` (`react-router-dom`, `BrowserRouter`).
`AppShell.jsx` is the layout (top nav desktop / bottom tab bar mobile) that
wraps every `/app/*` route via `<Outlet />`.

- **`src/app/mockData.js`** is the single source of truth for prototype
  content: `PLACES` (businesses/spots, with atmosphere tags, preference
  match, crowd level and seat availability — covers the "Preference-Based
  Suggestion" and "Crowd Level Radar" functions), `TRIPS` (itineraries by
  day/slot), `FORUM_POSTS` + `FORUM_AUTHORS`, `BADGES`, `CURRENT_USER`. Page
  components read these shapes directly; there is no API layer to swap in
  later without touching the components too, since this is intentionally a
  mockup and not an early real implementation.
- **`src/app/app.css`** is one consolidated stylesheet (class prefix `tp-`)
  for the whole `/app` surface, unlike the landing page's per-component
  inline `<style>` blocks (prefix `lp-`) — there are too many product screens
  for that pattern to stay maintainable. Both share the same brand tokens
  (green/cream, Poppins, `react-icons/fa`).
- **Pages** (`src/app/pages/`): `PlannerPage`, `TripResultPage`
  (day-tabbed itinerary timeline + a mock map — no real map API/key, so pins
  are positioned by percentage coordinates on a static image), `MyTripsPage`
  (All/Upcoming/Saved/Past tabs, saved-from-community toggle), `ForumPage`
  (create-post composer covering all post types, filterable feed), `ProfilePage`
  / `PublicProfilePage`.
- **Planner flow**: Prompt Mode (a large ChatGPT-style composer; free text is
  parsed by a rule-based `detectIntent()` in `PromptMode.jsx` for days/
  travelers/budget/pace/interests — there is no real NLP/AI call) and Guided
  Mode (a form) both call `PlannerPage`'s `handleGenerate(overrides)`, which
  shows a `GeneratingOverlay` and then `PackageOptions` — 3 pre-built trip
  packages from `PACKAGES` in `mockData.js`, 2 free and 1 paid. Selecting a
  free package navigates straight to its `TripResultPage`; the paid one opens
  `PaywallModal` (a mock checkout with no real charge) and only navigates
  after "payment". `overrides` (budget/pace/travelers) ride along via
  `navigate(..., { state: { overrides } })` and get merged onto the trip in
  `TripResultPage`'s initial state — real tailoring, not just cosmetic text.
- `PLACES` in `mockData.js` has two tiers: the original fictional itinerary
  places (local bundled images) used by `TRIPS['t-highlights']` etc., and a
  second set of real Phnom Penh venues (BKK1/Daun Penh, from a places dataset)
  used only by the 3 planner packages — those use `picsum.photos` seeded
  placeholder images since there's no bundled photography for them.
- Trip customization (Customize trip, Replace place, cover photo cycling,
  inline title edit) mutates a local `useState` copy of the trip in
  `TripResultPage`, not the `mockData.js` fixtures — refreshing the page
  reverts it. Same for `PlannerPage`'s package-unlock state.

## Commands

All commands run from `landing/`:

```bash
cd landing
npm install
npm run dev       # Vite dev server, default http://localhost:5173
npm run build     # production build to landing/dist
npm run preview   # preview the production build
```

There is no lint or test script configured in this project.

## Architecture

- **`App.jsx`** defines `goToApp = () => navigate('/app/planner')` (via
  `react-router-dom`'s `useNavigate`) and passes it down as `onGetStarted`/
  `onLogin` to every section that has a CTA, then imports and stacks section
  components in order inside `<main>`. To add/remove/reorder a section, this
  is the only place to touch. Global page-level CSS (the reveal animation
  classes, section max-width) is inlined in a `<style>` tag here; `styles.css`
  only has element resets. The Footer's logo link uses `<Link>` directly
  rather than the `goToApp` prop.
- **`src/components/data.js`** centralizes all marketing copy and content
  arrays (`FORUM_HIGHLIGHTS`, `TRIP_PLAYLISTS`, etc.) and the `IMG` map of
  bundled local images (`src/assets/img/`, imported so the deployed page makes
  no external image requests). Section components read these shapes directly
  — when editing content, change the data here rather than the components.
- **`Reveal.jsx`** provides the scroll-in fade/rise animation (via
  `IntersectionObserver`, with a 4s safety-net timeout and a
  `prefers-reduced-motion` bypass) used by most sections, plus an `Avatar`
  initials-avatar helper used by the forum/community highlight cards.
- Each section under `src/components/` (`Navbar`, `HeroSection`,
  `PlannerCard`/`PlannerPrompt`, `HowItWorks`, `ForumHighlights`,
  `PlaylistHighlights`, `TripPackagesSection`,
  `LocalBusinessPartnershipSection`, `FAQ`, `FinalCTA`, `Footer`) is
  self-contained and receives its CTA handler as a prop from `App.jsx`.
- The planner card on the page is a **visual preview only** — it collects no
  input; clicking through just opens the `/app` planner.
- `postcss.config.js` is intentionally an empty export — it exists only to
  stop PostCSS from walking up and picking up a parent-repo config; this app
  uses plain CSS, no Tailwind/PostCSS plugins.

## Deployment

Deployed on Vercel with **Root Directory set to `landing`**, framework preset
Vite, build command `npm run build`, output directory `dist`. No environment
variables required. `landing/vercel.json` rewrites all paths to `/index.html`
so client-side routes (e.g. `/app/trips`) work on refresh and direct links.
