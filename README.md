# TourPlan-Landing-page

A Vite + React app with two parts. **No backend, no environment variables, no
database** — everything is front-end only.

- **Marketing landing page** (`/`) — every call-to-action (Start Planning, Log
  in, Generate My Trip, forum & playlist cards, trip packages, partnership
  CTA, final CTA, footer logo) routes into the `/app` product mockup below.
- **Product mockup** (`/app/*`) — a clickable prototype of the customer-facing
  TourPlan product: AI Planner, Trip Result, My Trips, Forum, Profile. All
  data is hand-written fixture data; nothing persists past a page refresh.

## Run locally

```bash
cd landing
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`). Try `/app/planner`
directly to jump straight into the product mockup.

## Deploy to Vercel

This is a standard Vite + React app.

1. Push the repo to GitHub.
2. In Vercel: **New Project** → import the repo.
3. Set **Root Directory** to `landing`.
4. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`.
5. Deploy. `landing/vercel.json` already rewrites all paths to `/index.html`
   so client-side routes like `/app/trips` work on refresh and direct links.

No environment variables are required.

## Structure

```
landing/
  index.html
  src/
    main.jsx              # react-router routes: "/" (landing) and "/app/*" (mockup)
    App.jsx                # composes the landing page, wires CTAs to /app/planner
    styles.css
    components/            # landing page sections
      Navbar / HeroSection / PlannerCard / PlannerPrompt / HowItWorks
      ForumHighlights / PlaylistHighlights / TripPackagesSection
      LocalBusinessPartnershipSection / FAQ / FinalCTA / Footer
      Reveal.jsx           # scroll-in animation + Avatar
      data.js              # all landing page copy
    app/                    # product mockup ("/app/*")
      app.css              # design system for the mockup (tp- prefixed classes)
      mockData.js          # all mockup content: places, trips, forum posts, badges
      AppShell.jsx         # nav shell (desktop top nav / mobile bottom bar)
      pages/               # PlannerPage, TripResultPage, MyTripsPage, ForumPage, ProfilePage...
      components/          # planner/, trip/, trips/, forum/, profile/, shared/
```

To edit the landing page's forum/playlist highlights, change the arrays in
`src/components/data.js`. To edit the product mockup's content (places,
itineraries, forum posts, badges), change `src/app/mockData.js`.
