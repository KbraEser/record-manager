export const CODE_RULES = {
  maxLength: 5,
  pattern: /^[A-Za-z]{2}\d{3}$/,
  tips: 'First 2 characters letters, last 3 digits (e.g. AB123)',
}

export const NAME_RULES = {
  maxLength: 12,
  tips: 'Maximum 12 characters',
}

export const DATE_RULES = {
  maxLength: 10,
  pattern: /^\d{2}\/\d{2}\/\d{4}$/,
  tips: 'Format: DD/MM/YYYY (e.g. 29/09/2026)',
}