"use client";

import { useState, useRef, ReactElement, useEffect } from "react";
// React Icons
import { FiEdit } from "react-icons/fi";
import AddMsgForm from "./AddMsgForm";

export default function Layout({ children }: { children: ReactElement }) {
  const [createFormOpen, setCreateFormOpen] = useState<boolean>(false);
  // Fetch Data Client Side
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
      </aside>
      {children}
    </main>
  );
}
