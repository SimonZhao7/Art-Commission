import { useState, useRef } from "react";
import clsx from "clsx";

export default function ChatImage({ src }: { src: string }) {
  const [clickedImage, setClickedImage] = useState(false);
  const image = useRef<HTMLImageElement>(null);

  return (
    <>
      <img
        ref={image}
        src={src}
        className={clsx(
          "rounded-lg w-[220px] max-h-[400px] object-cover cursor-pointer",
          !image.current?.complete && "h-[400px]",
        )}
        onClick={() => setClickedImage(true)}
      />
      {clickedImage && (
        <div
          className="absolute z-20 w-screen h-screen top-0 left-0 py-20 flex justify-center bg-black bg-opacity-60"
          onClick={() => setClickedImage(false)}
        >
          <img ref={image} src={src} className="h-full object-cover" />
        </div>
      )}
    </>
  );
}
