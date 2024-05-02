import { FunctionComponent } from "react";
import { CreatePackageSchema } from "@/lib/schemas/CreateCommissionSchema";
import { z } from "zod";

type Package = z.infer<typeof CreatePackageSchema>;

type PackageCardProps = {
  packageItem: Package;
};

export type PackageCardComponent = FunctionComponent<PackageCardProps>;
