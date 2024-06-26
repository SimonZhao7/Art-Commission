import { useRouter } from "next/navigation";
// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
// Firebase
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  serverTimestamp,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
// Components
import Input from "@/components/form/Input";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";

type AddMsgFields = {
  username: string;
  initMsg?: string;
};

export default function AddMsgForm({ closeForm }: { closeForm: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMsgFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const currentUser = useAuth();
  const router = useRouter();

  const formSubmit: SubmitHandler<AddMsgFields> = async (data) => {
    const { username, initMsg } = data;
    const q = await getDocs(
      query(collection(db, "users"), where("username", "==", username)),
    );
    const recipientId = q.docs[0];

    const chat = await addDoc(collection(db, "chats"), {
      userIds: [currentUser!.id, recipientId.id],
      messages: [],
    });

    if (initMsg !== undefined) {
      const msgRef = await addDoc(collection(db, "messages"), {
        senderId: currentUser?.id,
        chatId: chat.id,
        message: initMsg,
        messageType: "TEXT",
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, "chats", chat.id), {
        messages: arrayUnion(msgRef.id),
      });
    }
    closeForm();
    router.push(`/message/${chat.id}`);
  };

  return (
    <form
      className="w-full max-w-xl rounded-md bg-white p-10"
      onSubmit={handleSubmit(formSubmit)}
    >
      <Input
        label="Username"
        name="username"
        register={register}
        regProps={{
          validate: (value) => {
            return getDocs(
              query(collection(db, "users"), where("username", "==", value)),
            ).then((snapshot) => {
              if (snapshot.empty || currentUser!.email === value)
                return "Provided username does not exist.";
              return true;
            });
          },
        }}
        error={errors.username?.message}
      />
      <textarea
        className="mb-2 w-full resize-none rounded-md border-2 border-med-gray p-3 text-sm
          outline-none"
        {...register("initMsg")}
        rows={5}
        placeholder="Send a message..."
      ></textarea>
      <button className="form-btn">Create Message</button>
    </form>
  );
}
