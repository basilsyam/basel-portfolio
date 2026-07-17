import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../../animation/Reveal";
import { smoothEase } from "../../animation/variants";
import useIsMobile from "../../hooks/useIsMobile";
import "./Intro.css";

const titleParts = [
  {
    text: "I turn ideas into",
    highlighted: false,
  },
  {
    text: "fast, responsive and user-friendly",
    highlighted: true,
  },
  {
    text: "digital experiences.",
    highlighted: false,
  },
];

const titleContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.12,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotate: 2,
  },

  visible: {
    opacity: 1,
    y: "0%",
    rotate: 0,

    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const Intro = () => {
  const introRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableParallax = shouldReduceMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"],
  });

  const decorationY = useTransform(
    scrollYProgress,
    [0, 1],
    [-45, 45]
  );

  return (
    <section
      ref={introRef}
      className="intro"
      aria-labelledby="intro-title"
    >
      {/* زخرفة Parallax خفيفة */}
      <motion.div
        className="intro__decoration"
        aria-hidden="true"
        style={{
          y: disableParallax ? 0 : decorationY,
        }}
      />

      <div className="intro__content">
        <Reveal direction="up">
          <p className="intro__eyebrow">
            About me
          </p>
        </Reveal>

        <motion.h2
          id="intro-title"
          className="intro__title"
          aria-label="I turn ideas into fast, responsive and user-friendly digital experiences."
          variants={titleContainerVariants}
          initial={
            shouldReduceMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          {titleParts.map((part) =>
            part.text.split(" ").map((word, index) => (
              <span
                className="intro__word-mask"
                key={`${part.text}-${word}-${index}`}
                aria-hidden="true"
              >
                <motion.span
                  className={`intro__word ${
                    part.highlighted
                      ? "intro__word--highlighted"
                      : ""
                  }`}
                  variants={
                    shouldReduceMotion
                      ? undefined
                      : wordVariants
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))
          )}
        </motion.h2>

        <div className="intro__bottom">
          <Reveal direction="up" delay={0.15}>
            <p className="intro__description">
              I’m Basel Seyam, a Software Engineer and
              Frontend Developer with four years of
              experience building modern web interfaces
              and practical software solutions.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.25}>
            <motion.div
              className="intro__link-wrapper"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 6,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.92,
                      x: 0,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 23,
              }}
            >
              <Link
                to="/about"
                className="intro__link"
                aria-label="More about Basel Seyam"
              >
                <span>More about me</span>

                <motion.span
                  className="intro__link-arrow"
                  aria-hidden="true"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: [0, 4, 0],
                          y: [0, -4, 0],
                        }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }}
                >
                  ↗
                </motion.span>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Intro;
