import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Checkbox, FormControlLabel, Grid, Paper, Stack } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { FormInput } from './common/FormInput'
import { ActionButton } from './common/ActionButton'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectSelectedRecord } from '../store/selectors'
import { addRecord, clearSelection, updateRecord } from '../store/recordSlice'
import { CODE_RULES, DATE_RULES, NAME_RULES } from '../constants/validation'
import { isValidDate } from '../utils/date'
import type { RecordFormValues } from '../types/record'

const EMPTY_FORM: RecordFormValues = {
  code: '',
  name: '',
  assignDate: '',
  isUpdatable: false,
}

export function RecordForm() {
  const dispatch = useAppDispatch()
  const selectedRecord = useAppSelector(selectSelectedRecord)
  const isEditMode = selectedRecord !== null

  const { control, handleSubmit, reset } = useForm<RecordFormValues>({
    defaultValues: EMPTY_FORM,
  })

  useEffect(() => {
    if (!selectedRecord) return
    const { code, name, assignDate, isUpdatable } = selectedRecord
    reset({ code, name, assignDate, isUpdatable })
  }, [selectedRecord, reset])

  const handleClean = () => {
    reset(EMPTY_FORM)
    dispatch(clearSelection())
  }

  const onSubmit = (values: RecordFormValues) => {
    if (selectedRecord) {
      dispatch(updateRecord({ id: selectedRecord.id, ...values }))
    } else {
      dispatch(addRecord(values))
    }
    handleClean()
  }

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormInput
            name="code"
            control={control}
            label="Code"
            placeholder="AB123"
            required
            maxLength={CODE_RULES.maxLength}
            tips={CODE_RULES.tips}
            pattern={{ value: CODE_RULES.pattern, message: CODE_RULES.tips }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormInput
            name="name"
            control={control}
            label="Name"
            required
            maxLength={NAME_RULES.maxLength}
            tips={NAME_RULES.tips}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormInput
            name="assignDate"
            control={control}
            label="Assign Date"
            placeholder="DD/MM/YYYY"
            required
            maxLength={DATE_RULES.maxLength}
            tips={DATE_RULES.tips}
            pattern={{ value: DATE_RULES.pattern, message: DATE_RULES.tips }}
            validate={isValidDate}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name="isUpdatable"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Is Updatable?"
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
              />
            )}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1.5} sx={{ mt: 1, justifyContent: 'flex-end' }}>
        <ActionButton
          label="Clean"
          variant="outlined"
          color="inherit"
          icon={<CleaningServicesIcon />}
          tips="Clear all fields"
          onClick={handleClean}
        />
        <ActionButton
          type="submit"
          label={isEditMode ? 'Update' : 'Save'}
          color={isEditMode ? 'success' : 'primary'}
          icon={isEditMode ? <EditIcon /> : <SaveIcon />}
          tips={isEditMode ? 'Update the selected record' : 'Add a new record'}
        />
      </Stack>
    </Paper>
  )
}