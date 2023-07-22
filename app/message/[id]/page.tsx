"use client";
import { useState, useEffect, useRef } from "react";
// Firebase
import {
  onSnapshot,
  query,
  collection,
  where,
  getDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
// Components
import AddImageForm from "./AddImageForm";
import ChatImage from "./ChatImage";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
import { SubmitHandler, useForm } from "react-hook-form";
// Icons
import { BiChevronDown } from "react-icons/bi";
import MessageForm from "./MessageForm";

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

export default function Chat({ params }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showScrollBottom, setShowScrollBottom] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const currentUser = useAuth();
  const scrollBottom = useRef<boolean>(true);
  const chatDiv = useRef<HTMLDivElement | null>(null);
  const chatBottom = useRef<HTMLDivElement | null>(null);

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
    if (
      (messages.length > 0 &&
        messages.at(-1)!.sender.id === currentUser?.uid) ||
      scrollBottom.current
    ) {
      chatBottom.current?.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    const handleScrollEvent = () => {
      const div = chatDiv.current!;
      if (div.scrollTop < div.scrollHeight - 800) {
        setShowScrollBottom(true);
      } else {
        setShowScrollBottom(false);
      }

      scrollBottom.current =
        Math.abs(div.scrollHeight - div.clientHeight - div.scrollTop) < 1;
    };

    chatDiv.current?.addEventListener("scroll", handleScrollEvent);
    return () => {
      chatDiv.current?.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <section className="flex-[2] flex flex-col">
      <div className="flex-1 w-full p-10 pb-20 overflow-y-scroll" ref={chatDiv}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${
              msg.sender.id === currentUser?.uid && "flex-row-reverse"
            }`}
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
              <div className="rounded-lg border-2 border-med-gray">
                <ChatImage src={msg.message} />
              </div>
            )}
          </div>
        ))}
        <div ref={chatBottom}></div>
        {imageModalOpen && (
          <AddImageForm
            chatId={params.id}
            closeModal={() => setImageModalOpen(false)}
          />
        )}
      </div>
      <div className="relative">
        {showScrollBottom && (
          <div className="w-full absolute flex justify-center bottom-[75px]">
            <div
              className="bg-white shadow-md p-[2px] rounded-full hover:scale-105 cursor-pointer ease transition-all"
              onClick={() => {
                chatBottom.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <BiChevronDown className="w-8 h-8" />
            </div>
          </div>
        )}
        <MessageForm
          id={params.id}
          openImageModal={() => setImageModalOpen(true)}
        />
      </div>
    </section>
  );
}
