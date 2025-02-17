import { useState } from 'react'
import { Form } from '../types/Form'

interface UseGetForm {
    isLoading: boolean
    error: string | null
    form: Form | null
    fetchFormById: (formId: string) => Promise<void>
}

export function useGetFormById(): UseGetForm {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState<Form | null>(null)

    const fetchFormById = async (formId: string) => {
        setIsLoading(true)
        setError(null)

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500))

            const savedFormsJson = localStorage.getItem('forms')
            if (!savedFormsJson) {
                throw new Error('Form not found')
            }

            const savedForms: Form[] = JSON.parse(savedFormsJson)
            const foundForm = savedForms.find(form => form.id === formId)

            if (!foundForm) {
                throw new Error('Form not found')
            }

            setForm(foundForm)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load form')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        form,
        fetchFormById
    }
}