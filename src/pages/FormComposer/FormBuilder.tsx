import { useEffect, useState } from "react"
import { Question } from "../../types/Question"
import Button from "../../components/core/Button"
import QuestionBuilder from "./QuestionBuilder"
import { Form } from "../../types/Form"
import { useSaveForm } from "../../hooks/useSaveForm"
import { Link } from "react-router"
import { ShareIcon } from "@heroicons/react/24/solid"
import Spinner from "../../components/core/Spinner"
import TextInput from "../../components/core/TextInput"
import TextAreaInput from "../../components/core/TextAreaInput"

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
        title: '',
        description: '',
        questions: [getNewFormElement(1)]
    })
    const { saveForm, isLoading: isSaving, error } = useSaveForm();
    
    useEffect(() => {
        saveForm(form)
    }, [form])

    const handleFormMetadataChange = (field: 'title' | 'description', value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }))
    }

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

    return (<div className="space-y-2">
         <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleAddQuestion}>Add Question</Button>
            <div className="flex gap-2 items-center">
                {isSaving && <div className="flex gap-2 items-center"><Spinner />Saving...</div>}
                {error && <div>{error}</div>}
                <Link to={`/form/${form.id}`}>
                    <ShareIcon className="w-6 h-6 cursor-pointer" />
                </Link>
            </div>
        </div>
         <div className="space-y-2">
                <TextInput value={form.title} onChange={(value) => handleFormMetadataChange('title', value)} placeholder="Enter form title (optional)" label="Title" />
                <TextAreaInput value={form.description} onChange={(value) => handleFormMetadataChange('description', value)} placeholder="Enter form description (optional)" label="Description" />
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
