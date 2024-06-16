import { ChangeEvent, ChangeEventHandler } from "react"

interface InputParams {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export function AuthInputs({ label, placeholder, onChange }: InputParams) {
    return <div className="justify-center">
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium ">{label}</label>
        <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}