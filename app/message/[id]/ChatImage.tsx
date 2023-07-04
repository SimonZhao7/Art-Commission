import { useRef } from "react";

export default function ChatImage({ src }: { src: string }) {
  const image = useRef<HTMLImageElement>(null);

  return (
    <img
      ref={image}
      src={src}
      className={`rounded-lg w-[220px] ${!image.current?.complete && 'h-[400px]'} max-h-[400px] object-cover`}
    />
  );
}
