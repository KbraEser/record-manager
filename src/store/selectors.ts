import type { RootState } from '.'

export const selectRecords = (state: RootState) => state.records.items

export const selectSelectedRecord = (state: RootState) =>
  state.records.items.find((item) => item.id === state.records.selectedId) ?? null
