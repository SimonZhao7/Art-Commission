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
      className="z-60 absolute left-0 top-0 flex h-screen w-screen items-center justify-center
        bg-black bg-opacity-60 p-10"
      onClick={closeModal}
    >
      <div
        className="image w-full max-w-xl rounded-sm bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-10 text-center text-2xl">Edit Image List</h1>
        <div onDragOver={handleDragOver}>
          {images.map((image, i) => (
            <div
              draggable={true}
              className={`edit-item flex h-[100px] w-full items-center gap-4 ${
                i < images.length - 1 && "mb-4"
              }`}
            >
              <GrDrag className="h-5 w-5" />
              <img
                className="block h-full flex-1 rounded-md border-[1px] border-med-gray object-cover"
                key={image.url}
                src={image.url}
                alt={`Edit Image ${image.url}`}
              />
              <BsTrash3Fill
                className="h-5 w-5"
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
