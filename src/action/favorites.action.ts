import client from "../config/axios.config";
import type { Favorites } from "../types/booking.types";
export const addFavorite = async (data: Favorites) => {
  try {
    const response = await client.post(`/favorites/`, data);
    return response?.data;
  } catch (error) {
    console.error("Error adding favorite", error);
    throw error;
  }
};
export const removeFavorite = async (id: number|null) => {
  try {
    const response = await client.delete(`/favorites/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error removing favorite", error);
    throw error;
  }
};
