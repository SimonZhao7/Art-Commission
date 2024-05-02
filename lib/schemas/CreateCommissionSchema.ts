import { z } from "zod";

export const CreatePackageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "No title provided")
    .max(200, "Title may not exceed 200 characters"),
  revisions: z.coerce
    .number({
      invalid_type_error: "No number provided",
    })
    .gte(0, "Can not have negative number of revisions"),
  details: z.string(),
  price: z.coerce
    .number({
      invalid_type_error: "No number provided",
    })
    .gt(0, "Commission package can not be free"), // Infinity - price varies
  deliveryTime: z.coerce
    .number({
      invalid_type_error: "No number provided",
    })
    .gt(0, "Commission package can not take 0 days"),
  image: z
    .object({
      file: z.instanceof(File),
      url: z.string(),
    })
    .optional(),
});

const CreateCommissionSchema = z.object({
  title: z
    .string()
    .min(1, "No title provided")
    .max(200, "Title may not exceed 200 characters"),
  images: z
    .array(z.instanceof(File))
    .nonempty({ message: "At least one sample image required" }),
  tag: z.string(),
  description: z.string(),
  visible: z.boolean(),
  packages: z.array(CreatePackageSchema).nonempty(),
});

export default CreateCommissionSchema;
