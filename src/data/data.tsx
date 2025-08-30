import type { OnboardingStep } from "../types/onBoarding.types";
import onboarding_1 from "../images/onboarding_1.jpg";
import onboarding_2 from "../images/onboarding_2.jpg";
import onboarding_3 from "../images/onboarding_3.jpg";
import type { FormField } from "../types/auth.types";
import { Home,BedDouble, Coffee } from "lucide-react";
import type {  LuxuryService } from "../types/result.types";

const defaultSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Discover Attractions",
    subtitle:
      "Browse through top-rated attractions, hidden gems, and must-see spots curated just for you.",
    icon: onboarding_1,
    bgColor: "linear-gradient(135deg, #c5e8f7 0%, #d6f0ff 100%)",
  },
  {
    id: 2,
    title: "Easy Bookings",
    subtitle:
      "Reserve your spot at your favorite attractions in just a few taps; hassle-free and seamless.",
    icon: onboarding_2,
    bgColor: "linear-gradient(135deg, #c5f7d8 0%, #d5ffea 100%)",
  },
  {
    id: 3,
    title: "Enjoy Your Experience",
    subtitle:
      "Get ready for unforgettable moments; relax, explore, and let us handle the details.",
    icon: onboarding_3,
    bgColor: "linear-gradient(135deg, #f7e5c5 0%, #fff0d5 100%)",
  },
];

const loginFields: FormField[] = [
  {
    name: "username",
    label: "username",
    type: "text",
    placeholder: "Enter your username or email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    icon: "🔒",
  },
];

const signupFields: FormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
    icon: "👤",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    icon: "📧",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    required: true,
    icon: "🔒",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    icon: "🔒",
  },
];



export { defaultSteps, signupFields, loginFields };



export const luxuryServices: LuxuryService[] = [
  { Icon: Home, label: "Food" },
  { Icon: BedDouble, label: "Rooms" },
  { Icon: Coffee, label: "Coffee" },
];
