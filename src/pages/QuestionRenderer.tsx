import { Question } from "../types/Question"


function QuestionRenderer({ question }: { question: Question }) {
    switch (question.type) {
        case 'text':
        case 'number':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title} {question.required ? <span className="text-red-500">*</span> : ''}</label>
                <input type={question.type} className="border border-gray-300 rounded-md p-2" id={question.id} />
            </div>;
        case 'select':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title} {question.required ? <span className="text-red-500">*</span> : ''}</label>
                <select className="border border-gray-300 rounded-md p-2" id={question.id}>
                    {question.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>;
        default:
            return <div>{'Unknown question type'}</div>;
    }
}

export default QuestionRenderer