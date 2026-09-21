import { FaMapMarkerAlt, FaRegClock, FaStar } from 'react-icons/fa'
import { TRIP_PACKAGES } from './data'
import Reveal from './Reveal'

// Curated, ready-made trip packages. Frontend/UI only — cards and the
// "View All" link hand off to the /app product mockup like every other card
// on the page.
export default function TripPackagesSection({ onGetStarted }) {
  return (
    <section className="lp-tp" id="packages">
      <div className="lp-section">
        <Reveal className="lp-tp-head">
          <div className="lp-tp-head-copy">
            <span className="lp-tp-eyebrow">Trip Packages</span>
            <h2>Plan Less. Experience More.</h2>
            <p>
              Discover curated experiences designed to help you make the most of
              your trip.
            </p>
          </div>
        </Reveal>

        <div className="lp-tp-grid">
          {TRIP_PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 90}>
              <article className="lp-tp-card">
                <div className="lp-tp-cover">
                  <img src={pkg.cover} alt="" loading="lazy" />
                  <span className="lp-tp-duration">
                    <FaRegClock /> {pkg.duration}
                  </span>
                </div>

                <div className="lp-tp-body">
                  <h3>{pkg.title}</h3>
                  <span className="lp-tp-location">
                    <FaMapMarkerAlt /> {pkg.location}
                  </span>
                  <p className="lp-tp-desc">{pkg.description}</p>

                  <div className="lp-tp-meta">
                    <span className="lp-tp-rating">
                      <FaStar /> {pkg.rating.toFixed(1)}
                    </span>
                    <span className="lp-tp-price">{pkg.price}</span>
                  </div>

                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .lp-tp { padding: 76px 0; background: #fff; border-top: 1px solid #e6eee3; }
        .lp-tp-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 40px;
        }
        .lp-tp-head-copy { max-width: 40rem; }
        .lp-tp-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2d5a2d;
        }
        .lp-tp-head h2 {
          margin: 12px 0 0;
          font-size: 32px;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-tp-head p {
          margin: 14px 0 0;
          font-size: 15px;
          line-height: 1.6;
          color: #6b7280;
        }
        .lp-tp-viewall {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: none;
          padding: 4px 0;
          font-size: 14px;
          font-weight: 700;
          color: #174222;
          cursor: pointer;
          transition: gap 0.15s ease, color 0.15s ease;
        }
        .lp-tp-viewall svg { font-size: 12px; }
        .lp-tp-viewall:hover { gap: 12px; color: #0f3320; }

        .lp-tp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .lp-tp-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e6eee3;
          border-radius: 16px;
          overflow: hidden;
          cursor: default;
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          height: 100%;
        }
        .lp-tp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(15, 51, 32, 0.1);
        }
        .lp-tp-card:focus-visible {
          outline: 2px solid #2d5a2d;
          outline-offset: 2px;
        }
        .lp-tp-cover {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f0f4f0;
        }
        .lp-tp-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .lp-tp-card:hover .lp-tp-cover img { transform: scale(1.06); }
        .lp-tp-duration {
          position: absolute;
          top: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.95);
          color: #174222;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .lp-tp-duration svg { font-size: 10px; }

        .lp-tp-body {
          padding: 18px 18px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .lp-tp-body h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          color: #0f3320;
          line-height: 1.3;
        }
        .lp-tp-location {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }
        .lp-tp-location svg { font-size: 11px; color: #2d5a2d; }
        .lp-tp-desc {
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.55;
          color: #6b7280;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lp-tp-meta {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid #f0f4f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .lp-tp-rating {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
        }
        .lp-tp-rating svg { font-size: 12px; color: #f5a623; }
        .lp-tp-price {
          font-size: 13px;
          font-weight: 700;
          color: #174222;
        }
        .lp-tp-cta {
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #dbe8d9;
          background: #fff;
          color: #174222;
          font-weight: 700;
          font-size: 14px;
          padding: 11px 18px;
          border-radius: 12px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .lp-tp-cta svg { font-size: 12px; }
        .lp-tp-card:hover .lp-tp-cta { border-color: #2d5a2d; background: #f0f7ee; }

        @media (max-width: 980px) {
          .lp-tp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 860px) {
          .lp-tp { padding: 52px 0; }
          .lp-tp-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 32px;
          }
        }
        @media (max-width: 560px) {
          .lp-tp-grid { grid-template-columns: 1fr; }
          .lp-tp-head h2 { font-size: 27px; }
        }
      `}</style>
    </section>
  )
}
