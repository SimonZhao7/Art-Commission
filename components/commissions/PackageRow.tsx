// Types
import { CreateCommissionFormFields } from "@/types/commission";
// React Hook Form
import { useFormContext, useWatch } from "react-hook-form";
// Components
import PackageCard from "@/components/PackageCard";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  openModal: () => void;
  pkgImages: string[];
}

const headerStyles = "text-2xl font-semibold 2xl:text-3xl";

const PackageRow = ({ openModal, pkgImages }: Props) => {
  const { control } = useFormContext<CreateCommissionFormFields>();
  const packages = useWatch({ control, name: "packages" });

  return (
    <section className="my-20 w-full">
      <h2 className={`${headerStyles} mb-10`}>Commission Packages</h2>
      <div className="flex h-[425px] space-x-4 overflow-x-scroll">
        <button
          type="button"
          onClick={openModal}
          className="ease shaodw-white flex h-full w-[100px] flex-shrink-0 cursor-pointer
            items-center justify-center rounded-lg bg-dark-blue-highlight transition-colors"
        >
          <AiOutlinePlus size={60} />
        </button>
        {packages.map((p, i) => (
          <PackageCard packageItem={p} key={i} pkgImage={pkgImages[i]} />
        ))}
      </div>
    </section>
  );
};

export default PackageRow;
