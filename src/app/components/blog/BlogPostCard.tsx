import { Calendar, User, ArrowUpRight } from 'lucide-react'
import { cleanText, formatDate } from '@/app/utils/helper'
import type { Post } from '@/app/services/Post.service'

interface BlogPostCardProps {
  post: Post
  onRead: (postId: string) => void
  compact?: boolean
}

export function BlogPostCard({ post, onRead, compact = false }: BlogPostCardProps) {
  const title = cleanText(post.title)
  const description = cleanText(post.description)

  return (
    <article
      className={`group bg-white border border-gray-150 rounded-3xl overflow-hidden hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg ${
        compact ? '' : 'flex flex-col h-full'
      }`}
    >
      <button
        type="button"
        onClick={() => onRead(post.id)}
        className="relative w-full overflow-hidden aspect-[16/10] bg-emerald-50"
      >
        <img
          src={post.imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <div className={`p-6 flex flex-col ${compact ? '' : 'flex-1'}`}>
        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-wider text-gray-500 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-primary-dark font-bold px-2.5 py-1 rounded-full border border-primary/15">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-dark transition-colors line-clamp-2">
          {title}
        </h3>

        <p className={`text-xs text-gray-500 leading-relaxed mb-5 ${compact ? 'line-clamp-2' : 'line-clamp-3 flex-1'}`}>
          {description}
        </p>

        <button
          type="button"
          onClick={() => onRead(post.id)}
          className="inline-flex items-center gap-2 text-primary-dark font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-colors mt-auto"
        >
          {post.btnText}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  )
}

interface BlogPostsSkeletonProps {
  count?: number
}

export function BlogPostsSkeleton({ count = 6 }: BlogPostsSkeletonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className="bg-white border border-gray-150 rounded-3xl overflow-hidden animate-pulse">
          <div className="aspect-[16/10] bg-gray-100" />
          <div className="p-6 space-y-3">
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-5 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
        </article>
      ))}
    </div>
  )
}
