export const pageTitle = (title: string) => {
  if (typeof document !== 'undefined') {
    document.title = `${title} | Thế Quỳnh Xe Điện`
  }
}

export const cleanText = (htmlText: string | undefined): string => {
  if (!htmlText) return ''
  if (typeof window === 'undefined') {
    return htmlText.replace(/<[^>]*>/g, '')
  }
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlText, 'text/html')
  return doc.documentElement.textContent || ''
}

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ]

  return `${day} ${months[month - 1]}, ${year}`
}
