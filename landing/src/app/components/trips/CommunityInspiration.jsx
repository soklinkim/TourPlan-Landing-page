import { Link } from 'react-router-dom'
import { FaArrowRight, FaHeart } from 'react-icons/fa'
import { FORUM_POSTS, FORUM_AUTHORS, TRIPS } from '../../mockData'
import Avatar from '../shared/Avatar'

export default function CommunityInspiration() {
  const communityTripPosts = FORUM_POSTS.filter((p) => p.type === 'trip' && p.author !== 'dara.explores')

  return (
    <section className="tp-community-strip">
      <div className="tp-page-head" style={{ marginBottom: 14 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, color: 'var(--tp-green)' }}>From the community</h2>
          <p className="tp-page-sub">Trips other travelers have shared to the forum.</p>
        </div>
        <Link to="/app/forum" className="tp-btn tp-btn-ghost tp-btn-sm">
          Open forum <FaArrowRight />
        </Link>
      </div>
      <div className="tp-community-row">
        {communityTripPosts.map((post) => {
          const trip = TRIPS[post.tripId]
          const author = FORUM_AUTHORS[post.author]
          return (
            <Link to="/app/forum" key={post.id} className="tp-community-card">
              <img src={trip.cover} alt={trip.title} />
              <div className="tp-community-card-body">
                <strong>{trip.title}</strong>
                <div className="tp-community-card-author">
                  <Avatar name={author.displayName} size={22} />
                  <span>{author.displayName}</span>
                </div>
                <span className="tp-field-hint"><FaHeart color="var(--tp-accent)" /> {post.likes} likes</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
