"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
// React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Input from "@/components/form/Input";
// Firebase
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, addDoc, Timestamp, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Schemas
import SetupFormSchema from "@/lib/schemas/SetupFormSchema";
// Icons
import { LuImagePlus } from "react-icons/lu";
import { CgDanger } from "react-icons/cg";

interface FormFields {
  username: string;
  email: string;
  firstName: string;
  profileImage: File | null;
  lastName: string;
}

export default function SetupForm({ uid }: { uid: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(SetupFormSchema),
  });
  const uploadedImage = watch("profileImage");

  const fileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    setValue("email", user?.email ?? "");
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    const { email, username, firstName, lastName, profileImage } = data;
    const storageRef = ref(
      storage,
      `profile-images/${crypto.randomUUID()}-${profileImage!.name}`,
    );

    await uploadBytes(storageRef, profileImage!);
    const url = await getDownloadURL(storageRef);

    const ratingRef = await addDoc(collection(db, "ratings"), {
      userId: uid,
      avgRating: 0,
      userRatings: [],
    });

    await setDoc(doc(db, "users", uid), {
      username,
      email,
      verified: false,
      firstName,
      lastName,
      profileImage: url,
      ratingId: ratingRef.id,
      chatIds: [],
      socialIds: [],
      bio: "",
      lastOnline: Timestamp.now(),
      dateCreated: Timestamp.now(),
    });
    router.push("/");
  });

  return (
    <form>
      <section className="gap-5 md:flex">
        <div className="flex-1">
          <Input
            label="Username"
            name="username"
            register={register}
            error={errors.username?.message}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
            regProps={{
              disabled: true,
            }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center py-3">
          <div
            className="flex aspect-square h-[125px] items-center justify-center rounded-lg
              bg-light-gray transition-all ease-out hover:scale-105 hover:cursor-pointer
              hover:bg-med-gray"
            onClick={() => fileRef.current?.click()}
          >
            {uploadedImage != null ? (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="image preview"
                className="aspect-square w-[125px] object-cover"
              />
            ) : (
              <LuImagePlus size={50} />
            )}
          </div>
          {errors.profileImage && (
            <div className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <CgDanger />
              <span>{errors.profileImage?.message}</span>
            </div>
          )}
          <input
            type="file"
            className="invisible w-0"
            {...register("profileImage", {
              onChange: (e) => {
                if (e.target.files[0]) {
                  setValue("profileImage", e.target.files[0]);
                }
              },
              required: {
                value: true,
                message: "No image provided",
              },
            })}
            ref={fileRef}
          />
        </div>
      </section>
      <section className="gap-5 md:flex">
        <div className="flex-1">
          <Input
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName?.message}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName?.message}
          />
        </div>
      </section>
      <button
        onClick={onSubmit}
        className="w-full rounded-md bg-highlight py-3 text-center text-white transition-all
          ease-out hover:scale-[1.02] hover:bg-highlight-hover"
      >
        Submit
      </button>
    </form>
  );
}
