import { UnderlineInputComponent } from "./types";

const UnderlineInput: UnderlineInputComponent = ({ label, placeHolder }) => {
  return (
    <div className="w-full border-transparent border-[3px] border-b-dark-purple-highlight my-8">
      <label className="block text-lg text-dark-gray font-montserrat">
        {label}
      </label>
      <input
        className="w-full text-md text-white bg-transparent outline-none py-3 font-space-grotesk"
        placeholder={placeHolder}
      ></input>
    </div>
  );
};

export default UnderlineInput;
