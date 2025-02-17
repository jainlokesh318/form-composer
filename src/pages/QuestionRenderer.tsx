import { Question } from "../types/Question"


function QuestionRenderer({ question }: { question: Question }) {
    switch (question.type) {
        case 'text':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title}</label>
                <input type="text" className="border border-gray-300 rounded-md p-2" id={question.id} />
            </div>;
        case 'select':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title}</label>
                <select className="border border-gray-300 rounded-md p-2" id={question.id}>
                    {question.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>;
        case 'number':
            return <div className="flex flex-col gap-2">
                <label htmlFor={question.id}>{question.title}</label>
                <input className="border border-gray-300 rounded-md p-2" type="number" id={question.id} />
            </div>;
        default:
            return <div>{'Unknown question type'}</div>;
    }
}

export default QuestionRenderer