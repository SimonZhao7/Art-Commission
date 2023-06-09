import { InputHTMLAttributes } from "react";
// React Hook Form
import { RegisterOptions, UseFormRegister } from "react-hook-form";
// React Icons
import { CgDanger } from "react-icons/cg";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  props?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  register: UseFormRegister<any>;
  regProps?: RegisterOptions;
}

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  error,
  props,
  regProps,
  register,
}: InputProps) {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm">{label}</label>
      <input
        className={`w-full h-10 text-sm ${
          error ? "border-red-500" : "border-gray-300"
        } border-2 rounded-md outline-none p-3 ${
          !error && "hover:border-gray-400"
        } transition-all duration-100`}
        type={type}
        placeholder={placeholder}
        {...props}
        {...register(name, regProps)}
      />
      {error && (
        <div className="text-red-500 text-sm flex items-center gap-1">
          <CgDanger />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
