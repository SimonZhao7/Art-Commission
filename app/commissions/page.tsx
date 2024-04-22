import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function Commission() {
  return (
    <main className="px-5 py-10">
      <h1 className="text-center text-4xl">Your Commissions</h1>
      <section className="mx-auto mt-20 grid max-w-7xl gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/commissions/create"
          className="flex h-[200px] cursor-pointer flex-col items-center justify-center gap-3
            rounded-[20px] bg-slight-gray hover:bg-light-gray"
        >
          <p>Create New Commission</p>
          <AiOutlinePlus className="h-10 w-10" />
        </Link>
        {/* Map out commissions */}
        <div className="bg-blue-500">&nbsp;</div>
        <div className="bg-blue-500">&nbsp;</div>
      </section>
    </main>
  );
}
