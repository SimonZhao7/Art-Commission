"use client";

import { useState, useRef, ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
// Firebase
import {
  query,
  where,
  collection,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
// React Icons
import { FiEdit } from "react-icons/fi";
// Components
import AddMsgForm from "./AddMsgForm";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";

interface User {
  id: string;
  username: string;
  profileImage: string;
}

interface Chat {
  id: string;
  messages: string[];
  users: User[];
}

export default function Layout({ children }: { children: ReactElement }) {
  const [createFormOpen, setCreateFormOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const currentUser = useAuth();
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!bgRef || !bgRef.current) return;
      if (bgRef.current == e.target) {
        setCreateFormOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("userIds", "array-contains", currentUser?.uid ?? "")
    );

    const unsub = onSnapshot(q, async (data) => {
      const chats = await Promise.all(
        data.docs.map(async (d) => {
          const userIds: string[] = d.data().userIds;
          const users = await Promise.all(
            userIds.map(async (uid) => {
              const userDoc = await getDoc(doc(db, "users", uid));
              return { id: userDoc.id, ...userDoc.data() } as User;
            })
          );
          return { id: d.id, ...d.data(), users } as Chat;
        })
      );
      setChats(chats);
    });
    return () => unsub();
  }, [currentUser]);

  return (
    <main className="flex h-full">
      {createFormOpen && (
        <div
          className="flex items-center justify-center w-full h-full absolute bg-black bg-opacity-60 z-10 top-0"
          ref={bgRef}
        >
          <AddMsgForm
            closeForm={() => {
              setCreateFormOpen(false);
            }}
          />
        </div>
      )}
      <aside className="flex-1 border-r-med-gray border-[2px]">
        <div className="flex h-[30px] items-center p-5">
          <h3 className="flex-1">Messaging</h3>
          <FiEdit
            className="w-5 h-5 hover:scale-110 hover:cursor-pointer transition-all"
            onClick={() => setCreateFormOpen(true)}
          />
        </div>
        {chats.map((chat) => (
          <a
            key={chat.id}
            className="flex p-5 hover:cursor-pointer"
            onClick={() => router.push(`/message/${chat.id}`)}
          >
            <p>{chat.id}</p>
          </a>
        ))}
      </aside>
      {children}
    </main>
  );
}
