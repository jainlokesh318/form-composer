import { Form } from "../../types/Form"
import QuestionRenderer from "./QuestionRenderer"
import Button from "../../components/core/Button"
import { useState } from "react"
import { useFormValidation } from "../../hooks/useFormValidation"
import { useToast } from "../../contexts/ToastContext"
import { useSubmitResponse } from "../../hooks/useSubmitResponse"
import Spinner from "../../components/core/Spinner"
import { useNavigate } from "react-router"

interface FormRendererProps {
    form: Form
}

function FormRenderer({ form }: FormRendererProps) {
    const [answers, setAnswers] = useState<{ [questionId: string]: any }>({})
    const {
        isValid,
        errors,
        touchedFields,
        setFieldTouched,
        setAllFieldsTouched
    } = useFormValidation(form, answers)
    const { showToast } = useToast()
    const navigate = useNavigate()
    const { submitResponse, isLoading } = useSubmitResponse()

    const handleSubmit = async () => {
         // Show all errors on submit attempt
        setAllFieldsTouched()
        
        if (isValid) {
            try {
                await submitResponse(form, answers)
                showToast('Form submitted successfully!', 'success')
                navigate('/success', {
                    state: {
                        formTitle: form.title,
                        formId: form.id,
                        fromSubmission: true
                    },
                    replace: true
                })
            } catch (err) {
                showToast(err instanceof Error ? err.message : 'Failed to submit form', 'error')
            }
        }
    }


    const handleAnswerChange = (questionId: string, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }))
        setFieldTouched(questionId)
    }

    return (
        <div className="flex flex-col gap-4 w-1/2 mx-auto">
            <div className="text-2xl font-bold">{form.title}</div>
            <div className="text-sm text-gray-500">{form.description}</div>
            {form.questions.map((question) => (
                <div key={question.id}>
                    <QuestionRenderer
                        question={question}
                        value={answers[question.id]}
                        onChange={(value) => handleAnswerChange(question.id, value)}
                        onBlur={() => setFieldTouched(question.id)}
                    />
                    {touchedFields.has(question.id) && errors[question.id] && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors[question.id]}
                        </div>
                    )}
                </div>
            ))}
            <div className="flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={!isValid || isLoading}
                >
                    {isLoading ? <div className="flex items-center gap-2"><Spinner /> Submitting...</div> : 'Submit'}
                </Button>
            </div>
        </div>
    )
}

export default FormRenderer