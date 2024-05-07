import { z } from "zod";
// Schemas
import CreateCommissionSchema, {
  AddOnSchema,
  CreatePackageSchema,
} from "@/lib/schemas/CreateCommissionSchema";

export interface Image {
  url: string;
  image: File;
}

export type Package = z.infer<typeof CreatePackageSchema>;

export type CreateCommissionFormFields = z.infer<typeof CreateCommissionSchema>;

export type AddOn = z.infer<typeof AddOnSchema>;
