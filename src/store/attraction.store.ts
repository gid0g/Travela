import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AttractionStore } from "../types/result.types";
export const useAttractionStore = create<AttractionStore>()(
  persist(
    (set) => ({
      attraction: null,
      setAttraction: (attraction) => set({ attraction }),
      removeAttraction: () => set({ attraction: null }),
    }),
    {
      name: "attraction-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ attraction: state.attraction }),
    }
  )
);
