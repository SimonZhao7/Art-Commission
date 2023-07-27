import { useState, useRef, ChangeEvent } from "react";
// React Icons
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

interface Props {
  images: Image[];
  height: number;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface Image {
  url: string;
  image: File;
}

export default function ImageCarousel({
  images,
  height,
  handleFileUpload,
}: Props) {
  const [index, setIndex] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <section>
      <div className={`flex w-full gap-2`} style={{ height: `${height}px` }}>
        <button
          type="button"
          className="carousel-btn"
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
          <BsChevronCompactLeft className="w-10 h-10" />
        </button>
        {images.length > 0 ? (
          <img
            src={images[index]["url"]}
            alt={`Image at index ${index}`}
            className="flex-1 w-full h-full object-cover border-2 border-light-gray shadow-sm rounded-md p-[1px]"
          />
        ) : (
          <div className="flex-1 flex flex-col gap-4 items-center justify-center border-2 border-light-gray">
            <LuImagePlus className="w-20 h-20" />
            <h1>Upload your sample photos!</h1>
          </div>
        )}

        <button
          type="button"
          className="carousel-btn"
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        >
          <BsChevronCompactRight className="w-10 h-10" />
        </button>
      </div>
      <div className="flex items-center justify-between px-12 mt-3">
        <button
          type="button"
          className="flex items-center gap-2 bg-light-gray text-sm px-5 py-2 rounded-md"
          onClick={() => fileRef.current?.click()}
        >
          <AiOutlinePlus className="w-4 h-4" /> Add
        </button>
        <div className="flex items-center justify-center gap-2">
          {images.map((_, idx) => {
            return idx === index ? (
              <div className="w-4 h-4 bg-med-gray rounded-full cursor-pointer"></div>
            ) : (
              <div
                className="w-3 h-3 border-med-gray border-[1px] rounded-full cursor-pointer"
                onClick={() => setIndex(idx)}
              ></div>
            );
          })}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-light-gray text-sm px-5 py-2 rounded-md"
        >
          <FiEdit className="w-4 h-4" /> Edit
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept=".jpg,.png"
        onChange={handleFileUpload}
      />
    </section>
  );
}
