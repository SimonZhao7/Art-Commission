"use client";

import { useState, useRef, useEffect } from "react";
// Firebase
import { collection, getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { db } from "@/firebase";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
// Framer Motion
import { motion } from "framer-motion";
// Types
import User from "@/types/user";
import Link from "next/link";

const wrapperVariant = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
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
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useAuth();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const MotionLink = motion(Link);

  useEffect(() => {
    if (currentUser !== null) {
      getDoc(doc(collection(db, "users"), currentUser?.uid)).then((res) => {
        const userDetails = { id: res.id, ...res.data() } as User;
        setUser(userDetails);
      });
    }
  }, [currentUser]);

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
      {currentUser !== null && (
        <img
          className="w-10 h-10 rounded-full border-2 border-light-gray cursor-pointer hover:scale-110 transition-all duration-100 ease-out"
          src={user?.profileImage}
          ref={imageRef}
          onClick={() => setShowMenu(!showMenu)}
        />
      )}
      <motion.div
        ref={menuRef}
        className="absolute top-16 right-0 shadow-md w-60 bg-white rounded-md"
        variants={wrapperVariant}
        initial={"hidden"}
        animate={showMenu ? "visible" : "hidden"}
        exit={"exit"}
      >
        <MotionLink
          key={1}
          variants={linkVariant}
          className="link"
          href={`/${user?.username}`}
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
