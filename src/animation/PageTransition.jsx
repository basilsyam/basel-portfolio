import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEase } from "./variants";
import "./PageTransition.css";

const curtainEase = [0.77, 0, 0.18, 1];

const contentVariants = {
  initial: {
    opacity: 1,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: smoothEase,
    },
  },
};

const curtainVariants = {
  initial: {
    scaleY: 1,
    transformOrigin: "top",
    pointerEvents: "none",
  },
  enter: {
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.46,
      delay: 0.06,
      ease: curtainEase,
    },
    transitionEnd: {
      pointerEvents: "none",
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
      duration: 0.16,
      delay: 0.44,
      ease: smoothEase,
    },
  },
};

const PageTransition = ({
  children,
  isInitialLoad = false,
  pageLabel,
  pageNumber,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isTransitionComplete, setIsTransitionComplete] = useState(
    isInitialLoad
  );

  if (shouldReduceMotion) {
    return <main className="page-transition__content">{children}</main>;
  }

  return (
    <>
      <motion.main
        className="page-transition__content"
        variants={contentVariants}
        initial={isInitialLoad ? false : "initial"}
        animate="enter"
      >
        {children}
      </motion.main>

      {!isTransitionComplete && (
        <>
          <motion.div
            className="page-transition__curtain"
            aria-hidden="true"
            variants={curtainVariants}
            initial="initial"
            animate="enter"
          />

          <motion.div
            className="page-transition__label"
            aria-hidden="true"
            variants={labelVariants}
            initial="initial"
            animate="enter"
            onAnimationComplete={() => setIsTransitionComplete(true)}
          >
            <span className="page-transition__mark">B</span>
            <span className="page-transition__name">{pageLabel}</span>
            <span className="page-transition__number">{pageNumber} / 05</span>
          </motion.div>
        </>
      )}
    </>
  );
};

export default PageTransition;
