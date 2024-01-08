import { z } from "zod";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const SetupFormSchema = z.object({
  username: z
    .string()
    .min(8, "Username is too short")
    .max(50, "Username is too long")
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Username may not contain special symbols except underscore"
    )
    .refine((value) => {
      return getDocs(
        query(collection(db, "users"), where("username", "==", value))
      ).then((res) => {
        return res.empty;
      });
    }, "Username already exists"),
  email: z.string().email("Missing email information. Please sign in again."),
  firstName: z
    .string()
    .min(1, "No first name provided")
    .max(50, "First name exceeds max length of 50")
    .regex(/^[A-Za-z]+$/, "First name contains invalid characters"),
  lastName: z
    .string()
    .min(1, "No last name provided")
    .max(50, "Last name exceeds max length of 50")
    .regex(/^[A-Za-z]+$/, "Last name contains invalid characters"),
  profileImage: z.instanceof(File),
});

export default SetupFormSchema;
