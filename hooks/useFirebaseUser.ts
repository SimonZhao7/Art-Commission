import { useState, useEffect } from "react";
// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { auth } from "@/firebase";

export const useAuth = () => {
  const [currentUser, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsub();
  }, []);

  return currentUser;
};
