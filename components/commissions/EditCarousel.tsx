import { Dispatch, DragEventHandler, SetStateAction } from "react";
// React Icons
import { IoClose } from "react-icons/io5";
import { MdImageNotSupported } from "react-icons/md";
// Components
import DraggableEditImage from "./DraggableEditImage";
// Types
import { Image } from "@/types/commission";
// Framer Motion
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
    e.dataTransfer.dropEffect = "move";
    const draggedElement = document.querySelector(".dragging")!;
    const imgElements = Array.from(document.querySelectorAll(".edit-item"));
    const dragElementIdx = imgElements.findIndex((el) => el === draggedElement);
    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < imgElements.length; i++) {
      if (i === dragElementIdx) {
        continue;
      }

      const imgElement = imgElements[i];
      const { bottom, left, right, top } = imgElement.getBoundingClientRect();

      if (left <= x && x <= right && top <= y && y <= bottom) {
        if (i > dragElementIdx) {
          imgElement.after(draggedElement);
        } else {
          e.currentTarget.insertBefore(draggedElement, imgElement);
        }
        return;
      }
    }
  };

  const handleOrderChange = () => {
    const map = new Map<string, Image>();
    const imgElements = Array.from(document.querySelectorAll(".edit-item img"));

    images.forEach((img) => {
      map.set(img.url, img);
    });

    setImages(
      imgElements.map((el) => {
        const key = el.getAttribute("src")!;
        return map.get(key)!;
      }),
    );
    closeModal();
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
        <>
          <div
            className="grid grid-flow-row grid-cols-3 gap-10 p-5"
            onDragOver={handleDragOver}
          >
            {images.map((image, i) => (
              <DraggableEditImage
                key={image.url}
                i={i}
                image={image}
                removeImage={removeImage}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-0 p-12">
            <button
              onClick={handleOrderChange}
              type="button"
              className="rounded-sm bg-dark-blue-highlight px-4 py-2 transition-all duration-100 ease-out
                hover:bg-dark-blue-highlight"
            >
              Confirm Order
            </button>
          </div>
        </>
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
