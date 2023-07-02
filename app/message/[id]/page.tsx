"use client";
import { useState, useEffect, useRef } from "react";
// Firebase
import {
  onSnapshot,
  query,
  collection,
  where,
  getDoc,
  addDoc,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
import { SubmitHandler, useForm } from "react-hook-form";
// Icons
import { AiOutlineSend, AiOutlinePlusCircle } from "react-icons/ai";
import AddImageForm from "./AddImageForm";

interface Props {
  params: {
    id: string;
  };
}

interface Message {
  id: string;
  chatId: string;
  message: string;
  messageType: "TEXT" | "IMAGE";
  sender: User;
  timestamp: Date;
}

interface User {
  id: string;
  username: string;
  profileImage: string;
}

type TextMsgInput = {
  message: string;
};

export default function Chat({ params }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>();
  const { register, handleSubmit } = useForm<TextMsgInput>();
  const currentUser = useAuth();
  const lastMsg = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", params.id),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const res: Message[] = await Promise.all(
        snapshot.docs.map(async (d) => {
          const id = d.id;
          const uid = d.data().senderId;
          const userDoc = await getDoc(doc(db, "users", uid));
          return {
            ...d.data(),
            id,
            sender: { id: userDoc.id, ...userDoc.data() } as User,
          } as Message;
        })
      );
      setMessages(res);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (lastMsg.current !== null) {
        lastMsg.current.scrollIntoView(false)
    }
  }, [messages]);

  const onTextMsgSubmit: SubmitHandler<TextMsgInput> = async (data, e) => {
    const { message } = data;
    e?.preventDefault();
    if (message.length > 0 && currentUser !== null) {
      await addDoc(collection(db, "messages"), {
        chatId: params.id,
        message,
        messageType: "TEXT",
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <section className="flex-[2] flex flex-col">
      <div className="flex-1 w-full p-10 pb-20 overflow-y-scroll">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${
              msg.sender.id === currentUser?.uid && "flex-row-reverse"
            }`}
            ref={(node) => {
              if (i + 1 == messages.length) {
                lastMsg.current = node;
              }
            }}
          >
            <img
              src={msg.sender.profileImage}
              alt={msg.sender.username}
              className={`h-10 w-10 border-2 border-light-gray ${
                msg.sender.id === currentUser?.uid ? "ml-3" : "mr-3"
              } rounded-full`}
            />
            {msg.messageType == "TEXT" ? (
              <div
                key={msg.id}
                className={`bg-light-gray rounded-[20px] py-3 px-4 inline-flex flex-wrap max-w-[50%] ${
                  msg.sender.id === currentUser?.uid && "float-right"
                }`}
              >
                <p
                  className="text-sm inline"
                  style={{ wordBreak: "break-word" }}
                >
                  {msg.message}
                </p>
              </div>
            ) : (
              <div className="rounded-lg max-w-[220px] border-2 border-med-gray">
                <img src={msg.message} className="rounded-lg" />
              </div>
            )}
          </div>
        ))}
        {imageModalOpen && (
          <AddImageForm chatId={params.id} setOpenState={setImageModalOpen} />
        )}
      </div>
      <div className="relative">
        <form
          className="flex absolute items-end w-full gap-2 left-0 bottom-0 p-3"
          onSubmit={handleSubmit(onTextMsgSubmit)}
        >
          <button className="py-2" onClick={() => setImageModalOpen(true)}>
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
      </div>
    </section>
  );
}
