import { create } from "zustand";

type AdminStore = {
  fuelFee: number | null;
  hashCounter: number | null;
  totalSupply: number;
  setFuelFee: (fuelFee: number | null) => void;
  setHashCounter: (hashCounter: number | null) => void;
  setTotalSupply: (totalSupply: number) => void;
};

export const adminStore = create<AdminStore>((set, get) => ({
  fuelFee: null,
  hashCounter: null,
  totalSupply: 0,
  setFuelFee: (fuelFee) => set({ fuelFee: fuelFee }),
  setHashCounter: (hashCounter) => set({ hashCounter: hashCounter }),
  setTotalSupply: (totalSupply) => set({ totalSupply }),
}));
