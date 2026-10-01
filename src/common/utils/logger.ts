type LogLevel = 'info' | 'warn' | 'error'

// Info logs are only useful while developing, so they are hidden in production
const isDev = import.meta.env.DEV

function log(level: LogLevel, message: string, data?: unknown) {
  if (level === 'info' && !isDev) return

  const time = new Date().toLocaleTimeString()
  console[level](`[${time}] [${level.toUpperCase()}] ${message}`, data ?? '')
}

export const logger = {
  info: (message: string, data?: unknown) => log('info', message, data),
  warn: (message: string, data?: unknown) => log('warn', message, data),
  error: (message: string, data?: unknown) => log('error', message, data),
}
