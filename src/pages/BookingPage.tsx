import { useState } from "react";
import {
  Step2DateTimeGuests,
  Step3ReviewPayment,
  Step1Booking,
} from "../components/BookingProcess";
import type {
  BookingFormData,
  Guest,
  BookingWithId,
} from "../types/booking.types";
import { useAttractionStore } from "../store/attraction.store";
import { cleanTitle } from "../utils/helper";
import {
  usePlaceBook,
  useModifyBooking,
  useCancelBooking,
} from "../hooks/useBooking";
import BookingProfilePage from "../components/ConfirmBooking";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const BookingProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = location.state?.booking as BookingWithId | undefined;
  const attraction = useAttractionStore((state) => state?.attraction);
  const isModify = bookingState !== undefined;
  const [formData, setFormData] = useState<BookingWithId>(
    () =>
      bookingState || {
        place: cleanTitle(attraction?.title ?? "") || "Unknown Location",
        location: attraction?.secondaryInfo || "Unknown Location Info",
        date: "",
        guests: "",
        name: "",
        countryCode: "+234",
        phone: "",
        email: "",
        timeSlot: "",
        guest: [],
        specialRequests: "",
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        billingName: "",
        price: "",
      }
  );
  const { mutate: book, isPending } = usePlaceBook();
  const { mutate: modify } = useModifyBooking();
  const { mutate: cancel } = useCancelBooking();
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirm, setIsConfirm] = useState(false);
  const handleBack = () => {
    console.log("Back clicked");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleContinue = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
    if (currentStep === 3) {
      setIsConfirm(true);
    }
  };
  const handleModifyBooking = (formData: any) => {
    modify(formData, {
      onSuccess: () => navigate("/home", { replace: true }),
    });
  };

  const handleCancelBooking = (formData: any) => {
    if (isModify) {
      cancel(formData, {
        onSuccess: () => navigate("/home", { replace: true }),
      });
    } else {
      navigate("/home")
      setFormData({
        place: "",
        location: "",
        date: "",
        guests: "",
        name: "",
        countryCode: "+234",
        phone: "",
        email: "",
        timeSlot: "",
        guest: [],
        specialRequests: "",
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        billingName: "",
        price: "",
      });
      toast.success("Booking Cancelled")
    }
  };

  const handleConfirmBooking = (formData: any) => {
    book(formData, {
      onSuccess: () => navigate("/home", { replace: true }),
    });
  };
  const updateFormData = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const updateGuest = (id: string, field: keyof Guest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      guest: prev.guest.map((g) =>
        g.id === id ? { ...g, [field]: value } : g
      ),
    }));
  };
  const addGuest = () => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: "",
      age: "",
      dietaryRestrictions: "",
    };
    setFormData((prev) => ({ ...prev, guest: [...prev.guest, newGuest] }));
  };

  const removeGuest = (guestId: string) => {
    setFormData((prev) => ({
      ...prev,
      guest: prev.guest.filter((guest) => guest.id !== guestId),
    }));
  };
  return (
    <div>
      {!isConfirm && (
        <>
          {currentStep === 1 && (
            <Step1Booking
              onBack={handleBack}
              onContinue={handleContinue}
              formData={formData}
              updateFormData={updateFormData}
              updateGuest={updateGuest}
              addGuest={addGuest}
              removeGuest={removeGuest}
            />
          )}
          {currentStep === 2 && (
            <Step2DateTimeGuests
              onBack={handleBack}
              onContinue={handleContinue}
              formData={formData}
              updateFormData={updateFormData}
              updateGuest={updateGuest}
              addGuest={addGuest}
              removeGuest={removeGuest}
            />
          )}
          {currentStep === 3 && (
            <Step3ReviewPayment
              onBack={handleBack}
              onContinue={handleContinue}
              formData={formData}
              updateFormData={updateFormData}
              updateGuest={updateGuest}
              addGuest={addGuest}
              removeGuest={removeGuest}
            />
          )}
        </>
      )}
      {isConfirm && (
        <BookingProfilePage
          bookingData={formData}
          handleModify={handleModifyBooking}
          handleCancel={handleCancelBooking}
          handleConfirm={handleConfirmBooking}
          isLoading={isPending}
          isModify={isModify}
        />
      )}
    </div>
  );
};

export default BookingProcess;
