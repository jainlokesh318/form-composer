import { useParams } from "react-router"
import { useGetFormById } from "../hooks/useGetFormById"
import { useEffect } from "react"
import Spinner from "../components/core/Spinner"
import QuestionRenderer from "./QuestionRenderer"
import Button from "../components/core/Button"


function FormRenderer() {
    const { form, fetchFormById, isLoading: isLoadingForm } = useGetFormById()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            fetchFormById(id)
        }
    }, [id])

    if (isLoadingForm) {
        return <Spinner />
    }

    const handleSubmit = () => {
        console.log('submit')
    }

    if (form) {
        return <div className="flex flex-col gap-4 w-1/2 mx-auto">
            {form.questions.map((question) => (
                <QuestionRenderer key={question.id} question={question} />
            ))}
            <Button onClick={handleSubmit} variant="outline">Submit</Button>
        </div>
    }

    return <div>Form not found</div>
}

export default FormRenderer