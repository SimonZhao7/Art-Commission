import { UnderlineInputComponent } from "./types";

const UnderlineInput: UnderlineInputComponent = ({
  label,
  placeHolder,
  labelFontSize,
  registerProps,
  
}) => {
  return (
    <div className="my-8 w-full border-[3px] border-transparent border-b-dark-purple-highlight">
      <label
        style={{ fontSize: `${labelFontSize ? labelFontSize : "18"}px` }}
        className="block font-montserrat text-lg text-dark-gray"
      >
        {label}
      </label>
      <input
        className="w-full bg-transparent py-3 font-space-grotesk text-md text-white outline-none"
        placeholder={placeHolder}
        {...registerProps}
      ></input>
    </div>
  );
};

export default UnderlineInput;
