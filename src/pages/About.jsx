import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { profile, calculateAge } from "../data/profile";
import ContactCTA from "../components/ContactCTA/ContactCTA";
import OptimizedImage from "../components/common/OptimizedImage";

import SplitText from "../animation/SplitText";
import { smoothEase } from "../animation/variants";
import "./About.css";

const sectionVariants = {
  hidden: {
    opacity: 0,
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
    opacity: 0,
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
    opacity: 0,
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
  const age = calculateAge(profile.birthDate);

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
      label: "Age",
      value: `${age} years old`,
      description: "Automatically updated",
      yellow: true,
    },
    {
      number: "02",
      label: "Location",
      value: profile.location,
      description: "Available for remote work",
      yellow: false,
    },
    {
      number: "03",
      label: "Experience",
      value: `${profile.experience.years}+ years`,
      description: "Frontend development",
      yellow: false,
    },
    {
      number: "04",
      label: "Projects",
      value: `${profile.experience.projects}+ projects`,
      description: "Websites and systems",
      yellow: true,
    },
  ];

  return (
    <main className="about-page">
      <motion.section
        className="about-hero"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="about-container">
          <motion.p className="about-section-label" variants={itemVariants}>
            About me
          </motion.p>

          <motion.h1
            className="about-hero__title"
            variants={itemVariants}
            aria-label="Building meaningful digital experiences."
          >
            <span className="about-title-line about-title-line--dark">
              <SplitText text="Building meaningful" />
            </span>

            <span className="about-title-line">
              <SplitText text="digital experiences." />
            </span>
          </motion.h1>

          <motion.div className="about-hero__bottom" variants={itemVariants}>
            <p>
              Software Engineer and Frontend Developer based in Gaza,
              Palestine.
            </p>

            <motion.a
              href="#story"
              className="about-scroll-button"
              aria-label="Scroll to my story"
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
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={storyRef}
        className="about-story"
        id="story"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <div className="about-story__grid">
          <motion.div
            className="about-story__image"
            variants={itemVariants}
            style={{ y: shouldReduceMotion ? 0 : storyImageY }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.015, rotate: -1 }
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
                src={`${process.env.PUBLIC_URL}/images/basel-hero.png`}
                alt={profile.shortName}
                width="1672"
                height="941"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div className="about-story__content" variants={itemVariants}>
            <p className="about-section-label">My story</p>

            <h2 aria-label="I turn ideas into fast, responsive and user-friendly digital products.">
              <SplitText text="I turn ideas into fast, responsive and user-friendly digital products." />
            </h2>

            <div className="about-story__description">
              <p>
                I’m {profile.name}, a Software Engineer and Frontend
                Developer with {profile.experience.years} years of
                experience building modern websites and practical
                software solutions.
              </p>

              <p>
                I have developed more than {profile.experience.projects}{" "}
                projects, including landing pages, electronic invitation
                platforms and management systems for stores and
                businesses.
              </p>

              <p>
                I focus on responsive design, accessibility, usability
                and clean, reusable code.
              </p>
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
            <p className="about-section-label">Profile</p>
            <h2>A little more about me.</h2>
          </motion.div>

          <div className="about-information__grid">
            {profileCards.map((card) => (
              <motion.article
                className={`about-info-card ${
                  card.yellow ? "about-info-card--yellow" : ""
                }`}
                key={card.number}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -12, rotate: card.yellow ? -1 : 1 }
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
                <span className="about-info-card__number">{card.number}</span>

                <div className="about-info-card__content">
                  <p>{card.label}</p>
                  <strong>{card.value}</strong>
                  <small>{card.description}</small>
                </div>
              </motion.article>
            ))}
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
            <p className="about-section-label">Education</p>

            <h2>
              Learning, building
              <br />
              and improving.
            </h2>
          </motion.div>

          <motion.article
            className="education-card"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { x: 12 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98, x: 0 }}
          >
            <div className="education-card__year">
              <span>Expected graduation</span>
              <strong>{profile.education.graduationYear}</strong>
            </div>

            <div className="education-card__content">
              <p>{profile.education.university}</p>
              <h3>{profile.education.major}</h3>
              <span>Bachelor’s Degree</span>
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
            <p className="about-section-label">Certificates</p>
            <h2>Continuous learning.</h2>
          </motion.div>

          <div className="certificate-grid">
            {profile.certificates.map((certificate, index) => (
              <motion.article
                className="certificate-card"
                key={certificate.title}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -10 }}
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.96, y: 0 }
                }
              >
                <span className="certificate-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p>{certificate.provider}</p>
                  <h3>{certificate.title}</h3>
                  <span>{certificate.description}</span>
                </div>
              </motion.article>
            ))}
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
            <p className="about-section-label">Technical skills</p>
            <h2>Tools I use to bring ideas to life.</h2>
          </motion.div>

          <div className="about-skills__grid">
            {profile.skills.map((skill, index) => (
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
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{skill}</h3>
              </motion.article>
            ))}
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
            <p className="about-section-label">Languages</p>

            {profile.languages.map((language) => (
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
            <p className="about-section-label">Available for</p>

            {profile.availability.map((item) => (
              <motion.div
                className="about-extra__row"
                key={item}
                whileHover={shouldReduceMotion ? undefined : { x: 8 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98, x: 0 }}
              >
                <strong>{item}</strong>

                <span className="availability-status">
                  <i />
                  Available
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
            <p className="about-section-label">Curriculum vitae</p>

            <h2>
              Want to know
              <br />
              more about me?
            </h2>

            <div className="about-cv__actions">
              <button
                type="button"
                className="about-cv__button about-cv__button--disabled"
                disabled
                title="CV is being prepared"
              >
                <span>Download CV</span>
                <small>Coming soon</small>
              </button>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92, y: 0 }}
              >
                <Link to="/contact" className="about-cv__link">
                  Contact me ↗
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <ContactCTA />

    </main>
  );
};

export default About;
