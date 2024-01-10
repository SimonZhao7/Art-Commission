import { DragEventHandler } from "react";
import { GrDrag } from "react-icons/gr";
import { BsTrash3Fill } from "react-icons/bs";
import { Image } from "@/types/commission";

interface Props {
  images: Image[];
  closeModal: () => void;
  removeImage: (idx: number) => void;
}

const EditCarousel = ({ images, closeModal, removeImage }: Props) => {
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {};

  return (
    <div
      className="flex items-center justify-center w-screen h-screen absolute p-10 top-0 left-0 z-60 bg-black bg-opacity-60"
      onClick={closeModal}
    >
      <div
        className="image p-10 rounded-sm bg-white w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center mb-10 text-2xl">Edit Image List</h1>
        <div onDragOver={handleDragOver}>
          {images.map((image, i) => (
            <div
              draggable={true}
              className={`edit-item flex items-center gap-4 h-[100px] w-full ${
                i < images.length - 1 && "mb-4"
              }`}
            >
              <GrDrag className="w-5 h-5" />
              <img
                className="flex-1 block h-full object-cover rounded-md border-[1px] border-med-gray"
                key={image.url}
                src={image.url}
                alt={`Edit Image ${image.url}`}
              />
              <BsTrash3Fill
                className="w-5 h-5"
                onClick={() => removeImage(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditCarousel;
