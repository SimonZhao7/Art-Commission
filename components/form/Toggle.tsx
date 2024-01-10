"use client";

import { useRef } from "react";
import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

interface Props {
  active: boolean;
  register: UseFormRegister<any>;
}

const Toggle = ({ active, register }: Props) => {
  const { onChange, onBlur, name, ref } = register("visible");
  const checkbox = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={clsx(
        "w-24 bg-med-gray p-[6px] rounded-full inline-flex flex-col justify-center transition-colors linear duration-500 cursor-pointer",
        active && "bg-green-500"
      )}
      onClick={() => {
        if (checkbox.current) {
          checkbox.current.click();
          console.log(checkbox.current.checked);
        }
      }}
    >
      <div
        className={clsx(
          "bg-white w-4 h-4 rounded-full transition-transform linear duration-200 shadow-lg",
          active && "translate-x-[68px]"
        )}
      ></div>
      <input
        className="hidden"
        type="checkbox"
        checked={active}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={(e) => {
          ref(e);
          checkbox.current = e;
        }}
      />
    </div>
  );
};

export default Toggle;
