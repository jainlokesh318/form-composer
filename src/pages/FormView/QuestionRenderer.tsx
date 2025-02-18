import NumberInput from "../../components/core/NumberInput"
import TextInput from "../../components/core/TextInput"
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
                    <TextInput 
                        orientation="vertical"
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        label={question.title}
                        placeholder=""
                        required={question.required}
                    />
            )
        case 'number':
            return (
                   <NumberInput 
                        orientation="vertical"
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        label={question.title}
                        placeholder=""
                        required={question.required}
                    />
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
            return null
        }
    }
}

export default QuestionRenderer