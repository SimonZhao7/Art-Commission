"use client";

import { useState } from "react";
import clsx from "clsx";

interface Props {
  initState?: boolean;
}

const Toggle = ({ initState = false }: Props) => {
  const [active, setActive] = useState(initState);

  return (
    <div
      className={clsx(
        "w-24 bg-med-gray p-[6px] rounded-full inline-flex flex-col justify-center transition-colors linear duration-500 cursor-pointer",
        active && "bg-green-500"
      )}
      onClick={() => {
        setActive(!active);
      }}
    >
      <div
        className={clsx(
          "bg-white w-4 h-4 rounded-full transition-transform linear duration-200 shadow-lg",
          active && "translate-x-[68px]"
        )}
      ></div>
    </div>
  );
};

export default Toggle;
