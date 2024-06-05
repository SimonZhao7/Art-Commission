import { FunctionComponent, MouseEventHandler } from "react";

type OptionDotsProps = {
  handleEditClick: MouseEventHandler<HTMLButtonElement>;
  handleDeleteClick: MouseEventHandler<HTMLButtonElement>;
  offsetTop?: number;
  offsetLeft?: number;
  iconSize?: number;
};

export type OptionDotsComponent = FunctionComponent<OptionDotsProps>;
