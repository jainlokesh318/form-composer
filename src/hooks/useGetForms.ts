import { useState } from 'react'
import { Form } from '../types/Form'

interface UseGetForms {
    isLoading: boolean
    error: string | null
    forms: Form[]
    fetchForms: () => Promise<void>
}

export function useGetForms(): UseGetForms {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [forms, setForms] = useState<Form[]>([])

    const fetchForms = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500))

            const savedForms = localStorage.getItem('forms')
            if (savedForms) {
                setForms(JSON.parse(savedForms))
            } else {
                setForms([])
            }
        } catch (err) {
            setError('Failed to load forms')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        forms,
        fetchForms
    }
}
