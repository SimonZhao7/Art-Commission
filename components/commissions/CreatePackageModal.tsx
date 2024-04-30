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
// Components
import UnderlineInput from "../form/UnderlineInput";

interface Props {
  closeModal: () => void;
}

const modalVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "100vh" },
};

const errorMsg = "text-sm text-red-500 mt-2";
const inputLabelAdjustments = "text-md";
const inputBoxAdjustments = "my-0 border-b-dark-blue-highlight";

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
    defaultValues: {
      revisions: 0,
      price: 0,
    },
  });

  const createPackage: SubmitHandler<Package> = (data, e) => {
    e?.preventDefault();
    const packages = getValues("packages");
    setValue("packages", [data, ...packages]);
    closeModal();
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ ease: "easeOut", duration: 0.3 }}
      variants={modalVariant}
      className="absolute left-0 top-0 z-20 flex min-h-screen w-screen flex-col overflow-y-scroll
        bg-dark-bg font-montserrat text-dark-gray"
    >
      <h1 className={"font-xl p-5 pl-10 text-3xl"}>Add a package</h1>
      <button className="absolute right-0 top-0 p-5" onClick={closeModal}>
        <IoClose size={50} />
      </button>
      <form
        onSubmit={handleSubmit(createPackage)}
        className="flex w-full flex-1 flex-col items-center justify-center"
      >
        <div className="w-[700px]">
          <div className="mb-4">
            <UnderlineInput
              label="Title"
              registerProps={register("title")}
              attr={{ placeholder: "Enter a title..." }}
              labelStyles={inputLabelAdjustments}
              containerStyles={inputBoxAdjustments}
            />
            {errors.title && <p className={errorMsg}>{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <UnderlineInput
                label="Delivery Time"
                registerProps={register("deliveryTime")}
                post="days"
                attr={{
                  type: "number",
                }}
                labelStyles={inputLabelAdjustments}
                containerStyles={`${inputBoxAdjustments} flex-1`}
              />
              <div className="flex-1"></div>
            </div>

            {errors.deliveryTime && (
              <p className={errorMsg}>{errors.deliveryTime.message}</p>
            )}
          </div>

          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <UnderlineInput
                label="Revisions"
                labelFontSize={16}
                registerProps={register("revisions")}
                post="revisions"
                attr={{
                  type: "number",
                }}
                labelStyles={inputLabelAdjustments}
                containerStyles={inputBoxAdjustments}
              />
              {errors.revisions && (
                <p className={errorMsg}>{errors.revisions.message}</p>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-end">
                <UnderlineInput
                  label="Price"
                  labelStyles={inputLabelAdjustments}
                  containerStyles={inputBoxAdjustments}
                  pre="$"
                  attr={{ type: "number", placeholder: "0.00" }}
                  registerProps={register("price")}
                />
              </div>
              {errors.price && (
                <p className={errorMsg}>{errors.price.message}</p>
              )}
            </div>
          </div>
          <label className="mb-2 block text-md">Description</label>
          <textarea
            {...register("details")}
            placeholder="Enter a description..."
            className="mb-4 h-[100px] w-full resize-none rounded-md bg-dark-blue p-5 outline-none"
          ></textarea>
          <button
            type="submit"
            className="rounded-m h-12 w-full bg-dark-purple-highlight py-2 text-black
              hover:bg-dark-purple-hover"
          >
            Add package
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePackageModal;
