import { useContext } from "react";
// Types
import { CreateCommissionFormFields } from "@/types/commission";
// React Hook Form
import { useFormContext, useWatch } from "react-hook-form";
// Components
import PackageCard from "@/components/PackageCard";
// Context
import { CreateCommissionContext } from "./CreateCommissionContext";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";

const headerStyles = "text-2xl font-semibold 2xl:text-3xl";

const PackageRow = () => {
  const { control } = useFormContext<CreateCommissionFormFields>();
  const packages = useWatch({ control, name: "packages" });
  const ctx = useContext(CreateCommissionContext);

  return (
    <section className="my-20 w-full">
      <h2 className={`${headerStyles} mb-10`}>Commission Packages</h2>
      <div className="box-content flex h-[425px] space-x-4 overflow-y-visible overflow-x-scroll py-10">
        <button
          type="button"
          onClick={() => ctx.setEditIdx(-1)}
          className="ease shaodw-white flex h-full w-[100px] flex-shrink-0 cursor-pointer
            items-center justify-center rounded-lg bg-dark-blue-highlight transition-colors"
        >
          <AiOutlinePlus size={60} />
        </button>
        {packages!.map((p, i) => (
          <PackageCard packageItem={p} idx={i} key={i} />
        ))}
      </div>
    </section>
  );
};

export default PackageRow;
