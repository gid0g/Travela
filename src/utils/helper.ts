import type {
  TravelTimes,
  LocationInfo,
  ExtractedHotel,
  HotelResponse,
} from "../types/result.types";
import type { TimeSlot } from "../types/booking.types";
import type { SearchResult } from "../types/search.types";
export const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatExpiryDate = (value: string) => {
  let cleaned = value.replace(/\D/g, "").slice(0, 4);

  let month = cleaned.slice(0, 2);
  let year = cleaned.slice(2, 4);

  if (month.length === 2) {
    let monthNum = parseInt(month, 10);
    if (monthNum === 0) {
      month = "01";
    } else if (monthNum > 12) {
      month = "12";
    }
  }

  if (year.length === 2) {
    const currentYear = new Date().getFullYear() % 100;
    const yearNum = parseInt(year, 10);

    if (yearNum < currentYear) {
      year = currentYear.toString().padStart(2, "0");
    }
  }

  return year.length > 0 ? `${month}/${year}` : month;
};
export function formatPhone(number: string): string {
  let digits = number.replace(/\D/g, "");

  if (digits.startsWith("234")) {
    digits = digits.slice(3);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }
  return digits;
}

export const formatDateForCard = (dateStr: string) => {
  if (!dateStr) return { day: "", date: "" };

  const dateObj = new Date(dateStr);

  const optionsDay: Intl.DateTimeFormatOptions = { weekday: "short" };
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };

  return {
    day: dateObj.toLocaleDateString(undefined, optionsDay),
    date: dateObj.toLocaleDateString(undefined, optionsDate),
  };
};
export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const cleanTitle = (text: string): string => {
  if (!text || typeof text !== 'string') return "Unknown Title";
  return text.replace(/^\d+\.\s*/, "");
};

export function generateTravelTimes(): TravelTimes {
  const walk = Math.floor(Math.random() * 40) + 5;
  const drive = Math.floor(Math.random() * 15) + 5;
  const alt = Math.floor(Math.random() * 50) + 10;

  return {
    duration: `${drive} mins`,
    walkTime: `${walk} mins`,
    driveTime: `${drive} mins`,
    alternateTime: `${alt} mins by transit`,
  };
}

export function mapToLocationInfo(raw: ExtractedHotel): LocationInfo {
  return {
    name: raw?.title?.replace(/^\d+\.\s*/, ""),
    location: raw?.secondaryInfo,
    bubbleRating_rating: raw?.bubbleRating_rating,
    description: raw?.description ?? "",
    travelTimes: raw?.travelTimes,
    cardPhotos: raw?.cardPhotos,
  };
}
export function mapToRecentSearches(hotels: ExtractedHotel[]): SearchResult[] {
  if (!hotels || !Array.isArray(hotels)) return [];
  
  const recent = hotels.slice(0, 5).map((hotel) => ({
    id: hotel?.id || "unknown",
    name: hotel?.title?.replace(/^\d+\.\s*/, "") || "Unknown Title",
    location: hotel?.secondaryInfo || "Unknown Location",
  }));
  return recent;
}
export function mapToSearch(hotels: HotelResponse): SearchResult[] {
  if (!hotels || !Array.isArray(hotels)) return [];
  
  const recent =
    hotels.flatMap((page) =>
      page?.items?.map((hotel, index) => ({
        id: `${page?.page || 0}-${index}`,
        name: hotel?.title || "Unknown Title",
        location: hotel?.secondaryInfo || "Unknown Location",
      })) || []
    ) ?? [];

  return recent;
}

export function cleanImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return "";
  
  const match = url.match(/^(.*?\.(jpg|jpeg|png|webp))/i);
  return match ? match[1] : url;
}


export function generateTimeSlots(requiredTime?: string): TimeSlot[] {
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const allTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const shuffle = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  let selectedTimes = shuffle(allTimes);

  selectedTimes = selectedTimes.slice(0, 4);

  if (requiredTime && !selectedTimes.includes(requiredTime)) {
    selectedTimes[0] = requiredTime; 
  }

  const ordered = selectedTimes.sort(
    (a, b) => allTimes.indexOf(a) - allTimes.indexOf(b)
  );

  const timeSlots: TimeSlot[] = ordered.map((t, i) => ({
    id: (i + 1).toString(),
    time: t,
    available: true,
    price: randomInt(10000, 150000),
  }));

  return timeSlots;
}
