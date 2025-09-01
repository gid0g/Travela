import client from "../config/axios.config";
import type  { Favorites } from "../types/booking.types";
export const getFavorites = async (): Promise<Favorites[]> => {
  try {
    const response = await client.get(`/favorites/`);
    return response?.data;
  } catch (error: any) {
    console.error("Error getting favorites", error);
    if (error.response?.status === 404) {
      throw new Error(`Favorites not found`);
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error(
        "Failed to load attraction details. Please try again later"
      );
    }
  }
};
