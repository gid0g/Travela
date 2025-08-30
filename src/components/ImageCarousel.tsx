import { Carousel } from "react-bootstrap";
import { cleanImageUrl } from "../utils/helper";
type BackgroundCarouselProps = {
  images: string[];
  
  interval?: number;
};

export function BackgroundCarousel({
  images,
  interval = 3000,
}: BackgroundCarouselProps) {
  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{ zIndex: -1, overflow: "hidden", height: "100dvh" }}
    >
      <Carousel fade indicators={false} controls={false} interval={interval}>
        {images.map((url, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 h-100"
              src={cleanImageUrl(url)}
              alt={`slide-${index}`}
              loading={index === 0 ? "eager" : "lazy"}
              style={{
                objectFit: "cover",
                height: "100dvh",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
