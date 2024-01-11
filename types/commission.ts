import { z } from 'zod';
// Schemas
import { CreatePackageSchema } from "@/lib/schemas/CreateCommissionSchema";

export interface Image {
  url: string;
  image: File;
}

export type Package = z.infer<typeof CreatePackageSchema>;