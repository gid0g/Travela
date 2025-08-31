import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSkeleton = () => {
  return (
    <div
      className="card border-0 mb-3 mx-3"
      style={{
        minHeight: "10rem",
        borderRadius: "2rem",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">

            <h5 className="card-title mb-2 fw-bold">
              <Skeleton width="70%" height={24} />
            </h5>


            <p className="card-text small mb-0">
              <Skeleton width="50%" height={18} />
            </p>
          </div>


          <div style={{ width: 80, height: 36 }}>
            <Skeleton height="100%" borderRadius={8} />
          </div>
        </div>
      </div>
    </div>
  );
};
