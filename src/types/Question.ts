import { NumberField, SelectField, TextField } from "./Field"

export type QuestionType = 'number' | 'text' | 'select'

export type Question = {
    id: string
    title: string
    required: boolean
} & (
    | { type: Extract<QuestionType, 'number'> } & NumberField
    | { type: Extract<QuestionType, 'text'> } & TextField
    | { type: Extract<QuestionType, 'select'> } & SelectField
)

//ensure all question types have labels
type EnsureQuestionTypeLabels<T> = {
    [K in QuestionType]: string
} & T

export const questionTypeLabels = {
    'text': 'Text',
    'number': 'Number',
    'select': 'Select',
} satisfies EnsureQuestionTypeLabels<Record<QuestionType, string>>