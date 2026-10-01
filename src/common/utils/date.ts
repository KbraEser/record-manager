export function parseDate(value: string): Date | null {
  const [day, month, year] = value.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  const isValid =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

  return isValid ? date : null
}

export const isValidDate = (value: string) => parseDate(value) !== null || 'Invalid date'

// Adds the slashes while the user types, e.g. "29092026" becomes "29/09/2026"
export function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)]
  return parts.filter((part) => part !== '').join('/')
}
