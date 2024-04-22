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
// Types
import { User } from "@/types/user";
import { Chat } from "@/types/chat";
// Components
import AddMsgForm from "./AddMsgForm";
import ChatTabs from "./ChatTabs";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
import { useModal } from "@/hooks/useModal";

export default function Layout({ children }: { children: ReactElement }) {
  const { modalOpen, openModal, closeModal } = useModal(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const currentUser = useAuth();
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!bgRef || !bgRef.current) return;
      if (bgRef.current == e.target) {
        closeModal();
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("userIds", "array-contains", currentUser?.id ?? ""),
    );

    const unsub = onSnapshot(q, async (data) => {
      const chats = await Promise.all(
        data.docs.map(async (d) => {
          const userIds: string[] = d.data().userIds;
          const users = await Promise.all(
            userIds.map(async (uid) => {
              const userDoc = await getDoc(doc(db, "users", uid));
              return { id: userDoc.id, ...userDoc.data() } as User;
            }),
          );
          return { id: d.id, ...d.data(), users } as Chat;
        }),
      );
      setChats(chats);
    });
    return () => unsub();
  }, [currentUser]);

  return (
    <main className="flex h-full">
      {modalOpen && (
        <div
          className="absolute top-0 z-10 flex h-full w-full items-center justify-center bg-black
            bg-opacity-60"
          ref={bgRef}
        >
          <AddMsgForm
            closeForm={() => {
              closeModal;
            }}
          />
        </div>
      )}
      <ChatTabs chats={chats} openModal={openModal} />
      {children}
    </main>
  );
}
