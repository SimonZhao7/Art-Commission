import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
// React Icons
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
// Components
import EditCarousel from "./EditCarousel";
// Types
import { Image } from "@/types/commission";

interface Props {
  images: Image[];
  height: number;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  setImages: Dispatch<SetStateAction<Image[]>>;
}

export default function ImageCarousel({
  images,
  height,
  handleFileUpload,
  setImages,
}: Props) {
  const [index, setIndex] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [dragImages, setDragImages] = useState<Image[]>(images);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const items = document.getElementsByClassName("edit-item");

  useEffect(() => {
    const handleDragStart = (e: Event) => {};

    const handleDragEnd = () => {};

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("dragstart", handleDragStart);
      items[i].addEventListener("dragend", handleDragEnd);
    }
  }, []);

  const closeModal = () => setEditOpen(false);

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
    if (idx <= index) {
      setIndex(Math.max(0, index - 1));
    }
  };

  return (
    <section className="my-20 font-montserrat">
      <div
        className={"relative flex w-full gap-2 bg-dark-blue"}
        style={{ height: `${height}px` }}
      >
        <button
          type="button"
          className="carousel-btn absolute left-0"
          onClick={() =>
            setIndex((prev) => {
              if (prev - 1 < 0) {
                return images.length - 1;
              } else {
                return prev - 1;
              }
            })
          }
        >
          <BsChevronCompactLeft className="h-10 w-10" />
        </button>
        {images.length > 0 ? (
          <img
            src={images[index].url}
            alt={`Image at index ${index}`}
            className="h-full w-full flex-1 rounded-md object-cover p-[1px] shadow-sm"
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-dark-gray">
            <LuImagePlus className="h-20 w-20" />
            <h1>Upload your sample photos!</h1>
          </div>
        )}
        <button
          type="button"
          className="carousel-btn absolute right-0"
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        >
          <BsChevronCompactRight className="h-10 w-10" />
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between text-dark-gray">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-dark-blue px-5 py-2 text-sm"
          onClick={() => fileRef.current?.click()}
        >
          <AiOutlinePlus className="h-4 w-4" /> Add
        </button>
        <div className="flex items-center justify-center gap-2">
          {images.map((image, idx) => {
            return idx === index ? (
              <div
                key={image.url}
                className="h-4 w-4 cursor-pointer rounded-full bg-dark-blue-highlight"
              ></div>
            ) : (
              <div
                key={image.url}
                className="h-3 w-3 cursor-pointer rounded-full bg-dark-blue transition-all hover:scale-110"
                onClick={() => setIndex(idx)}
              ></div>
            );
          })}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-dark-blue px-5 py-2 text-sm"
          onClick={() => setEditOpen(true)}
        >
          <FiEdit className="h-4 w-4" /> Edit
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept=".jpg,.png"
        onChange={handleFileUpload}
      />
      {editOpen && (
        <EditCarousel
          images={images}
          closeModal={closeModal}
          removeImage={removeImage}
        />
      )}
    </section>
  );
}
