import type { confirmBookingData } from "../types/booking.types";
import { Edit, XCircle, CheckCircle, CalendarCheck } from "lucide-react";
import { Header } from "./HomeComponent";
import { useAttractionStore } from "../store/attraction.store";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
function BookingProfilePage({
  bookingData,
  handleModify,
  handleCancel,
  handleConfirm,
  isLoading,
  isModify,
}: confirmBookingData) {
  const attraction = useAttractionStore((state) => state?.attraction);
  return (
    <>
      <div className="min-vh-100 bg-light">
        <div className="position-sticky z-1 top-0 bg-light">
          <Header />
          <nav
            className="navbar navbar-expand-lg navbar-dark s"
            style={{
              background: "white",
              border: "none",
            }}
          >
            <div className="container">
              <span className="navbar-brand fw-bold fs-4 text-dark d-flex align-items-center">
                <CalendarCheck className="me-2" size={22} />
                Booking Details
              </span>
            </div>
          </nav>
        </div>

        <div className="container py-5 bg-light ">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4">
                <div className="bg-secondary text-white p-4">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-8">
                      <h2 className="mb-1 fw-bold">{bookingData?.place}</h2>
                      <p className="mb-0 opacity-75">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {bookingData?.location}
                      </p>
                    </div>
                    <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
                      <div
                        className="rounded-3 p-3 d-flex justify-content-center align-items-center"
                        style={{ height: "90%" }}
                      >
                        <img
                          src={attraction?.cardPhotos[0]}
                          alt="Attraction"
                          className="img-fluid rounded-4"
                          style={{ height: "80%", objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                          <i className="fas fa-user text-primary fs-5"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold text-dark">Customer's Name</h6>
                          <p className="mb-0 text-muted">{bookingData?.name}</p>
                        </div>
                      </div>
                    </div>

                    {bookingData?.guests && (
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                            <i className="fas fa-users text-success fs-5"></i>
                          </div>
                          <div>
                            <h6 className="mb-1 fw-bold text-dark">
                              Party Size
                            </h6>
                            <p className="mb-0 text-muted">
                              {bookingData?.guests} Guest(s)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      className={`col-12 ${
                        bookingData?.guests ? "col-md-6" : ""
                      } `}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                          <i className="fas fa-calendar text-warning fs-5"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold text-dark">Date</h6>
                          <p className="mb-0 text-muted">
                            {formatDate(bookingData?.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                          <i className="fas fa-clock text-info fs-5"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold text-dark">Time Slot</h6>
                          <p className="mb-0 text-muted">
                            {bookingData?.timeSlot}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex align-items-center  mb-3">
                        <div className="bg-secondary bg-opacity-10 rounded-circle p-3 me-3">
                          <i className="fas fa-credit-card text-secondary fs-5"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold text-dark">
                            Payment Method
                          </h6>
                          <p className="mb-0 text-muted">
                            {bookingData?.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex align-items-center  mb-3">
                        <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                          <i className="fas fa-money-bill-wave text-success fs-5"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold text-dark">
                            Total Price
                          </h6>
                          <p className="mb-0 text-muted">
                            ₦{Number(bookingData?.price)?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>



                <div className="card-footer bg-light border-0 p-4">
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    <button
                      className="btn btn-outline-danger px-4 py-2 rounded-pill fw-semibold d-flex align-items-center"
                      onClick={()=>handleCancel(bookingData)}
                    >
                      <XCircle className="me-2" size={18} />
                      Cancel Booking
                    </button>
                    <button
                      className="btn btn-info px-4 py-2 rounded-pill fw-semibold d-flex align-items-center"
                      onClick={()=>handleModify(bookingData)}
                      disabled={!isModify}
                    >
                      <Edit className="me-2" size={18} />
                      Modify Booking
                    </button>
                    <button
                      className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold d-flex align-items-center"
                      onClick={()=>handleConfirm(bookingData)}
                      disabled={isModify}
                    >
                      <CheckCircle className="me-2" size={18} />
                      {isLoading ? "Confirming" : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>


              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body text-center py-4">
                  <p className="text-muted mt-3 mb-0">
                    Your reservation would soon be confirmed.
                  </p>

                  <p className="fw-bold mt-3 mb-0">
                    Note⚠️: Cancelling and Modification of Booking details won't
                    be permitted 24 hours before the agreed time. 
                  </p>
                  <p className="fst-italic mt-3 mb-0">
                    Thank you for using Travela!!!!!!!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingProfilePage;
