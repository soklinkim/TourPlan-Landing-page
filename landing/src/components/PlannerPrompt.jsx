import PlannerCard from './PlannerCard'
import Reveal from './Reveal'

export default function PlannerPrompt({ onGetStarted }) {
  return (
    <section className="lp-prompt" id="planner">
      <div className="lp-prompt-inner">
        <Reveal className="lp-prompt-copy">
          <h2>Tell us what kind of trip you want.</h2>
          <p>Start with a few details and let TourPlan build your itinerary.</p>
          <ul>
            <li>Switch between <strong>Prompt Mode</strong> and <strong>Guided Mode</strong></li>
            <li>Set your destination, dates, budget and travel pace</li>
            <li>Pick the interests, food and vibes you care about</li>
          </ul>
        </Reveal>

        <Reveal className="lp-prompt-card" delay={100}>
          <PlannerCard onGetStarted={onGetStarted} variant="full" />
        </Reveal>
      </div>

      <style>{`
        .lp-prompt {
          background: linear-gradient(180deg, #0f3320 0%, #0b2718 100%);
          padding: 72px 0;
        }
        .lp-prompt-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .lp-prompt-copy, .lp-prompt-card { min-width: 0; }
        .lp-prompt-copy h2 {
          margin: 0;
          font-size: 34px;
          line-height: 1.15;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .lp-prompt-copy p {
          margin: 16px 0 0;
          font-size: 16px;
          line-height: 1.6;
          color: #c3e7ba;
        }
        .lp-prompt-copy ul {
          margin: 22px 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .lp-prompt-copy li {
          position: relative;
          padding-left: 24px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.5;
        }
        .lp-prompt-copy li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c3e7ba;
        }
        .lp-prompt-copy strong { color: #fff; font-weight: 700; }

        @media (max-width: 900px) {
          .lp-prompt { padding: 52px 0; }
          .lp-prompt-inner { grid-template-columns: 1fr; gap: 32px; }
          .lp-prompt-copy h2 { font-size: 27px; }
          .lp-prompt-card { max-width: 460px; width: 100%; margin-inline: auto; }
        }
      `}</style>
    </section>
  )
}
