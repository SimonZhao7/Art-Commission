import { ChangeEvent, useState } from "react";
// React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Schemas
import CreateCommissionSchema from "@/lib/schemas/CreateCommissionSchema";
// Components
import ImageCarousel from "@/components/commissions/ImageCarousel";
import Toggle from "@/components/form/Toggle";
import PackageRow from "@/components/commissions/PackageRow";
// React Icons
import { FiEdit } from "react-icons/fi";
import { Image } from "@/types/commission";

const CreateCommissionForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(CreateCommissionSchema),
    defaultValues: {
      title: "A New Commission",
      description: "# This is your description section",
      visible: true,
    },
  });

  const { title, description, visible } = watch();
  const [showTitleInput, setShowTitleInput] = useState(false);
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
    <form className="mx-auto max-w-xl 2xl:max-w-7xl pb-20">
      <div className="p-5 flex items-center justify-between shadow-md border-[1px] border-slight-gray">
        {showTitleInput ? (
          <input {...register("title")} className="outline-none" />
        ) : (
          <p>{title}</p>
        )}
        <FiEdit
          className="w-5 h-5 cursor-pointer"
          onClick={() => setShowTitleInput(!showTitleInput)}
        />
      </div>
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
        <PackageRow />
      </div>{" "}
      <h2 className="text-2xl">Commission Add-ons</h2>
    </form>
  );
};

export default CreateCommissionForm;
