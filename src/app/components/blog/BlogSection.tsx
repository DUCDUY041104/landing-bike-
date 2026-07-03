import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { BlogPostCard, BlogPostsSkeleton } from './BlogPostCard'
import { getPosts, type Post } from '@/app/services/Post.service'
import { cleanText } from '@/app/utils/helper'

interface BlogSectionProps {
  sectionBgStyle?: CSSProperties
  onViewAll: () => void
  onReadPost: (postId: string) => void
}

export function BlogSection({ sectionBgStyle, onViewAll, onReadPost }: BlogSectionProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchPosts = async () => {
      try {
        const data = await getPosts({ maxResults: 3 })
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
        if (isMounted) setPosts([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPosts()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="blog" className="py-24 border-t border-gray-100 relative" style={sectionBgStyle}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-50 text-primary-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3.5 border border-primary/20">
            KIẾN THỨC XE ĐIỆN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            BLOG <span className="eco-gradient-text">THẾ QUỲNH</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mt-2.5">
            Cập nhật tin tức, hướng dẫn và mẹo sử dụng xe điện cùng Thế Quỳnh.
          </p>
        </div>

        {loading ? (
          <BlogPostsSkeleton count={3} />
        ) : posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} onRead={onReadPost} compact />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Chọn Xe Điện Phù Hợp Cho Thành Phố',
                category: 'Mẹo chọn xe',
                description: 'Khám phá cách chọn xe điện phù hợp cho nhu cầu đi lại hàng ngày tại Nam Định.',
                date: 'Đang cập nhật',
              },
              {
                title: 'Bảo Dưỡng Pin Xe Điện Đúng Chuẩn',
                category: 'Bảo dưỡng',
                description: 'Mẹo kéo dài tuổi thọ pin và giữ hiệu suất cao cho xe điện của bạn.',
                date: 'Đang cập nhật',
              },
              {
                title: 'Cập Nhật Công Nghệ Pin Mới 2026',
                category: 'Tin tức',
                description: 'Tìm hiểu các công nghệ pin mới nhất giúp xe điện chạy xa hơn, sạc nhanh hơn.',
                date: 'Đang cập nhật',
              },
            ].map((item) => (
              <article key={item.title} className="group bg-white border border-gray-150 rounded-3xl p-6 shadow-sm">
                <div className="text-[9px] uppercase tracking-[0.24em] text-primary-dark font-bold mb-4">{item.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{item.description}</p>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.date}</div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-dark to-primary text-white font-bold uppercase text-[10px] tracking-widest px-8 py-3 rounded-full shadow-lg shadow-green-500/20 hover:opacity-95 transition-all"
          >
            Xem tất cả bài viết
          </button>
        </div>
      </div>
    </section>
  )
}
