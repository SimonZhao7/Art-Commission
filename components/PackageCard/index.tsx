import { useState, useRef, useEffect, useContext } from "react";
// Types
import { PackageCardComponent, Pos } from "./types";
import { CreateCommissionFormFields } from "@/types/commission";
// React Icons
import { CiAlarmOn } from "react-icons/ci";
import { useModal } from "@/hooks/useModal";
import { MdOutlineRestartAlt } from "react-icons/md";
// Components
import OptionDots from "../OptionDots";
// Context
import { CreateCommissionContext } from "../commissions/CreateCommissionContext";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Framer Motion
import { motion } from "framer-motion";

const PackageCard: PackageCardComponent = ({
  packageItem: { title, details, deliveryTime, revisions, price, image },
  idx,
}) => {
  const { getValues, setValue } = useFormContext<CreateCommissionFormFields>();
  const ctx = useContext(CreateCommissionContext);

  const handleDelete = () => {
    const resultingPkgs = getValues("packages")!.filter((_, i) => i !== idx);
    setValue("packages", resultingPkgs);
  };

  return (
    <motion.div
      exit={{
        opacity: 0,
        y: -200,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
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
        <OptionDots
          handleEditClick={() => ctx.setEditIdx(idx)}
          handleDeleteClick={handleDelete}
        />
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
    </motion.div>
  );
};

export default PackageCard;
