import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { AttractionCardProps } from "../types/home.types";
import { useNavigate } from "react-router";
import { cleanTitle, cleanImageUrl } from "../utils/helper";
import logo from "../assets/md_logo.ico";
import { useUserStore } from "../store/user.store";
import { useAttractionStore } from "../store/attraction.store";
import defaultImage from "../images/default.png";

export function Header() {
  const user = useUserStore((state) => state?.user);
  const isNoUser = user == null;
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (isNoUser) {
      alert("Kindly Login First");
      navigate("/auth");
    } else {
      navigate("/profile");
    }
  };

  return (
    <header className="bg-white border-bottom py-3 px-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <button
            className="btn btn-link p-0 text-dark"
            onClick={() => navigate("/home")}
          >
            <img src={logo} alt="logo" className="img-fluid" />
          </button>

          <div className="d-flex align-items-center text-muted">
            <img
              src={user?.fallback_image ?? defaultImage}
              alt="profile image"
              className="img-fluid"
              style={{ height: "2rem", borderRadius: "50%", cursor: "pointer" }}
              onClick={handleOnClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const setAttraction = useAttractionStore((state) => state?.setAttraction);
  const user = useUserStore((state) => state?.user);
  const isNoUser = user == null;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const imageUrl = inView ? cleanImageUrl(attraction?.cardPhotos[0]) : "";

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setLoaded(true);
      img.onerror = () => setLoaded(false);
    }
  }, [imageUrl]);
  const handleBooking = () => {
    if (isNoUser) {
      alert("Kindly Login First");
      navigate("/auth");
    } else {
      navigate("/booking");
      setAttraction(attraction);
    }
  };
  return (
    <motion.div
      ref={cardRef}
      className="card border-0 mb-3 mx-3"
      style={{
        backgroundImage: loaded
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageUrl})`
          : "black",
        backgroundSize: "cover",
        minHeight: "10rem",
        color: "white",
        borderRadius: "2rem",
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        opacity: loaded ? 1 : [0.4, 0.6, 0.8, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: loaded ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div
            className="flex-grow-1"
            onClick={() => {
              navigate("/results");
              setAttraction(attraction);
            }}
          >
            <h5
              className={`card-title mb-2  ${
                loaded ? "text-white" : "text-dark"
              }  fw-bold`}
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
            >
              {cleanTitle(attraction?.title)}
            </h5>
            <p
              className={`card-text small opacity-75 mb-0 ${
                loaded ? "text-white" : "text-dark"
              }`}
              style={{ fontSize: "clamp(0.9rem, 0.9vw, 1rem)" }}
            >
              {attraction?.secondaryInfo}
            </p>
          </div>
          <motion.button
            className="btn btn-light btn-sm p-1 p-md-3 my-1 my-md-0 d-flex align-items-center rounded-3 fw-bold"
            onClick={() => {
              handleBooking();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="me-1">Book</span>
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
