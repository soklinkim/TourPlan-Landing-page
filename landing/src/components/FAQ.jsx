import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { FAQS } from './data'
import Reveal from './Reveal'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="lp-faq" id="faq">
      <div className="lp-section lp-faq-inner">
        <Reveal className="lp-faq-head">
          <h2>Frequently asked questions</h2>
        </Reveal>

        <Reveal className="lp-faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`lp-faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
                <button
                  className="lp-faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <FaChevronDown />
                </button>
                <div className="lp-faq-a" role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>

      <style>{`
        .lp-faq { padding: 76px 0; background: #fff; border-top: 1px solid #e6eee3; }
        .lp-faq-inner { max-width: 760px; }
        .lp-faq-head { text-align: center; margin-bottom: 36px; }
        .lp-faq-head h2 {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-faq-list { display: flex; flex-direction: column; gap: 10px; }
        .lp-faq-item {
          border: 1px solid #e6eee3;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .lp-faq-item.open {
          border-color: #c8e6c0;
          box-shadow: 0 8px 24px rgba(15, 51, 32, 0.06);
        }
        .lp-faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: 15px;
          font-weight: 700;
          color: #0f3320;
        }
        .lp-faq-q svg {
          flex-shrink: 0;
          font-size: 13px;
          color: #6b7280;
          transition: transform 0.25s ease;
        }
        .lp-faq-item.open .lp-faq-q svg { transform: rotate(180deg); }
        .lp-faq-a {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }
        .lp-faq-item.open .lp-faq-a { grid-template-rows: 1fr; }
        .lp-faq-a > p {
          overflow: hidden;
          margin: 0;
          padding: 0 20px;
          font-size: 14px;
          line-height: 1.65;
          color: #6b7280;
        }
        .lp-faq-item.open .lp-faq-a > p { padding-bottom: 20px; }

        @media (prefers-reduced-motion: reduce) {
          .lp-faq-a, .lp-faq-q svg { transition: none; }
        }
        @media (max-width: 640px) {
          .lp-faq { padding: 52px 0; }
          .lp-faq-head h2 { font-size: 26px; }
        }
      `}</style>
    </section>
  )
}
