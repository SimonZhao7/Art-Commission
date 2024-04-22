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
          "max-h-[400px] w-[220px] cursor-pointer rounded-lg object-cover",
          !image.current?.complete && "h-[400px]",
        )}
        onClick={() => setClickedImage(true)}
      />
      {clickedImage && (
        <div
          className="absolute left-0 top-0 z-20 flex h-screen w-screen justify-center bg-black
            bg-opacity-60 py-20"
          onClick={() => setClickedImage(false)}
        >
          <img ref={image} src={src} className="h-full object-cover" />
        </div>
      )}
    </>
  );
}
