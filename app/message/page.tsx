import { BsChatDots } from "react-icons/bs";

export default function Message() {
  return (
    <section className="flex flex-[2] flex-col items-center justify-center">
      <BsChatDots className="mb-10 h-20 w-20" />
      <h1 className="text-lg">Click on a user to begin chatting.</h1>
    </section>
  );
}
