import { useMemo, useState } from 'react'
import { FaComments } from 'react-icons/fa'
import { FORUM_POSTS, FORUM_AUTHORS, CURRENT_USER, TRIPS } from '../mockData'
import CreatePostBar from '../components/forum/CreatePostBar'
import ComposePostModal from '../components/forum/ComposePostModal'
import PostCard from '../components/forum/PostCard'
import CommentModal from '../components/forum/CommentModal'
import PublicProfilePreviewModal from '../components/forum/PublicProfilePreviewModal'
import PhotoLightbox from '../components/forum/PhotoLightbox'
import TripPlaylistShareModal from '../components/forum/TripPlaylistShareModal'
import TripPreviewModal from '../components/trips/TripPreviewModal'
import EmptyState from '../components/shared/EmptyState'

const FILTERS = ['All', 'Trip', 'Discussion', 'Photo', 'Poll', 'Event', 'Status']

export default function ForumPage() {
  const [posts, setPosts] = useState(FORUM_POSTS)
  const [filter, setFilter] = useState('All')
  const [composer, setComposer] = useState(null)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [commentingPost, setCommentingPost] = useState(null)
  const [viewingProfile, setViewingProfile] = useState(null)
  const [previewTrip, setPreviewTrip] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return posts
    return posts.filter((p) => p.type === filter.toLowerCase())
  }, [posts, filter])

  function authorFor(post) {
    return post.author === 'dara.explores' ? CURRENT_USER : FORUM_AUTHORS[post.author]
  }

  function addComment(postId, text) {
    const comment = { id: `c-${Date.now()}`, author: 'dara.explores', text }
    setPosts((cur) => cur.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)))
    setCommentingPost((p) => (p && p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
  }

  function submitPost(data) {
    setPosts((cur) => [
      { id: `fp-${Date.now()}`, author: 'dara.explores', date: 'Just now', likes: 0, comments: [], ...data },
      ...cur,
    ])
  }

  function publishPlaylist({ tripId, caption }) {
    submitPost({ type: 'trip', tripId, caption: caption || `Published "${TRIPS[tripId].title}" to the community.` })
  }

  return (
    <div className="tp-page">
      <div className="tp-page-head">
        <div>
          <h1 className="tp-page-title">Forum</h1>
          <p className="tp-page-sub">Trip shares, tips, and events from the TourPlan community.</p>
        </div>
      </div>

      <CreatePostBar onOpenComposer={(type) => setComposer(type)} onOpenPlaylistShare={() => setPlaylistOpen(true)} />

      <div className="tp-tabs" style={{ margin: '22px 0 20px' }}>
        {FILTERS.map((f) => (
          <button key={f} className={`tp-tab ${filter === f ? 'tp-active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<FaComments />} title="Nothing here yet" body="Try a different filter, or be the first to post." />
      ) : (
        <div className="tp-post-feed">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              author={authorFor(post)}
              onOpenProfile={setViewingProfile}
              onOpenComments={setCommentingPost}
              onOpenTrip={setPreviewTrip}
              onOpenPhoto={(post, index) => setLightbox({ post, index })}
              onVote={() => {}}
            />
          ))}
        </div>
      )}

      <ComposePostModal
        open={!!composer}
        initialType={composer}
        onClose={() => setComposer(null)}
        onSubmit={submitPost}
      />

      <TripPlaylistShareModal open={playlistOpen} onClose={() => setPlaylistOpen(false)} onPublish={publishPlaylist} />

      <CommentModal post={commentingPost} open={!!commentingPost} onClose={() => setCommentingPost(null)} onAddComment={addComment} />

      <PublicProfilePreviewModal author={viewingProfile} open={!!viewingProfile} onClose={() => setViewingProfile(null)} />

      <TripPreviewModal trip={previewTrip} open={!!previewTrip} onClose={() => setPreviewTrip(null)} />

      {lightbox && (
        <PhotoLightbox
          photos={lightbox.post.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => setLightbox((cur) => ({ ...cur, index: i }))}
        />
      )}
    </div>
  )
}
