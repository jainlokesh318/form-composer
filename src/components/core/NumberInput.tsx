function NumberInput({ value, onChange, placeholder, label, min, max, required, orientation = 'horizontal', onBlur }: { value?: number, onChange: (value: number) => void, placeholder: string, label: string, min?: number, max?: number, required?: boolean, orientation?: 'horizontal' | 'vertical', onBlur?: () => void }) {
    return <div className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'flex-row items-center'}`}>
        <label htmlFor={label} className="block mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
        <input id={label} placeholder={placeholder} type="number" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value))} className="border-2 border-gray-300 focus:border-blue-500 rounded-md px-2 py-1" onBlur={onBlur}/>
    </div>
}

export default NumberInput