// React Form
import { FormEventHandler, useState } from "react";
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
      await fetch(`/api/message/${id}`, {
        method: "POST",
        body: JSON.stringify({
          chatId: id,
          senderId: currentUser.id,
          message,
        }),
      });
      setMessage("");
    }
  };

  return (
    <form
      className="flex w-full items-center gap-3 rounded-[10px] bg-dark-blue px-4 py-2"
      onSubmit={sendMessage}
    >
      <button className="relative py-2" onClick={openImageModal}>
        <FaCirclePlus className="h-5 w-5 text-dark-gray" />
      </button>
      <div
        className={`grid max-h-[76px] w-full overflow-scroll px-1 font-montserrat text-sm
          text-dark-gray after:invisible after:col-start-1 after:col-end-2
          after:row-start-1 after:row-end-2 after:whitespace-pre-wrap
          after:content-[attr(content)'_']`}
        content={message}
      >
        <textarea
          rows={1}
          className="col-start-1 col-end-2 row-start-1 row-end-2 resize-none overflow-hidden
            bg-transparent outline-none"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></textarea>
      </div>
      <button type="submit" className="relative py-2">
        <IoSend className="h-5 w-5 text-dark-gray" />
      </button>
    </form>
  );
}
