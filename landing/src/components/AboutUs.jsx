import Reveal from './Reveal'

const VIDEOS = [
  {
    title: 'What is TourPlan?',
    videoId: 'vTBfAs8DfoQ',
  },
  {
    title: 'Who are we?',
    videoId: 'Tqlo1JE5HZI',
  },
]

export default function AboutUs() {
  return (
    <section className="lp-about" id="about">
      <div className="lp-section">
        <Reveal className="lp-about-head">
          <span className="lp-about-eyebrow">About TourPlan</span>
          <h2>Travel planning, made personal.</h2>
          <p>
            Get to know the people and purpose behind TourPlan, and see how we are
            making it easier to discover meaningful experiences.
          </p>
        </Reveal>

        <div className="lp-about-grid">
          {VIDEOS.map((video, index) => (
            <Reveal className="lp-about-video" key={video.videoId} delay={index * 100}>
              <div className="lp-about-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <h3>{video.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .lp-about {
          padding: 80px 0;
          background: #f1f6ef;
          border-top: 1px solid #e6eee3;
        }
        .lp-about-head {
          max-width: 640px;
          margin: 0 auto 40px;
          text-align: center;
        }
        .lp-about-eyebrow {
          display: inline-block;
          color: #2d5a2d;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .lp-about-head h2 {
          margin: 12px 0 0;
          color: #0f3320;
          font-size: 32px;
          font-weight: 800;
        }
        .lp-about-head p {
          margin: 14px 0 0;
          color: #6b7280;
          font-size: 15px;
          line-height: 1.6;
        }
        .lp-about-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }
        .lp-about-video {
          min-width: 0;
        }
        .lp-about-frame {
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 1px solid #dbe8d9;
          border-radius: 16px;
          background: #0f3320;
          box-shadow: 0 18px 40px rgba(15, 51, 32, 0.12);
        }
        .lp-about-frame iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .lp-about-video h3 {
          margin: 14px 0 0;
          color: #0f3320;
          font-size: 18px;
          font-weight: 700;
          text-align: center;
        }
        @media (max-width: 700px) {
          .lp-about { padding: 56px 0; }
          .lp-about-grid { grid-template-columns: 1fr; }
          .lp-about-head h2 { font-size: 28px; }
        }
      `}</style>
    </section>
  )
}