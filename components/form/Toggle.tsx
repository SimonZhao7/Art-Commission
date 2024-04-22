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
        `linear inline-flex w-24 cursor-pointer flex-col justify-center rounded-full
        p-[6px] transition-colors duration-300`,
        active ? "bg-green-500" : "bg-med-gray",
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
          "linear h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-200",
          active && "translate-x-[68px]",
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
