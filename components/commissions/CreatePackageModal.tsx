import { useRef, ChangeEventHandler } from "react";
// Icons
import { IoClose } from "react-icons/io5";
// Types
import { CreateCommissionFormFields, Package } from "@/types/commission";
// Schemas
import { CreatePackageSchema } from "@/lib/schemas/CreateCommissionSchema";
// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { motion } from "framer-motion";
// Components
import UnderlineInput from "../form/UnderlineInput";

interface Props {
  closeModal: () => void;
  editIdx: number;
}

const modalVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "100vh" },
};

const inputLabelAdjustments = "text-md";
const inputBoxAdjustments = "my-0 border-b-dark-blue-highlight";

const CreatePackageModal = ({ closeModal, editIdx }: Props) => {
  // Main form state methods
  const { control, setValue } = useFormContext<CreateCommissionFormFields>();
  const packages = useWatch({ control, name: "packages" });
  const {
    register,
    handleSubmit,
    watch,
    setValue: setValuePackage,
    formState: { errors },
  } = useForm<Package>({
    resolver: zodResolver(CreatePackageSchema),
    mode: "onBlur",
    defaultValues:
      editIdx < 0
        ? {
            revisions: 0,
          }
        : {
            title: packages[editIdx].title,
            revisions: packages[editIdx].revisions,
            details: packages[editIdx].details,
            price: packages[editIdx].price,
            deliveryTime: packages[editIdx].deliveryTime,
            image: packages[editIdx].image,
          },
  });
  const imageInput = useRef<HTMLInputElement>(null);
  const image = watch("image");

  const handleFormSubmit: SubmitHandler<Package> = (data, e) => {
    e?.preventDefault();
    // Editing Mode
    if (editIdx < 0) {
      setValue("packages", [data, ...packages!]);
    } else {
      setValue(
        "packages",
        packages.map((pkg, i) => {
          if (i !== editIdx) return pkg;
          return data;
        }),
      );
    }
    closeModal();
  };

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      const url = URL.createObjectURL(file);
      setValuePackage("image", {
        file,
        url,
      });
    }
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
      <h1 className={"font-xl p-5 pl-10 text-3xl"}>
        {editIdx < 0 ? "Add a package" : "Edit package"}
      </h1>
      <button className="absolute right-0 top-0 p-5" onClick={closeModal}>
        <IoClose size={50} />
      </button>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
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
            {errors.title && (
              <p className={"error-msg"}>{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <UnderlineInput
                label="Delivery Time"
                registerProps={register("deliveryTime")}
                post="days"
                attr={{
                  type: "number",
                  placeholder: "0",
                }}
                labelStyles={inputLabelAdjustments}
                containerStyles={`${inputBoxAdjustments} flex-1`}
              />
              <div
                className="h-full flex-1"
                onClick={() => imageInput?.current?.click()}
              >
                {image ? (
                  <img
                    src={image.url}
                    alt="Selected commission package image"
                    className="ease-outbackdrop: mx-auto block h-[60px] object-contain transition-transform
                      duration-100 hover:scale-110 hover:cursor-pointer"
                  />
                ) : (
                  <button
                    type="button"
                    className="mx-auto block h-[40px] w-3/5 cursor-pointer rounded-md bg-dark-blue-highlight
                      text-md outline-none transition-transform duration-100 ease-out hover:scale-105"
                  >
                    Add Image
                  </button>
                )}

                <input
                  onChange={handleFileUpload}
                  ref={imageInput}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                />
              </div>
            </div>

            {errors.deliveryTime && (
              <p className={"error-msg"}>{errors.deliveryTime.message}</p>
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
                <p className={"error-msg"}>{errors.revisions.message}</p>
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
                <p className={"error-msg"}>{errors.price.message}</p>
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
            {editIdx < 0 ? "Add package" : "Modify package"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePackageModal;
