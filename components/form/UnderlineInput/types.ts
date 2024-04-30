import { FunctionComponent, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type UnderlineInputProps = {
  label: string;
  attr?: InputHTMLAttributes<HTMLInputElement>;
  pre?: string;
  post?: string;
  labelFontSize?: number;
  registerProps?: UseFormRegisterReturn;
  labelStyles?: string;
  containerStyles?: string;
  inputStyles?: string;
};

export type UnderlineInputComponent = FunctionComponent<UnderlineInputProps>;
