import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { smoothEase } from "./variants";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotate: 3,
  },

  visible: {
    opacity: 1,
    y: "0%",
    rotate: 0,

    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

const SplitText = ({
  text,
  className = "",
  once = true,
  amount = 0.5,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={`split-text ${className}`}
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
    >
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="split-text__word" aria-hidden="true">
            {word.split("").map((letter, letterIndex) => (
              <span
                className="split-text__mask"
                key={`${letter}-${wordIndex}-${letterIndex}`}
              >
                <motion.span
                  className="split-text__letter"
                  variants={letterVariants}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>

          {wordIndex < words.length - 1 && (
            <span className="split-text__space" aria-hidden="true">
              &nbsp;
            </span>
          )}
        </Fragment>
      ))}
    </motion.span>
  );
};

export default SplitText;
