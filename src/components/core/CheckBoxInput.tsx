function CheckBoxInput({ value, onChange, label }: { value: boolean, onChange: (value: boolean) => void, label: string }) {
    return <div className="flex flex-row gap-2 items-center">
        <input id={label} type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <label htmlFor={label}>{label}</label>
    </div>
}

export default CheckBoxInput