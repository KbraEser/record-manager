import { Paper } from '@mui/material'
import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectRecords } from '../store/selectors'
import { selectRecord } from '../store/recordSlice'
import { parseDate } from '../../../common/utils/date'
import type { RecordItem } from '../types'

// Dates are stored as "DD/MM/YYYY" text, so compare them as real dates when sorting
const compareDates = (a: string, b: string) =>
  (parseDate(a)?.getTime() ?? 0) - (parseDate(b)?.getTime() ?? 0)

const columns: GridColDef<RecordItem>[] = [
  { field: 'code', headerName: 'Code', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'assignDate', headerName: 'Assign Date', flex: 1, sortComparator: compareDates },
  { field: 'isUpdatable', headerName: 'Is Updatable?', flex: 1, type: 'boolean' },
]

export function RecordGrid() {
  const dispatch = useAppDispatch()
  const records = useAppSelector(selectRecords)
  const selectedId = useAppSelector((state) => state.records.selectedId)

  // Only updatable rows can be opened in the form
  const handleRowClick = (params: GridRowParams<RecordItem>) => {
    if (params.row.isUpdatable) {
      dispatch(selectRecord(params.row.id))
    }
  }

  // Highlight the row that is currently open in the form
  const selectedRows = new Set(selectedId ? [selectedId] : [])

  return (
    <Paper sx={{ height: 400 }}>
      <DataGrid
        rows={records}
        columns={columns}
        onRowClick={handleRowClick}
        getRowClassName={(params) => (params.row.isUpdatable ? '' : 'locked-row')}
        disableRowSelectionOnClick
        rowSelectionModel={{ type: 'include', ids: selectedRows }}
        // Pagination: start with 5 rows per page
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25]}
        localeText={{ noRowsLabel: 'No records yet' }}
        sx={{
          '& .locked-row': { bgcolor: 'grey.300', cursor: 'not-allowed' },
          // Remove the blue focus border that appears when a cell is clicked
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
        }}
      />
    </Paper>
  )
}
