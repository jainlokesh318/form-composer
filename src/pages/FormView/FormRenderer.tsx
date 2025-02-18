import { Form } from "../../types/Form"
import QuestionRenderer from "./QuestionRenderer"
import Button from "../../components/core/Button"

interface FormRendererProps {
    form: Form
}

function FormRenderer({ form }: FormRendererProps) {


    const handleSubmit = () => {
        console.log("submit")
    }

    return (
        <div className="flex flex-col gap-4 w-1/2 mx-auto">
            {form.questions.map((question) => (
                <div key={question.id}>
                    <QuestionRenderer question={question}/>
                </div>
            ))}
            <Button
                onClick={handleSubmit}
                variant="outline"
            >
                Submit
            </Button>
        </div>
    )
}

export default FormRenderer