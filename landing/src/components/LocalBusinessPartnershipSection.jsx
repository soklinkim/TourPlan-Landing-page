import { FaCheck, FaArrowRight } from 'react-icons/fa'
import { PARTNER_TILES, PARTNER_BENEFITS } from './data'
import Reveal from './Reveal'

// Brand / community-facing partnership pitch for local businesses.
// Frontend/UI only — the CTAs hand off to the live MVP like the rest of the page.
export default function LocalBusinessPartnershipSection({ onGetStarted }) {
  return (
    <section className="lp-lb" id="partners">
      <div className="lp-section lp-lb-inner">
        <Reveal className="lp-lb-visual" delay={80}>
          <div className="lp-lb-collage">
            {PARTNER_TILES.map((tile, i) => (
              <figure key={tile.id} className={`lp-lb-tile lp-lb-tile-${i + 1}`}>
                <img src={tile.cover} alt="" loading="lazy" />
                <figcaption>{tile.label}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal className="lp-lb-content">
          <span className="lp-lb-eyebrow">For Local Businesses</span>
          <h2>Grow With TourPlan.</h2>
          <p className="lp-lb-lede">
            Connect your business with travelers looking for great places to eat,
            explore, and experience Cambodia.
          </p>

          <ul className="lp-lb-benefits">
            {PARTNER_BENEFITS.map((b) => (
              <li key={b.id}>
                <span className="lp-lb-benefit-icon">
                  <FaCheck />
                </span>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="lp-lb-actions">
            <button className="lp-lb-btn" onClick={onGetStarted}>
              Become a Partner <FaArrowRight />
            </button>
            <button className="lp-lb-link" onClick={onGetStarted}>
              Learn More
            </button>
          </div>
        </Reveal>
      </div>

      <style>{`
        .lp-lb {
          padding: 96px 0;
          background: #f1f6ef;
          border-top: 1px solid #e6eee3;
        }
        .lp-lb-inner {
          display: grid;
          grid-template-columns: 45% 1fr;
          gap: 64px;
          align-items: center;
        }
        .lp-lb-visual, .lp-lb-content { min-width: 0; }

        /* ── Editorial collage ── */
        .lp-lb-collage {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .lp-lb-collage::before {
          content: '';
          position: absolute;
          inset: -12% -5% -16% -5%;
          background: radial-gradient(60% 50% at 40% 30%, rgba(45, 90, 45, 0.14) 0%, rgba(45, 90, 45, 0) 70%);
          z-index: -1;
        }
        .lp-lb-tile {
          position: relative;
          margin: 0;
          border-radius: 16px;
          overflow: hidden;
          background: #0f3320;
          box-shadow: 0 16px 36px rgba(15, 51, 32, 0.12);
        }
        .lp-lb-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .lp-lb-tile figcaption {
          position: absolute;
          left: 10px;
          bottom: 10px;
          background: rgba(255, 255, 255, 0.95);
          color: #174222;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .lp-lb-tile-1 { aspect-ratio: 3 / 4; }
        .lp-lb-tile-2 { aspect-ratio: 4 / 5; margin-top: 36px; }
        .lp-lb-tile-3 { aspect-ratio: 4 / 5; margin-top: -12px; }
        .lp-lb-tile-4 { aspect-ratio: 3 / 4; margin-top: 24px; }

        /* ── Content ── */
        .lp-lb-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2d5a2d;
        }
        .lp-lb-content h2 {
          margin: 12px 0 0;
          font-size: 34px;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-lb-lede {
          margin: 16px 0 0;
          font-size: 16px;
          line-height: 1.65;
          color: #4b5563;
          max-width: 32rem;
        }
        .lp-lb-benefits {
          margin: 28px 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .lp-lb-benefits li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .lp-lb-benefit-icon {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #edf6eb;
          color: #174222;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        .lp-lb-benefits h3 {
          margin: 3px 0 0;
          font-size: 16px;
          font-weight: 700;
          color: #0f3320;
        }
        .lp-lb-benefits li > div > p {
          margin: 6px 0 0;
          font-size: 14px;
          line-height: 1.6;
          color: #6b7280;
        }
        .lp-lb-actions {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .lp-lb-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: none;
          background: #174222;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .lp-lb-btn svg { font-size: 12px; }
        .lp-lb-btn:hover { background: #0f3320; transform: translateY(-1px); }
        .lp-lb-link {
          border: none;
          background: none;
          color: #174222;
          font-weight: 700;
          font-size: 14px;
          padding: 6px 4px;
          cursor: pointer;
          transition: color 0.15s ease;
        }
        .lp-lb-link:hover { color: #0f3320; text-decoration: underline; }

        @media (max-width: 900px) {
          .lp-lb { padding: 64px 0; }
          .lp-lb-inner { grid-template-columns: 1fr; gap: 44px; }
          .lp-lb-visual { max-width: 460px; width: 100%; margin-inline: auto; }
          .lp-lb-content h2 { font-size: 28px; }
        }
        @media (max-width: 560px) {
          .lp-lb-actions { flex-direction: column; align-items: stretch; }
          .lp-lb-btn { width: 100%; justify-content: center; }
          .lp-lb-link { text-align: center; }
        }
      `}</style>
    </section>
  )
}
