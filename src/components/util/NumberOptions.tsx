import { NumberField } from "../../types/Field"
import { Question } from "../../types/Question"

function NumberOptions({ question, onChange }: { question: Question & NumberField, onChange: (question: Question & NumberField) => void }) {
    return <div className="flex flex-row gap-2 flex-wrap">
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="min">Min</label>
            <input placeholder="(optional) Minimum" className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" type="number" value={question.min} onChange={(e) => onChange({ ...question, min: parseInt(e.target.value) })} />
        </div>
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="max">Max</label>
            <input placeholder="(optional) Maximum" className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" type="number" value={question.max} onChange={(e) => onChange({ ...question, max: parseInt(e.target.value) })} />
        </div>
    </div>
}

export default NumberOptions    