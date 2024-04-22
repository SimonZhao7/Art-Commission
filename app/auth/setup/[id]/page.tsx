import { redirect } from "next/navigation";
// Firebase
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "@/firebase";
// Components
import SetupForm from "@/components/auth/SetupForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function FinishSetup({ params }: Props) {
  const user = await getDoc(doc(collection(db, "users"), params.id));

  // User already set up
  if (user.exists()) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-2xl p-10 2xl:max-w-4xl">
      <h1 className="mb-16 text-2xl">Complete your account setup.</h1>
      <SetupForm uid={params.id} />
    </main>
  );
}
