import { useState } from "react"
import { SelectField } from "../../types/Field"
import { Question } from "../../types/Question"
import Button from "../core/Button"
import TextInput from "../core/TextInput"
interface SelectOptionsProps {
    question: Question & SelectField
    onChange: (options: SelectField['options']) => void
}

function SelectOptions({ question, onChange }: SelectOptionsProps) {
    const [newOption, setNewOption] = useState('')

    const handleAddOption = () => {
        if (newOption.trim()) {
            onChange([
                ...question.options,
                { label: newOption, value: newOption.toLowerCase() }
            ])
            setNewOption('')
        }
    }

    const handleUpdateOption = (index: number, newLabel: string) => {
        const updatedOptions = [...question.options]
        updatedOptions[index] = {
            label: newLabel,
            value: newLabel.toLowerCase()
        }
        onChange(updatedOptions)
    }

    const handleDeleteOption = (index: number) => {
        onChange(question.options.filter((_, i) => i !== index))
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
                <TextInput value={newOption} onChange={(value) => setNewOption(value)} placeholder="Enter new option" label="Add Option" />
                <Button variant="secondary" onClick={handleAddOption} disabled={!newOption.trim()}>Add</Button> 
            </div>
            <div className="flex flex-col gap-2">
                {question.options.map((option, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center pl-10">
                        <TextInput value={option.label} onChange={(value) => handleUpdateOption(index, value)} placeholder="Enter option" label={`Option ${index+1}`} />
                        <Button variant="secondary" onClick={() => handleDeleteOption(index)}>Delete</Button>   
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectOptions