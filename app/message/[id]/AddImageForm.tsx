import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  SyntheticEvent,
} from "react";
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
  setOpenState: Dispatch<SetStateAction<boolean | undefined>>;
}

export default function AddImageForm({ chatId, setOpenState }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
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
      `chat-images/${crypto.randomUUID()}-${image!.name}`
    );
    await uploadBytes(chatImageRef, image!);
    const downloadUrl = await getDownloadURL(chatImageRef);

    if (currentUser != null) {
      await addDoc(collection(db, "messages"), {
        chatId,
        message: downloadUrl,
        messageType: "IMAGE",
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      });
    }
    setOpenState(false);
  };

  return (
    <div className="absolute flex w-full z-20 top-0 left-0 h-full bg-black bg-opacity-60 items-center justify-center">
      <form
        className="bg-white p-10 rounded-md w-[400px]"
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
              className="w-[400px] aspect-square object-cover rounded-md hover:scale-105 hover:cursor-pointer transition-all duration-100 ease"
              onClick={() => fileRef.current?.click()}
            />
            <br />
            <button type="submit" className="text-center w-full">
              Send
            </button>
          </>
        ) : (
          <div className="flex items-center flex-col gap-5">
            <LuImagePlus
              className="w-[100px] h-[100px] hover:scale-105 hover:cursor-pointer tranistion-all duration-100 ease"
              onClick={() => fileRef.current?.click()}
            />
            <p>Upload an Image</p>
          </div>
        )}
      </form>
    </div>
  );
}
