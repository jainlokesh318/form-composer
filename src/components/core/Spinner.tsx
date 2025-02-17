import { ArrowPathIcon } from "@heroicons/react/24/solid"

function Spinner() {
    return <div className="flex justify-center items-center">
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
    </div>
}

export default Spinner