import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";
// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// Schemas
import CreateCommissionSchema from "@/lib/schemas/CreateCommissionSchema";
// Components
import AddOnForm from "../AddOnForm";
import HeaderTitleInput from "./HeaderTitleInput";
import UnderlineInput from "../form/UnderlineInput";
import CreatePackageModal from "./CreatePackageModal";
import PackageRow from "@/components/commissions/PackageRow";
import ImageCarousel from "@/components/commissions/ImageCarousel";
// Hooks
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/hooks/useFirebaseUser";
// React Icons
import { FaPlus } from "react-icons/fa6";
// Firebase
import { db, storage } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Framer Motion
import { AnimatePresence } from "framer-motion";
// Markdown
import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";
// Context
import { CreateCommissionContext } from "./CreateCommissionContext";
// Types
import { Image, CreateCommissionFormFields, AddOn } from "@/types/commission";

const MAX_IMAGES = 5;

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
  const { watch, register, setValue, getValues, handleSubmit } = formMethods;
  const { title, description } = watch();
  const {
    modalOpen: createPackageModalOpen,
    openModal: openCreatePackageModal,
    closeModal: closeCreatePackageModal,
  } = useModal(false);
  const [images, setImages] = useState<Image[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [editIdx, setEditIdx] = useState(-1);
  const router = useRouter();
  const user = useAuth();

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileList = e.target.files!;
    if (fileList.length === 0) {
      return;
    }

    const imgLen = images.length;
    for (let i = 0; i < MAX_IMAGES - imgLen; i++) {
      const newFile = fileList[i];
      const tempURL = URL.createObjectURL(newFile);
      images.push({ url: tempURL, image: newFile });
    }
    setImages([...images]);
  };

  const handleIdxChange = (idx: number) => {
    setEditIdx(idx);
    openCreatePackageModal();
  };

  const addDocs = (items: any[], collectionName: string) => {
    return Promise.all(
      items.map((item) => {
        return addDoc(collection(db, collectionName), item);
      }),
    ).then((refs) => {
      return refs.map((ref) => ref.id);
    });
  };

  const uploadImage = (image: Image, bucketName: string) => {
    const { image: file } = image;
    const imgRef = ref(
      storage,
      `${bucketName}/${crypto.randomUUID()}-${file.name}`,
    );
    return uploadBytes(imgRef, file).then(() => getDownloadURL(imgRef));
  };

  const onSubmit: SubmitHandler<CreateCommissionFormFields> = async (data) => {
    if (!user) {
      return;
    }

    const bucketName = "commission-images";
    const { description, packages, title, visible } = data;
    const sampleUrls = await Promise.all(
      images.map((img) => uploadImage(img, bucketName)),
    );
    const updatedPacakges = await Promise.all(
      packages.map((pkg) => ({
        ...pkg,
        image: pkg.image ? uploadImage(pkg.image, bucketName) : "",
      })),
    );
    const packageIds = await addDocs(updatedPacakges, "packages");
    const addOnIds = await addDocs(addOns, "addons");

    const commission = {
      userId: user.id,
      addOns: addOnIds,
      tags,
      visible,
      title,
      description,
      samples: sampleUrls,
      packages: packageIds,
    };
    await addDoc(collection(db, "commissions"), commission);
    router.push("/commissions");
  };

  return (
    <FormProvider {...formMethods}>
      <CreateCommissionContext.Provider
        value={{
          setEditIdx: handleIdxChange,
        }}
      >
        <form
          className="mx-auto pb-20 text-dark-gray"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                  className={"commission-round-btn"}
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
              <AddOnForm addOns={addOns} setAddOns={setAddOns} />
            </div>
            <div className="w-2/5">
              <h1 className={"commission-header my-8 mb-5"}>
                {title || "A New Commission"}
              </h1>
              <ImageCarousel
                height={300}
                handleFileUpload={handleFileUpload}
                images={images}
                setImages={setImages}
              />
              <h1 className={"commission-header my-5"}>Related Tags</h1>
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
              <h1 className={"commission-header my-5"}>
                About this Commission
              </h1>
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
