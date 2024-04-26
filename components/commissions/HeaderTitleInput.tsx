// React Hook Form
import { useFormContext, useWatch } from "react-hook-form";
// Components
import Toggle from "../form/Toggle";
// Types
import { CreateCommissionFormFields } from "@/types/commission";

const HeaderTitleInput = () => {
  const {
    register,
    control,
    formState: errors,
  } = useFormContext<CreateCommissionFormFields>();
  const visible = useWatch({
    control,
    name: "visible",
  });

  return (
    <div
      className="flex w-full items-center justify-between bg-dark-blue-highlight p-5 px-14
        font-montserrat shadow-md"
    >
      <input
        {...register("title")}
        className="w-[300px] overflow-ellipsis bg-transparent text-xl font-semibold text-dark-gray
          outline-none 2xl:text-2xl"
      />
      <div className="flex items-center justify-between gap-8">
        <label className="text-md text-white">Make Public</label>
        <Toggle active={visible} register={register} />
      </div>
    </div>
  );
};

export default HeaderTitleInput;
