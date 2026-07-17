import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import SplitText from "../animation/SplitText";
import { smoothEase } from "../animation/variants";
import ContactCTA from "../components/ContactCTA/ContactCTA";
import services from "../data/services";
import useIsMobile from "../hooks/useIsMobile";
import { scrollToSection } from "../utils/scroll";

import "./Services.css";

const cardsContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

const Services = () => {
  const heroRef = useRef(null);
  const [activeService, setActiveService] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableParallax = shouldReduceMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const decorationY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const toggleService = (serviceId) => {
    setActiveService((currentService) =>
      currentService === serviceId ? null : serviceId
    );
  };

  return (
    <div className="services-page">
      <section
        ref={heroRef}
        className="services-hero"
        aria-labelledby="services-title"
      >
        <motion.div
          className="services-hero__decoration"
          aria-hidden="true"
          style={{
            y: disableParallax ? 0 : decorationY,
          }}
        />

        <div className="services-container">
          <motion.div
            className="services-hero__content"
            style={{
              y: disableParallax ? 0 : titleY,
            }}
          >
            <motion.p
              className="services-label"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 25,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: smoothEase,
              }}
            >
              What I do
            </motion.p>

            <h1
              id="services-title"
              className="services-hero__title"
              aria-label="Digital solutions built around your ideas."
            >
              <span className="services-title-line">
                <SplitText text="Digital solutions" />
              </span>

              <span className="services-title-line">
                <SplitText text="built around" />
              </span>

              <span className="services-title-line services-title-line--muted">
                <SplitText text="your ideas." />
              </span>
            </h1>

            <motion.div
              className="services-hero__bottom"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: smoothEase,
              }}
            >
              <p>
                From responsive interfaces to practical management systems, I
                build digital experiences that are fast, clear and easy to use.
              </p>

              <motion.button
                type="button"
                className="services-scroll-button"
                aria-label="Scroll to services"
                onClick={() =>
                  scrollToSection("services-list", shouldReduceMotion)
                }
                whileHover={shouldReduceMotion ? undefined : { y: 7 }}
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.84,
                        y: 0,
                      }
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
          </motion.div>
        </div>
      </section>

      <section
        id="services-list"
        className="services-list"
        aria-labelledby="services-list-title"
      >
        <div className="services-container">
          <div className="services-list__header">
            <div>
              <p className="services-label">Services</p>

              <h2 id="services-list-title">
                How I can help
                <br />
                your project.
              </h2>
            </div>

            <p className="services-list__description">
              Select any service to view more information about what it
              includes.
            </p>
          </div>

          <motion.div
            className="services-grid"
            variants={shouldReduceMotion ? undefined : cardsContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
          >
            {services.map((service) => {
              const isActive = activeService === service.id;

              return (
                <motion.article
                  className={`service-card ${
                    isActive ? "service-card--active" : ""
                  }`}
                  key={service.id}
                  variants={shouldReduceMotion ? undefined : cardVariants}
                  layout={!shouldReduceMotion}
                >
                  <motion.button
                    type="button"
                    className="service-card__toggle"
                    onClick={() => toggleService(service.id)}
                    aria-expanded={isActive}
                    aria-controls={`service-content-${service.id}`}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.975,
                            y: 0,
                          }
                    }
                  >
                    <span className="service-card__number">
                      {service.number}
                    </span>

                    <div className="service-card__heading">
                      <h3>{service.title}</h3>

                      <motion.span
                        className="service-card__icon"
                        aria-hidden="true"
                        animate={{
                          rotate: isActive ? 45 : 0,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                        }}
                      >
                        +
                      </motion.span>
                    </div>

                    <p>{service.shortDescription}</p>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`service-content-${service.id}`}
                        className="service-card__content"
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.5,
                            ease: smoothEase,
                          },
                          opacity: {
                            duration: 0.3,
                          },
                        }}
                      >
                        <div className="service-card__content-inner">
                          <p>{service.description}</p>

                          <ul>
                            {service.features.map((feature) => (
                              <motion.li
                                key={feature}
                                initial={
                                  shouldReduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        x: -15,
                                      }
                                }
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  duration: 0.4,
                                }}
                              >
                                <span aria-hidden="true">↳</span>
                                {feature}
                              </motion.li>
                            ))}
                          </ul>

                          <motion.div
                            className="service-card__contact-wrapper"
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                          >
                            <Link
                              to="/contact"
                              className="service-card__contact"
                            >
                              Discuss this service ↗
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <ContactCTA />

    </div>
  );
};

export default Services;
