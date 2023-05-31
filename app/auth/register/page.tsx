'use client';

import { useState } from "react";
import Image from "next/image"
import googleLogo from '@/public/google.svg';
// Firebase
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase';
import { useRouter } from "next/navigation";


export default function Register() {
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);        
            const user = result.user;
            router.push(`/auth/setup/${user.uid}`);
        } catch (e) {
            setError('Something went wrong. Please try again.')
        }
    }

    return (
        <main className="h-full flex items-center justify-center flex-col">
            <button className="flex gap-5 justify-center items-center border-1 border-gray-100 border-[1px] shadow-sm py-3 px-10 rounded-full hover:bg-gray-50 duration-100 transition-all"
                onClick={handleRegister}
            >
                <Image src={googleLogo} alt='Google Logo' width={20}/>
                Sign In With Google
            </button>
            {error && 
                <p className='text-err mt-3 text-sm'>{error}</p>
            }
        </main>
    )
}