// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
// Components
import UnderlineInput from "../form/UnderlineInput";
// Types
import { AddOnComponent } from "./types";
import { AddOn } from "@/types/commission";
// Schemas
import { AddOnSchema } from "@/lib/schemas/CreateCommissionSchema";
// Icons
import { FaPlus } from "react-icons/fa6";

const AddOnForm: AddOnComponent = ({ addOns, setAddOns }) => {
  const { register, handleSubmit } = useForm<AddOn>({
    resolver: zodResolver(AddOnSchema),
    mode: "onBlur",
  });

  const addNewPackage: SubmitHandler<AddOn> = (data, e) => {
    e?.preventDefault();
    console.log("works");
    setAddOns([...addOns, data]);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className={"commission-header"}>Commission Add-ons</h2>
        <button className={"commission-round-btn"} type="button">
          <FaPlus size={20} />
        </button>
      </div>
      {addOns.map((addon, i) => (
        <div key={i} className="my-5 rounded-md bg-dark-blue p-5">
          <h3 className="mb-4 text-xl font-semibold">{addon.name}</h3>
          <div className="flex items-center gap-5">
            <p className="flex-1 text-md">
              {addon.description.length > 0
                ? addon.description
                : "No description..."}
            </p>
            <p className="text-2xl font-semibold">${addon.price}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-5">
        <UnderlineInput
          label={"Name"}
          containerStyles="flex-[3]"
          labelStyles="text-md"
          registerProps={register("name")}
        />
        <UnderlineInput
          containerStyles="flex-1"
          label={"Price"}
          labelStyles="text-md"
          pre="$"
          registerProps={register("price")}
        />
      </div>
      <textarea
        {...register("description")}
        className="h-[150px] w-full resize-none rounded-md bg-dark-blue p-5 outline-none"
        placeholder="Enter description..."
      ></textarea>
      <button
        onClick={handleSubmit(addNewPackage)}
        className="my-3 w-full rounded-md bg-dark-blue-highlight py-3 transition-colors
          duration-100 ease-out hover:bg-[#444b66]"
      >
        Add Package
      </button>
    </section>
  );
};

export default AddOnForm;
