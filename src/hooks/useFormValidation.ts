import { useState, useEffect } from 'react'
import { Form } from '../types/Form'

interface FormAnswers {
    [questionId: string]: string | number | string[] | null
}

export function useFormValidation(form: Form, answers: FormAnswers) {
    const [isValid, setIsValid] = useState(false)
    const [errors, setErrors] = useState<{ [questionId: string]: string }>({})

    useEffect(() => {
        const newErrors: { [questionId: string]: string } = {}
        
        form.questions.forEach((question) => {
            const answer = answers[question.id]

            // Check required fields
            if (question.required && (answer === null || answer === undefined || answer === '')) {
                newErrors[question.id] = 'This field is required'
                return
            }

            // Type-specific validations
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

    return { isValid, errors }
}