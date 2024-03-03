import { GoogleSigninBtn } from "@/components/auth/GoogleSignupBtn";
import SignInForm from "./SignInForm";

export default function Register() {
  return (
    <main className="h-full flex space-between gap-24 p-14">
      <div className="flex-1">&nbsp;</div>
      <div className="w-[575px] bg-dark-purple rounded-[10px] px-16 py-20">
        <h1 className="text-white text-5xl text-center font-montserrat font-medium">
          Sign In
        </h1>
        <SignInForm />
        <GoogleSigninBtn />
      </div>
    </main>
  );
}
