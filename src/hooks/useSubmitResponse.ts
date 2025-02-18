import { useState } from 'react'
import { Form } from '../types/Form'

interface FormResponse {
    id: string
    formId: string
    answers: {
        [questionId: string]: string | number | string[]
    }
    submittedAt: string
}

interface UseSubmitResponse {
    isLoading: boolean
    error: string | null
    submitResponse: (form: Form, answers: FormResponse['answers']) => Promise<FormResponse>
}

export function useSubmitResponse(): UseSubmitResponse {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const submitResponse = async (form: Form, answers: FormResponse['answers']) => {
        setIsLoading(true)
        setError(null)

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))

            // Validate required fields
            const missingRequired = form.questions
                .filter(q => q.required)
                .find(q => !answers[q.id])

            if (missingRequired) {
                throw new Error(`Question "${missingRequired.title}" is required`)
            }

            const response: FormResponse = {
                id: crypto.randomUUID(),
                formId: form.id,
                answers,
                submittedAt: new Date().toISOString()
            }

            // Get existing responses
            const existingResponsesJson = localStorage.getItem('formResponses')
            const existingResponses: FormResponse[] = existingResponsesJson 
                ? JSON.parse(existingResponsesJson) 
                : []

            // Add new response
            existingResponses.push(response)
            localStorage.setItem('formResponses', JSON.stringify(existingResponses))

            return response
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit response')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        submitResponse
    }
}