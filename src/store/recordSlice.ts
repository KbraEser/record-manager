import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RecordFormValues, RecordItem } from '../types/record'

interface RecordsState {
  items: RecordItem[]
  selectedId: string | null
}

const initialState: RecordsState = {
  items: [],
  selectedId: null,
}

const recordSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord: {
      prepare(values: RecordFormValues) {
        return { payload: { id: nanoid(), ...values } }
      },
      reducer(state, action: PayloadAction<RecordItem>) {
        state.items.push(action.payload)
      },
    },

    updateRecord: (state, action: PayloadAction<RecordItem>) => {
      const findIndex = state.items.findIndex((item) => item.id === action.payload.id)
      if (findIndex !== -1) {
        state.items[findIndex] = action.payload
      }
    },
    selectRecord: (state, action: PayloadAction<string>) =>{

     const record= state.items.find((item)=> item.id === action.payload) 

     
     if(record?.isUpdatable){
        state.selectedId = record.id
     }
     
    },
    clearSelection: (state) => {
      state.selectedId = null
    },
  },
})

export const { addRecord, updateRecord, selectRecord, clearSelection } = recordSlice.actions
export default recordSlice.reducer
