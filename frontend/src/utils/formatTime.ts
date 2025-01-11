export function formatTime(dateString: string): string {
  const timestamp = Number(dateString)
  const date = isNaN(timestamp) ? new Date(dateString) : new Date(timestamp)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export function toISO8601Timestamp(
  time: string,
  date: string = new Date().toISOString().split('T')[0]
): string {
  const dateTimeString = `${date} ${time}`

  const parsedDate = new Date(dateTimeString)

  return parsedDate.toISOString()
}
