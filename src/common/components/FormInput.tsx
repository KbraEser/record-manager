import { TextField, Tooltip } from '@mui/material'
import { useController, type Control, type FieldValues, type Path, type ValidateResult } from 'react-hook-form'
  
interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  tips?: string
  placeholder?: string
  maxLength?: number
  required?: boolean
  disabled?: boolean
  pattern?: { value: RegExp; message: string }
  validate?: (value: string) => ValidateResult
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  tips = '',
  placeholder,
  maxLength,
  required = false,
  disabled = false,
  pattern,
  validate
}: FormInputProps<T>) {
  const { field, fieldState } = useController<T>({
    name,
    control,
    rules: {
      required: required && `${label} is required`,
      maxLength: maxLength && { value: maxLength, message: `Max ${maxLength} characters` },
      pattern,
      validate:validate && ((value) => validate(String(value))),
    },
  })

  return (
    <Tooltip title={tips} placement="top" arrow>
      <TextField
        {...field}
        id={name}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={!!fieldState.error}
        helperText={fieldState.error?.message ?? ' '}
        slotProps={{ htmlInput: { maxLength } }}
        size="small"
        fullWidth
      />
    </Tooltip>
  )
}
