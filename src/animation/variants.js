export const smoothEase = [0.22, 1, 0.36, 1];
export const motionDuration = {
  fast: 0.3,
  normal: 0.65,
  slow: 0.8,
};

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

export const fadeLeftVariants = {
  hidden: {
    opacity: 0,
    x: -60,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

export const fadeRightVariants = {
  hidden: {
    opacity: 0,
    x: 60,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

export const scaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

export const staggerContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};
