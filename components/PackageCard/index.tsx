import { useState, useRef, useEffect } from "react";
// Types
import { PackageCardComponent, Pos } from "./types";
import { CreateCommissionFormFields } from "@/types/commission";
// React Icons
import { CiAlarmOn } from "react-icons/ci";
import { useModal } from "@/hooks/useModal";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdEdit, MdOutlineRestartAlt } from "react-icons/md";
// React Hook Form
import { useFormContext } from "react-hook-form";

const modalBtnStyle =
  "flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-dark-gray";

const PackageCard: PackageCardComponent = ({
  packageItem: { title, details, deliveryTime, revisions, price, image },
  idx,
}) => {
  const { getValues, setValue } = useFormContext<CreateCommissionFormFields>();
  const { modalOpen, openModal, closeModal } = useModal(false);
  const [modalPos, setModalPos] = useState<Pos>({ top: 0, left: 0 });
  const optionsBtn = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!optionsBtn.current) {
      return;
    }

    const { top, left } = optionsBtn.current.getBoundingClientRect();
    setModalPos({
      top: top + 30,
      left,
    });
  };

  useEffect(() => {
    const checkClickOutside = (e: MouseEvent) => {
      if (modal.current && !modal.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (modalOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("click", checkClickOutside);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("click", checkClickOutside);
      };
    }
  }, [modalOpen]);

  return (
    <div
      className="package-card-glow flex h-full w-[300px] flex-shrink-0 flex-col rounded-lg
        bg-dark-blue p-5 transition-all duration-150 ease-in hover:cursor-pointer
        hover:shadow-white"
    >
      <div
        className={`block h-[150px] w-full flex-shrink-0 rounded-md ${!image && "bg-dark-gray"}`}
      >
        {image && (
          <img
            className="h-full w-full object-cover"
            src={image.url}
            alt={`package image of title ${title}`}
          ></img>
        )}
      </div>
      <div className="flex items-center gap-3">
        <h2 className="my-5 w-full overflow-hidden text-ellipsis text-2xl font-semibold">
          {title}
        </h2>
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
      </div>

      <p className="mb-3 line-clamp-3 w-full flex-1 text-ellipsis break-words">
        {details}
      </p>
      <div>
        <div className="mb-1 flex items-center gap-3">
          <MdOutlineRestartAlt size={25} />
          <p className="text-sm">
            {revisions} revision{revisions > 1 && "s"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CiAlarmOn size={25} />
          <p className="text-sm">
            {deliveryTime} day{deliveryTime > 1 && "s"}
          </p>
        </div>
        <div className="flex justify-between">
          <h3 className="w-full text-right text-2xl font-semibold">
            ${price.toFixed(2)}
          </h3>
        </div>
      </div>
      {modalOpen && optionsBtn.current && (
        <div
          ref={modal}
          className="fixed m-0 w-[100px] overflow-hidden rounded-md bg-white text-black"
          style={{
            top: `${modalPos.top}px`,
            left: `${modalPos.left}px`,
          }}
        >
          <button type="button" className={`${modalBtnStyle}`}>
            <MdEdit />
            Edit
          </button>
          <button
            type="button"
            className={`${modalBtnStyle} text-red-500`}
            onClick={() => {
              const resultingPkgs = getValues("packages")!.filter(
                (_, i) => i !== idx,
              );
              setValue("packages", resultingPkgs);
            }}
          >
            <BsFillTrash3Fill />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
