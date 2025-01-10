export const formatDate = (date: string | Date) => {
  return new Date(date).toISOString().split('T')[0]
}
