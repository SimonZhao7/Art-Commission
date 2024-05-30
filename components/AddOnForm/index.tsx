import { useState, useRef } from "react";
// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
// Components
import OptionDots from "../OptionDots";
import UnderlineInput from "../form/UnderlineInput";
// Types
import { AddOnComponent } from "./types";
import { AddOn } from "@/types/commission";
// Schemas
import { AddOnSchema } from "@/lib/schemas/CreateCommissionSchema";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

const AddOnForm: AddOnComponent = ({ addOns, setAddOns }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddOn>({
    resolver: zodResolver(AddOnSchema),
    mode: "onBlur",
  });

  const [editIdx, setEditIdx] = useState(-1);
  const addForm = useRef<HTMLDivElement>(null);

  const addOrEditAddon: SubmitHandler<AddOn> = (data, e) => {
    e?.preventDefault();
    if (editIdx >= 0) {
      setEditIdx(-1);
      setAddOns(
        addOns.map((addon, i) => {
          if (i === editIdx) {
            return { ...data };
          }
          return addon;
        }),
      );
    } else {
      setAddOns([...addOns, data]);
    }
    reset();
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className={"commission-header"}>Commission Add-ons</h2>
      </div>
      <AnimatePresence>
        {addOns.map((addon, i) => (
          <motion.div
            key={addon.name}
            className="my-5 rounded-md bg-dark-blue p-5"
            exit={{
              opacity: 0,
              x: 50,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">{addon.name}</h3>
              <OptionDots
                handleEditClick={() => {
                  setValue("name", addon.name);
                  setValue("price", addon.price);
                  setValue("description", addon.description);
                  setEditIdx(i);
                  addForm.current?.scrollIntoView({ behavior: "smooth" });
                }}
                handleDeleteClick={() => {
                  // Can't edit a deleted AddOn
                  if (editIdx === i) {
                    reset();
                    setEditIdx(-1);
                  }
                  setAddOns(addOns.filter((_, idx) => idx !== i));
                }}
              />
            </div>
            <div className="flex items-center gap-5">
              <p className="flex-1 text-md">
                {addon.description.length > 0
                  ? addon.description
                  : "No description..."}
              </p>
              <p className="text-2xl font-semibold">${addon.price}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex gap-5" ref={addForm}>
        <div className="mb-6 flex-[3]">
          <UnderlineInput
            label={"Name"}
            containerStyles="w-full mb-0"
            labelStyles="text-md"
            registerProps={register("name")}
            attr={{ placeholder: "Enter a name..." }}
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>
        <div className="mb-6 flex-1">
          <UnderlineInput
            containerStyles="mb-0"
            label={"Price"}
            labelStyles="text-md"
            pre="$"
            registerProps={register("price")}
            attr={{ placeholder: "0.00" }}
          />
          {errors.price && <p className="error-msg">{errors.price.message}</p>}
        </div>
      </div>
      <textarea
        {...register("description")}
        className="h-[150px] w-full resize-none rounded-md bg-dark-blue p-5 outline-none"
        placeholder="Enter description..."
      ></textarea>
      <button
        onClick={handleSubmit(addOrEditAddon)}
        className="my-3 w-full rounded-md bg-dark-blue-highlight py-3 transition-colors
          duration-100 ease-out hover:bg-[#444b66]"
      >
        {editIdx >= 0 ? "Edit Add-on" : "Add Add-on"}
      </button>
    </section>
  );
};

export default AddOnForm;
