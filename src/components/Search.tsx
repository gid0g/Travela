import { MapPin, Search, Clock } from "lucide-react";
import type { SearchResultsProps, SearchBarProps } from "../types/search.types";
import { BackButton } from "../components/Booking";

export function Header({ title }: { title: string }) {
  return (
    <header className="bg-white border-bottom py-3 px-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="mb-0">
            <BackButton addClass="dark" />
          </div>
          <h1 className="h5 mb-0 fw-normal">{title}</h1>
        </div>
      </div>
    </header>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <div className="px-3 py-3">
      <div className="position-relative">
        <div className="input-group">
          <span
            className="input-group-text bg-light border-end-0"
            style={{ backgroundColor: "#e8f5e8", borderColor: "#28a745" }}
          >
            <Search size={18} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              backgroundColor: "#e8f5e8",
              borderColor: "#28a745",
            }}
          />
          <span
            className="input-group-text border-start-0"
            style={{ backgroundColor: "#e8f5e8", borderColor: "#28a745" }}
          >
            <MapPin size={18} className="text-warning" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  return (
    <div>
      {results.map((result) => (
        <div
          key={result.id}
          className="d-flex align-items-center py-3 px-3 border-bottom cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => onResultClick(result)}
        >
          <div
            className="me-3 d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <Clock size={20} className="text-muted" />
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-normal text-dark">{result.name}</h6>
            <small className="text-muted">{result.location}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
