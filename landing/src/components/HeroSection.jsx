import { FaArrowRight, FaRobot } from 'react-icons/fa'
import PlannerCard from './PlannerCard'
import Reveal from './Reveal'

export default function HeroSection({ onGetStarted }) {
  function exploreTrips(e) {
    e.preventDefault()
    document.querySelector('#playlists')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="lp-hero" id="top">
      <div className="lp-hero-inner">
        <Reveal className="lp-hero-copy" immediate>
          <span className="lp-hero-badge">
            <FaRobot /> AI travel planning
          </span>
          <h1>Plan your next trip with AI.</h1>
          <p>
            Tell TourPlan where you want to go, what you enjoy, and how you like to travel —
            and get a personalized itinerary in seconds.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-primary lp-btn-lg" onClick={onGetStarted}>
              Start Planning <FaArrowRight />
            </button>
            <a href="#playlists" className="lp-btn-ghost lp-btn-lg" onClick={exploreTrips}>
              Explore Trips
            </a>
          </div>
        </Reveal>

        <Reveal className="lp-hero-visual" delay={120} immediate>
          <PlannerCard onGetStarted={onGetStarted} variant="compact" />
        </Reveal>
      </div>

      <style>{`
        .lp-hero {
          position: relative;
          background:
            radial-gradient(1200px 500px at 15% -10%, #eaf5e6 0%, rgba(234,245,230,0) 60%),
            radial-gradient(900px 500px at 100% 0%, #e6f0ff 0%, rgba(230,240,255,0) 55%),
            #f8faf8;
          overflow: hidden;
        }
        .lp-hero-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 64px 24px 72px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
        }
        .lp-hero-copy, .lp-hero-visual { min-width: 0; }
        .lp-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #edf6eb;
          color: #174222;
          border: 1px solid #c8e6c0;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 700;
        }
        .lp-hero-copy h1 {
          margin: 18px 0 0;
          font-size: 48px;
          line-height: 1.08;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-hero-copy p {
          margin: 18px 0 0;
          font-size: 17px;
          line-height: 1.6;
          color: #4b5563;
          max-width: 30rem;
        }
        .lp-hero-actions {
          margin-top: 28px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .lp-btn-lg {
          font-size: 15px;
          padding: 14px 26px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }
        .lp-btn-primary {
          border: none;
          background: #174222;
          color: #fff;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .lp-btn-primary:hover { background: #0f3320; transform: translateY(-1px); }
        .lp-btn-ghost {
          border: 1px solid #dbe8d9;
          background: #fff;
          color: #174222;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .lp-btn-ghost:hover { border-color: #2d5a2d; background: #f0f7ee; }

        @media (max-width: 900px) {
          .lp-hero-inner {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 44px 24px 52px;
          }
          .lp-hero-copy h1 { font-size: 36px; }
          .lp-hero-copy p { font-size: 16px; }
          .lp-hero-visual { max-width: 460px; width: 100%; margin-inline: auto; }
        }
        @media (max-width: 480px) {
          .lp-hero-copy h1 { font-size: 30px; }
          .lp-hero-actions .lp-btn-lg { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
