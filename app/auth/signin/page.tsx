import { GoogleSigninBtn } from "@/components/auth/GoogleSignupBtn";
import SignInForm from "./SignInForm";

export default function Register() {
  return (
    <main className="space-between flex h-full gap-24 p-14">
      <div className="flex-1">&nbsp;</div>
      <div className="w-[575px] rounded-[10px] bg-dark-purple px-16 py-20">
        <h1 className="text-center font-montserrat text-5xl font-medium text-white">
          Sign In
        </h1>
        <SignInForm />
        <GoogleSigninBtn />
      </div>
    </main>
  );
}
