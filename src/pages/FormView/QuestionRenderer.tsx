import { Question } from "../../types/Question"

interface QuestionRendererProps {
    question: Question
    value: any
    onChange: (value: any) => void
    onBlur: () => void
}

const renderLabel = (question: Question) => (
    <label className="block mb-1">
        {question.title}
        {question.required && <span className="text-red-500 ml-1">*</span>}
    </label>
)

function QuestionRenderer({ question, value, onChange, onBlur }: QuestionRendererProps) {
    switch (question.type) {
        case 'text':
            return (
                <div>
                    {renderLabel(question)}
                    <input 
                        type="text"
                        value={value || ''}
                        onChange={(e) => {
                            onChange(e.target.value)}}
                        onBlur={onBlur}
                        className="border-2 border-gray-300 rounded-md p-1 w-full"
                    />
                </div>
            )
        case 'number':
            return (
                <div>
                    {renderLabel(question)}
                    <input 
                        type="number"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.valueAsNumber)}
                        onBlur={onBlur}
                        className="border-2 border-gray-300 rounded-md p-1 w-full"
                    />
                </div>
            )
        case 'select':
            return (
                <div>
                    {renderLabel(question)}
                    <select 
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className="border-2 border-gray-300 rounded-md p-1 w-full"
                    >
                        <option value="">Select an option</option>
                        {question.options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )
        default: {
            return <div>{'Unknown question type'}</div>
        }
    }
}

export default QuestionRenderer