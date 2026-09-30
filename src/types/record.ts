export interface RecordItem {
    id: string
    code: string
    name: string
    assignDate: string
    isUpdatable: boolean
}

export type RecordFormValues = Omit<RecordItem,"id">