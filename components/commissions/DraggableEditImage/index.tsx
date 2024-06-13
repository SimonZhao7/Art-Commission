import { DragEventHandler } from "react";
// Components
import OptionDots from "@/components/OptionDots";
// Types
import { DraggableEditImageComponent } from "./types";

const DraggableEditImage: DraggableEditImageComponent = ({
  i,
  image,
  removeImage,
}) => {
  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.add("opacity-50", "dragging");
    const image = document.querySelector(".dragging img")!;
    const { top, left } = e.currentTarget.getBoundingClientRect();
    e.dataTransfer.setDragImage(image, e.clientX - left, e.clientY - top);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.remove("opacity-50", "dragging");
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={
        "edit-item relative flex h-[300px] w-full items-center gap-4 hover:cursor-grab"
      }
    >
      <img
        className="block h-full flex-1 rounded-[10px] border-[3px] border-dark-blue object-cover"
        src={image.url}
        alt={`Edit Image ${image.url}`}
      />
      <div className="absolute bottom-3 right-3">
        <OptionDots
          offsetTop={-90}
          offsetLeft={-90}
          handleDeleteClick={() => removeImage(i)}
          handleEditClick={() => {}}
        />
      </div>
    </div>
  );
};

export default DraggableEditImage;
