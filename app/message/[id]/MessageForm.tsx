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
        senderId: currentUser.id,
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
      <div
        className={
          "grid w-full text-dark-gray font-montserrat overflow-scroll text-sm max-h-[76px] px-1 after:content-[attr(content)'_'] after:whitespace-pre-wrap after:invisible after:row-start-1 after:row-end-2 after:col-start-1 after:col-end-2"
        }
        content={message}
      >
        <textarea
          rows={1}
          className="resize-none overflow-hidden bg-transparent outline-none row-start-1 row-end-2 col-start-1 col-end-2"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></textarea>
      </div>
      <button type="submit" className="py-2 relative">
        <IoSend className="text-dark-gray w-5 h-5" />
      </button>
    </form>
  );
}
