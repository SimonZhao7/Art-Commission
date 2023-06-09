"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
// React Hook Form
import { useForm } from "react-hook-form";
// Components
import Input from "@/components/Input";
// Firebase
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  setDoc,
  doc,
  addDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  } = useForm<FormFields>({ mode: "onBlur", reValidateMode: "onBlur" });
  const uploadedImage = watch("profileImage");

  const fileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    setValue("email", user?.email ?? "");
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    const { email, username, firstName, lastName, profileImage } = data;
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `profile-images/${crypto.randomUUID()}-${profileImage!.name}`
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

  const lengthCheck = (
    value: string,
    fieldName: string,
    min: number,
    max: number
  ) => {
    if (value.length < min) {
      return `${fieldName} is too short`;
    } else if (value.length > max) {
      return `${fieldName} is too long`;
    }
    return true;
  };

  return (
    <form>
      <section className="md:flex gap-5">
        <div className="flex-1">
          <Input
            label="Username"
            name="username"
            register={register}
            error={errors.username?.message}
            regProps={{
              required: {
                value: true,
                message: "You must provide a username",
              },
              pattern: {
                value: /^\S+$/,
                message: "Username may not contain spaces",
              },
              validate: {
                length: (value) => lengthCheck(value, "Username", 8, 50),
                exists: (value) => {
                  return getDocs(
                    query(
                      collection(db, "users"),
                      where("username", "==", value)
                    )
                  ).then((res) => {
                    if (res.empty) {
                      return true;
                    }
                    return "Username already exists";
                  });
                },
              },
            }}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
            regProps={{
              disabled: true,
              required: {
                value: true,
                message: "Missing email information. Please sign in again.",
              },
            }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center py-3">
          <div
            className="flex h-[125px] aspect-square bg-light-gray rounded-lg items-center justify-center hover:bg-med-gray hover:scale-105 hover:cursor-pointer transition-all ease-out"
            onClick={() => fileRef.current?.click()}
          >
            {uploadedImage != null ? (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="image preview"
                className="aspect-square object-cover"
              />
            ) : (
              <LuImagePlus size={50} />
            )}
          </div>
          {errors.profileImage && (
            <div className="text-red-500 text-sm flex items-center gap-1 mt-2">
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
      <section className="md:flex gap-5">
        <div className="flex-1">
          <Input
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName?.message}
            regProps={{
              required: {
                value: true,
                message: "You must provide a first name",
              },
              pattern: {
                value: /^\S+$/,
                message: "First name may not contain spaces",
              },
              validate: (value) => lengthCheck(value, "First name", 0, 50),
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName?.message}
            regProps={{
              required: {
                value: true,
                message: "You must provide a last name",
              },
              pattern: {
                value: /^\S+$/,
                message: "Last name may not contain spaces",
              },
              validate: (value) => lengthCheck(value, "Last name", 0, 50),
            }}
          />
        </div>
      </section>
      <button
        onClick={onSubmit}
        className="text-center w-full bg-highlight hover:bg-highlight-hover hover:scale-[1.02] transition-all ease-out text-white py-3 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
