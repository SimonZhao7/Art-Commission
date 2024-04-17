// React Form
import { FormEventHandler, useState } from "react";
// Firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
// Icons
import { IoSend } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

interface Props {
  id: string;
  openImageModal: () => void;
}

export default function MessageForm({ id, openImageModal }: Props) {
  const [message, setMessage] = useState("");
  const currentUser = useAuth();

  const sendMessage: FormEventHandler<HTMLFormElement> = async (e) => {
    e?.preventDefault();
    if (message.length > 0 && currentUser !== null) {
      await addDoc(collection(db, "messages"), {
        chatId: id,
        message,
        messageType: "TEXT",
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    }
  };

  return (
    <form
      className="w-full py-2 px-4 flex items-center bg-dark-blue rounded-[10px] gap-3"
      onSubmit={sendMessage}
    >
      <button className="py-2 relative" onClick={openImageModal}>
        <FaCirclePlus className="text-dark-gray w-5 h-5" />
      </button>
      <span
        onInput={(e) => {
          const node = e.target as Element;
          console.log(node.innerHTML);
          setMessage(node.innerHTML!);
        }}
        placeholder="Message..."
        className="block w-full text-dark-gray bg-transparent font-montserrat outline-none overflow-scroll text-sm max-h-[76px] px-1"
        contentEditable={true}
      ></span>
      <button type="submit" className="py-2 relative">
        <IoSend className="text-dark-gray w-5 h-5" />
      </button>
    </form>
  );
}
