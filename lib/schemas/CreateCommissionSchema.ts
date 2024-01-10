import { z } from "zod";

const CreateCommissionSchema = z.object({
  title: z
    .string()
    .min(1, "No title provided")
    .max(200, "Title may not exceed 200 characters"),
  images: z
    .array(z.instanceof(File))
    .nonempty({ message: "At least one sample image required" }),
  description: z.string(),
  visible: z.boolean(),
});

export default CreateCommissionSchema;
