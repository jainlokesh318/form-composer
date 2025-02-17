import { useEffect, useState } from "react"
import { Question } from "../types/Question"
import Button from "../components/core/Button"
import QuestionBuilder from "./QuestionBuilder"
import { Form } from "../types/Form"
import { useSaveForm } from "../hooks/useSaveForm"
import { Link } from "react-router"
import { ShareIcon } from "@heroicons/react/24/solid"

function getNewFormElement(id: number): Question {
    return {
        id: `question-${id}`,
        title: '',
        required: false,
        type: 'text'
    }
}

function FormBuilder({ form: formFromDb }: { form?: Form }) {
    const [form, setForm] = useState<Form>(formFromDb || {
        id: crypto.randomUUID(),
        title: 'Form Title',
        description: 'Form Description',
        questions: [getNewFormElement(1)]
    })
    const { saveForm, isLoading: isSaving, error } = useSaveForm();

    useEffect(() => {
        saveForm(form)
    }, [form])

    const handleAddQuestion = () => {
        setForm({ ...form, questions: [...form.questions, getNewFormElement(form.questions.length + 1)] })
    }

    const handleDeleteQuestion = (id: string) => {
        setForm({ ...form, questions: form.questions.filter(question => question.id !== id) })
    }

    const handleUpdateQuestion = (id: string, question: Question) => {
        setForm({ ...form, questions: form.questions.map(q => q.id === id ? question : q) })
    }

    const handleSaveForm = () => {
        saveForm(form)
    }

    return (<div>
        <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleAddQuestion}>Add Question</Button>
            <div className="flex gap-2">
                {isSaving && <div>Saving...</div>}
                {error && <div>{error}</div>}
                <Link to={`/form/${form.id}`}>
                    <ShareIcon className="w-6 h-6 cursor-pointer" />
                </Link>
            </div>
        </div>
        <div>
            {form.questions.map((question) => (
                <QuestionBuilder key={question.id} question={question} onDelete={handleDeleteQuestion} onUpdate={handleUpdateQuestion} />
            ))}
        </div>
        <div className="flex justify-center">
            <Button onClick={handleSaveForm}>Save</Button>
        </div>
    </div>)

}

export default FormBuilder
