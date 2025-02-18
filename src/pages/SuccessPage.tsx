import { Link, useLocation, Navigate } from 'react-router'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Button from '../components/core/Button'

interface LocationState {
    formTitle?: string
    fromSubmission?: boolean
}

function SuccessPage() {
    const location = useLocation()
    const state = location.state as LocationState

    // Prevent direct access to success page
    if (!state?.fromSubmission) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center">
                    <CheckCircleIcon className="w-20 h-20 text-green-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Response Submitted!
                    </h1>
                    {state.formTitle && (
                        <p className="text-gray-600">
                            Thank you for completing "{state.formTitle}"
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    <p className="text-gray-500">
                        Your response has been recorded successfully.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/">
                            <Button variant="outline">
                                Back to Home
                            </Button>
                        </Link>
                        <Link to={`/form/${location.state?.formId}`}>
                            <Button>
                                Submit Another Response
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage