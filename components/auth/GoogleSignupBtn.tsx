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
        className="border-1 relative flex w-full cursor-pointer items-center justify-center gap-5
          rounded-full border-[1px] bg-white py-3 font-montserrat shadow-sm transition-all
          duration-100 hover:bg-dark-gray"
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
      {error && <p className="mt-3 text-sm text-err">{error}</p>}
    </>
  );
};
