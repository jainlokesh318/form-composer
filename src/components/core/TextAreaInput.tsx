function TextAreaInput({ value, onChange, placeholder = '', label = ''}: { value?: string, onChange: (value: string) => void, placeholder: string, label?: string }) {
    return <div className="flex flex-row gap-2 items-center">
        <label htmlFor={label}>{label}</label>
        <textarea id={label} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border-2  border-gray-300 focus:border-blue-500 outline-none px-2 py-1 resize-none rounded-md" />
    </div>
}

export default TextAreaInput