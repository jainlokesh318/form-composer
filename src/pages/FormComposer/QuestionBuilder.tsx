import { useEffect, useState } from "react";
import { Question, QuestionType, questionTypeLabels } from "../../types/Question";
import { NumberField, SelectField, TextField } from "../../types/Field";
import SelectOptions from "../../components/util/SelectOptions";
import { TrashIcon } from '@heroicons/react/24/solid'
import TextOptions from "../../components/util/TextOptions";
import NumberOptions from "../../components/util/NumberOptions";
import TextInput from "../../components/core/TextInput";
import CheckBoxInput from "../../components/core/CheckBoxInput";

function QuestionBuilder({ question, onDelete, onUpdate }: { question: Question, onDelete: (id: string) => void, onUpdate: (id: string, question: Question) => void }) {
    const [questionState, setQuestionState] = useState<Question>(question)

    useEffect(() => {
        onUpdate(questionState.id, questionState)
    }, [questionState])
    
    const handleChange = (property: keyof Pick<Question, 'id' | 'title' | 'required' | 'type'>, value: string | boolean) => {
        if (property === 'type' && value === 'select') {
            setQuestionState({
                ...questionState,
                [property]: value,
                options: [{ label: 'Option 1', value: 'option-1' }]
            })
        } else {
            setQuestionState({ ...questionState, [property]: value })
        }
    }

    const handleSelectOptionsChange = (options: SelectField['options']) => {
        if (questionState.type === 'select') {
            setQuestionState({
                ...questionState,
                options
            })
        }
    }

    const handleTextOptionsChange = (question: Question & TextField) => {
        setQuestionState(question)
    }

    const handleNumberOptionsChange = (question: Question & NumberField) => {
        setQuestionState(question)
    }

    const renderQuestionOptions = () => {
        switch (questionState.type) {
            case 'select':
                return (
                    <SelectOptions 
                        question={questionState as Question & SelectField} 
                        onChange={handleSelectOptionsChange}
                    />
                )
            case 'text':
                return (
                    <TextOptions 
                        question={questionState as Question & TextField} 
                        onChange={handleTextOptionsChange}
                    />
                )
            case 'number':
                return (
                    <NumberOptions 
                        question={questionState as Question & NumberField} 
                        onChange={handleNumberOptionsChange}
                    />
                )
            default: {
                return null
            }
        }
    }

    return <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-md p-2 my-2">
        <div className="flex justify-between">
            <TextInput value={questionState.title} onChange={(value) => handleChange('title', value)} placeholder="Enter Question Title" label="Question Title" />
            <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => onDelete(questionState.id)} />
        </div>
        <div className="flex gap-2">
            <div className="flex flex-row gap-2 items-center">
                <label htmlFor="description">Question Type</label>
                <select id="type" value={questionState.type} onChange={(e) => handleChange('type', e.target.value)} className="border-2 border-gray-300 rounded-md p-1">
                    {(Object.keys(questionTypeLabels) as QuestionType[]).map(type => (
                        <option key={type} value={type}>
                            {questionTypeLabels[type]}
                        </option>
                    ))}
                </select>
            </div>
            <CheckBoxInput value={questionState.required} onChange={(value) => handleChange('required', value)} label="Required" />
        </div>
        {renderQuestionOptions()}
    </div>
}

export default QuestionBuilder