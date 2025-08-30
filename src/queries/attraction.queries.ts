import client from "../config/axios.config";
import type { AttractionResponse, ExtractedHotel } from "../types/result.types";
import type { SearchResult } from "../types/search.types";
import { PAGE_LIMIT } from "../lib/constants";

export const getAttraction = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<AttractionResponse> => {
  try {
    const response = await client.get<AttractionResponse>(
      `/attractions/?page=${pageParam}&page_size=${PAGE_LIMIT}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error getting attractions", error);

    if (error.response?.status === 404) {
      throw new Error("No attractions found");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Failed to load attractions. Please try again later");
    }
  }
};
export const getAttractionByTitle = async (
  title: string
): Promise<ExtractedHotel> => {
  try {
    const response = await client.get<ExtractedHotel>(
      `/attractions/${encodeURIComponent(title)}`
    );
    return response?.data;
  } catch (error: any) {
    console.error("Error getting attraction by title", error);

    if (error.response?.status === 404) {
      throw new Error(`Attraction "${title}" not found`);
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

export const getAttractionByPartialText = async (
  title: string
): Promise<AttractionResponse> => {
  try {
    const response = await client.get<AttractionResponse>(
      `/attractions/search/?q=${encodeURIComponent(
        title
      )}&page=1&page_size=${PAGE_LIMIT}`
    );
    return response?.data;
  } catch (error: any) {
    console.error("Error searching attractions", error);

    if (error.response?.status === 404) {
      throw new Error("No attractions found for your search");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Failed to search attractions. Please try again later");
    }
  }
};

export const getSearch = async (): Promise<SearchResult[]> => {
  try {
    const response = await client.get<SearchResult[]>(`/searches/`);
    return response?.data;
  } catch (error: any) {
    console.error("Error getting search history", error);

    if (error.response?.status === 404) {
      throw new Error("No search history found");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Failed to load search history. Please try again later");
    }
  }
};
