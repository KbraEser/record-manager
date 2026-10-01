import { describe, expect, it } from 'vitest'
import { formatDateInput, isValidDate } from './date'

describe('isValidDate', () => {
  it('accepts a real date', () => {
    expect(isValidDate('29/09/2026')).toBe(true)
  })

  it('rejects a date that does not exist', () => {
    expect(isValidDate('31/02/2026')).toBe('Invalid date')
  })
})

describe('formatDateInput', () => {
  it('adds slashes between day, month and year', () => {
    expect(formatDateInput('2909')).toBe('29/09')
    expect(formatDateInput('29092026')).toBe('29/09/2026')
  })
})
