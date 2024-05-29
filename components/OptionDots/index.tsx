import { useState, useEffect, useRef } from "react";
// Hooks
import { useModal } from "@/hooks/useModal";
// React Icons
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
// Types
import { OptionDotsComponent, Pos } from "./types";
import { useTrackingModal } from "@/hooks/useTrackingModal";

const modalBtnStyle =
  "flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-dark-gray";

const OptionDots: OptionDotsComponent = ({
  handleEditClick,
  handleDeleteClick,
}) => {
  const {
    modalOpen,
    openModal,
    closeModal,
    modal,
    parent: optionsBtn,
  } = useTrackingModal<HTMLButtonElement, HTMLDivElement>({
    offsetTop: 30,
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
        <HiDotsHorizontal size={20} />
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
