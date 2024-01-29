import { create } from "zustand";
interface ModalStores {
  execute: TxState;
  loading: boolean;
  setExecute: (execute: TxState) => void;
  setLoading: (loading: boolean) => void;
}
export const modalStore = create<ModalStores>((set, get) => ({
  loading: false,
  execute: "ready",
  setExecute: (execute) => set({ execute }),
  setLoading: (loading) => set({ loading }),
}));
