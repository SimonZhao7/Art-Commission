"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
// Components
import AddMsgForm from "../AddMsgForm";
// Types
import { User } from "@/types/user";
import { Chat } from "@/types/chat";
// Hooks
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/hooks/useFirebaseUser";
// React Icons
import { FiEdit } from "react-icons/fi";

const ChatTabs = () => {
  const { modalOpen, openModal, closeModal } = useModal(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const currentUser = useAuth();
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
    <>
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
      <aside className="flex-1 overflow-hidden bg-[#040f1f] px-14 font-montserrat text-lg text-dark-gray">
        <div className="my-9 flex h-[30px] items-center">
          <h2 className="flex-1 text-xl">Messaging</h2>
          <FiEdit
            className="h-5 w-5 transition-all hover:scale-110 hover:cursor-pointer"
            onClick={openModal}
          />
        </div>
        {chats.map((chat) => (
          <Link
            key={chat.id}
            className="flex items-center gap-4 rounded-[5px] p-3 hover:cursor-pointer
              hover:bg-dark-blue"
            href={`/message/${chat.id}`}
            prefetch={true}
          >
            {currentUser && (
              <img
                className="h-10 w-10 rounded-full border-2 border-light-gray"
                src={
                  chat.users.filter((user) => user.id !== currentUser.id)[0]
                    ?.profileImage
                }
                alt="chat user profile image"
              />
            )}
            <p className="overflow-hidden text-ellipsis">
              {chat.users
                .filter((user) => user.id !== currentUser?.id)
                .map((user) => user.username)
                .join(", ")}
            </p>
          </Link>
        ))}
      </aside>
    </>
  );
};

export default ChatTabs;
