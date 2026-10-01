/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Simulates a browser so components can be rendered in tests
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
