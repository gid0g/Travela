import { useState } from "react";
import OnboardingProcess from "../components/OnboardingProcess";

const Onboarding = () => {
  const finishedOnboarding = localStorage.getItem("finishedOnboarding");

  const [showOnboarding, setShowOnboarding] = useState(
    finishedOnboarding == "true" ? false : true
  );

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("finishedOnboarding", "true");
  };

  return (
    <div className="container-fluid p-0">
      <OnboardingProcess
        onComplete={handleOnboardingComplete}
        isAuth={!showOnboarding}
      />
    </div>
  );
};

export default Onboarding;
