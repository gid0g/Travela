import FourOFour from "../images/404.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="position-relative d-flex flex-column"
      style={{ height: "100vh", width: "100%" }}
    >
      <div
        className="w-100"
        style={{
          height: "50%",
          backgroundColor: "#16c58f",
        }}
      />

      <div
        className="w-100"
        style={{
          height: "50%",
          backgroundColor: "#50fcc7",
        }}
      />

      <motion.div
        className="position-absolute d-flex align-items-center justify-content-center"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          paddingTop: "1rem",
          transform: "translateY(-15%)",
        }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: "-15%" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <motion.img
          src={FourOFour}
          alt="404 Error"
          className="img-fluid"
          style={{ width: "66.666667%", maxWidth: "48rem" }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, -2, 0, 2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.div
        className="position-absolute d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          left: 0,
          right: 0,
          bottom: "8rem",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.h2
          className="mb-2 fw-bold text-black"
          style={{ fontSize: "3rem" }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          OOPS!
        </motion.h2>
        <motion.p
          className="mb-4 text-black"
          style={{ fontSize: "1.25rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          PAGE NOT FOUND
        </motion.p>

        <motion.div
          className="d-flex align-items-center"
          style={{ gap: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/home"
              className="btn btn-outline-dark px-4 py-2 text-decoration-none"
              style={{
                borderColor: "black",
                color: "black",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              GO HOME
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-dark px-4 py-2"
              style={{
                borderColor: "black",
                color: "black",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              GO BACK
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;
