import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutUs from './components/AboutUs'
import PlannerPrompt from './components/PlannerPrompt'
import HowItWorks from './components/HowItWorks'
import ForumHighlights from './components/ForumHighlights'
import PlaylistHighlights from './components/PlaylistHighlights'
import TripPackagesSection from './components/TripPackagesSection'
import LocalBusinessPartnershipSection from './components/LocalBusinessPartnershipSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { DEMO_URL } from './components/data'

// Public marketing landing page for TourPlan.
// Standalone — no backend, no auth. Every CTA hands off to the /app product
// mockup (src/app/), not an external MVP deployment.
export default function App() {
  const goToDemo = () => window.location.assign(DEMO_URL)

  return (
    <div className="lp-root">
      <Navbar />
      <main>
        <HeroSection onGetStarted={goToDemo} />
        <PlannerPrompt onGetStarted={goToDemo} />
        <HowItWorks />
        <ForumHighlights onGetStarted={goToDemo} />
        <PlaylistHighlights onGetStarted={goToDemo} />
        <TripPackagesSection onGetStarted={goToDemo} />
        <LocalBusinessPartnershipSection onGetStarted={goToDemo} />
        <FinalCTA onGetStarted={goToDemo} />
        <AboutUs />
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
