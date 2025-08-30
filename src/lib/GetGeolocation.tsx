import { useState } from "react";

function Geolocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Error getting location: " + err.message);
      }
    );
  };

  return (
    <div>
      <button onClick={getLocation}>Get My Location</button>
      {location && (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Geolocation;
