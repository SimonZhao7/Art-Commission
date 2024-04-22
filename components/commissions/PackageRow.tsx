// Types
import { CreateCommissionFormFields } from "@/types/commission";
// React Hook Form
import { useFormContext, useWatch } from "react-hook-form";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  openModal: () => void;
}

const PackageRow = ({ openModal }: Props) => {
  const { control } = useFormContext<CreateCommissionFormFields>();
  const packages = useWatch({ control, name: "packages" });

  return (
    <div className="flex h-[350px] space-x-4 overflow-x-scroll">
      <button
        type="button"
        onClick={openModal}
        className="ease flex h-full w-[175px] flex-shrink-0 cursor-pointer items-center
          justify-center rounded-lg bg-med-gray transition-colors hover:bg-light-gray"
      >
        <AiOutlinePlus size={60} />
      </button>
      {packages.map((p, i) => (
        <div
          key={i}
          className="w-[400px] flex-shrink-0 rounded-lg bg-light-gray p-7"
        >
          <h2 className="mb-5 text-2xl">{p.title}</h2>
          <p className="mb-2">{p.details}</p>
          <div className="flex justify-between">
            <p>Revisions:</p>
            <p>{p.revisions}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Time:</p>
            <p>
              {p.deliveryTime} day{p.deliveryTime != 1 && "s"}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Price:</p>
            <p>${p.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageRow;
