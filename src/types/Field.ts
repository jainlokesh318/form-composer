export interface NumberField {
    max?: number
    min?: number
}

export interface TextField {
    maxLength?: number
    minLength?: number
    pattern?: string
}

export interface SelectOption {
    label: string
    value: string
}   

export interface SelectField {
    options: SelectOption[]
}
