import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

export default function ErrorPage({ error, resetError }: ErrorPageProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (resetError) {
      resetError();
    }
    navigate("/");
  };

  const handleGoBack = () => {
    if (resetError) {
      resetError();
    }
    navigate(-1);
  };

  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <div className="display-1 text-muted mb-3">😕</div>
                <h1 className="h3 fw-bold text-dark mb-3">
                  Oops! Something went wrong
                </h1>
                <p className="text-muted mb-4">
                  {error?.message ||
                    "We encountered an unexpected error. Please try again."}
                </p>
              </div>

              <div className="d-grid gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary btn-lg"
                  onClick={handleRetry}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Try Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-outline-secondary"
                  onClick={handleGoBack}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Go Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-outline-dark"
                  onClick={handleGoHome}
                >
                  <i className="bi bi-house me-2"></i>
                  Go Home
                </motion.button>
              </div>

              {import.meta.env.MODE === "development" && error && (
                <div className="mt-4 p-3 bg-light rounded">
                  <details className="text-start">
                    <summary className="fw-bold text-danger">
                      Error Details (Development)
                    </summary>
                    <pre
                      className="mt-2 small text-muted"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {error.stack}
                    </pre>
                  </details>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
