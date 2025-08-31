import { useState, useEffect } from "react";
import type {
  PaymentMethod,
  BookingProcessProps,
  TimeSlot,
} from "../types/booking.types";
import { BackButton } from "./Booking";
import { useNavigate } from "react-router";
import {
  ProgressBar,
  SectionTitle,
  FormField,
  SelectField,
  InputField,
  LocationCard,
  DateCard,
  TimeSlotCard,
  GuestForm,
  BookingSummary,
  PaymentMethodCard,
} from "./Forms";
import {
  formatCardNumber,
  formatExpiryDate,
  formatDateForCard,
  validateEmail,
  generateTimeSlots,
  formatPhone,
} from "../utils/helper";
import { ActionButtons } from "./Booking";
import { useAttractionStore } from "../store/attraction.store";
import { guestOptions, countryCodeOptions } from "../lib/constants";

function Step1Booking({
  onBack,
  onContinue,
  formData,
  updateFormData,
}: BookingProcessProps) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");
  const attraction = useAttractionStore((state) => state?.attraction);
  const handleViewDetails = () => {
    navigate("/results");
    console.log("View details clicked");
  };
  const today = new Date().toISOString().split("T")[0];
  const canContinue =
    formData.date &&
    formData.guests &&
    formData.name &&
    formData.phone &&
    formData.email &&
    !emailError;

  const onValidate = (value: string) => {
    updateFormData("email", value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };
  return (
    <>
      <div className="min-vh-100 bg-white">
        <div className="container-fluid px-4 py-2">
          <BackButton addClass="dark d-none d-md-flex position-relative start-0" />
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <ProgressBar current={1} total={3} />

              <div className="text-center mb-5">
                <SectionTitle
                  title="Booking Form"
                  subtitle="Please fill the required identity and detail booking below"
                />
              </div>

              <LocationCard
                name={formData?.place || "Yankari Game Reserve"}
                location={formData?.location || "Bauchi, Nigeria"}
                image={attraction?.cardPhotos?.[0] || ""}
                onViewDetails={handleViewDetails}
              />

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <FormField label="Date" className="mb-4">
                    <input
                      type="date"
                      className="form-control py-3"
                      value={formData.date}
                      onChange={(e) => updateFormData("date", e.target.value)}
                      style={{ borderRadius: "8px" }}
                      min={today}
                    />
                  </FormField>
                </div>
                <div className="col-md-6">
                  <FormField label="Guests" className="mb-4">
                    <SelectField
                      placeholder="Number of Guests"
                      value={formData.guests}
                      onChange={(value) => updateFormData("guests", value)}
                      icon="bi-people"
                      options={guestOptions}
                    />
                  </FormField>
                </div>
              </div>

              <FormField label="Name" className="mb-4">
                <InputField
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={(value) => updateFormData("name", value)}
                />
              </FormField>

              <FormField label="Phone Number" className="mb-4">
                <div className="row g-2">
                  <div className="col-4">
                    <SelectField
                      placeholder="+234"
                      value={formData.countryCode}
                      onChange={(value) => updateFormData("countryCode", value)}
                      options={countryCodeOptions}
                    />
                  </div>
                  <div className="col-8">
                    <InputField
                      placeholder="Enter Phone Number"
                      value={formatPhone(formData.phone)}
                      onChange={(value) =>
                        updateFormData("phone", formatPhone(value))
                      }
                      type="tel"
                    />
                  </div>
                </div>
              </FormField>

              <FormField label="Email" className="mb-4">
                <InputField
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(value) => onValidate(value)}
                  type="email"
                />
                {emailError && <p className="text-danger mt-1">{emailError}</p>}
              </FormField>

              <ActionButtons
                disabled={true}
                onBack={() => onBack()}
                onContinue={() => onContinue()}
                canContinue={!!canContinue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Step2DateTimeGuests({
  onBack,
  onContinue,
  formData,
  updateFormData,
  updateGuest,
  addGuest,
  removeGuest,
}: BookingProcessProps) {
  const [timeSlots] = useState<TimeSlot[]>(() =>
    generateTimeSlots(formData?.timeSlot)
  );

  const canContinue = Boolean(
    formData?.date &&
      formData?.timeSlot &&
      formData?.guest?.every((guests) => guests?.name && guests?.age)
  );
  useEffect(() => {
    if (formData?.timeSlot) {
      const selected = timeSlots.find(
        (slot) => slot.time === formData.timeSlot
      );
      if (selected && selected.price.toString() !== formData.price) {
        updateFormData("price", selected.price.toString());
      }
    }
  }, [timeSlots, formData?.timeSlot]);

  return (
    <>
      <div className="min-vh-100 bg-white">
        <div className="container-fluid px-4 py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <ProgressBar current={2} total={3} />

              <div className="text-center mb-5">
                <h1 className="display-6 fw-bold text-dark mb-3">
                  Select Time
                </h1>
                <p className="text-muted lead">
                  Choose your preferred time and provide guest details
                </p>
              </div>

              <SectionTitle
                title="Select Date"
                subtitle="Choose an available date for your visit"
              />
              <div className="d-flex gap-2 mb-5 overflow-auto pb-2">
                {formData.date && (
                  <DateCard
                    date={formatDateForCard(formData.date).date}
                    day={formatDateForCard(formData.date).day}
                    isSelected={true}
                    isAvailable={true}
                    onSelect={(value) => updateFormData("date", value)}
                  />
                )}
              </div>

              {formData?.date && (
                <>
                  <SectionTitle
                    title="Select Time"
                    subtitle="Choose your preferred time slot"
                  />
                  <div className="row g-3 mb-5">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="col-6 col-md-3">
                        <TimeSlotCard
                          key={slot.id}
                          slot={slot}
                          isSelected={formData?.timeSlot === slot.time}
                          onSelect={(value) => {
                            updateFormData("timeSlot", value?.time);
                            updateFormData("price", value?.price.toString());
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {formData?.timeSlot && (
                <>
                  <SectionTitle
                    title="Guest Details"
                    subtitle="Provide information for all guests visiting the reserve"
                  />

                  {formData?.guest?.map((guest, index) => (
                    <GuestForm
                      key={guest.id}
                      guest={guest}
                      index={index}
                      onUpdate={(field, value) =>
                        updateGuest(guest.id, field, value)
                      }
                      onRemove={() => removeGuest(guest.id)}
                      canRemove={(formData?.guest?.length || 0) >= 1}
                    />
                  ))}

                  <button
                    className="btn btn-outline-primary mb-4 w-100"
                    onClick={addGuest}
                    disabled={
                      Number(formData?.guests) >= formData?.guest.length
                    }
                    style={{ borderRadius: "25px", height: "50px" }}
                  >
                    <i className="bi bi-plus-circle me-2" />
                    Add Another Guest
                  </button>

                  <SectionTitle
                    title="Special Requests"
                    subtitle="Any special needs or requests (optional)"
                  />
                  <textarea
                    className="form-control mb-4"
                    rows={3}
                    placeholder="Wheelchair access, dietary requirements, special occasions, etc."
                    value={formData?.specialRequests || ""}
                    onChange={(e) =>
                      updateFormData("specialRequests", e.target.value)
                    }
                    style={{ borderRadius: "12px" }}
                  />
                </>
              )}

              <ActionButtons
                disabled={false}
                onBack={() => onBack()}
                onContinue={() => onContinue()}
                canContinue={canContinue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Step3ReviewPayment({
  onBack,
  onContinue,
  formData,
  updateFormData,
}: BookingProcessProps) {
  const { billingName, paymentMethod, cardNumber, expiryDate } = formData;
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [cvv, setCvv] = useState("");
  const paymentMethods: PaymentMethod[] = [
    {
      id: "Credit/Debit Card",
      name: "Credit/Debit Card",
      icon: "bi-credit-card",
      description: "Pay securely with your card",
    },
    {
      id: "Bank Transfer",
      name: "Bank Transfer",
      icon: "bi-bank",
      description: "Transfer directly from your bank account",
    },
    {
      id: "Paystack",
      name: "Paystack",
      icon: "bi-wallet2",
      description: "Quick payment with Paystack",
    },
  ];

  const canComplete = Boolean(
    paymentMethod &&
      (paymentMethod !== "card" || (cardNumber && expiryDate && cvv)) &&
      billingName &&
      termsAccepted
  );

  return (
    <>
      <div className="min-vh-100 bg-white">
        <div className="container-fluid px-4 py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <ProgressBar current={3} total={3} />

              <div className="text-center mb-5">
                <h1 className="display-6 fw-bold text-dark mb-3">
                  Review & Payment
                </h1>
                <p className="text-muted lead">
                  Review your booking details and complete payment
                </p>
              </div>

              <BookingSummary formData={formData} />

              <SectionTitle
                title="Payment Method"
                subtitle="Choose how you'd like to pay"
              />
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={paymentMethod === method.name}
                  onSelect={(value) => updateFormData("paymentMethod", value)}
                />
              ))}

              {paymentMethod === "Credit/Debit Card" && (
                <>
                  <SectionTitle title="Card Details" />
                  <div className="card mb-4" style={{ borderRadius: "12px" }}>
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="1234 5678 9012 3456"
                          value={formatCardNumber(cardNumber)}
                          onChange={(e) =>
                            updateFormData(
                              "cardNumber",
                              formatCardNumber(e.target.value)
                            )
                          }
                          style={{ borderRadius: "8px" }}
                          maxLength={19}
                        />
                      </div>
                      <div className="row g-3">
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="MM/YY"
                            value={formatExpiryDate(expiryDate)}
                            onChange={(e) =>
                              updateFormData(
                                "expiryDate",
                                formatExpiryDate(e.target.value)
                              )
                            }
                            style={{ borderRadius: "8px" }}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            style={{ borderRadius: "8px" }}
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {paymentMethod && (
                <>
                  <SectionTitle title="Billing Information" />
                  <input
                    type="text"
                    className="form-control form-control-lg mb-4"
                    placeholder="Full Name as on Card/Account"
                    value={billingName}
                    onChange={(e) =>
                      updateFormData("billingName", e.target.value)
                    }
                    style={{ borderRadius: "12px", height: "60px" }}
                  />
                </>
              )}

              <div
                className="card mb-4"
                style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}
              >
                <div className="card-body p-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ transform: "scale(1.3)" }}
                    />
                    <label className="form-check-label ms-3 text-muted">
                      I agree to the{" "}
                      <a href="#" className="text-primary fw-bold">
                        Terms and Conditions
                      </a>
                      ,
                      <a href="#" className="text-primary fw-bold">
                        {" "}
                        Privacy Policy
                      </a>
                      , and
                      <a href="#" className="text-primary fw-bold">
                        {" "}
                        Cancellation Policy
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <ActionButtons
                disabled={false}
                onBack={() => onBack()}
                onContinue={() => onContinue()}
                canContinue={canComplete}
                continueText="Confirm & Pay"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Step2DateTimeGuests, Step3ReviewPayment, Step1Booking };
