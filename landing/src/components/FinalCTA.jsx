import { FaArrowRight } from 'react-icons/fa'
import Reveal from './Reveal'

export default function FinalCTA({ onGetStarted }) {
  return (
    <section className="lp-final">
      <Reveal className="lp-final-inner">
        <h2>Ready to plan your next adventure?</h2>
        <p>
          Let TourPlan build your itinerary so you can spend less time planning
          and more time exploring.
        </p>
        <button className="lp-final-btn" onClick={onGetStarted}>
          Start Planning <FaArrowRight />
        </button>
      </Reveal>

      <style>{`
        .lp-final {
          background:
            radial-gradient(700px 300px at 50% 0%, rgba(195,231,186,0.18) 0%, rgba(195,231,186,0) 70%),
            linear-gradient(180deg, #0f3320 0%, #0b2718 100%);
          padding: 80px 24px;
        }
        .lp-final-inner { max-width: 640px; margin: 0 auto; text-align: center; }
        .lp-final-inner h2 {
          margin: 0;
          font-size: 34px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .lp-final-inner p {
          margin: 16px 0 0;
          font-size: 16px;
          line-height: 1.6;
          color: #c3e7ba;
        }
        .lp-final-btn {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: none;
          background: #c3e7ba;
          color: #0f3320;
          font-weight: 800;
          font-size: 15px;
          padding: 14px 30px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .lp-final-btn:hover { background: #d6efce; transform: translateY(-1px); }

        @media (max-width: 640px) {
          .lp-final { padding: 56px 24px; }
          .lp-final-inner h2 { font-size: 27px; }
          .lp-final-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
