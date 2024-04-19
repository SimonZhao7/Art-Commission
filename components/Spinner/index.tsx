import { FunctionComponent } from "react";
// Types
import { SpinnerProps } from "./types";

const Spinner: FunctionComponent<SpinnerProps> = ({ size }) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`border-white border-4 animate-spin rounded-full border-t-transparent`}
    >
      &nbsp;
    </div>
  );
};

export default Spinner;
