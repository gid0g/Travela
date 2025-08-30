import type { ExtractedHotel } from "./result.types";
export interface Attraction {
  id: number;
  name: string;
  location: string;
  description: string;
  image?: string;
}

export interface AttractionCardProps {
  attraction: ExtractedHotel;
}

