import { FieldType } from "./FieldType"

export interface FormElement {
    id: string
    type: FieldType
    label: string
    value: string
}