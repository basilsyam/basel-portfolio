import { useEffect, useState } from "react";
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
    scaleY: [1, 1, 0],
    transformOrigin: "top",
    transition: {
      duration: 0.82,
      times: [0, 0.34, 1],
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
    opacity: [1, 1, 0],
    y: [0, 0, -8],
    transition: {
      duration: 0.72,
      times: [0, 0.58, 1],
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

  useEffect(() => {
    if (isTransitionComplete) return undefined;

    const safetyTimer = window.setTimeout(() => {
      setIsTransitionComplete(true);
    }, 1400);

    return () => window.clearTimeout(safetyTimer);
  }, [isTransitionComplete]);

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
