export interface LocationInfo {
  name: string;
  location: string;
  bubbleRating_rating: number;
  description: string;
  cardPhotos: string[];
  travelTimes: TravelTimes;
}

export interface LuxuryService {
  Icon: React.ElementType;
  label: string;
}

export interface AttractionInfo {
  id: string;
  title: string;
  primaryInfo: string | null;
  secondaryInfo: string;
  bubbleRating_count: number;
  bubbleRating_rating: number;
  cardPhotos: string[];
}

export interface ApiResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    sortDisclaimer: string;
    data: AttractionInfo[];
  };
}
export interface TravelTimes {
  duration: string;
  walkTime: string;
  driveTime: string;
  alternateTime: string;
}

export type ImageCarouselProps = {
  images: string[];
  interval?: number;
};


export type ExtractedHotel = {
  id?: string;
  title: string;
  cardPhotos: string[];
  primaryInfo: string | null;
  description?: string;
  secondaryInfo: string;
  bubbleRating_rating: number;
  bubbleRating_count: number;
  travelTimes: TravelTimes;
};

export interface AttractionStore {
  attraction: ExtractedHotel | null;
  setAttraction: (attraction: ExtractedHotel | null) => void;
  removeAttraction: () => void;
}

export interface AttractionResponse {
  items: ExtractedHotel[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export type HotelResponse = {
  items: {
    title: string;
    secondaryInfo: string;
    bubbleRating_count: number;
    bubbleRating_rating: number;
    cardPhotos: string[];
    travelTimes: TravelTimes;
  }[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}[];
