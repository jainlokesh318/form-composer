import { useState, useEffect } from 'react'
import { Form } from '../types/Form'

interface FormAnswers {
    [questionId: string]: string | number | string[] | null
}

interface ValidationState {
    isValid: boolean
    errors: { [questionId: string]: string }
    touchedFields: Set<string>
    setFieldTouched: (fieldId: string) => void
    setAllFieldsTouched: () => void
}

export function useFormValidation(form: Form, answers: FormAnswers): ValidationState {
    const [errors, setErrors] = useState<{ [questionId: string]: string }>({})
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        const newErrors: { [questionId: string]: string } = {}
        
        form.questions.forEach((question) => {
            const answer = answers[question.id]

            if (question.required && (answer === null || answer === undefined || answer === '')) {
                newErrors[question.id] = 'This field is required'
                return
            }

            if (answer !== null && answer !== undefined) {
                switch (question.type) {
                    case 'number': {
                        const numValue = Number(answer)
                        if (question.min !== undefined && numValue < question.min) {
                            newErrors[question.id] = `Value must be at least ${question.min}`
                        }
                        if (question.max !== undefined && numValue > question.max) {
                            newErrors[question.id] = `Value must be at most ${question.max}`
                        }
                        break
                    }
                    case 'text': {
                        const strValue = String(answer)
                        if (question.minLength !== undefined && strValue.length < question.minLength) {
                            newErrors[question.id] = `Must be at least ${question.minLength} characters`
                        }
                        if (question.maxLength !== undefined && strValue.length > question.maxLength) {
                            newErrors[question.id] = `Must be at most ${question.maxLength} characters`
                        }
                        break
                    }
                    case 'select': {
                        const selectedValue = String(answer)
                        if (!question.options.some(opt => opt.value === selectedValue)) {
                            newErrors[question.id] = 'Invalid selection'
                        }
                        break
                    }
                }
            }
        })

        setErrors(newErrors)
        setIsValid(Object.keys(newErrors).length === 0)
    }, [form, answers])

    const setFieldTouched = (fieldId: string) => {
        setTouchedFields(prev => new Set(prev).add(fieldId))
    }

    const setAllFieldsTouched = () => {
        setTouchedFields(new Set(form.questions.map(q => q.id)))
    }

    return {
        isValid,
        errors,
        touchedFields,
        setFieldTouched,
        setAllFieldsTouched
    }
}