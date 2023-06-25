"use client";

import { useState, useRef, ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
// Firebase
import {
  query,
  where,
  collection,
  getDocs,
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
  userIds: string[];
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
    let valid = true;
    const fetchChats = async () => {
      const q = await getDocs(
        query(
          collection(db, "chats"),
          where("userIds", "array-contains", currentUser?.uid ?? "")
        )
      );

      const chats = q.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Chat;
      });

      chats.forEach((chat, i) => {
        const userIds = chat.userIds;
        const users: User[] = [];
        userIds.forEach(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          const user = { id: userDoc.id, ...userDoc.data() } as User;
          users.push(user);
        });
        chats[i].users = users;
      });
      if (valid) {
        setChats(chats);
      }
    };
    fetchChats();
    return () => {
      valid = false;
    }
  }, [currentUser])

  return (
    <main className="flex h-full">
      {createFormOpen && (
        <div
          className="flex items-center justify-center w-full h-full absolute bg-black bg-opacity-60 z-10 top-0"
          ref={bgRef}
        >
          <AddMsgForm />
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
          <a key={chat.id} className='block p-5 hover:cursor-pointer' onClick={() => router.push(`/message/${chat.id}`)}>
            <p>{chat.id}</p>
          </a>
        ))}
      </aside>
      {children}
    </main>
  );
}