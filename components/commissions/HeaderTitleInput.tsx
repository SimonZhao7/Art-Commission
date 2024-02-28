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
    <div className="w-full p-5 flex items-center justify-between shadow-md border-[1px] border-slight-gray">
      <input
        {...register("title")}
        className="outline-none disabled:bg-transparent w-[300px] overflow-ellipsis"
        disabled={!showTitleInput}
        ref={titleInput}
        defaultValue={"A New Commission"}
      />
      {showTitleInput ? (
        <FiCheck
          className="w-5 h-5 cursor-pointer"
          onClick={() => setShowTitleInput(false)}
        />
      ) : (
        <FiEdit
          className="w-5 h-5 cursor-pointer"
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
