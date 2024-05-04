import {
  ChangeEventHandler,
  useState,
} from "react";
// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
// Schemas
import CreateCommissionSchema from "@/lib/schemas/CreateCommissionSchema";
// Components
import HeaderTitleInput from "./HeaderTitleInput";
import UnderlineInput from "../form/UnderlineInput";
import CreatePackageModal from "./CreatePackageModal";
import PackageRow from "@/components/commissions/PackageRow";
import ImageCarousel from "@/components/commissions/ImageCarousel";
// Hooks
import { useModal } from "@/hooks/useModal";
// React Icons
import { FaPlus } from "react-icons/fa6";
// Framer Motion
import { AnimatePresence } from "framer-motion";
// Markdown
import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";
// Context
import { CreateCommissionContext } from "./CreateCommissionContext";
// Types
import { Image, CreateCommissionFormFields } from "@/types/commission";

const headerStyles = "text-2xl font-semibold 2xl:text-3xl";

const CreateCommissionForm = () => {
  const formMethods = useForm<CreateCommissionFormFields>({
    mode: "onBlur",
    resolver: zodResolver(CreateCommissionSchema),
    defaultValues: {
      title: "A New Commission",
      description: "",
      visible: true,
      packages: [],
    },
  });
  const { watch, register, setValue, getValues } = formMethods;
  const { title, description } = watch();
  const {
    modalOpen: createPackageModalOpen,
    openModal: openCreatePackageModal,
    closeModal: closeCreatePackageModal,
  } = useModal(false);
  const [images, setImages] = useState<Image[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [editIdx, setEditIdx] = useState(-1);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileList = e.target.files!;
    if (fileList.length > 0 && images.length < 5) {
      const newFile = fileList[0];
      const tempURL = URL.createObjectURL(newFile);
      setImages([...images, { url: tempURL, image: newFile }]);
    }
  };

  const handleIdxChange = (idx: number) => {
    setEditIdx(idx);
    openCreatePackageModal();
  };

  return (
    <FormProvider {...formMethods}>
      <CreateCommissionContext.Provider
        value={{
          setEditIdx: handleIdxChange,
        }}
      >
        <form className="mx-auto pb-20 text-dark-gray">
          <HeaderTitleInput />
          <section className={"flex w-screen gap-10 px-14 font-montserrat"}>
            <div className="w-3/5">
              <div className="flex items-center gap-5">
                <UnderlineInput
                  label="Tags"
                  labelFontSize={16}
                  registerProps={register("tag")}
                />
                <button
                  className="rounded-full bg-dark-blue-highlight p-2 transition-transform duration-100
                    ease-out hover:scale-105"
                  type="button"
                  onClick={() => {
                    setTags([...tags, getValues("tag")]);
                    setValue("tag", "");
                  }}
                >
                  <FaPlus size={20} />
                </button>
              </div>
              <label className="mb-3 block">Description</label>
              <textarea
                {...register("description")}
                value={description}
                placeholder="Enter a description with markdown..."
                className="h-[250px] w-full resize-none rounded-sm bg-dark-blue p-5 text-sm shadow-sm
                  outline-none"
              ></textarea>
              <PackageRow />
              <h2 className={`${headerStyles}`}>Commission Add-ons</h2>
            </div>
            <div className="w-2/5">
              <h1 className={`${headerStyles} my-8 mb-5`}>
                {title || "A New Commission"}
              </h1>
              <ImageCarousel
                height={300}
                handleFileUpload={handleFileUpload}
                images={images}
                setImages={setImages}
              />
              <h1 className={`${headerStyles} my-5`}>Related Tags</h1>
              <section className="flex flex-wrap gap-3">
                {tags.length > 0 ? (
                  tags.map((tag, i) => (
                    <div
                      onClick={() => setTags(tags.filter((_, idx) => idx != i))}
                      className="cursor-pointer rounded-full bg-dark-yellow px-4 py-1 text-sm font-semibold
                        text-black transition-transform duration-100 ease-out hover:scale-105
                        2xl:text-md"
                    >
                      <p key={i}>{tag}</p>
                    </div>
                  ))
                ) : (
                  <p>No related tags.</p>
                )}
              </section>
              <h1 className={`${headerStyles} my-5`}>About this Commission</h1>
              {description ? (
                <MarkdownPreview
                  style={{
                    backgroundColor: "transparent",
                    color: "#D7D7D7",
                    fontFamily: "var(--montserrat), sans-serif",
                    listStyle: "initial",
                  }}
                  source={description}
                  rehypePlugins={[rehypeSanitize]}
                />
              ) : (
                <p>No information about this commission.</p>
              )}
            </div>
          </section>
        </form>
        <AnimatePresence>
          {createPackageModalOpen && (
            <CreatePackageModal
              closeModal={closeCreatePackageModal}
              editIdx={editIdx}
            />
          )}
        </AnimatePresence>
      </CreateCommissionContext.Provider>
    </FormProvider>
  );
};

export default CreateCommissionForm;
