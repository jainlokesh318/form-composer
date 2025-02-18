function TextInput({ value, onChange, placeholder = '', label = '', onBlur, orientation = 'horizontal', required = false}: { value?: string, onChange: (value: string) => void, placeholder: string, label?: string, onBlur?: () => void, orientation?: 'horizontal' | 'vertical', required?: boolean }) {
    return <div className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'flex-row items-center'}`}>
       <label htmlFor={label} className="block mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
        <input id={label} placeholder={placeholder} type="text" value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" />
    </div>
}

export default TextInput