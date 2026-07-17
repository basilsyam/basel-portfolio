import { motion, useReducedMotion } from "framer-motion";
import { smoothEase } from "./variants";
import "./PageTransition.css";

const curtainEase = [0.77, 0, 0.18, 1];

const contentVariants = {
  initial: {
    opacity: 0,
    y: 14,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.2,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0.96,
    y: -6,
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const curtainVariants = {
  initial: {
    scaleY: 1,
    transformOrigin: "top",
    pointerEvents: "auto",
  },
  enter: {
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.58,
      delay: 0.04,
      ease: curtainEase,
    },
    transitionEnd: {
      pointerEvents: "none",
    },
  },
  exit: {
    scaleY: 1,
    transformOrigin: "bottom",
    pointerEvents: "auto",
    transition: {
      duration: 0.5,
      ease: curtainEase,
    },
  },
};

const labelVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  enter: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      delay: 0.4,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.16,
      delay: 0.28,
      ease: smoothEase,
    },
  },
};

const PageTransition = ({ children, pageLabel, pageNumber }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <main className="page-transition__content">{children}</main>;
  }

  return (
    <>
      <motion.main
        className="page-transition__content"
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.main>

      <motion.div
        className="page-transition__curtain"
        aria-hidden="true"
        variants={curtainVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />

      <motion.div
        className="page-transition__label"
        aria-hidden="true"
        variants={labelVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <span className="page-transition__mark">B</span>
        <span className="page-transition__name">{pageLabel}</span>
        <span className="page-transition__number">{pageNumber} / 05</span>
      </motion.div>
    </>
  );
};

export default PageTransition;
