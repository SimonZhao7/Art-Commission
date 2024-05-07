import { AddOn } from "@/types/commission";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

type AddOnFormProps = {
  addOns: AddOn[];
  setAddOns: Dispatch<SetStateAction<AddOn[]>>;
};

export type AddOnComponent = FunctionComponent<AddOnFormProps>;
