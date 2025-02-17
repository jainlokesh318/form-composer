import { useState } from 'react'
import { Form } from '../types/Form'

interface UseSaveForm {
    isLoading: boolean
    error: string | null
    saveForm: (form: Form) => Promise<void>
}

export function useSaveForm(): UseSaveForm {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const saveForm = async (form: Form) => {
        setIsLoading(true)
        setError(null)

        try {
            // Simulate API delay (random between 500ms and 2000ms)
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))

            // Validate form
            if (!form.questions.length) {
                throw new Error('At least one question is required')
            }

            // Get existing forms
            const existingFormsJson = localStorage.getItem('forms')
            const existingForms: Form[] = existingFormsJson ? JSON.parse(existingFormsJson) : []

            // Check if form already exists
            const formIndex = existingForms.findIndex(f => f.id === form.id)
            
            if (formIndex !== -1) {
                existingForms[formIndex] = form
            } else {
                existingForms.push(form)
            }

            localStorage.setItem('forms', JSON.stringify(existingForms))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save form')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        saveForm
    }
}
