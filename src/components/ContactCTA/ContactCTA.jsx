import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../../animation/Reveal";
import SplitText from "../../animation/SplitText";
import { smoothEase } from "../../animation/variants";
import { siteContact, siteLinks } from "../../config/site";
import "./ContactCTA.css";

const actionsContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const actionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

const ContactCTA = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="contact-cta"
      aria-labelledby="contact-cta-title"
    >
      <div className="contact-cta__container">
        <div className="contact-cta__content">
          <Reveal direction="up">
            <p className="contact-cta__eyebrow">
              Get in touch
            </p>
          </Reveal>

          <div className="contact-cta__title-wrapper">
            <h2
              id="contact-cta-title"
              className="contact-cta__title"
              aria-label="Have a project in mind?"
            >
              <span className="contact-cta__title-line">
                <SplitText text="Have a project" />
              </span>

              <span className="contact-cta__title-line">
                <SplitText text="in mind?" />
              </span>
            </h2>

            <Reveal direction="scale" delay={0.2}>
              <motion.div
                className="contact-cta__button-wrapper"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.07,
                        rotate: -4,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.87,
                        rotate: 0,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <Link
                  to="/contact"
                  className="contact-cta__button"
                  aria-label="Go to contact page"
                >
                  <span>Contact me</span>

                  <motion.span
                    className="contact-cta__button-arrow"
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
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                  >
                    ↗
                  </motion.span>
                </Link>
              </motion.div>
            </Reveal>
          </div>

          <motion.div
            className="contact-cta__line"
            aria-hidden="true"
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: smoothEase,
            }}
          />

          <motion.div
            className="contact-cta__actions"
            variants={
              shouldReduceMotion
                ? undefined
                : actionsContainerVariants
            }
            initial={
              shouldReduceMotion ? false : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.5,
            }}
          >
            <motion.a
              href={siteLinks.email}
              className="contact-cta__action"
              variants={
                shouldReduceMotion
                  ? undefined
                  : actionVariants
              }
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.92,
                      y: 0,
                    }
              }
            >
              {siteContact.email}
            </motion.a>

            <motion.a
              href={siteLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta__action"
              variants={
                shouldReduceMotion
                  ? undefined
                  : actionVariants
              }
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.9,
                      y: 0,
                    }
              }
            >
              <span>WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
