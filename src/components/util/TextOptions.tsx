import { TextField } from "../../types/Field"
import { Question } from "../../types/Question"
import NumberInput from "../core/NumberInput"
import TextInput from "../core/TextInput"

function TextOptions({ question, onChange }: { question: Question & TextField, onChange: (question: Question & TextField) => void }) {
    return <div className="flex gap-2 flex-wrap">
        <NumberInput value={question.minLength} onChange={(value) => onChange({ ...question, minLength: value })} placeholder="(optional) Minimum Length" label="Min Length" />
        <NumberInput value={question.maxLength} onChange={(value) => onChange({ ...question, maxLength: value })} placeholder="(optional) Maximum Length" label="Max Length" />
        <TextInput value={question.pattern} onChange={(value) => onChange({ ...question, pattern: value })} placeholder="(optional) Pattern" label="Pattern" />
    </div>
}       

export default TextOptions