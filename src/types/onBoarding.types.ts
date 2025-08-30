interface OnboardingStep {
  id: number;
  title?: string;
  subtitle?: string;
  icon: string;
  bgColor: string;
}

interface OnboardingProps {
  steps?: OnboardingStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  isAuth?: boolean;
}

export type { OnboardingStep, OnboardingProps };