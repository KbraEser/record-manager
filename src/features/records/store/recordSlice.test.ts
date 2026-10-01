import { describe, expect, it } from 'vitest'
import reducer, { addRecord, selectRecord, updateRecord } from './recordSlice'

const state = {
  items: [
    { id: '1', code: 'AB123', name: 'Ayse', assignDate: '01/01/2026', isUpdatable: true },
    { id: '2', code: 'CD456', name: 'Ali', assignDate: '02/01/2026', isUpdatable: false },
  ],
  selectedId: null,
}

describe('recordSlice', () => {
  it('adds a record with a new id', () => {
    const result = reducer(
      undefined,
      addRecord({ code: 'EF789', name: 'Can', assignDate: '03/01/2026', isUpdatable: true }),
    )

    expect(result.items[0].code).toBe('EF789')
    expect(result.items[0].id).toBeTruthy()
  })

  it('updates a record', () => {
    const result = reducer(state, updateRecord({ ...state.items[0], name: 'Ayse K' }))

    expect(result.items[0].name).toBe('Ayse K')
  })

  it('selects only updatable records', () => {
    expect(reducer(state, selectRecord('1')).selectedId).toBe('1')
    expect(reducer(state, selectRecord('2')).selectedId).toBeNull()
  })
})
