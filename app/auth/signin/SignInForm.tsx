import UnderlineInput from "@/components/form/UnderlineInput";

export default function SignInForm() {
  return (
    <form className="gap-y-10">
      <UnderlineInput label="Email" placeHolder="Enter your email..." />
      <UnderlineInput label="Password" placeHolder="Enter your password..." />
      <button className="my-10 bg-dark-purple-highlight hover:bg-dark-purple-hover rounded-full w-full p-3 font-montserrat btn-glow">
        Sign In
      </button>
    </form>
  );
}
