import client from "../config/axios.config";
import type { SearchBody } from "../types/search.types";

export const addSearch = async (data: SearchBody) => {
  try {
    const response = await client.post("/searches/", data);
    return response?.data;
  } catch (error) {
    console.error("Error getting attractions", error);
    throw error;
  }
};
