import { FaMapMarkedAlt, FaRobot, FaShareSquare } from 'react-icons/fa'
import { STEPS } from './data'
import Reveal from './Reveal'

const ICONS = [FaMapMarkedAlt, FaRobot, FaShareSquare]

export default function HowItWorks() {
  return (
    <section className="lp-how" id="how-it-works">
      <div className="lp-section">
        <Reveal className="lp-how-head">
          <h2>How TourPlan works</h2>
        </Reveal>
        <div className="lp-how-grid">
          {STEPS.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal className="lp-how-card" key={s.num} delay={i * 90}>
                <div className="lp-how-icon">
                  <Icon />
                </div>
                <div className="lp-how-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>

      <style>{`
        .lp-how { padding: 76px 0; background: #f8faf8; }
        .lp-how-head { text-align: center; margin-bottom: 40px; }
        .lp-how-head h2 {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .lp-how-card {
          background: #fff;
          border: 1px solid #e6eee3;
          border-radius: 16px;
          padding: 28px 24px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lp-how-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(15, 51, 32, 0.08);
        }
        .lp-how-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #edf6eb;
          color: #174222;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .lp-how-num {
          margin-top: 18px;
          font-size: 13px;
          font-weight: 800;
          color: #9ca3af;
          letter-spacing: 0.08em;
        }
        .lp-how-card h3 {
          margin: 6px 0 0;
          font-size: 17px;
          font-weight: 700;
          color: #0f3320;
        }
        .lp-how-card p {
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.6;
          color: #6b7280;
        }
        @media (max-width: 860px) {
          .lp-how { padding: 52px 0; }
          .lp-how-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
