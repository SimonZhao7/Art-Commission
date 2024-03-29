// Icons
import { IoClose } from "react-icons/io5";
// Types
import { CreateCommissionFormFields, Package } from "@/types/commission";
// Schemas
import { CreatePackageSchema } from "@/lib/schemas/CreateCommissionSchema";
// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
// Fonts
import { Montserrat } from "next/font/google";
// Util
import clsx from "clsx";

interface Props {
  closeModal: () => void;
}

const modalVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "100vh" },
};

const montserrat = Montserrat({ subsets: ["latin"] });

const errorMsg = "text-sm text-red-500 mt-2";
const inputError = "border-red-500 hover:border-red-500";

const CreatePackageModal = ({ closeModal }: Props) => {
  // Main form state methods
  const { setValue, getValues } = useFormContext<CreateCommissionFormFields>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Package>({
    resolver: zodResolver(CreatePackageSchema),
    mode: "onBlur",
  });

  const createPackage: SubmitHandler<Package> = (data, e) => {
    e?.preventDefault();
    const packages = getValues("packages");
    setValue("packages", [...packages, data]);
    closeModal();
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ ease: "easeOut", duration: 0.3 }}
      variants={modalVariant}
      className="absolute top-0 left-0 w-screen h-screen bg-white flex flex-col"
    >
      <h1 className={`text-3xl p-5 pl-10 ${montserrat.className}`}>
        Add a package
      </h1>
      <button className="absolute right-0 top-0 p-5" onClick={closeModal}>
        <IoClose size={50} />
      </button>
      <form
        onSubmit={handleSubmit(createPackage)}
        className="flex-1 flex flex-col items-center justify-center w-full"
      >
        <div className="w-[700px]">
          <div className="mb-4">
            <label className="text-sm">Title</label>
            <input
              className={clsx(
                "underline-input outline-none w-full p-2",
                errors.title && inputError
              )}
              {...register("title")}
            />
            {errors.title && <p className={errorMsg}>{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="text-sm">Delivery Time</label>
            <div
              className={clsx(
                "underline-input",
                errors.deliveryTime && inputError
              )}
            >
              <input
                {...register("deliveryTime")}
                className="flex-1 p-3 pl-1 h-10 outline-none"
                type="number"
              />
              <span>days</span>
            </div>
            {errors.deliveryTime && (
              <p className={errorMsg}>{errors.deliveryTime.message}</p>
            )}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm">Number of revisions</label>
              <div
                className={clsx(
                  "underline-input",
                  errors.revisions && inputError
                )}
              >
                <input
                  className="p-3 flex-1 pl-1 h-10 outline-none"
                  {...register("revisions")}
                  type="number"
                />
              </div>
              {errors.revisions && (
                <p className={errorMsg}>{errors.revisions.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-sm">Price</label>
              <div
                className={clsx("underline-input", errors.price && inputError)}
              >
                <span>$</span>
                <input
                  {...register("price")}
                  className="flex-1 p-3 pl-1 h-10 outline-none"
                  type="number"
                />
              </div>
              {errors.price && (
                <p className={errorMsg}>{errors.price.message}</p>
              )}
            </div>
          </div>
          <label className="text-sm mb-2 block">Description</label>
          <textarea
            {...register("details")}
            className="w-full resize-none h-[300px] outline-none border-med-gray border-2 rounded-md p-5 mb-4"
          ></textarea>
          <button
            type="submit"
            className="bg-jet hover:bg-jet-hover text-white w-full h-10 rounded-md py-2"
          >
            Add package
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePackageModal;
