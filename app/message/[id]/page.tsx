"use client";
import { useState, useEffect } from "react";
// Firebase
import {
  onSnapshot,
  query,
  collection,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";

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
  const currentUser = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", params.id)
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

  return (
    <section className="flex-[2] p-10 relative">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
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
          <div
            key={msg.id}
            className={`bg-light-gray rounded-[20px] py-3 px-6 inline-flex flex-wrap max-w-[50%] ${
              msg.sender.id === currentUser?.uid && "float-right"
            }`}
          >
            {msg.messageType == "TEXT" ? (
              <p className="text-sm inline" style={{ wordBreak: "break-word" }}>
                {msg.message}
              </p>
            ) : null}
          </div>
        </div>
      ))}
      <div className="absolute w-full left-0 bottom-0 p-3">
        <textarea className="border-2 w-full border-light-gray resize-none outline-none text-sm p-3"></textarea>
      </div>
    </section>
  );
}
