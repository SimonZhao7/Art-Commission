import { useState } from "react";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";

const PackageRow = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className="flex h-[350px] overflow-x-scroll">
      <button
        type="button"
        onClick={openModal}
        className="bg-med-gray h-full w-[230px] flex items-center justify-center cursor-pointer transition-colors ease rounded-lg hover:bg-light-gray"
      >
        <AiOutlinePlus size={60} />
      </button>
    </div>
  );
};

export default PackageRow;
