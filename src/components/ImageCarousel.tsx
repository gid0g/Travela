import { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { cleanImageUrl } from "../utils/helper";

type BackgroundCarouselProps = {
  images: string[];
  interval?: number;
};

export function BackgroundCarousel({
  images,
  interval = 3000,
}: BackgroundCarouselProps) {
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set());
  const [firstLoaded, setFirstLoaded] = useState(false);

  useEffect(() => {
    if (images?.length > 0) {
      const img = new Image();
      img.src = cleanImageUrl(images[0]);
      img.onload = () => {
        setLoadedIndexes((prev) => new Set(prev).add(0));
        setFirstLoaded(true);
      };
    }
  }, [images]);

  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{
        zIndex: -1,
        overflow: "hidden",
        height: "100dvh",
        background: "#f5f5f5", 
      }}
    >
      {!firstLoaded && (
        <div className="d-flex align-items-center justify-content-center h-100 w-100 bg-light">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}

      {firstLoaded && (
        <Carousel fade indicators={false} controls={false} interval={interval}>
          {images.map((url, index) => {
            const isLoaded = loadedIndexes.has(index);

            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 h-100"
                  src={cleanImageUrl(url)}
                  alt={`slide-${index}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{
                    objectFit: "cover",
                    height: "100dvh",
                    filter: isLoaded ? "blur(0px)" : "blur(20px)",
                    opacity: isLoaded ? 1 : 0,
                    transition:
                      "opacity 0.6s ease-in-out, filter 0.6s ease-in-out",
                  }}
                  onLoad={() =>
                    setLoadedIndexes((prev) => new Set(prev).add(index))
                  }
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
