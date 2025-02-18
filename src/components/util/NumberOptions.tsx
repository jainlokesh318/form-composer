import { NumberField } from "../../types/Field"
import { Question } from "../../types/Question"
import NumberInput from "../core/NumberInput"

function NumberOptions({ question, onChange }: { question: Question & NumberField, onChange: (question: Question & NumberField) => void }) {
    return <div className="flex flex-row gap-2 flex-wrap">
        <NumberInput value={question.min} onChange={(value) => onChange({ ...question, min: value })} placeholder="(optional) Minimum" label="Min" />
        <NumberInput value={question.max} onChange={(value) => onChange({ ...question, max: value })} placeholder="(optional) Maximum" label="Max" />
    </div>
}

export default NumberOptions    