import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import type { Favorites } from "../types/booking.types";
import { useAttractionStore } from "../store/attraction.store";
import { useNavigate } from "react-router";
import { mapToHotel } from "../utils/helper";
import { getAttractionByTitle } from "../queries/attraction.queries";
import type { ExtractedHotel } from "../types/result.types";

interface FavoriteCardProps {
  favorite: Favorites;
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const navigate = useNavigate();
  const setAttraction = useAttractionStore((state) => state?.setAttraction);
  const attraction = mapToHotel(favorite);
  const hotel = favorite.hotel;

  const [isLoading, setIsLoading] = useState(true);

  const onFavoriteClick = async () => {
    const favoriteAttraction = await getAttractionByTitle(attraction?.title);
    navigate("/results");
    setAttraction(favoriteAttraction as ExtractedHotel);
  };

  return (
    <motion.div
      className="col-12 col-md-6 my-2 d-flex"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ cursor: "pointer" }}
      onClick={onFavoriteClick}
    >
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden h-100 w-100">
        <div className="position-relative" style={{ height: "200px" }}>
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100 bg-light">
              <Spinner animation="border" variant="secondary" />
            </div>
          )}
          <img
            src={hotel.cardPhotos[0]}
            alt={hotel.title}
            className="img-fluid w-100"
            style={{ height: "200px", objectFit: "cover" }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>

        <div className="card-body p-3 d-flex flex-column">
          <h5 className="fw-bold text-truncate mb-2">{hotel.title}</h5>
          <div className="d-flex align-items-center text-muted">
            <i className="bi bi-geo-alt me-1" style={{ fontSize: "14px" }}></i>
            <span className="small">{hotel.secondaryInfo}</span>
          </div>

          <div className="d-flex align-items-center">
            <Star className="text-warning me-1" size={18} fill="gold" />
            <span className="fw-semibold">{hotel.bubbleRating.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
