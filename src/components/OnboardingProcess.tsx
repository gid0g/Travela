import { useState } from "react";
import type { OnboardingProps } from "../types/onBoarding.types";
import { defaultSteps } from "../data/data";
import { motion, AnimatePresence } from "framer-motion";
import AuthApp from "./AuthProcess";
import { useNavigate } from "react-router";
import { useLoginUser, useSignUpUser } from "../hooks/useUser";
import {
  dotVariants,
  buttonVariants,
  iconVariants,
  textVariants,
} from "../animation/onboarding.animation";
export default function OnboardingProcess({
  steps = defaultSteps,
  onComplete,
  isAuth,
}: OnboardingProps) {
  const size = isAuth ? "520px" : "430px";
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const isFirstStep = currentStep == 0;
  const { mutate: login, isPending: loginLoading } = useLoginUser();
  const { mutate: signup, isPending: signupLoading } = useSignUpUser();
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };
  const handleExplore = () => {
    navigate("/home");
  };
  const handleAuth = (data: any, isLogin: boolean) => {
    if (isLogin) {
      login(data);
    } else {
      signup(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep == 0) {
      return;
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleSkip = () => {
    onComplete?.();
  };

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  return (
    <div
      className=" min-vh-100 position-relative overflow-hidden"
      style={{
        transition: "background 0.3s ease-in-out",
      }}
    >
      <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
        <div className="row g-0" style={{ minHeight: "100vh" }}>
          <motion.div
            className="col-6 d-none d-lg-flex align-items-center justify-content-center"
            style={{
              background: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              className="position-absolute"
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                top: "10%",
                right: "-10%",
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={iconVariants}
                initial="initial"
                animate="animate"
                className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg"
                style={{
                  width: size,
                  height: size,
                  background: "white",
                  zIndex: 2,
                }}
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "450px",
                    height: "450px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
              background: step.bgColor,
              minHeight: "100vh",
              padding: "2rem 1rem",
            }}
            animate={{ background: step.bgColor }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="d-lg-none mb-4"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              key={`mobile-${currentStep}`}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg bg-white"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="img-fluid rounded-circle"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentStep}`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                className="text-center mb-4 px-3"
              >
                {!isAuth && (
                  <>
                    <motion.h1
                      className="display-4 display-lg-1 fw-bold text-dark-50 mb-3 sora"
                      style={{
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        fontSize: "clamp(2.5rem, 5vw, 5rem)",
                      }}
                    >
                      {step.title}
                    </motion.h1>
                    <motion.p
                      className="lead text-dark-50 fs-6 fs-lg-5 lh-base px-2 sora"
                      style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                      }}
                    >
                      {step.subtitle}
                    </motion.p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="d-flex justify-content-center mb-5"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
            >
              {!isAuth &&
                steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className="rounded-circle mx-2 cursor-pointer"
                    style={{
                      width: "12px",
                      height: "12px",
                      cursor: "pointer",
                    }}
                    variants={dotVariants}
                    animate={index === currentStep ? "active" : "inactive"}
                    onClick={() => setCurrentStep(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
            </motion.div>

            <motion.div
              className="container-fluid "
              style={{ maxWidth: "500px" }}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
            >
              <div className="row">
                {!isFirstStep && !isAuth && !isLastStep && (
                  <div className={isLastStep ? "col-6" : "col-4"}>
                    <motion.button
                      className="btn btn-outline-dark w-100 py-2 py-lg-3 fs-6 fw-medium"
                      onClick={handlePrevious}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        background: "rgba(12, 6, 6, 0.1)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                      }}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Previous
                    </motion.button>
                  </div>
                )}

                {!isLastStep && !isAuth && (
                  <div className={isFirstStep ? "col-6" : "col-4"}>
                    <motion.button
                      className="btn btn-outline-dark w-100 py-2 py-lg-3 fs-6 fw-medium"
                      onClick={handleSkip}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        background: "rgba(36, 9, 9, 0.1)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                      }}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Skip
                    </motion.button>
                  </div>
                )}

                {!isAuth && !isLastStep && (
                  <div
                    className={
                      isLastStep ? "col-6" : isFirstStep ? "col-6" : "col-4"
                    }
                  >
                    <motion.button
                      className="btn btn-dark w-100 py-2 py-lg-3 fs-6 fw-medium"
                      onClick={handleNext}
                      style={{
                        borderRadius: "12px",
                        background: "white",
                        border: "none",
                        color: "#2d3436",
                        fontWeight: "600",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      }}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Next{" "}
                    </motion.button>
                  </div>
                )}
                {!isAuth && isLastStep && (
                  <>
                    <div className="col-6">
                      <motion.button
                        className="btn btn-outline-dark w-100 py-2 py-lg-3 fs-6 fw-medium"
                        onClick={handleNext}
                        style={{
                          borderRadius: "12px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          background: "rgba(0, 0, 0, 1)",
                          backdropFilter: "blur(10px)",
                          color: "white",
                        }}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Login
                      </motion.button>
                    </div>
                    <div className="col-6">
                      <motion.button
                        className="btn btn-outline-dark w-100 py-2 py-lg-3 fs-6 fw-medium text_dark"
                        onClick={handleExplore}
                        style={{
                          borderRadius: "12px",
                          border: "2px solid rgba(0, 0, 0, 1)",
                          background: "rgba(255, 255, 255, 1)",
                          backdropFilter: "blur(10px)",
                          color: "black",
                        }}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Explore
                      </motion.button>
                    </div>
                  </>
                )}

                {isAuth && (
                  <AuthApp
                    onNext={handleAuth}
                    isLoading={signupLoading || loginLoading}
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              className="position-absolute d-lg-none"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                top: "5%",
                right: "-15%",
                zIndex: 0,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
