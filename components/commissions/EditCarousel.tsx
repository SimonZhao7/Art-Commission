import { Dispatch, DragEventHandler, SetStateAction } from "react";
import { GrDrag } from "react-icons/gr";
import { BsTrash3Fill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdImageNotSupported } from "react-icons/md";
import { Image } from "@/types/commission";
import { motion, Variants } from "framer-motion";

interface Props {
  images: Image[];
  closeModal: () => void;
  removeImage: (idx: number) => void;
  setImages: Dispatch<SetStateAction<Image[]>>;
}

const modalVariant: Variants = {
  open: { y: 0, opacity: 1 },
  closed: { y: "100%", opacity: 0 },
};

const EditCarousel = ({
  images,
  closeModal,
  removeImage,
  setImages,
}: Props) => {
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const imagesCopy = [...images];
    const draggedImageURL = document
      .querySelector(".dragging")
      ?.getAttribute("key");
    const imgElements = Array.from(
      document.querySelectorAll(".edit-item:not(.dragging)"),
    );
    const x = e.clientX;
    const y = e.clientY;

    // i is the index where item is insertedBefore
    for (let i = 0; i < imgElements.length; i++) {
      const imgElement = imgElements[i];
      const { bottom, left, width } = imgElement.getBoundingClientRect();

      if (y < bottom && x < left + width / 2) {
        const removedImage = imagesCopy.splice(idx, 1)[0];
        imagesCopy.splice(i, 0, removedImage);
        setImages(imagesCopy);
        return;
      }
    }
  };

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.add("opacity-50", "dragging");
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.remove("opacity-50", "dragging");
  };

  return (
    <motion.div
      variants={modalVariant}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 z-20 h-screen w-screen bg-dark-bg"
    >
      <div className="flex items-center justify-between p-5 px-10">
        <h1 className="text-3xl">Edit Image List</h1>
        <button type="button" onClick={closeModal}>
          <IoClose size={50} />
        </button>
      </div>
      {images.length > 0 ? (
        <div
          className="grid grid-flow-row grid-cols-3 gap-10 p-5"
          onDragOver={handleDragOver}
        >
          {images.map((image, i) => (
            <div
              draggable={true}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              key={image.url}
              className={`edit-item flex h-[300px] w-full items-center gap-4 hover:cursor-grab ${
                i < images.length - 1 && "mb-4"
              }`}
            >
              <img
                className="block h-full flex-1 rounded-[10px] border-[3px] border-dark-blue object-cover"
                key={image.url}
                src={image.url}
                alt={`Edit Image ${image.url}`}
              />
              {/* <BsTrash3Fill className="h-5 w-5" onClick={() => removeImage(i)} /> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[-100px] flex h-full flex-col items-center justify-center gap-5">
          <MdImageNotSupported size={125} />
          <h3 className="text-2xl">Uh oh... You don't have any images</h3>
        </div>
      )}
    </motion.div>
  );
};

export default EditCarousel;
