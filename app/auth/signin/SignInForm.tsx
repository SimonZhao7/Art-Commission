import UnderlineInput from "@/components/form/UnderlineInput";

export default function SignInForm() {
  return (
    <form className="gap-y-10">
      <UnderlineInput
        label="Email"
        attr={{ placeholder: "Enter your email..." }}
      />
      <UnderlineInput
        label="Password"
        attr={{ placeholder: "Enter your password..." }}
      />
      <button
        className="btn-glow my-10 w-full rounded-full bg-dark-purple-highlight p-3 font-montserrat
          hover:bg-dark-purple-hover"
      >
        Sign In
      </button>
    </form>
  );
}
