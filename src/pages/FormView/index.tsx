import { useParams } from "react-router"
import { useGetFormById } from "../../hooks/useGetFormById"
import Spinner from "../../components/core/Spinner"
import FormRenderer from "./FormRenderer"
import { useEffect } from "react"

function FormView() {
    const { id } = useParams()
    const { form, fetchFormById, isLoading, error } = useGetFormById()

    useEffect(() => {
        if (id) {
            fetchFormById(id)
        }
    }, [id])

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    if (!form) {
        return <div>Form not found</div>
    }

    return <FormRenderer form={form} />
}

export default FormView