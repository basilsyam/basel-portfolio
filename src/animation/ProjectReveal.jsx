import { motion, useReducedMotion } from "framer-motion";
import { smoothEase } from "./variants";

const imageVariants = {
  hidden: {
    opacity: 1,
    scale: 1,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1.1,
      ease: smoothEase,
    },
  },
};

const coverVariants = {
  hidden: {
    scaleY: 1,
  },

  visible: {
    scaleY: 0,

    transition: {
      duration: 1,
      delay: 0.2,
      ease: smoothEase,
    },
  },
};

const ProjectReveal = ({
  children,
  className = "",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`project-reveal ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`project-reveal ${className}`}
      initial={false}
      whileInView="visible"
      viewport={{
        once,
        amount: 0.2,
      }}
    >
      <motion.div
        className="project-reveal__content"
        variants={imageVariants}
      >
        {children}
      </motion.div>

      <motion.div
        className="project-reveal__cover"
        variants={coverVariants}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default ProjectReveal;
