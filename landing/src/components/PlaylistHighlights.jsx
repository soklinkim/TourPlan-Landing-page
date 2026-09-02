import { FaRegHeart, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { TRIP_PLAYLISTS, compact } from './data'
import Reveal from './Reveal'

const TAG_COLORS = {
  Culture: { bg: '#f5f0ff', color: '#7c3aed' },
  Food: { bg: '#fef0f0', color: '#e05555' },
  Riverside: { bg: '#eff8ff', color: '#2563eb' },
  'Street Food': { bg: '#fff0eb', color: '#e8621a' },
  'Cafés': { bg: '#f0fdfa', color: '#0d9488' },
  Relaxed: { bg: '#f0fdf4', color: '#16a34a' },
  Heritage: { bg: '#fefce8', color: '#b45309' },
}

export default function PlaylistHighlights({ onGetStarted }) {
  return (
    <section className="lp-pl" id="playlists">
      <div className="lp-section">
        <Reveal className="lp-pl-head">
          <h2>Travel plans worth saving.</h2>
          <p>Explore trip ideas created and saved by the TourPlan community.</p>
        </Reveal>

        <div className="lp-pl-grid">
          {TRIP_PLAYLISTS.map((pl, i) => (
            <Reveal key={pl.id} delay={i * 90}>
              <article
                className="lp-pl-card"
                onClick={onGetStarted}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onGetStarted()}
              >
                <div className="lp-pl-cover">
                  <img src={pl.cover} alt="" loading="lazy" />
                  <div className="lp-pl-cover-grad" />
                  <span className="lp-pl-saves">
                    <FaRegHeart /> {compact(pl.saves)} saves
                  </span>
                  <div className="lp-pl-cover-title">
                    <h3>{pl.title}</h3>
                    <span><FaMapMarkerAlt /> {pl.destination}</span>
                  </div>
                </div>
                <div className="lp-pl-body">
                  <div className="lp-pl-facts">
                    <span><FaCalendarAlt /> {pl.days} days</span>
                    <span className="lp-pl-dot">·</span>
                    <span><FaMapMarkerAlt /> {pl.places} places</span>
                  </div>
                  <div className="lp-pl-tags">
                    {pl.tags.map((t) => {
                      const c = TAG_COLORS[t] || { bg: '#edf6eb', color: '#174222' }
                      return (
                        <span key={t} style={{ background: c.bg, color: c.color }}>
                          {t}
                        </span>
                      )
                    })}
                  </div>
                  <div className="lp-pl-creator">by <strong>{pl.creator}</strong></div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .lp-pl { padding: 76px 0; background: #f8faf8; border-top: 1px solid #e6eee3; }
        .lp-pl-head { text-align: center; max-width: 40rem; margin: 0 auto 40px; }
        .lp-pl-head h2 {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-pl-head p { margin: 14px 0 0; font-size: 15px; line-height: 1.6; color: #6b7280; }
        .lp-pl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lp-pl-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e6eee3;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lp-pl-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(15, 51, 32, 0.1);
        }
        .lp-pl-cover { position: relative; aspect-ratio: 3 / 2; overflow: hidden; background: #0f3320; }
        .lp-pl-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lp-pl-cover-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 100%);
        }
        .lp-pl-saves {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.95);
          color: #0f3320;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .lp-pl-cover-title { position: absolute; left: 14px; right: 14px; bottom: 12px; }
        .lp-pl-cover-title h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
        }
        .lp-pl-cover-title span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 4px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
        }
        .lp-pl-body { padding: 14px 16px 16px; }
        .lp-pl-facts {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }
        .lp-pl-facts span { display: inline-flex; align-items: center; gap: 5px; }
        .lp-pl-facts svg { font-size: 11px; color: #2d5a2d; }
        .lp-pl-dot { color: #d1d5db; }
        .lp-pl-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .lp-pl-tags span {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .lp-pl-creator { margin-top: 12px; font-size: 12px; color: #9ca3af; }
        .lp-pl-creator strong { color: #374151; font-weight: 700; }

        @media (max-width: 860px) {
          .lp-pl { padding: 52px 0; }
          .lp-pl-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
