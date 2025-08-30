import type { ApiResponse } from "../types/result.types";
import { generateTravelTimes } from "./helper";
export function extractSelectedData(response: ApiResponse) {
  return response.data.data.map((hotel) => ({
    id: hotel.id,
    title: hotel.title,
    cardPhotos: hotel.cardPhotos,
    primaryInfo: hotel.primaryInfo,
    secondaryInfo: hotel.secondaryInfo,
    bubbleRating_rating: hotel?.bubbleRating_rating,
    bubbleRating_count: hotel?.bubbleRating_count,
    travelTimes: generateTravelTimes(),
  }));
}
