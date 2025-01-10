// utils/errorHandler.ts
export const handleError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error // safely return the error
  }
  return new Error('An unknown error occurred')
}
