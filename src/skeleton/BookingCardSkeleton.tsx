import { motion } from 'framer-motion';

const BookingCardSkeleton = () => {
  return (
    <>
      <>
        <motion.div
          className="col-12 col-md-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ cursor: "pointer" }}
        >
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="position-relative">
              <div
                className="bg-secondary bg-opacity-25 p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 100%)",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fw-bold mb-1 placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </h5>
                    <small className="opacity-75 placeholder-glow">
                      <span className="placeholder col-5"></span>
                    </small>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold fs-5 placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="mb-3 d-flex align-items-center">
                <div className="rounded-circle bg-light p-3 me-3"></div>
                <div className="flex-grow-1 placeholder-glow">
                  <div className="fw-semibold text-dark">
                    <span className="placeholder col-6"></span>
                  </div>
                  <small className="text-muted">
                    <span className="placeholder col-4"></span>
                  </small>
                </div>
              </div>

              <div className="mb-3 d-flex align-items-center">
                <div className="rounded-circle bg-light p-3 me-3"></div>
                <div className="flex-grow-1 placeholder-glow">
                  <div className="fw-semibold text-dark">
                    <span className="placeholder col-5"></span>
                  </div>
                  <small className="text-muted">
                    <span className="placeholder col-3"></span>
                  </small>
                </div>
              </div>

              <div className="mb-4 d-flex align-items-center">
                <div className="rounded-circle bg-light p-3 me-3"></div>
                <div className="flex-grow-1 placeholder-glow">
                  <div className="fw-semibold text-dark">
                    <span className="placeholder col-4"></span>
                  </div>
                  <small className="text-muted">
                    <span className="placeholder col-3"></span>
                  </small>
                </div>
              </div>

              <div className="text-center mb-3 placeholder-glow">
                <span className="placeholder col-4 rounded-pill"></span>
              </div>

              <div className="d-grid gap-2 placeholder-glow">
                <span className="btn btn-info disabled placeholder col-12 py-3 rounded-pill"></span>
                <span className="btn btn-outline-danger disabled placeholder col-12 py-3 rounded-pill"></span>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </>
  );
}

export default BookingCardSkeleton
