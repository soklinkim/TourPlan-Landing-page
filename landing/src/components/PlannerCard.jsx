import { useState } from 'react'
import {
  FaMagic,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaWallet,
  FaWalking,
  FaLandmark,
  FaUtensils,
  FaArrowRight,
  FaRobot,
} from 'react-icons/fa'
import { PLANNER_PREVIEW } from './data'

// A static, marketing-safe replica of the real planner card. It never generates
// anything — every control opens the live TourPlan app.
export default function PlannerCard({ onGetStarted, variant = 'full' }) {
  const [mode, setMode] = useState('guided')
  const p = PLANNER_PREVIEW

  const fields = [
    { icon: FaMapMarkerAlt, label: 'Destination', value: p.destination },
    { icon: FaCalendarAlt, label: 'Trip length', value: p.duration },
    { icon: FaUsers, label: 'Travelers', value: p.travelers },
    { icon: FaWallet, label: 'Budget', value: p.budget },
    { icon: FaWalking, label: 'Travel pace', value: p.pace },
  ]

  return (
    <div className={`lp-planner ${variant === 'compact' ? 'lp-planner-compact' : ''}`}>
      <div className="lp-planner-head">
        <div className="lp-planner-modes">
          <button
            className={mode === 'prompt' ? 'active' : ''}
            onClick={() => setMode('prompt')}
            type="button"
          >
            <FaMagic /> Prompt Mode
          </button>
          <button
            className={mode === 'guided' ? 'active' : ''}
            onClick={() => setMode('guided')}
            type="button"
          >
            <FaInfoCircle /> Guided Mode
          </button>
        </div>
      </div>

      {mode === 'prompt' ? (
        <div className="lp-planner-prompt" onClick={onGetStarted} role="button" tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onGetStarted()}>
          <div className="lp-planner-prompt-bubble">
            <FaRobot />
            <span>Tell TourPlan about your dream trip…</span>
          </div>
          <p className="lp-planner-prompt-example">
            “{p.duration.toLowerCase()} in {p.destination}, {p.travelers.toLowerCase()},
            around {p.budget}. We love {p.interests.join(' and ').toLowerCase()} and a {p.pace.toLowerCase()} pace.”
          </p>
        </div>
      ) : (
        <div className="lp-planner-fields">
          {fields.map((f) => (
            <div className="lp-planner-field" key={f.label}>
              <div className="lp-planner-field-label">
                <f.icon /> {f.label}
              </div>
              <div className="lp-planner-field-value">{f.value}</div>
            </div>
          ))}
          <div className="lp-planner-field lp-planner-field-wide">
            <div className="lp-planner-field-label">
              <FaLandmark /> Interests &amp; food
            </div>
            <div className="lp-planner-chips">
              {p.interests.map((i) => (
                <span key={i}>
                  {i === 'Local Khmer Food' ? <FaUtensils /> : <FaLandmark />} {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className="lp-planner-generate" onClick={onGetStarted} type="button">
        Generate My Trip <FaArrowRight />
      </button>
      <p className="lp-planner-note">Continue in the TourPlan app to generate your itinerary.</p>

      <style>{`
        .lp-planner {
          background: #fff;
          border: 1px solid #e6eee3;
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 24px 60px rgba(15, 51, 32, 0.12);
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
        .lp-planner-field-value { overflow-wrap: anywhere; }
        .lp-planner-compact { padding: 16px; box-shadow: 0 18px 44px rgba(15, 51, 32, 0.14); }
        .lp-planner-head { margin-bottom: 14px; }
        .lp-planner-modes { display: flex; gap: 8px; flex-wrap: wrap; }
        .lp-planner-modes button {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #e6eee3;
          background: #fff;
          color: #6b7280;
          transition: all 0.15s ease;
        }
        .lp-planner-modes button.active {
          background: #2d5a2d;
          border-color: #2d5a2d;
          color: #fff;
        }
        .lp-planner-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .lp-planner-field {
          border: 1px solid #e6eee3;
          border-radius: 12px;
          padding: 10px 12px;
          background: #fafcfa;
        }
        .lp-planner-field-wide { grid-column: 1 / -1; }
        .lp-planner-field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .lp-planner-field-label svg { font-size: 11px; color: #2d5a2d; }
        .lp-planner-field-value { font-size: 13px; font-weight: 700; color: #0f3320; }
        .lp-planner-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
        .lp-planner-chips span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #edf6eb;
          color: #174222;
          border: 1px solid #c8e6c0;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
        }
        .lp-planner-chips span svg { font-size: 10px; }
        .lp-planner-prompt {
          border: 1px solid #e6eee3;
          border-radius: 12px;
          padding: 14px;
          background: #fafcfa;
          cursor: pointer;
        }
        .lp-planner-prompt-bubble {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }
        .lp-planner-prompt-bubble svg { color: #2d5a2d; }
        .lp-planner-prompt-example {
          margin: 10px 0 0;
          font-size: 13px;
          color: #374151;
          line-height: 1.55;
          font-style: italic;
        }
        .lp-planner-generate {
          margin-top: 14px;
          width: 100%;
          border: none;
          background: #174222;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 13px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s ease;
        }
        .lp-planner-generate:hover { background: #0f3320; }
        .lp-planner-note {
          margin: 8px 0 0;
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
        }
        @media (max-width: 560px) {
          .lp-planner-fields { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
