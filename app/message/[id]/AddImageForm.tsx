import { useState, useRef, ChangeEvent, SyntheticEvent } from "react";
// Firebase
import { db, storage } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
// Icons
import { LuImagePlus } from "react-icons/lu";
import { useAuth } from "@/hooks/useFirebaseUser";

interface Props {
  chatId: string;
  closeModal: () => void;
}

export default function AddImageForm({ chatId, closeModal }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const currentUser = useAuth();

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      URL.revokeObjectURL(imageUrl);
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setImageUrl(newUrl);
      setImage(file);
    }
    console.log("changed");
  };

  const submitImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    const chatImageRef = storageRef(
      storage,
      `chat-images/${crypto.randomUUID()}-${image!.name}`,
    );
    await uploadBytes(chatImageRef, image!);
    const downloadUrl = await getDownloadURL(chatImageRef);

    if (currentUser != null) {
      await addDoc(collection(db, "messages"), {
        chatId,
        message: downloadUrl,
        messageType: "IMAGE",
        senderId: currentUser.id,
        timestamp: serverTimestamp(),
      });
    }
    closeModal();
  };

  return (
    <div
      className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center
        bg-black bg-opacity-60"
      onClick={(e) => {
        if (e.target === containerRef.current) {
          closeModal();
        }
      }}
      ref={containerRef}
    >
      <form
        className="w-[400px] rounded-md bg-white p-10"
        onSubmit={submitImage}
      >
        <input
          className="hidden"
          type="file"
          onChange={onImageChange}
          accept=".jpg,.png"
          multiple={false}
          ref={fileRef}
        />
        {imageUrl.length > 0 ? (
          <>
            <img
              src={imageUrl}
              alt="Text Image Preview"
              className="ease aspect-square w-[400px] rounded-md object-cover transition-all duration-100
                hover:scale-105 hover:cursor-pointer"
              onClick={() => fileRef.current?.click()}
            />
            <br />
            <button type="submit" className="w-full text-center">
              Send
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <LuImagePlus
              className="tranistion-all ease h-[100px] w-[100px] duration-100 hover:scale-105
                hover:cursor-pointer"
              onClick={() => fileRef.current?.click()}
            />
            <p>Upload an Image</p>
          </div>
        )}
      </form>
    </div>
  );
}
