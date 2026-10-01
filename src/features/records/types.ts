export interface RecordFormValues {
  code: string
  name: string
  assignDate: string
  isUpdatable: boolean
}

export interface RecordItem extends RecordFormValues {
  id: string
}
