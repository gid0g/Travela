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
  } catch (error) {
    console.error("Error getting attractions", error);
    throw error;
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
  } catch (error) {
    console.error("Error getting attractions", error);
    throw error;
  }
};

export const getAttractionByPartialText = async (
  title: string
): Promise<AttractionResponse> => {
  try {
    const response = await client.get<AttractionResponse>(
      `/attractions/search/?q=${title}&page=1&page_size=${PAGE_LIMIT}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error getting attractions", error);
    throw error;
  }
};

export const getSearch = async (): Promise<SearchResult[]> => {
  try {
    const response = await client.get<SearchResult[]>(`/searches/`);
    return response?.data;
  } catch (error) {
    console.error("Error getting attractions", error);
    throw error;
  }
};
