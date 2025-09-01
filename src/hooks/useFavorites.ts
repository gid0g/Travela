import { getFavorites } from "../queries/favorites.queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addFavorite, removeFavorite } from "../action/favorites.action";
import type { Favorites } from "../types/booking.types";
import { useFavoritesStore } from "../store/favorites.store";

export const useFavorites = () => {
  return useQuery<Favorites[]>({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(),
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const setFavorites = useFavoritesStore((state) => state?.setFavorites);

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: async () => {
      toast.success("Added to favorites");
      const favorites = await queryClient.fetchQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
      });
      setFavorites(favorites);
    },
    onError: (error) => {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add to favorites");
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const setFavorites = useFavoritesStore((state) => state?.setFavorites);

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: async () => {
      toast.success("Removed from favorites");
      const favorites = await queryClient.fetchQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
      });
      setFavorites(favorites);
    },
    onError: (error) => {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites");
    },
  });
};
