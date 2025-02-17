import { useState } from "react"
import { SelectField } from "../../types/Field"
import { Question } from "../../types/Question"
import Button from "../core/Button"
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
                <label htmlFor="newOption">Add Option</label>
                <input
                    type="text"
                    id="newOption"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-1 flex-1"
                    placeholder="Enter new option"
                />
                <Button variant="secondary" onClick={handleAddOption} disabled={!newOption.trim()}>Add</Button> 
            </div>

            <div className="flex flex-col gap-2">
                {question.options.map((option, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center pl-10">
                        <input
                            type="text"
                            value={option.label}
                            onChange={(e) => handleUpdateOption(index, e.target.value)}
                            className="border-2 border-gray-300 rounded-md p-1 flex-1"
                        />
                        <Button variant="secondary" onClick={() => handleDeleteOption(index)}>Delete</Button>   
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectOptions