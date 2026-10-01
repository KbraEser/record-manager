import { describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import recordReducer, { selectRecord } from '../store/recordSlice'
import { RecordForm } from './RecordForm'

vi.mock('../../../common/utils/logger')

function renderForm() {
  const store = configureStore({ reducer: { records: recordReducer } })
  render(
    <Provider store={store}>
      <RecordForm />
    </Provider>,
  )
  return store
}

describe('RecordForm', () => {
  it('shows errors when required fields are empty', async () => {
    renderForm()

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Code is required')).toBeInTheDocument()
  })

  it('saves a record, then updates it after it is selected', async () => {
    const store = renderForm()

    await userEvent.type(screen.getByLabelText(/^code/i), 'AB123')
    await userEvent.type(screen.getByLabelText(/^name/i), 'Ayse')
    await userEvent.type(screen.getByLabelText(/^assign date/i), '01012026')
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    const record = store.getState().records.items[0]
    expect(record.name).toBe('Ayse')
    expect(record.assignDate).toBe('01/01/2026')

    act(() => {
      store.dispatch(selectRecord(record.id))
    })
    await userEvent.type(screen.getByLabelText(/^name/i), ' K')
    await userEvent.click(screen.getByRole('button', { name: 'Update' }))

    expect(store.getState().records.items[0].name).toBe('Ayse K')
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})
