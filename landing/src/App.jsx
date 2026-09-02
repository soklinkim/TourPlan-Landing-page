import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PlannerPrompt from './components/PlannerPrompt'
import HowItWorks from './components/HowItWorks'
import ForumHighlights from './components/ForumHighlights'
import PlaylistHighlights from './components/PlaylistHighlights'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { goToApp } from './config'

// Public marketing landing page for TourPlan.
// Standalone — no backend, no auth. Every CTA hands off to the live MVP
// (see src/config.js).
export default function App() {
  return (
    <div className="lp-root">
      <Navbar onGetStarted={goToApp} onLogin={goToApp} />
      <main>
        <HeroSection onGetStarted={goToApp} />
        <PlannerPrompt onGetStarted={goToApp} />
        <HowItWorks />
        <ForumHighlights onGetStarted={goToApp} />
        <PlaylistHighlights onGetStarted={goToApp} />
        <FAQ />
        <FinalCTA onGetStarted={goToApp} />
      </main>
      <Footer />

      <style>{`
        .lp-root {
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          color: #374151;
          background: #f8faf8;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .lp-section { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

        .lp-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          will-change: opacity, transform;
        }
        .lp-reveal-in { opacity: 1; transform: none; }

        @media (prefers-reduced-motion: reduce) {
          .lp-reveal { opacity: 1 !important; transform: none !important; transition: none; }
        }
      `}</style>
    </div>
  )
}
