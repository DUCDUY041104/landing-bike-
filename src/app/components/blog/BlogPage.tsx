import { useEffect, useState } from 'react'
import { BlogHero } from './BlogHero'
import { BlogPostCard, BlogPostsSkeleton } from './BlogPostCard'
import { getPosts, type Post } from '@/app/services/Post.service'
import { cleanText, pageTitle } from '@/app/utils/helper'

interface BlogPageProps {
  setView: (view: 'landing' | 'blog' | 'blog-detail') => void
  setSelectedBlogId: (id: string) => void
}

export function BlogPage({ setView, setSelectedBlogId }: BlogPageProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    pageTitle('Blog xe điện')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPosts({ maxResults: 12 })
        if (isMounted) {
          setPosts(
            data.map((post) => ({
              ...post,
              title: cleanText(post.title),
              description: cleanText(post.description),
            }))
          )
        }
      } catch {
        if (isMounted) {
          setError('Không thể tải bài viết. Vui lòng thử lại sau.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPosts()
    return () => {
      isMounted = false
    }
  }, [])

  const handleReadPost = (postId: string) => {
    setSelectedBlogId(postId)
    setView('blog-detail')
  }

  return (
    <main className="min-h-screen">
      <BlogHero />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {loading && <BlogPostsSkeleton count={6} />}

          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-sm mb-4">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-primary-dark font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm">Chưa có bài viết nào.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} onRead={handleReadPost} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setView('landing')}
              className="inline-flex items-center justify-center gap-2 border border-primary/30 text-primary-dark font-bold uppercase text-[10px] tracking-widest px-8 py-3 rounded-full hover:bg-emerald-50 transition-all"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
