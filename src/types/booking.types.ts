export interface Guest {
  id: string;
  name: string;
  age: string;
  dietaryRestrictions: string;
}

export interface BookingFormData {
  place: string;
  location: string;
  date: string;
  guests: string;
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  timeSlot: string;
  guest: Guest[];
  specialRequests: string;
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  billingName: string;
  price: string;
}

export interface BookingWithId extends BookingFormData {
  id?: string;
}

export interface BookingCardsProps {
  booking: BookingWithId;
}

export interface confirmBookingData {
  bookingData: BookingFormData;
  handleModify: (formData: BookingFormData) => void;
  handleCancel: (formData: BookingFormData) => void;
  handleConfirm: (formData: BookingFormData) => void;
  isLoading: boolean;
  isModify: boolean;
}
export interface ProgressStepProps {
  current: number;
  total: number;
}

export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export interface SelectFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export interface LocationCardProps {
  name: string;
  location: string;
  image: string;
  onViewDetails: () => void;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}
export interface BookingProcessProps {
  onBack: () => void;
  onContinue: () => void;
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: string) => void;
  updateGuest: (id: string, field: keyof Guest, value: string) => void;
  addGuest: () => void;
  removeGuest: (guestId: string) => void;
}
export interface Favorites {
  hotel: {
    id?: string;
    title: string;
    cardPhotos: string[];
    primaryInfo: string| null;
    secondaryInfo: string;
    bubbleRating: {
      rating: number;
      count: string;
    };
    travelTimes: {
      duration: string;
      walkTime: string;
      driveTime: string;
      alternateTime: string;
    };
  };
  id?: string;
}
export interface FavoritesStore {
  favorites: Favorites[] | null;
  setFavorites: (favorites: Favorites[] | null) => void;
  removeFavorites: () => void;
}
