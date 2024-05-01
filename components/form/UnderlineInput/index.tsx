import { UnderlineInputComponent } from "./types";

const UnderlineInput: UnderlineInputComponent = ({
  label,
  attr,
  pre,
  post,
  registerProps,
  labelStyles,
  containerStyles,
  inputStyles,
}) => {
  return (
    <div className={`underline-input-container ${containerStyles}`}>
      <label
        className={`block font-montserrat text-lg text-dark-gray ${labelStyles}`}
      >
        {label}
      </label>
      <div className="flex items-end">
        {pre && <span className="mr-2 py-3">{pre}</span>}
        <input
          className={`w-full bg-transparent py-3 font-space-grotesk text-md text-white outline-none
          ${inputStyles}`}
          type="text"
          {...attr}
          {...registerProps}
        />
        {post && <span className="ml-2 py-3">{post}</span>}
      </div>
    </div>
  );
};

export default UnderlineInput;
