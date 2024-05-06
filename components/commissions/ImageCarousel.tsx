import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
// React Icons
import { FiEdit } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
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

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setIndex((index + 1) % images.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [index]);

  const closeModal = () => setEditOpen(false);

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
    if (idx <= index) {
      setIndex(Math.max(0, index - 1));
    }
  };

  return (
    <section className="font-montserrat">
      <div
        className={"relative flex w-full gap-2 overflow-hidden bg-dark-blue"}
        style={{ height: `${height}px` }}
      >
        {images.length > 0 ? (
          <div
            className="flex flex-1 transition-transform duration-150"
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                src={img.url}
                key={img.url}
                alt={`Image at index ${i}`}
                className="h-full w-full flex-shrink-0 rounded-md object-cover p-[1px] shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-dark-gray">
            <LuImagePlus className="h-20 w-20" />
            <h1>Upload your sample photos!</h1>
          </div>
        )}
        <button
          type="button"
          className="carousel-btn absolute left-0"
          onClick={() =>
            setIndex((prev) => (prev - 1 + images.length) % images.length)
          }
        >
          <BsChevronCompactLeft className="h-10 w-10" />
        </button>
        <button
          type="button"
          className="carousel-btn absolute right-0"
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        >
          <BsChevronCompactRight className="h-10 w-10" />
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between">
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
