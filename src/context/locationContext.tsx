import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ExtractedHotel } from "../types/result.types";

interface LocationContextType {
  location: ExtractedHotel | null;
  setLocation: (loc: ExtractedHotel | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<ExtractedHotel | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
}
