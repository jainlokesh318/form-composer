import { Form } from '../../types/Form'
import { Link } from 'react-router'

interface FormCardProps {
    form: Form
}

function FormCard({ form }: FormCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <div className="flex flex-col h-full">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {form.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3">
                        {form.description}
                    </p>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        {form.questions.length} question{form.questions.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex gap-2">
                        <Link 
                            to={`/builder/${form.id}`}
                            className="text-sm text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </Link>
                        <Link 
                            to={`/form/${form.id}`}
                            className="text-sm text-blue-500 hover:text-blue-700"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCard