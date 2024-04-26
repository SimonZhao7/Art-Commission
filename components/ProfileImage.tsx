"use client";

import { useState, useRef, useEffect } from "react";
// Firebase
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
// Framer Motion
import { motion } from "framer-motion";
// Types
import Link from "next/link";

const wrapperVariant = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
      ease: "easeOut",
      right: "0px",
    },
  },
  hidden: {
    opacity: 0,
    right: "-300px", // Temporary Hide Becasue of Bug
  },
  exit: {
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const linkVariant = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
  hidden: {
    x: 50,
    opacity: 0,
  },
};

export default function ProfileImage() {
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useAuth();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const MotionLink = motion(Link);

  const clickEventHandler = (e: MouseEvent) => {
    e.stopPropagation();
    if (
      showMenu &&
      menuRef.current !== null &&
      !menuRef.current.contains(e.target as Node) &&
      e.target !== imageRef.current
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", clickEventHandler);
    return () => {
      window.removeEventListener("click", clickEventHandler);
    };
  });

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {currentUser !== null ? (
        <img
          className="h-10 w-10 cursor-pointer rounded-full border-2 border-light-gray transition-all
            duration-100 ease-out hover:scale-110"
          src={currentUser?.profileImage}
          ref={imageRef}
          onClick={() => setShowMenu(!showMenu)}
        />
      ) : (
        <div
          className="btn-glow font-md flex h-10 w-[135px] items-center justify-center rounded-md
            bg-dark-purple-highlight font-montserrat text-black hover:bg-dark-purple-hover"
        >
          <Link href="/auth/signin">Sign in</Link>
        </div>
      )}
      <motion.div
        ref={menuRef}
        className="absolute right-0 top-16 w-60 rounded-md bg-white shadow-md"
        variants={wrapperVariant}
        initial={"hidden"}
        animate={showMenu ? "visible" : "hidden"}
        exit={"exit"}
      >
        <MotionLink
          key={1}
          variants={linkVariant}
          className="link"
          href={`/${currentUser?.username}`}
        >
          Profile
        </MotionLink>
        <MotionLink
          key={2}
          variants={linkVariant}
          className="link"
          href="/commissions"
        >
          My Commissions
        </MotionLink>
        <MotionLink
          key={3}
          variants={linkVariant}
          className="link"
          href="/settings"
        >
          Settings
        </MotionLink>
        <MotionLink
          key={4}
          variants={linkVariant}
          className="link"
          href=""
          onClick={logout}
        >
          Log Out
        </MotionLink>
      </motion.div>
    </>
  );
}
