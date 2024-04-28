// Types
import { PackageCardComponent } from "./types";
// React Icons
import { MdOutlineRestartAlt } from "react-icons/md";
import { CiAlarmOn } from "react-icons/ci";

const PackageCard: PackageCardComponent = ({
  packageItem: { title, details, deliveryTime, revisions, price },
}) => {
  return (
    <div className="flex w-[300px] flex-shrink-0 flex-col rounded-lg bg-dark-blue p-5">
      <div className="h-[150px] w-full flex-shrink-0 rounded-md bg-dark-gray"></div>
      <h2 className="my-5 text-2xl font-semibold">{title}</h2>
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
    </div>
  );
};

export default PackageCard;
