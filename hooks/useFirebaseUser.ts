import { useState, useEffect } from "react";
// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Types
import { User } from "@/types/user";

export const useAuth = () => {
  const [currentUser, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Attatch listener to user logged-in state
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUser({ id: userDoc.id, ...userDoc.data() } as User);
      }
    });
    return () => unsub();
  }, []);

  return currentUser;
};
