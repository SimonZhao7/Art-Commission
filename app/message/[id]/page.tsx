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
// Icons
import { BiChevronDown } from "react-icons/bi";
import MessageForm from "./MessageForm";
import { useModal } from "@/hooks/useModal";

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
  const {
    modalOpen: imageModalOpen,
    openModal: openImageModal,
    closeModal: closeImageModal,
  } = useModal(false);
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
        {messages.map((msg) => {
          const fromSelf = msg.sender.id === currentUser?.uid;
          return (
            <div
              key={msg.id}
              className={`flex mb-4 font-montserrat ${
                msg.sender.id === currentUser?.uid && "flex-row-reverse"
              }`}
            >
              <img
                src={msg.sender.profileImage}
                alt={msg.sender.username}
                className={`h-[50px] w-[50px] border-2 border-light-gray ${
                  msg.sender.id === currentUser?.uid ? "ml-5" : "mr-5"
                } rounded-full`}
              />
              {msg.messageType == "TEXT" ? (
                <div
                  key={msg.id}
                  className={`bg-dark-blue rounded-[10px] py-3 px-5 inline-flex flex-wrap max-w-[50%] ${
                    fromSelf && "bg-dark-purple-highlight float-right"
                  }`}
                >
                  <p
                    className={`text-sm flex items-center  ${
                      fromSelf ? "text-black" : "text-dark-gray"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {msg.message}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg">
                  <ChatImage src={msg.message} />
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatBottom}></div>
        {imageModalOpen && (
          <AddImageForm chatId={params.id} closeModal={closeImageModal} />
        )}
      </div>
      <div className="relative">
        <div className="absolute w-full bottom-5 px-10">
          {showScrollBottom && (
            <div className="w-full flex justify-center mb-3">
              <div
                className="bg-white shadow-md p-[2px] rounded-full hover:scale-110 cursor-pointer ease transition-all"
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
          <MessageForm id={params.id} openImageModal={openImageModal} />
        </div>
      </div>
    </section>
  );
}
