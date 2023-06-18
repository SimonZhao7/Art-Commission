"use client";
import { useState, useEffect } from "react";
// Firebase
import {
  onSnapshot,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

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
  senderId: string;
  timestamp: Date;
}

export default function Chat({ params }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", params.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const res: Message[] = snapshot.docs.map((doc) => {
        const id = doc.id;
        return { ...doc.data(), id } as Message;
      });
      setMessages(res);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="flex-[2] w-full p-10">
      {messages.map((msg) => (
        <div key={msg.id} className='bg-light-gray rounded-full py-2 px-4 flex flex-wrap max-w-[50%]'>
          {msg.messageType == "TEXT" ? <p className="text-sm break-word"></p> : null}
        </div>
      ))}
    </section>
  );
}
