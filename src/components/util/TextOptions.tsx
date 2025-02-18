import { TextField } from "../../types/Field"
import { Question } from "../../types/Question"

function TextOptions({ question, onChange }: { question: Question & TextField, onChange: (question: Question & TextField) => void }) {
    return <div className="flex gap-2 flex-wrap">
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="minLength">Min Length</label>
            <input placeholder="(optional) Minimum Length" className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" type="number" id="minLength" value={question.minLength} onChange={(e) => onChange({ ...question, minLength: parseInt(e.target.value) })} />
        </div>
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="maxLength">Max Length</label>
            <input placeholder="(optional) Maximum Length" className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" type="number" id="maxLength" value={question.maxLength} onChange={(e) => onChange({ ...question, maxLength: parseInt(e.target.value) })} />
        </div>
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="pattern">Pattern</label>
            <input placeholder="(optional) Pattern" className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" type="text" id="pattern" value={question.pattern} onChange={(e) => onChange({ ...question, pattern: e.target.value })} />
        </div>
    </div>
}       

export default TextOptions