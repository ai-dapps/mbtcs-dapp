import { create } from "zustand";

export const useMenu = create<MenuState>((set, get) => ({
  currentMenu: "MBTCs",
  setCurrentMenu: (id) => {
    console.log(id);
    set(() => ({ currentMenu: id }));
  },
}));
