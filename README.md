# TourPlan-Landing-page

Standalone marketing landing page for TourPlan. **No backend, no environment
variables, no database.** Every call-to-action sends the visitor to the live
TourPlan MVP.

## Run locally

```bash
cd landing
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

## Configure the MVP link

The only thing you may need to change is `src/config.js`:

```js
export const MVP_URL = 'https://tour-plan-7x3jp1v2r-tour-plan.vercel.app/'
```

Every button (Start Planning, Log in, Generate My Trip, the forum & playlist
cards, the final CTA) navigates here.

> The planner card on the landing page is a **visual preview**. It does not
> collect input, so nothing needs to be passed to the MVP — clicking through
> just opens the app.

## Deploy to Vercel

This is a standard Vite + React app.

1. Push the repo to GitHub.
2. In Vercel: **New Project** → import the repo.
3. Set **Root Directory** to `landing`.
4. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`.
5. Deploy.

No environment variables are required.

## Structure

```
landing/
  index.html
  src/
    main.jsx
    App.jsx              # composes the page, wires CTAs to config.goToApp()
    config.js            # MVP_URL  ← edit this
    styles.css
    components/
      Navbar / HeroSection / PlannerCard / PlannerPrompt / HowItWorks
      ForumHighlights / PlaylistHighlights / FAQ / FinalCTA / Footer
      Reveal.jsx          # scroll-in animation + Avatar
      data.js             # all page copy + the 3 forum / 3 playlist highlights
```

To edit the highlighted forum posts or trip playlists, change the
`FORUM_HIGHLIGHTS` / `TRIP_PLAYLISTS` arrays in `src/components/data.js`.
