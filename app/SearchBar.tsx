// React Icons
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <div className="relative flex items-center overflow-hidden rounded-[5px]">
      <AiOutlineSearch
        className="absolute ml-3 text-dark-blue-highlight"
        size={25}
      />
      <input
        type="text"
        className="w-[600px] rounded-md border-2 bg-dark-blue p-3 pl-12 font-montserrat text-md
          text-dark-gray placeholder-dark-blue-highlight outline-none"
        placeholder="Search for commissions..."
      />
    </div>
  );
}
