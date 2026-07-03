import { URL_CONSTANT } from './UrlConstant'

export interface Post {
  id: string
  imgSrc: string
  author: string
  authorAvatar: string | null
  category: string
  title: string
  description: string
  link: string
  btnText: string
  date?: string
  slug?: string
  content?: string
  excerpt?: string
  fullContent?: string
  externalUrl?: string
}

type BloggerText = { $t?: string; type?: string }
type BloggerLink = { rel?: string; type?: string; href?: string; title?: string }
type BloggerAuthor = {
  name?: BloggerText
  uri?: BloggerText
  gd$image?: { src?: string }
}
type BloggerCategory = { term?: string; scheme?: string }
type BloggerEntry = {
  id?: BloggerText
  published?: BloggerText
  updated?: BloggerText
  title?: BloggerText
  content?: BloggerText
  summary?: BloggerText
  link?: BloggerLink[]
  author?: BloggerAuthor[]
  category?: BloggerCategory[]
  media$thumbnail?: { url?: string }
}
type BloggerFeed = {
  feed?: {
    entry?: BloggerEntry | BloggerEntry[]
    author?: BloggerAuthor[]
  }
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=450&fit=crop&auto=format'
const DEFAULT_CATEGORY = 'Kiến thức xe điện'

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

const extractNumericPostId = (id?: string): string => {
  if (!id) return ''
  const match = id.match(/post-(\d+)/)
  return match ? match[1] : ''
}

const extractPostId = (id?: string): string => {
  if (!id) return ''
  const numericId = extractNumericPostId(id)
  return numericId || id.trim()
}

const extractSlug = (links?: BloggerLink[]): string => {
  const alternate = links?.find((l) => l.rel === 'alternate' && l.type === 'text/html')
  if (!alternate?.href) return ''
  try {
    const url = new URL(alternate.href)
    const parts = url.pathname.split('/').filter(Boolean)
    let htmlFile = parts[parts.length - 1] || ''
    if (htmlFile.endsWith('.html')) {
      htmlFile = htmlFile.replace('.html', '')
    }
    if (htmlFile.includes('?')) {
      htmlFile = htmlFile.split('?')[0]
    }
    return htmlFile
  } catch {
    return ''
  }
}

const getExternalUrl = (links?: BloggerLink[]): string | undefined => {
  return links?.find((l) => l.rel === 'alternate' && l.type === 'text/html')?.href
}

const getLargeImage = (url?: string | null): string | null => {
  if (!url) return null
  return url.replace(/\/s\d+(-c)?\//, '/s800/')
}

const extractFirstImage = (html?: string): string | null => {
  if (!html) return null
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1] ?? null
}

const comparePostsByDateDesc = (a: BloggerEntry, b: BloggerEntry): number => {
  const dateA = new Date(a.updated?.$t || a.published?.$t || '').getTime()
  const dateB = new Date(b.updated?.$t || b.published?.$t || '').getTime()
  return dateB - dateA
}

const getExcerpt = (html?: string, maxLength = 150): string => {
  if (!html) return ''
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`
  }
  return text
}

const normalizeEntries = (entry?: BloggerEntry | BloggerEntry[]): BloggerEntry[] => {
  if (!entry) return []
  const entries = Array.isArray(entry) ? entry : [entry]
  return entries.sort(comparePostsByDateDesc)
}

const mapEntry = (entry: BloggerEntry): Post => {
  const postId = extractPostId(entry.id?.$t)
  const slug = extractSlug(entry.link)
  const contentHtml = entry.content?.$t || entry.summary?.$t || ''
  const thumbnail =
    getLargeImage(entry.media$thumbnail?.url) ||
    getLargeImage(extractFirstImage(contentHtml)) ||
    DEFAULT_IMAGE

  const author = entry.author?.[0]
  const authorName = author?.name?.$t || 'Thế Quỳnh'
  const authorAvatar = author?.gd$image?.src || null
  const category = entry.category?.[0]?.term || DEFAULT_CATEGORY

  return {
    id: postId,
    imgSrc: thumbnail,
    author: authorName,
    authorAvatar,
    category,
    title: entry.title?.$t || '',
    description: getExcerpt(contentHtml),
    link: postId,
    btnText: 'Đọc thêm',
    date: entry.published?.$t || entry.updated?.$t,
    slug,
    content: contentHtml,
    externalUrl: getExternalUrl(entry.link),
  }
}

export const getPosts = async (params: { maxResults?: number; startIndex?: number } = {}) => {
  try {
    const searchParams = new URLSearchParams({
      alt: 'json',
      'max-results': String(params.maxResults ?? 10),
    })

    if (params.startIndex) {
      searchParams.set('start-index', String(params.startIndex))
    }

    const response = await fetchJson<BloggerFeed>(
      `${URL_CONSTANT.FEED_BASE_URL}?${searchParams.toString()}`
    )

    return normalizeEntries(response.feed?.entry).map(mapEntry)
  } catch (error) {
    console.error('Error fetching Blogger posts:', error)
    throw error
  }
}

export const getPostById = async (idOrSlug: string) => {
  try {
    let entry: BloggerEntry | null = null

    try {
      const byId = await fetchJson<BloggerFeed>(
        `${URL_CONSTANT.FEED_BASE_URL}/${idOrSlug}?alt=json`
      )
      const entries = normalizeEntries(byId.feed?.entry)
      if (entries.length > 0) {
        entry = entries[0]
      }
    } catch {
      // fallback to slug search
    }

    if (!entry) {
      const allPosts = await getPosts({ maxResults: 50 })
      const matched = allPosts.find(
        (p) => p.slug === idOrSlug || p.id === idOrSlug
      )
      if (matched) {
        return {
          ...matched,
          excerpt: getExcerpt(matched.content, 300),
          fullContent: matched.content || '',
        }
      }
      throw new Error('Post not found')
    }

    const mapped = mapEntry(entry)
    return {
      ...mapped,
      excerpt: getExcerpt(mapped.content, 300),
      fullContent: mapped.content || '',
    }
  } catch (error) {
    console.error('Error fetching Blogger post:', error)
    throw error
  }
}
