import {  luxuryServices } from "../data/data";
import {
  BackButton,
  LocationHeader,
  Description,
  TravelTimes,
  LuxuryServices,
  BookButton,
} from "../components/Booking";
import { mapToLocationInfo } from "../utils/helper";
import { useAttractionStore } from "../store/attraction.store";
import type { ExtractedHotel } from "../types/result.types";
import { BackgroundCarousel } from "../components/ImageCarousel";
function ResultRage() {
  const attraction = useAttractionStore((state)=>state?.attraction)
  const attractions = mapToLocationInfo(attraction as ExtractedHotel);
  return (
    <>
      <div className="min-vh-100 d-flex flex-column position-relative">
        <BackgroundCarousel images={attractions.cardPhotos} />

        <div className="p-4 pt-5 position-relative" style={{ zIndex: 1 }}>
          <BackButton addClass="dark p-0 mb-4" />
        </div>

        <div
          className="flex-grow-1 d-flex flex-column position-relative"
          style={{ zIndex: 1 }}
        >
          <div className="flex-grow-1"></div>

          <div
            className="bg-white p-4 mt-auto container"
            style={{
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <LocationHeader info={attractions} />
            <Description text={attractions?.description} />
            <TravelTimes times={attractions.travelTimes} />
            <LuxuryServices services={luxuryServices} />
            <BookButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultRage;
