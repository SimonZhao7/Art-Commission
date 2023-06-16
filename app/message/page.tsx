import { BsChatDots } from "react-icons/bs";

export default function Message() {
  return (
    <section className="flex flex-col flex-[2] items-center justify-center">
      <BsChatDots className="w-20 h-20 mb-10" />
      <h1 className="text-lg">Click on a user to begin chatting.</h1>
    </section>
  );
}
