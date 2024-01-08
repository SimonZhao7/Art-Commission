import { redirect } from "next/navigation";
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "@/firebase";
// Components
import SetupForm from "@/components/auth/SetupForm";

interface Props {
    params: {
        id: string
    }
}


export default async function FinishSetup({ params }: Props) {
    const user = await getDoc(doc(collection(db, 'users'), params.id));

    // User already set up
    if (user.exists()) {
        redirect('/');
    }
    
    return (
        <main className='mx-auto max-w-2xl 2xl:max-w-4xl p-10'>
            <h1 className="text-2xl mb-16">Complete your account setup.</h1>
            <SetupForm uid={params.id} />
        </main>
    )
} 