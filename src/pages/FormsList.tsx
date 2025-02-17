import { useEffect } from "react"
import { useGetForms } from "../hooks/useGetForms"
import { Link } from "react-router"
import Spinner from "../components/core/Spinner"
function FormsList() {
    const { forms, fetchForms, isLoading: isFetchingForms, error } = useGetForms()

    useEffect(() => {
        fetchForms()
    }, [])


    if (isFetchingForms) {
        return <Spinner />
    }

    if (error) {
        return <div>Error fetching forms</div>
    }

    return <div className="flex flex-col gap-2 items-center">
        {forms.length === 0 ? <div>Create a form to get started</div> : <div className="underline">Forms Created By You</div>}
        <div className="flex gap-2 justify-center">
            {forms.map((form, index) => (
                <Link to={`/builder/${form.id}`} key={form.id} className="border border-2 p-4 rounded-md hover:shadow-md">
                    <h1>{'Form ' + (index + 1)}</h1>
                </Link>
            ))}
        </div>
    </div>
}

export default FormsList