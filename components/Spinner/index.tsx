import { FunctionComponent } from "react";
// Types
import { SpinnerProps } from "./types";

const Spinner: FunctionComponent<SpinnerProps> = ({ size }) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={
        "animate-spin rounded-full border-4 border-white border-t-transparent"
      }
    >
      &nbsp;
    </div>
  );
};

export default Spinner;
