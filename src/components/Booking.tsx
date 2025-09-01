import React, { useState } from "react";
import type { LocationInfo, LuxuryService } from "../types/result.types";
import { Car, History, Bike, Clock, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/user.store";
import { LoginPromptModal } from "./modal/LoginModal";
import { useAddFavorite , useRemoveFavorite} from "../hooks/useFavorites";
import type { Favorites } from "../types/booking.types";
import { mapToFavorite, checkIfFavorite } from "../utils/helper";
import { useAttractionStore } from "../store/attraction.store";
export function ActionButtons({
  disabled,
  onBack,
  onContinue,
  canContinue,
  continueText = "Continue",
}: {
  disabled: boolean;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  continueText?: string;
}) {
  return (
    <div className="row g-3 mt-4">
      <div className="col-6">
        <button
          className="btn btn-outline-dark btn-lg w-100"
          disabled={disabled}
          onClick={onBack}
          style={{
            borderRadius: "25px",
            height: "60px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
      </div>
      <div className="col-6">
        <button
          className="btn btn-dark btn-lg w-100"
          onClick={onContinue}
          disabled={!canContinue}
          style={{
            borderRadius: "25px",
            height: "60px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {continueText}
        </button>
      </div>
    </div>
  );
}

export function BackButton({ addClass }: { addClass: string }) {
  const navigate = useNavigate();
  return (
    <button
      className={`btn btn-link text-${addClass} `}
      style={{ fontSize: "24px" }}
      onClick={() => navigate(-1)}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

export function PageIndicator() {
  return (
    <div className="d-flex justify-content-center mb-4">
      <span
        className="rounded-circle bg-success me-2"
        style={{ width: "8px", height: "8px" }}
      ></span>
      <span
        className="rounded-circle bg-light me-2"
        style={{ width: "8px", height: "8px", opacity: 0.5 }}
      ></span>
      <span
        className="rounded-circle bg-light"
        style={{ width: "8px", height: "8px", opacity: 0.5 }}
      ></span>
    </div>
  );
}

export function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="d-flex align-items-center">
      <span className="fw-bold me-1">{rating}</span>
      <Star size={20} className="text-warning" fill="currentColor" />
    </div>
  );
}

export function LocationHeader({ info }: { info: LocationInfo }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
      <div className="flex-grow-1 mb-2 mb-md-0">
        <h2 className="h4 fw-bold text-dark mb-1">{info.name}</h2>
        <div className="d-flex align-items-center text-muted">
          <i className="bi bi-geo-alt me-1" style={{ fontSize: "14px" }}></i>
          <span className="small">{info.location}</span>
        </div>
      </div>
      <div className="d-flex align-items-start">
        <RatingBadge rating={info?.bubbleRating_rating} />
      </div>
    </div>
  );
}

export function Description({ text }: { text: string }) {
  return (
    <p
      className="text-muted mb-4"
      style={{ fontSize: "1rem", lineHeight: "1.6" }}
    >
      {text}
    </p>
  );
}

export function TravelTimeItem({
  icon: Icon,
  time,
}: {
  icon: React.ElementType;
  time: string;
}) {
  return (
    <div className="d-flex align-items-center me-4 mb-2">
      <Icon size={16} className="text-muted me-2" />
      <span className="small text-muted">{time}</span>
    </div>
  );
}

export const TravelTimes: React.FC<{ times: LocationInfo["travelTimes"] }> = ({
  times,
}) => (
  <div className="d-flex flex-wrap mb-4">
    <TravelTimeItem icon={Clock} time={times.duration} />
    <TravelTimeItem icon={Bike} time={times.walkTime} />
    <TravelTimeItem icon={Car} time={times.driveTime} />
    <TravelTimeItem icon={History} time={times.alternateTime} />
  </div>
);

const LuxuryServiceItem: React.FC<{ service: LuxuryService }> = ({
  service,
}) => (
  <div className="text-center me-4">
    <div
      className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-2 mx-auto"
      style={{ width: "48px", height: "48px" }}
    >
      <service.Icon size={18} className="text-muted me-2" />
    </div>
    <span className="small text-muted">{service.label}</span>
  </div>
);

export const LuxuryServices: React.FC<{ services: LuxuryService[] }> = ({
  services,
}) => (
  <div className="mb-4">
    <h3 className="h6 fw-bold text-dark mb-3">Nearby Luxuries</h3>
    <div className="d-flex">
      {services.map((service, index) => (
        <LuxuryServiceItem key={index} service={service} />
      ))}
    </div>
  </div>
);

export function BookButton() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const attraction = useAttractionStore((state) => state?.attraction);
  const favorite: Favorites = mapToFavorite(attraction!);
  const user = useUserStore((state) => state?.user);
  const isNoUser = user == null;
  const favoriteId = checkIfFavorite();
  const isFavorite = !!favoriteId;

  const handleOnClick = () => {
    if (isNoUser) {
      setShowLoginModal(true);
    } else {
      navigate("/booking");
    }
  };

  const handleOnFavorite = () => {
    if (!isFavorite) {
      addFavorite(favorite);
    } else {
      removeFavorite(favoriteId!);
    }
  };

  return (
    <>
      <LoginPromptModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <div className="d-flex w-100 gap-2">
        <button
          className="btn btn-dark fw-bold text-uppercase flex-grow-1"
          style={{ borderRadius: "25px", fontSize: "16px", flexBasis: "75%" }}
          onClick={handleOnClick}
        >
          Book
        </button>

        <button
          className="btn border-0 d-flex align-items-center justify-content-center"
          style={{ borderRadius: "25px", flexBasis: "25%" }}
          onClick={handleOnFavorite}
        >
          <Heart
            size={20}
            color={isFavorite ? "red" : "gray"}
            fill={isFavorite ? "red" : "none"}
          />
        </button>
      </div>
    </>
  );
}
