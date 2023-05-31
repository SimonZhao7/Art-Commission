interface InputProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    props?: {};
}


export default function Input({ label, type='text', name, value, props, onChange }: InputProps) {
    return (
        <div className="mb-3">
            <label className="block mb-1">{label}</label>
            <input className='w-full h-10 border-gray-300 border-2 rounded-sm outline-none p-3 hover:border-gray-400 transition-all duration-100' type={type} value={value} name={name} {...props} onChange={onChange} />      
        </div>
    )
}