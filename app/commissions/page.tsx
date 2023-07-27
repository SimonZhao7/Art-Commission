import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function Commission() {
  return (
    <main className="px-5 py-10">
      <h1 className="text-4xl text-center">Your Commissions</h1>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto mt-20">
        <Link
          href="/commissions/create"
          className="h-[200px] flex flex-col items-center justify-center gap-3 bg-slight-gray hover:bg-light-gray rounded-[20px] cursor-pointer"
        >
          <p>Create New Commission</p>
          <AiOutlinePlus className="w-10 h-10" />
        </Link>
        {/* Map out commissions */}
        <div className="bg-blue-500">&nbsp;</div>
        <div className="bg-blue-500">&nbsp;</div>
      </section>
    </main>
  );
}
