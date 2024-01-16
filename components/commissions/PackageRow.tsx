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
    <div className="flex h-[350px] overflow-x-scroll space-x-4">
      <button
        type="button"
        onClick={openModal}
        className="bg-med-gray h-full w-[175px] flex items-center justify-center cursor-pointer transition-colors ease rounded-lg hover:bg-light-gray flex-shrink-0"
      >
        <AiOutlinePlus size={60} />
      </button>
      {packages.map((p, i) => (
        <div
          key={i}
          className="bg-light-gray rounded-lg p-7 w-[400px] flex-shrink-0"
        >
          <h2 className="text-2xl mb-5">{p.title}</h2>
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
