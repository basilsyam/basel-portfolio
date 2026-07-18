import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  profile,
  calculateAge,
  calculateExperienceYears,
} from "../data/profile";
import {
  FaBriefcase,
  FaCakeCandles,
  FaFolderOpen,
  FaLanguage,
  FaLaptopCode,
  FaLocationDot,
} from "react-icons/fa6";
import ContactCTA from "../components/ContactCTA/ContactCTA";
import OptimizedImage from "../components/common/OptimizedImage";
import TechnicalText from "../components/common/TechnicalText";
import BidiText from "../components/common/BidiText";
import useIsMobile from "../hooks/useIsMobile";
import { useLanguage } from "../context/LanguageContext";
import { skillIcons } from "../config/contentIcons";

import SplitText from "../animation/SplitText";
import { smoothEase } from "../animation/variants";
import { scrollToSection } from "../utils/scroll";
import "./About.css";

const sectionVariants = {
  hidden: {
    opacity: 1,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 1,
    y: 55,
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

const cardVariants = {
  hidden: {
    opacity: 1,
    y: 40,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

const viewportOptions = {
  once: true,
  amount: 0.15,
};

const About = () => {
  const storyRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableParallax = shouldReduceMotion || isMobile;
  const age = calculateAge(profile.birthDate);
  const experienceYears = calculateExperienceYears(
    profile.experience.startDate,
  );
  const { isRTL, t } = useLanguage();
  const titleParts = t("about.titleParts");
  const cvParts = t("about.cvParts");
  const certificates = [
    {
      provider: t("about.certificateOneProvider"),
      title: t("about.certificateOneTitle"),
      description: t("about.certificateOneDescription"),
      icon: FaLanguage,
    },
    {
      provider: t("about.certificateTwoProvider"),
      title: t("about.certificateTwoTitle"),
      description: t("about.certificateTwoDescription"),
      icon: FaLaptopCode,
    },
  ];
  const languageItems = [
    { name: t("about.arabic"), level: t("about.native") },
    { name: t("about.english"), level: t("about.advanced") },
  ];
  const availabilityItems = [
    t("about.freelance"),
    t("about.remoteWork"),
    t("about.internships"),
    t("about.fullTime"),
  ];

  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const storyImageY = useTransform(
    storyScrollProgress,
    [0, 1],
    [-25, 25]
  );

  const profileCards = [
    {
      number: "01",
      label: t("about.age"),
      value: t("about.yearsOld", { age }),
      description: t("about.autoUpdated"),
      yellow: true,
      icon: FaCakeCandles,
    },
    {
      number: "02",
      label: t("about.location"),
      value: t("hero.location"),
      description: t("about.remote"),
      yellow: false,
      icon: FaLocationDot,
    },
    {
      number: "03",
      label: t("about.experience"),
      value: t("about.yearsExperience", {
        years: experienceYears,
      }),
      description: t("about.frontendDevelopment"),
      yellow: false,
      icon: FaBriefcase,
    },
    {
      number: "04",
      label: t("about.projects"),
      value: t("about.projectsCount", {
        projects: profile.experience.projects,
      }),
      description: t("about.websitesSystems"),
      yellow: true,
      icon: FaFolderOpen,
    },
  ];

  return (
    <div className="about-page">
      <motion.section
        className="about-hero"
        aria-labelledby="about-title"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="about-container">
          <motion.p className="about-section-label" variants={itemVariants}>
            {t("about.eyebrow")}
          </motion.p>

          <motion.h1
            id="about-title"
            className="about-hero__title"
            variants={itemVariants}
            aria-label={t("about.title")}
          >
            <span className="about-title-line about-title-line--dark">
              <SplitText text={titleParts[0]} />
            </span>

            <span className="about-title-line">
              <SplitText text={titleParts[1]} />
            </span>
          </motion.h1>

          <motion.div className="about-hero__bottom" variants={itemVariants}>
            <BidiText as="p">{t("about.subtitle")}</BidiText>

            <motion.button
              type="button"
              className="about-scroll-button"
              aria-label={t("about.scrollStory")}
              onClick={() => scrollToSection("story", shouldReduceMotion)}
              whileHover={
                shouldReduceMotion ? undefined : { y: 7 }
              }
              whileTap={
                shouldReduceMotion ? undefined : { scale: 0.84, y: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
            >
              ↓
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={storyRef}
        className="about-story"
        id="story"
        aria-labelledby="story-title"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-story__grid">
          <motion.div
            className="about-story__image"
            variants={itemVariants}
            style={{ y: disableParallax ? 0 : storyImageY }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.015, rotate: isRTL ? 1 : -1 }
            }
            whileTap={
              shouldReduceMotion ? undefined : { scale: 0.97, rotate: 0 }
            }
            transition={{
              duration: 0.35,
            }}
          >
            <div className="about-story__placeholder">
              <OptimizedImage
                src={`${process.env.PUBLIC_URL}/images/basel-hero.jpg`}
                alt={t("footer.name")}
                width="1672"
                height="941"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div className="about-story__content" variants={itemVariants}>
            <p className="about-section-label">{t("about.storyLabel")}</p>

            <h2
              id="story-title"
              aria-label={t("about.storyTitle")}
            >
              <SplitText text={t("about.storyTitle")} />
            </h2>

            <div className="about-story__description">
              <BidiText as="p">
                {t("about.storyP1", {
                  name: t("footer.name"),
                  years: experienceYears,
                })}
              </BidiText>
              <p>
                {t("about.storyP2", {
                  projects: profile.experience.projects,
                })}
              </p>
              <p>{t("about.storyP3")}</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="about-information"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-container">
          <motion.div className="about-heading" variants={itemVariants}>
            <p className="about-section-label">{t("about.profile")}</p>
            <h2>{t("about.profileTitle")}</h2>
          </motion.div>

          <div className="about-information__grid">
            {profileCards.map((card) => {
              const CardIcon = card.icon;

              return (
                <motion.article
                  className={`about-info-card ${
                    card.yellow ? "about-info-card--yellow" : ""
                  }`}
                  key={card.number}
                  variants={cardVariants}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -12,
                          rotate:
                            (card.yellow ? -1 : 1) *
                            (isRTL ? -1 : 1),
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.96, y: 0, rotate: 0 }
                  }
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <div className="about-info-card__top">
                    <span className="about-info-card__number">
                      {card.number}
                    </span>
                    <motion.span
                      className="about-info-card__icon"
                      aria-hidden="true"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: 1.08,
                              rotate: isRTL ? -6 : 6,
                            }
                      }
                    >
                      <CardIcon />
                    </motion.span>
                  </div>

                  <div className="about-info-card__content">
                    <p>{card.label}</p>
                    <strong>{card.value}</strong>
                    <small>{card.description}</small>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-education"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-container">
          <motion.div className="about-heading" variants={itemVariants}>
            <p className="about-section-label">{t("about.education")}</p>

            <h2>
              {t("about.educationTitle")}
            </h2>
          </motion.div>

          <motion.article
            className="education-card"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { x: 12 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98, x: 0 }}
          >
            <div className="education-card__year">
              <span>{t("about.graduation")}</span>
              <TechnicalText as="strong">
                {profile.education.graduationYear}
              </TechnicalText>
            </div>

            <div className="education-card__content">
              <p>{t("about.university")}</p>
              <h3>{t("about.major")}</h3>
              <span>{t("about.degree")}</span>
            </div>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        className="about-certificates"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-container">
          <motion.div className="about-heading" variants={itemVariants}>
            <p className="about-section-label">{t("about.certificates")}</p>
            <h2>{t("about.certificatesTitle")}</h2>
          </motion.div>

          <div className="certificate-grid">
            {certificates.map((certificate, index) => {
              const CertificateIcon = certificate.icon;

              return (
                <motion.article
                  className="certificate-card"
                  key={certificate.title}
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -10 }}
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.96, y: 0 }
                  }
                >
                  <div className="certificate-card__top">
                    <span className="certificate-card__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="certificate-card__icon"
                      aria-hidden="true"
                    >
                      <CertificateIcon />
                    </span>
                  </div>

                  <div>
                    <p>{certificate.provider}</p>
                    <h3>{certificate.title}</h3>
                    <span>{certificate.description}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-container">
          <motion.div className="about-heading" variants={itemVariants}>
            <p className="about-section-label">{t("about.skills")}</p>
            <h2>{t("about.skillsTitle")}</h2>
          </motion.div>

          <div className="about-skills__grid">
            {profile.skills.map((skill, index) => {
              const SkillIcon = skillIcons[skill];

              return (
                <motion.article
                  className="skill-box"
                  key={skill}
                  variants={cardVariants}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -8,
                          scale: 1.03,
                          rotate: index % 2 === 0 ? -1 : 1,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.94, y: 0, rotate: 0 }
                  }
                >
                  <div className="skill-box__top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="skill-box__icon" aria-hidden="true">
                      <SkillIcon />
                    </span>
                  </div>
                  <TechnicalText as="h3">{skill}</TechnicalText>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-extra"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-extra__grid">
          <motion.div className="about-extra__column" variants={itemVariants}>
            <p className="about-section-label">{t("about.languages")}</p>

            {languageItems.map((language) => (
              <motion.div
                className="about-extra__row"
                key={language.name}
                whileHover={shouldReduceMotion ? undefined : { x: 8 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98, x: 0 }}
              >
                <strong>{language.name}</strong>
                <span>{language.level}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="about-extra__column" variants={itemVariants}>
            <p className="about-section-label">{t("about.availableFor")}</p>

            {availabilityItems.map((item) => (
              <motion.div
                className="about-extra__row"
                key={item}
                whileHover={shouldReduceMotion ? undefined : { x: 8 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98, x: 0 }}
              >
                <strong>{item}</strong>

                <span className="availability-status">
                  <i />
                  {t("about.available")}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="about-cv"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-container">
          <motion.div className="about-cv__content" variants={itemVariants}>
            <p className="about-section-label">{t("about.cv")}</p>

            <h2>
              {cvParts[0]}
              <br />
              {cvParts[1]}
            </h2>

            <div className="about-cv__actions">
              <button
                type="button"
                className="about-cv__button about-cv__button--disabled"
                disabled
                title={t("common.comingSoon")}
              >
                <span>{t("about.downloadCv")}</span>
                <small>{t("common.comingSoon")}</small>
              </button>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92, y: 0 }}
              >
                <Link to="/contact" className="about-cv__link">
                  {t("common.contactMe")} ↗
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <ContactCTA />

    </div>
  );
};

export default About;
