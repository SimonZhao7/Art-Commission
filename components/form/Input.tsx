import { InputHTMLAttributes } from "react";
// React Hook Form
import { RegisterOptions, UseFormRegister } from "react-hook-form";
// React Icons
import { CgDanger } from "react-icons/cg";
// Util
import clsx from "clsx";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  props?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  containerClsExt?: string;
  classExtend?: string;
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
  containerClsExt,
  classExtend,
  register,
}: InputProps) {
  return (
    <div className={clsx("mb-3 justify-self-center", containerClsExt)}>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        className={clsx(
          "border-2 rounded-md outline-none p-3 w-full h-10 text-sm transition-all duration-100",
          error ? "border-red-500" : "border-gray-300 hover:border-gray-400",
          classExtend
        )}
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
