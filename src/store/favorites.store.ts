import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FavoritesStore } from "../types/booking.types";

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: null,
      setFavorites: (favorites) => set({ favorites }),
      removeFavorites: () => set({ favorites: null }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.favorites }),
    }
  )
);
