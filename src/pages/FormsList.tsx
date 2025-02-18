import { useGetForms } from "../hooks/useGetForms"
import FormCard from "../components/util/FormCard"
import Spinner from "../components/core/Spinner"
import { useEffect } from "react"

function FormsList() {
    const { forms, isLoading, error, fetchForms } = useGetForms()

    useEffect(() => {
        fetchForms()
    }, [])

    if (isLoading) {
        return <div className="flex justify-center"><Spinner /></div>
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                {error}
            </div>
        )
    }

    if (!forms.length) {
        return (
            <div className="text-center text-gray-500 py-8">
                No forms created yet. Create your first form!
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="text-2xl font-bold">Forms Created By You</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {forms.map(form => (
                    <FormCard key={form.id} form={form} />
                ))}
            </div>
        </div>
    )
}

export default FormsList