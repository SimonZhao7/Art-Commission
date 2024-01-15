// Icons
import { IoClose } from "react-icons/io5";
// Types
import { Package } from "@/types/commission";
// Schemas
import { CreatePackageSchema } from "@/lib/schemas/CreateCommissionSchema";
// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
// Fonts
import { Montserrat } from "next/font/google";

interface Props {
  closeModal: () => void;
}

const modalVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "100vh" },
};

const montserrat = Montserrat({ subsets: ["latin"] });

const CreatePackageModal = ({ closeModal }: Props) => {
  const { register, handleSubmit } = useForm<Package>({
    resolver: zodResolver(CreatePackageSchema),
  });

  const addPackage: SubmitHandler<Package> = (data, e) => {};

  return (
    <motion.form
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
      <button
        type="button"
        className="absolute right-0 top-0 p-5"
        onClick={closeModal}
      >
        <IoClose size={50} />
      </button>
      <section className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-[700px]">
          <label className="text-sm">Title</label>
          <input
            className="underline-input outline-none w-full p-2 mb-4"
            {...register("title")}
          />
          <label className="text-sm">Delivery Time</label>
          <div className="underline-input mb-4">
            <input
              {...register("price")}
              className="flex-1 p-3 pl-1 h-10 outline-none"
              type="number"
            />
            <span>days</span>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm">Number of revisions</label>
              <div className="underline-input">
                <input
                  className="p-3 flex-1 pl-1 h-10 outline-none"
                  {...register("revisions")}
                  type="number"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm">Price</label>
              <div className="underline-input">
                <span>$</span>
                <input
                  {...register("price")}
                  className="flex-1 p-3 pl-1 h-10 outline-none"
                  type="number"
                />
              </div>
            </div>
          </div>
          <label className="text-sm mb-2 block">Description</label>
          <textarea className="w-full resize-none h-[300px] outline-none border-med-gray border-2 rounded-md p-5 mb-4"></textarea>
          <button className="bg-jet hover:bg-jet-hover text-white w-full h-10 rounded-md py-2">
            Add package
          </button>
        </div>
      </section>
    </motion.form>
  );
};

export default CreatePackageModal;
