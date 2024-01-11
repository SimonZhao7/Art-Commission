import { useState } from "react";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";
import CreatePackageModal from "./CreatePackageModal";
import { AnimatePresence } from "framer-motion";


const PackageRow = ({}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const closeModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className="flex h-[350px] overflow-x-scroll">
      <button
        type="button"
        onClick={() => {
          setCreateModalOpen(true);
        }}
        className="bg-med-gray h-full w-[230px] flex items-center justify-center cursor-pointer transition-colors ease rounded-lg hover:bg-light-gray"
      >
        <AiOutlinePlus size={60} />
      </button>
      <AnimatePresence>
        {createModalOpen && (
          <CreatePackageModal closeModal={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageRow;
