import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa6";

import Reveal from "../../animation/Reveal";
import SplitText from "../../animation/SplitText";
import { smoothEase } from "../../animation/variants";
import { siteContact, siteLinks } from "../../config/site";
import "./Footer.css";

const socialLinks = [
  {
    id: 1,
    label: "GitHub",
    url: siteLinks.github,
    icon: FaGithub,
  },
  {
    id: 2,
    label: "LinkedIn",
    url: siteLinks.linkedin,
    icon: FaLinkedinIn,
  },
  {
    id: 3,
    label: "WhatsApp",
    url: siteLinks.whatsapp,
    icon: FaWhatsapp,
  },
  {
    id: 4,
    label: "Phone",
    url: siteLinks.phone,
    icon: FaPhone,
  },
  {
    id: 5,
    label: "Facebook",
    url: siteLinks.facebook,
    icon: FaFacebookF,
  },
  {
    id: 6,
    label: "Instagram",
    url: siteLinks.instagram,
    icon: FaInstagram,
  },
];

const socialContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const socialItemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.7,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring",
      stiffness: 280,
      damping: 20,
    },
  },
};

const Footer = () => {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const decorationY = useTransform(
    scrollYProgress,
    [0, 1],
    [-60, 50]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion
        ? "auto"
        : "smooth",
    });
  };

  return (
    <footer ref={footerRef} className="footer">
      <motion.div
        className="footer__decoration"
        aria-hidden="true"
        style={{
          y: shouldReduceMotion ? 0 : decorationY,
        }}
      />

      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__identity">
            <Reveal direction="up">
              <p className="footer__eyebrow">
                Software Engineer
              </p>
            </Reveal>

            <h2 aria-label="Basel Seyam">
              <SplitText text="Basel Seyam" />
            </h2>

            <Reveal direction="up" delay={0.15}>
              <motion.div
                className="footer__email-wrapper"
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
                        scale: 0.94,
                        x: 0,
                      }
                }
              >
                <a
                  href={siteLinks.email}
                  className="footer__email"
                >
                  {siteContact.email}
                </a>
              </motion.div>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={0.2}>
            <motion.button
              type="button"
              className="footer__top-button"
              onClick={scrollToTop}
              aria-label="Back to top"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -7,
                      rotate: -5,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.85,
                      y: 0,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -4, 0],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <FaArrowUp />
              </motion.span>
            </motion.button>
          </Reveal>
        </div>

        <motion.div
          className="footer__divider"
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
            ease: smoothEase,
          }}
        />

        <div className="footer__social-section">
          <Reveal direction="left">
            <p className="footer__label">
              Connect with me
            </p>
          </Reveal>

          <motion.nav
            className="footer__socials"
            aria-label="Social media links"
            variants={
              shouldReduceMotion
                ? undefined
                : socialContainerVariants
            }
            initial={
              shouldReduceMotion ? false : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.4,
            }}
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isExternal =
                social.url.startsWith("http");

              return (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target={
                    isExternal ? "_blank" : undefined
                  }
                  rel={
                    isExternal
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="footer__social-link"
                  aria-label={social.label}
                  title={social.label}
                  variants={
                    shouldReduceMotion
                      ? undefined
                      : socialItemVariants
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -7,
                          rotate: -5,
                          scale: 1.06,
                      }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.82,
                          rotate: 0,
                          y: 0,
                      }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 20,
                  }}
                >
                  <Icon aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.nav>
        </div>

        <motion.div
          className="footer__bottom"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: smoothEase,
          }}
        >
          <p>
            © {currentYear} Basel Seyam. All rights
            reserved.
          </p>

          <p>
            Designed & developed by{" "}
            <strong>Basel Seyam</strong>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
