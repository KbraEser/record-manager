import { useEffect } from 'react'
import { Controller, useForm, type FieldErrors } from 'react-hook-form'
import { Checkbox, FormControlLabel, Grid, Paper, Stack } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { FormInput } from '../../../common/components/FormInput'
import { ActionButton } from '../../../common/components/ActionButton'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectSelectedRecord } from '../store/selectors'
import { addRecord, clearSelection, updateRecord } from '../store/recordSlice'
import { CODE_RULES, DATE_RULES, NAME_RULES } from '../validation'
import { formatDateInput, isValidDate } from '../../../common/utils/date'
import { logger } from '../../../common/utils/logger'
import type { RecordFormValues } from '../types'

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

  // Empties the inputs and leaves edit mode, so the button shows "Save" again
  const resetForm = () => {
    reset(EMPTY_FORM)
    dispatch(clearSelection())
  }

  const handleClean = () => {
    resetForm()
    logger.info('Form cleaned')
  }

  // Runs only when every field is valid
  const onSubmit = (values: RecordFormValues) => {
    if (selectedRecord) {
      dispatch(updateRecord({ id: selectedRecord.id, ...values }))
      logger.info('Record updated', values)
    } else {
      dispatch(addRecord(values))
      logger.info('Record added', values)
    }
    resetForm()
  }

  // Runs when Save/Update is clicked but some fields are invalid
  const onInvalid = (errors: FieldErrors<RecordFormValues>) => {
    logger.warn('Form validation failed', Object.keys(errors))
  }

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate sx={{ p: 3 }}>
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
            formatValue={formatDateInput}
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