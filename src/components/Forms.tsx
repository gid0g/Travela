import type {
  ProgressStepProps,
  FormFieldProps,
  SelectFieldProps,
  InputFieldProps,
  LocationCardProps,
  TimeSlot,
  Guest,
  PaymentMethod,
  BookingFormData,
} from "../types/booking.types";
import { cleanImageUrl } from "../utils/helper";
export function ProgressBar({ current, total }: ProgressStepProps) {
  return (
    <div className="mb-4 ">
      <div className="d-flex justify-content-center mb-3">
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={`rounded-pill me-2 ${index === 0 ? "" : "ms-2"}`}
            style={{
              width: "100px",
              height: "4px",
              backgroundColor: index < current ? "#6c757d" : "#e9ecef",
            }}
          ></div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-muted">
          Step {current} / {total}
        </span>
      </div>
    </div>
  );
}

export function FormField({ label, children, className = "" }: FormFieldProps) {
  return (
    <div className={`${className}`}>
      <label
        className="form-label fw-bold text-dark mb-3"
        style={{ fontSize: "18px" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function SelectField({
  placeholder,
  value,
  onChange,
  icon,
  options = [],
}: SelectFieldProps) {
  return (
    <div className="position-relative">
      <select
        className="form-select form-control-lg text-muted"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          borderRadius: "12px",
          border: "2px solid #e9ecef",
          paddingLeft: icon ? "50px" : "16px",
          paddingRight: "40px",
          fontSize: "16px",
          height: "60px",
          appearance: "none",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {icon && (
        <i
          className={`bi ${icon} position-absolute text-muted`}
          style={{
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "20px",
          }}
        ></i>
      )}
      <i
        className="bi bi-chevron-down position-absolute text-muted"
        style={{
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "16px",
        }}
      ></i>
    </div>
  );
}
export function InputField({
  placeholder,
  value,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <input
      type={type}
      className="form-control form-control-lg text-muted"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        borderRadius: "12px",
        border: "2px solid #e9ecef",
        fontSize: "16px",
        height: "60px",
      }}
    />
  );
}
export function LocationCard({
  name,
  location,
  image,
  onViewDetails,
}: LocationCardProps) {
  return (
    <div
      className="card mb-4"
      style={{
        borderRadius: "16px",
        border: "none",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row align-items-center">

          <div
            className="rounded mb-3 mb-md-0 me-md-3"
            style={{
              width: "80px",
              height: "80px",
              backgroundImage: `url(${cleanImageUrl(image)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
            }}
          ></div>


          <div className="flex-grow-1 text-center text-md-start mb-3 mb-md-0">
            <h3 className="h5 fw-bold text-dark mb-2">{name}</h3>
            <div className="d-flex justify-content-center justify-content-md-start align-items-center text-muted">
              <i
                className="bi bi-geo-alt me-2"
                style={{ fontSize: "14px" }}
              ></i>
              <span>{location}</span>
            </div>
          </div>


          <button
            className="btn btn-link text-dark fw-bold p-0"
            onClick={onViewDetails}
            style={{ textDecoration: "underline" }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-4">
    <h4 className="fw-bold text-dark mb-2">{title}</h4>
    {subtitle && (
      <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
        {subtitle}
      </p>
    )}
  </div>
);

export const DateCard: React.FC<{
  date: string;
  day: string;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: (value: string) => void;
}> = ({ date, day, isSelected, isAvailable, onSelect }) => (
  <div
    className={`card text-center ${
      isSelected ? "border-primary bg-primary text-white" : ""
    } ${!isAvailable ? "opacity-50" : ""}`}
    style={{
      borderRadius: "12px",
      cursor: isAvailable ? "pointer" : "not-allowed",
      minWidth: "80px",
      borderWidth: isSelected ? "2px" : "1px",
    }}
    onClick={isAvailable ? () => onSelect(date) : undefined}
  >
    <div className="card-body p-3">
      <div className="fw-bold" style={{ fontSize: "14px" }}>
        {day}
      </div>
      <div className="fw-bold" style={{ fontSize: "18px" }}>
        {date}
      </div>
    </div>
  </div>
);

export function TimeSlotCard({
  slot,
  isSelected,
  onSelect,
}: {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (value: TimeSlot) => void;
}) {
  return (
    <div
      className={`card ${
        isSelected ? "border-primary bg-primary text-white" : ""
      } ${!slot.available ? "opacity-50" : ""}`}
      style={{
        borderRadius: "12px",
        cursor: slot.available ? "pointer" : "not-allowed",
        borderWidth: isSelected ? "2px" : "1px",
      }}
      onClick={slot.available ? () => onSelect(slot) : undefined}
    >
      <div className="card-body p-3 text-center">
        <div className="fw-bold mb-1">{slot.time}</div>
        <div style={{ fontSize: "14px" }}>₦{slot.price.toLocaleString()}</div>
      </div>
    </div>
  );
}

export const GuestForm: React.FC<{
  guest: Guest;
  index: number;
  onUpdate: (field: keyof Guest, value: string) => void;
  onRemove?: () => void;
  
  canRemove: boolean;
}> = ({ guest, index, onUpdate, onRemove, canRemove }) => (
  <div className="card mb-3" style={{ borderRadius: "12px" }}>
    <div className="card-body p-4">
      <div className="d-flex  justify-content-between align-items-center mb-3">

        <FormField
          label={`Guest ${index + 1}`}
          className="fw-bold text-dark mb-0 me-auto"
        >
          <></>
        </FormField>
        {canRemove && (
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={onRemove}
            style={{ borderRadius: "20px" }}
          >
            <i className="bi bi-trash" />
          </button>
        )}
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <InputField
            placeholder="Full Name"
            value={guest.name}
            onChange={(value) => onUpdate("name", value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={guest.age}
            onChange={(e) => onUpdate("age", e.target.value)}
            style={{ borderRadius: "8px", height: "50px" }}
          >
            <option value="">Select Age Group</option>
            <option value="child">Child (0-12)</option>
            <option value="teen">Teen (13-17)</option>
            <option value="adult">Adult (18+)</option>
            <option value="senior">Senior (65+)</option>
          </select>
        </div>
        <div className="col-12">
          <InputField
            placeholder="Dietary restrictions or allergies (optional)"
            value={guest.dietaryRestrictions}
            onChange={(value) => onUpdate("dietaryRestrictions", value)}
          />
        </div>
      </div>
    </div>
  </div>
);

export const PaymentMethodCard: React.FC<{
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (value: string) => void;
}> = ({ method, isSelected, onSelect }) => (
  <div
    className={`card mb-3 ${isSelected ? "border-primary" : ""}`}
    style={{
      borderRadius: "12px",
      cursor: "pointer",
      borderWidth: isSelected ? "2px" : "1px",
    }}
    onClick={() => onSelect(method.id)}
  >
    <div className="card-body p-4">
      <div className="d-flex align-items-center">
        <i
          className={`bi ${method.icon} me-3 text-primary`}
          style={{ fontSize: "24px" }}
        />
        <div className="flex-grow-1">
          <h6 className="fw-bold text-dark mb-1">{method.name}</h6>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            {method.description}
          </p>
        </div>
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center ${
            isSelected ? "bg-primary text-white" : "border"
          }`}
          style={{ width: "24px", height: "24px" }}
        >
          {isSelected && (
            <i className="bi bi-check" style={{ fontSize: "12px" }} />
          )}
        </div>
      </div>
    </div>
  </div>
);

export const BookingSummary: React.FC<{
  formData: BookingFormData;
}> = ({ formData }) => (
  <div
    className="card mb-4"
    style={{ borderRadius: "16px", backgroundColor: "#f8f9fa" }}
  >
    <div className="card-body p-4">
      <h5 className="fw-bold text-dark mb-4">Booking Summary</h5>

      <div className="mb-3">
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-geo-alt text-primary me-2" />
          <strong>{formData?.place}</strong>
        </div>
        <div className="text-muted small">{formData?.location}</div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-calendar text-primary me-2" />
          <strong>{formData.date || "Date not selected"}</strong>
        </div>
        <div className="text-muted small">
          Time: {formData.timeSlot || "Not selected"}
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-people text-primary me-2" />
          <strong>{formData?.guests || 0} Guest(s)</strong>
        </div>
        {formData.guest?.map((guest: Guest, index: number) => (
          <div key={guest.id} className="text-muted small">
            {index + 1}. {guest.name || "Name not provided"} (
            {guest.age || "Age not specified"})
          </div>
        ))}
      </div>

      {formData.specialRequests && (
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-chat-text text-primary me-2" />
            <strong>Special Requests</strong>
          </div>
          <div className="text-muted small">{formData.specialRequests}</div>
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold">Total Amount</span>
        <span className="fw-bold text-success" style={{ fontSize: "20px" }}>
          ₦{Number(formData?.price || 0).toLocaleString("en-US")}
        </span>
      </div>
    </div>
  </div>
);
