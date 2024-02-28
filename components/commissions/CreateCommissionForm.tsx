import { ChangeEvent, useState } from "react";
// React Hook Form
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Schemas
import CreateCommissionSchema from "@/lib/schemas/CreateCommissionSchema";
// Components
import ImageCarousel from "@/components/commissions/ImageCarousel";
import Toggle from "@/components/form/Toggle";
import PackageRow from "@/components/commissions/PackageRow";
import CreatePackageModal from "./CreatePackageModal";
import HeaderTitleInput from "./HeaderTitleInput";
// Hooks
import { useModal } from "@/hooks/useModal";
// React Icons
import { Image, CreateCommissionFormFields } from "@/types/commission";
// Framer Motion
import { AnimatePresence } from "framer-motion";

const CreateCommissionForm = () => {
  const formMethods = useForm<CreateCommissionFormFields>({
    mode: "onBlur",
    resolver: zodResolver(CreateCommissionSchema),
    defaultValues: {
      title: "A New Commission",
      description: "# This is your description section",
      visible: true,
      packages: [],
    },
  });
  const { register, watch } = formMethods;
  const { description, visible } = watch();
  const {
    modalOpen: createPackageModalOpen,
    openModal: openCreatePackageModal,
    closeModal: closeCreatePackageModal,
  } = useModal(false);
  const [images, setImages] = useState<Image[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files!;
    if (fileList.length > 0 && images.length < 5) {
      const newFile = fileList[0];
      const tempURL = URL.createObjectURL(newFile);
      setImages([...images, { url: tempURL, image: newFile }]);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className="mx-auto max-w-xl 2xl:max-w-7xl pb-20">
        <HeaderTitleInput />
        <div className="p-4 w-full flex items-center justify-between shadow-sm">
          <label className="text-md">Make Public</label>
          <Toggle active={visible} register={register} />
        </div>
        <ImageCarousel
          height={300}
          handleFileUpload={handleFileUpload}
          images={images}
          setImages={setImages}
        />
        <div className="my-20">
          <label>Description</label>
          <textarea
            value={description}
            className="w-full resize-y border-[1px] border-light-gray rounded-sm outline-none p-5 text-sm h-[250px] shadow-sm"
          ></textarea>
        </div>
        {/* <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked.parse(description)),
      }}
    ></div> */}
        <div className="my-20">
          <h2 className="text-2xl mb-10">Commission Packages</h2>
          <PackageRow openModal={openCreatePackageModal} />
        </div>
        <h2 className="text-2xl">Commission Add-ons</h2>
      </form>
      <AnimatePresence>
        {createPackageModalOpen && (
          <CreatePackageModal closeModal={closeCreatePackageModal} />
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export default CreateCommissionForm;
