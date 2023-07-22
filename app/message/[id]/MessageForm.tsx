// React Form
import { useForm, SubmitHandler } from "react-hook-form";
// Firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
// Icons
import { AiOutlineSend, AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  id: string;
  openImageModal: () => void;
}

type TextMsgInput = {
  message: string;
};

export default function MessageForm({ id, openImageModal }: Props) {
  const { register, handleSubmit, reset } = useForm<TextMsgInput>();
  const currentUser = useAuth();

  const onTextMsgSubmit: SubmitHandler<TextMsgInput> = async (data, e) => {
    const { message } = data;
    e?.preventDefault();
    if (message.length > 0 && currentUser !== null) {
      await addDoc(collection(db, "messages"), {
        chatId: id,
        message,
        messageType: "TEXT",
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      });
      reset();
    }
  };

  return (
    <form
      className="flex absolute items-end w-full gap-2 left-0 bottom-0 p-3"
      onSubmit={handleSubmit(onTextMsgSubmit)}
    >
      <button className="py-2" onClick={openImageModal}>
        <AiOutlinePlusCircle className="text-black w-5 h-5" />
      </button>
      <textarea
        {...register("message")}
        rows={1}
        className="border-2 flex-1 border-light-gray resize-none outline-none text-sm p-3"
      ></textarea>
      <button type="submit" className="py-2">
        <AiOutlineSend className="text-black w-5 h-5" />
      </button>
    </form>
  );
}
