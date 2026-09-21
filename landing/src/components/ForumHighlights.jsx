import { FaHeart, FaRegComment } from 'react-icons/fa'
import { FORUM_HIGHLIGHTS, formatDate } from './data'
import Reveal, { Avatar } from './Reveal'

export default function ForumHighlights({ onGetStarted }) {
  return (
    <section className="lp-forum" id="community">
      <div className="lp-section">
        <Reveal className="lp-forum-head">
          <h2>Get inspired by other travelers.</h2>
          <p>
            Discover travel stories, recommendations, questions, and local experiences
            from the TourPlan community.
          </p>
        </Reveal>

        <div className="lp-forum-grid">
          {FORUM_HIGHLIGHTS.map((post, i) => (
            <Reveal key={post.id} delay={i * 90}>
              <article className="lp-forum-card">
                <div className="lp-forum-cover">
                  <img src={post.cover} alt="" loading="lazy" />
                  <span className="lp-forum-cat">{post.category}</span>
                </div>
                <div className="lp-forum-body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="lp-forum-meta">
                    <div className="lp-forum-author">
                      <Avatar name={post.author} size={26} />
                      <div>
                        <span className="lp-forum-name">@{post.author}</span>
                        <span className="lp-forum-date">{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <div className="lp-forum-stats">
                      <span><FaHeart /> {post.likes}</span>
                      <span><FaRegComment /> {post.replies}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>

      <style>{`
        .lp-forum { padding: 76px 0; background: #fff; border-top: 1px solid #e6eee3; }
        .lp-forum-head { text-align: center; max-width: 40rem; margin: 0 auto 40px; }
        .lp-forum-head h2 {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: #0f3320;
          letter-spacing: -0.01em;
        }
        .lp-forum-head p {
          margin: 14px 0 0;
          font-size: 15px;
          line-height: 1.6;
          color: #6b7280;
        }
        .lp-forum-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .lp-forum-card {
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
        .lp-forum-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(15, 51, 32, 0.1);
        }
        .lp-forum-cover { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #f0f4f0; }
        .lp-forum-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lp-forum-cat {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.95);
          color: #174222;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .lp-forum-body { padding: 16px 16px 14px; display: flex; flex-direction: column; flex: 1; }
        .lp-forum-body h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #0f3320;
          line-height: 1.35;
        }
        .lp-forum-body p {
          margin: 8px 0 0;
          font-size: 13px;
          line-height: 1.55;
          color: #6b7280;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lp-forum-meta {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid #f0f4f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .lp-forum-author { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .lp-forum-author > div { display: flex; flex-direction: column; min-width: 0; }
        .lp-forum-name {
          font-size: 12px;
          font-weight: 700;
          color: #0f3320;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .lp-forum-date { font-size: 11px; color: #9ca3af; }
        .lp-forum-stats { display: flex; gap: 12px; flex-shrink: 0; }
        .lp-forum-stats span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }
        .lp-forum-stats svg { font-size: 11px; color: #e11d48; }
        .lp-forum-stats span:last-child svg { color: #6b7280; }
        .lp-forum-cta { text-align: center; margin-top: 36px; }
        .lp-forum-cta .lp-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid #dbe8d9;
          background: #fff;
          color: #174222;
          font-weight: 600;
          font-size: 15px;
          padding: 13px 26px;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .lp-forum-cta .lp-btn-ghost:hover { border-color: #2d5a2d; background: #f0f7ee; }

        @media (max-width: 860px) {
          .lp-forum { padding: 52px 0; }
          .lp-forum-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
