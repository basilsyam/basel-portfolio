import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowDownRight } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { smoothEase } from "../../animation/variants";
import useIsMobile from "../../hooks/useIsMobile";
import { useLanguage } from "../../context/LanguageContext";
import "./Hero.css";

const ease = smoothEase;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const locationVariants = {
  hidden: {
    opacity: 0,
    x: -320,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      delay: 0.35,
      ease,
    },
  },
};

const portraitVariants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: {
        duration: 0.8,
      },
      scale: {
        duration: 1.4,
        ease,
      },
    },
  },
};

const splitContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.5,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotate: 4,
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotate: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const SplitText = ({ children }) => {
  const isArabic = /[\u0600-\u06ff]/.test(children);
  const segments = isArabic
    ? children.split(" ").map((word, index, words) =>
        index < words.length - 1 ? `${word}\u00A0` : word,
      )
    : children.split("");

  return (
    <span className="hero__split-line" aria-label={children}>
      {segments.map((letter, index) => (
        <span className="hero__letter-mask" aria-hidden="true" key={index}>
          <motion.span
            className="hero__letter"
            variants={letterVariants}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableParallax = shouldReduceMotion || isMobile;
  const { isRTL, t } = useLanguage();
  const marqueeItems = [
    t("footer.name"),
    t("hero.roleOne"),
    t("hero.roleTwo"),
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // طبقات Parallax بسرعات مختلفة
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const locationY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.78, 1],
    [1, 1, 0.65]
  );

  const smoothPortraitY = useSpring(portraitY, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const smoothContentY = useSpring(contentY, {
    stiffness: 100,
    damping: 26,
  });

  const smoothLocationY = useSpring(locationY, {
    stiffness: 100,
    damping: 26,
  });

  const smoothBackgroundY = useSpring(backgroundY, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <motion.section
      ref={heroRef}
      className="hero"
      aria-labelledby="home-title"
      variants={containerVariants}
      initial={false}
      animate="visible"
      style={{
        opacity: disableParallax ? 1 : heroOpacity,
      }}
    >
      <h1 id="home-title" className="visually-hidden">
        {t("hero.title")}
      </h1>

      {/* طبقة خلفية Parallax */}
      <motion.div
        className="hero__parallax-background"
        aria-hidden="true"
        style={{
          y: disableParallax ? 0 : smoothBackgroundY,
        }}
      />

      {/* الصورة */}
      <motion.div
        className="hero__portrait"
        variants={portraitVariants}
        style={{
          y: disableParallax ? 0 : smoothPortraitY,
        }}
      >
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={`${process.env.PUBLIC_URL}/images/basel-hero-mobile.jpg`}
          />

          <img
            src={`${process.env.PUBLIC_URL}/images/basel-hero.jpg`}
            alt={t("footer.name")}
            width="1672"
            height="941"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      {/* متاح للعمل */}
      <motion.div
        className="hero__availability"
        variants={fadeUpVariants}
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.95,
              }
        }
      >
        <span className="hero__availability-dot" />
        <span>{t("hero.available")}</span>
      </motion.div>

      {/* الموقع */}
      <motion.div
        className="hero__location"
        variants={locationVariants}
        style={{
          y: disableParallax ? 0 : smoothLocationY,
        }}
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.97,
              }
        }
      >
        <div className="hero__location-text">
          <span>{t("hero.located")}</span>
          <span>{t("hero.location")}</span>
        </div>

        <motion.div
          className="hero__globe"
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 8, -8, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <TbWorld />
        </motion.div>
      </motion.div>

      {/* التخصص مع Split Text */}
      <motion.div
        className="hero__role"
        variants={splitContainerVariants}
        style={{
          y: disableParallax ? 0 : smoothContentY,
        }}
      >
        <motion.div variants={fadeUpVariants}>
          <HiOutlineArrowDownRight
            className="hero__arrow"
            aria-hidden="true"
          />
        </motion.div>

        <motion.p variants={splitContainerVariants}>
          <SplitText>{t("hero.roleOne")}</SplitText>
          <SplitText>{t("hero.roleTwo")}</SplitText>
        </motion.p>
      </motion.div>

      <motion.div
        className="hero__name-wrapper"
        variants={fadeUpVariants}
      >
        <div className="hero__name-track">
          {Array.from({ length: 4 }, (_, groupIndex) => (
            <div
              className="hero__name-group"
              aria-hidden={groupIndex > 0 ? "true" : undefined}
              key={groupIndex}
            >
              {marqueeItems.map((item) => (
                <span
                  className="hero__name"
                  dir={isRTL ? "rtl" : "ltr"}
                  key={item}
                >
                  — {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* زر المشاريع: Hover للكمبيوتر وTap للجوال */}
      <motion.div
        className="hero__projects-button"
        variants={fadeUpVariants}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.07,
                rotate: isRTL ? 4 : -4,
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.9,
                rotate: 0,
              }
        }
      >
        <Link
          to="/projects"
          className="hero__projects-link"
          aria-label={t("hero.viewProjects")}
        >
          <span>{t("hero.viewMy")}</span>
          <span>{t("hero.work")}</span>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
