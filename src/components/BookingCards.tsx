import { useState, useEffect } from "react";
import type { BookingCardsProps } from "../types/booking.types";
import { formatDate } from "./ConfirmBooking";
import { Edit, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useCancelBooking } from "../hooks/useBooking";
import { motion } from "framer-motion";
function BookingCard({ booking }: BookingCardsProps) {
  const { mutate: cancelBooking } = useCancelBooking();
  const navigate = useNavigate();
  const handleModify = () => {
    console.log("Clicked modify");
    navigate("/booking", { state: { booking } });
  };
  const handleCancel = () => {
    cancelBooking(booking);
  };
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!booking?.date) {
      setDisabled(false);
      return;
    }
    
    try {
      const now = new Date();
      const bookings = new Date(booking.date);

      const diff = bookings.getTime() - now.getTime();

      const oneDay = 24 * 60 * 60 * 1000;

      if (diff <= oneDay) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } catch (error) {
      console.error("Error calculating booking date:", error);
      setDisabled(false);
    }
  }, [booking?.date]);
  return (
    <>
      <motion.div
        className="col-12 col-md-6 my-2 d-flex"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ cursor: "pointer" }}
      >
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden h-100 w-100 d-flex flex-column">
          <div className="position-relative">
            <div
              className="bg-primary text-white p-4"
              style={{
                background:
                  "linear-gradient(135deg,rgb(68, 68, 70) 0%,rgb(19, 19, 20) 100%)",
              }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="fw-bold mb-1">{booking?.place}</h5>
                  <small className="opacity-75">
                    <i className="fas fa-map-marker-alt me-3"></i>
                    {booking?.location && booking.location.length > 30
                      ? `${booking.location.substring(0, 30)}...`
                      : booking?.location || "Unknown Location"}
                  </small>
                </div>
              </div>
              <div className="text-end">
                <div className="fs-5 fw-bold">
                  ₦ {Number(booking?.price || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="card-body p-4 d-flex flex-column flex-grow-1">
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-dark">{booking?.name}</div>
                  <small className="text-muted">{booking?.guests} guests</small>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-calendar text-warning"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-dark">
                    {formatDate(booking?.date)}
                  </div>
                  <small className="text-muted">{booking?.timeSlot}</small>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <i className="fas fa-credit-card text-success"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-dark">
                    {booking?.paymentMethod}
                  </div>
                  <small className="text-muted">Payment secured</small>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-center mb-3">
                <span className="badge bg-success bg-opacity-20 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-check-circle me-1"></i>
                  Confirmed
                </span>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-info rounded-pill py-2 fw-semibold"
                  onClick={() => handleModify()}
                  disabled={disabled}
                >
                  <Edit className="me-2" size={18} />
                  {disabled ? "Too Late to modify" : "Modify Booking"}
                </button>
                <button
                  className="btn btn-outline-danger rounded-pill py-2 fw-semibold"
                  disabled={disabled}
                  onClick={() => handleCancel()}
                >
                  <X className="me-2" size={18} />
                  {disabled ? "Too Late" : "Cancel Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default BookingCard;
