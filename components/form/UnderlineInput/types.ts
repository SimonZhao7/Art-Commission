import { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type UnderlineInputProps = {
  label: string;
  placeHolder?: string;
  labelFontSize?: number;
  registerProps?: UseFormRegisterReturn;
};

export type UnderlineInputComponent = FunctionComponent<UnderlineInputProps>;
