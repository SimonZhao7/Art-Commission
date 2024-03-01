"use client";

import { useState } from "react";
import Image from "next/image";
import googleLogo from "@/public/google.svg";
// Firebase
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export const GoogleSigninBtn = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      router.push(`/auth/setup/${user.uid}`);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <button
        className="bg-white w-full flex gap-5 justify-center items-center border-1 border-[1px] shadow-sm py-3 rounded-full hover:bg-dark-gray cursor-pointer duration-100 transition-all relative font-montserrat"
        onClick={handleRegister}
      >
        <Image
          src={googleLogo}
          className="absolute left-3"
          alt="Google Logo"
          width={30}
        />
        Sign In With Google
      </button>
      {error && <p className="text-err mt-3 text-sm">{error}</p>}
    </>
  );
};
