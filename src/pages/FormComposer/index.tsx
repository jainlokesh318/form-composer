import { useParams } from "react-router"
import { useGetFormById } from "../../hooks/useGetFormById"
import { useEffect } from "react"
import Spinner from "../../components/core/Spinner"
import FormBuilder from "./FormBuilder"

function FormComposer() {
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

    if (form) {
        return <FormBuilder form={form} />
    }

    return <div>Form not found</div>
}

export default FormComposer