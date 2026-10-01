import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Clear the screen after each test so tests do not affect each other
afterEach(() => cleanup())
