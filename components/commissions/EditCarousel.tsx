import { Dispatch, DragEventHandler, SetStateAction } from "react";
// React Icons
import { IoClose } from "react-icons/io5";
import { MdImageNotSupported } from "react-icons/md";
// Components
import OptionDots from "../OptionDots";
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

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.add("opacity-50", "dragging");
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.remove("opacity-50", "dragging");
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
              <div
                draggable={true}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                key={image.url}
                className={`edit-item relative flex h-[300px] w-full items-center gap-4 hover:cursor-grab ${
                  i < images.length - 1 && "mb-4"
                }`}
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
