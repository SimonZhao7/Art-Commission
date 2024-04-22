import { UnderlineInputComponent } from "./types";

const UnderlineInput: UnderlineInputComponent = ({ label, placeHolder }) => {
  return (
    <div className="my-8 w-full border-[3px] border-transparent border-b-dark-purple-highlight">
      <label className="block font-montserrat text-lg text-dark-gray">
        {label}
      </label>
      <input
        className="w-full bg-transparent py-3 font-space-grotesk text-md text-white outline-none"
        placeholder={placeHolder}
      ></input>
    </div>
  );
};

export default UnderlineInput;
