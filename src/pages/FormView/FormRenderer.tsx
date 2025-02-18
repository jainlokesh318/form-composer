import { Form } from "../../types/Form"
import QuestionRenderer from "./QuestionRenderer"
import Button from "../../components/core/Button"
import { useState } from "react"
import { useFormValidation } from "../../hooks/useFormValidation"

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

    const handleAnswerChange = (questionId: string, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }))
        setFieldTouched(questionId)
    }

    const handleSubmit = () => {
        // Show all errors on submit attempt
        setAllFieldsTouched() 
        
        if (isValid) {
            console.log('Submitting answers:', answers)
        }
    }

    return (
        <div className="flex flex-col gap-4 w-1/2 mx-auto">
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
            <Button 
                onClick={handleSubmit} 
                variant="outline"
                disabled={!isValid}
            >
                Submit
            </Button>
        </div>
    )
}

export default FormRenderer