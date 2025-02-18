import { Question } from "../../types/Question"


function QuestionRenderer({ question, value, onChange }: { question: Question, value: any, onChange: (value: any) => void }) {
    switch (question.type) {
        case 'text':
        case 'number':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title} {question.required ? <span className="text-red-500">*</span> : ''}</label>
                <input type={question.type} className="border border-gray-300 rounded-md p-2" id={question.id} value={value} onChange={(e) => onChange(e.target.value)} />
            </div>;
        case 'select':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title} {question.required ? <span className="text-red-500">*</span> : ''}</label>
                <select className="border border-gray-300 rounded-md p-2" id={question.id} value={value} onChange={(e) => onChange(e.target.value)}>
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