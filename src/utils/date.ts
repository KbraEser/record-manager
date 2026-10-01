export function parseDate(value: string): Date | null {
    const [day, month, year] = value.split('/').map(Number)
    const date = new Date(year, month - 1, day)

    const isValid = 
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day

    return isValid ? date : null
}

export const isValidDate = (value: string) => parseDate(value) !== null || 'Invalid date'
