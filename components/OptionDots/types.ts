import { FunctionComponent, MouseEventHandler } from "react";

type OptionDotsProps = {
  handleEditClick: MouseEventHandler<HTMLButtonElement>;
  handleDeleteClick: MouseEventHandler<HTMLButtonElement>;
};

export type Pos = {
  top: number;
  left: number;
};

export type OptionDotsComponent = FunctionComponent<OptionDotsProps>;
