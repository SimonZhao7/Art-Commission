import { createContext } from "react";

export type CommissionContext = {
  setEditIdx: (idx: number) => void;
};

export const CreateCommissionContext = createContext<CommissionContext>({
  setEditIdx: (_) => {},
});
