import type { Variants } from "framer-motion";

const slideVariants :Variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const iconVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.2,
    },
  },
};

const textVariants : Variants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.4,
    },
  },
};

const buttonVariants: Variants = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.6,
    },
  },
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.98 },
};

const dotVariants :Variants = {
  inactive: {
    scale: 0.8,
    opacity: 0.3,
    backgroundColor: "#6c757d",
  },
  active: {
    scale: 1.2,
    opacity: 1,
    backgroundColor: "#ffc107",
  },
};

export {slideVariants, iconVariants, textVariants, buttonVariants, dotVariants}