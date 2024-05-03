import { FunctionComponent } from "react";
import { CreatePackageSchema } from "@/lib/schemas/CreateCommissionSchema";
import { z } from "zod";

type Package = z.infer<typeof CreatePackageSchema>;

type PackageCardProps = {
  packageItem: Package;
  idx: number;
};

export type Pos = {
  top: number;
  left: number;
}

export type PackageCardComponent = FunctionComponent<PackageCardProps>;
