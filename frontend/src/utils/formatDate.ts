export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}
