import { FunctionComponent } from "react";
import { Image } from "@/types/commission";

type DraggableEditImageProps = {
  i: number;
  image: Image;
  removeImage: (idx: number) => void;
};

export type DraggableEditImageComponent =
  FunctionComponent<DraggableEditImageProps>;
