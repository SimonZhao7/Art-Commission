// React Icons
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
// Types
import { OptionDotsComponent } from "./types";
import { useTrackingModal } from "@/hooks/useTrackingModal";

const modalBtnStyle =
  "flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-dark-gray";

const OptionDots: OptionDotsComponent = ({
  handleEditClick,
  handleDeleteClick,
  offsetTop = 30,
  offsetLeft = 0,
  iconSize = 20,
}) => {
  const {
    modalOpen,
    openModal,
    closeModal,
    modal,
    parent: optionsBtn,
  } = useTrackingModal<HTMLButtonElement, HTMLDivElement>({
    offsetLeft,
    offsetTop,
  });

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          openModal();
        }}
        ref={optionsBtn}
      >
        <HiDotsHorizontal size={iconSize} />
      </button>
      {modalOpen && optionsBtn.current && (
        <div
          ref={modal}
          className="fixed m-0 w-[100px] overflow-hidden rounded-md bg-white text-black"
        >
          <button
            type="button"
            className={`${modalBtnStyle}`}
            onClick={(e) => {
              closeModal();
              handleEditClick(e);
            }}
          >
            <MdEdit />
            Edit
          </button>
          <button
            type="button"
            className={`${modalBtnStyle} text-red-500`}
            onClick={(e) => {
              closeModal();
              handleDeleteClick(e);
            }}
          >
            <BsFillTrash3Fill />
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default OptionDots;
