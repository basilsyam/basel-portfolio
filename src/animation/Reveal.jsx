import { motion, useReducedMotion } from "framer-motion";
import {
  fadeLeftVariants,
  fadeRightVariants,
  fadeUpVariants,
  scaleVariants,
} from "./variants";

const revealVariants = {
  up: fadeUpVariants,
  left: fadeLeftVariants,
  right: fadeRightVariants,
  scale: scaleVariants,
};

const Reveal = ({
  children,
  direction = "up",
  className = "",
  delay = 0,
  once = true,
  amount = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const selectedVariants =
    revealVariants[direction] || revealVariants.up;

  const variants = {
    hidden: selectedVariants.hidden,

    visible: {
      ...selectedVariants.visible,

      transition: {
        ...selectedVariants.visible.transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;