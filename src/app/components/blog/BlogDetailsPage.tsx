import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Facebook, User } from 'lucide-react'
import { getPostById, type Post } from '@/app/services/Post.service'
import { cleanText, formatDate, pageTitle } from '@/app/utils/helper'

interface BlogDetailsPageProps {
  postId: string
  setView: (view: 'landing' | 'blog' | 'blog-detail') => void
}

type TocItem = { id: string; text: string; level: number; number: string }

const createIdFromText = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

const generateTableOfContents = (htmlContent: string): TocItem[] => {
  if (!htmlContent || typeof window === 'undefined') return []

  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const toc: TocItem[] = []
  const counters = [0, 0, 0, 0, 0, 0]
  let lastLevel = 0

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1), 10)
    const text = heading.textContent?.trim() || ''
    if (!text) return

    const id = createIdFromText(text) || `heading-${index}`
    const levelIndex = level - 1

    if (level <= lastLevel) {
      for (let i = levelIndex; i < 6; i++) counters[i] = 0
    }
    counters[levelIndex]++

    const numberParts: number[] = []
    for (let i = 0; i <= levelIndex; i++) {
      if (counters[i] > 0) numberParts.push(counters[i])
    }

    toc.push({ id, text, level, number: `${numberParts.join('.')}.` })
    lastLevel = level
  })

  return toc
}

export function BlogDetailsPage({ postId, setView }: BlogDetailsPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([])
  const [contentHtml, setContentHtml] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [postId])

  useEffect(() => {
    let isMounted = true

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPostById(postId)
        const content = data.content || data.fullContent || ''

        if (isMounted) {
          setTableOfContents(generateTableOfContents(content))
          setContentHtml(content)
          setPost({
            ...data,
            title: cleanText(data.title),
          })
          pageTitle(cleanText(data.title))
        }
      } catch {
        if (isMounted) {
          setError('Không thể tải bài viết. Vui lòng thử lại sau.')
          pageTitle('Bài viết không tìm thấy')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPost()
    return () => {
      isMounted = false
    }
  }, [postId])

  useEffect(() => {
    if (!post) return
    const blogContent = document.getElementById('blog-article-content')
    if (!blogContent) return

    const headings = blogContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim()
      if (text && !heading.id) {
        heading.id = createIdFromText(text) || `heading-${index}`
      }
    })
  }, [post, contentHtml])

  if (loading) {
    return (
      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 animate-pulse space-y-6">
          <div className="h-8 bg-gray-100 rounded w-2/3" />
          <div className="aspect-[21/9] bg-gray-100 rounded-3xl" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-6">{error || 'Không tìm thấy bài viết'}</p>
          <button
            type="button"
            onClick={() => setView('blog')}
            className="inline-flex items-center gap-2 text-primary-dark font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </button>
        </div>
      </section>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : post.externalUrl || ''

  return (
    <article className="pb-24">
      <div
        className="relative pt-32 pb-20 bg-cover bg-center"
        style={{
          backgroundImage: post.imgSrc
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${post.imgSrc})`
            : 'linear-gradient(135deg, #064e3b, #059669)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <button
            type="button"
            onClick={() => setView('blog')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại blog
          </button>

          <span className="inline-block bg-white/15 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-white/20">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-white/80 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl border border-gray-150 shadow-lg p-6 sm:p-10">
          {tableOfContents.length > 0 && (
            <nav className="mb-10 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Mục lục</h2>
              <ul className="space-y-2">
                {tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-gray-600 hover:text-primary-dark transition-colors inline-flex gap-2"
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(item.id)
                        if (element) {
                          const offset = 100
                          const top = element.getBoundingClientRect().top + window.pageYOffset - offset
                          window.scrollTo({ top, behavior: 'smooth' })
                        }
                      }}
                    >
                      <span className="text-primary-dark font-semibold shrink-0">{item.number}</span>
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div
            id="blog-article-content"
            className="blog-content prose prose-emerald max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary-dark prose-img:rounded-2xl prose-img:mx-auto"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Chia sẻ bài viết
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-dark font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
          </div>

          <div className="mt-8 p-5 rounded-2xl border border-gray-100 bg-gray-50/80 flex items-center gap-4">
            {post.authorAvatar ? (
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-primary-dark">
                <User className="w-6 h-6" />
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Tác giả</p>
              <p className="font-bold text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500 mt-0.5">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
