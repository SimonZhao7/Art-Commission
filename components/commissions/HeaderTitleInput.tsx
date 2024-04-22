import { useState, useRef, useEffect } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// React Icons
import { FiEdit, FiCheck } from "react-icons/fi";

const HeaderTitleInput = () => {
  const { register, formState: errors } = useFormContext();
  const [showTitleInput, setShowTitleInput] = useState(false);
  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target !== titleInput.current) {
        setShowTitleInput(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (showTitleInput) {
      titleInput.current?.focus();
    }
  }, [showTitleInput]);

  return (
    <div
      className="flex w-full items-center justify-between border-[1px] border-slight-gray p-5
        shadow-md"
    >
      <input
        {...register("title")}
        className="w-[300px] overflow-ellipsis outline-none disabled:bg-transparent"
        disabled={!showTitleInput}
        ref={titleInput}
        defaultValue={"A New Commission"}
      />
      {showTitleInput ? (
        <FiCheck
          className="h-5 w-5 cursor-pointer"
          onClick={() => setShowTitleInput(false)}
        />
      ) : (
        <FiEdit
          className="h-5 w-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowTitleInput(true);
          }}
        />
      )}
    </div>
  );
};

export default HeaderTitleInput;
