import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  NavLink,
  useLocation,
} from "react-router-dom";
import { smoothEase } from "../../animation/variants";
import { navigationLinks } from "../../config/site";
import { prefetchPage } from "../../config/pageLoaders";
import { useAppContext } from "../../context/AppContext";
import { useLanguage } from "../../context/LanguageContext";
import useIsMobile from "../../hooks/useIsMobile";
import "./Navbar.css";

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },

  exit: {
    opacity: 0,
    y: -15,
    scale: 0.97,

    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    x: 25,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
};

const Navbar = () => {
  const {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  } = useAppContext();

  const location = useLocation();
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const { isRTL, t, toggleLanguage } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu]);

  useEffect(() => {
    if (!isMobile || !isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isMenuOpen]);

  const languageButton = (modifier = "") => (
    <motion.button
      type="button"
      className={`navbar__language-button ${modifier}`.trim()}
      onClick={toggleLanguage}
      aria-label={t("language.switchLabel")}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
    >
      <span dir="ltr">{t("language.switch")}</span>
    </motion.button>
  );

  const navigation = (
    <motion.nav
      id="main-navigation"
      className="navbar__navigation"
      aria-label={t("navigation.label")}
      data-lenis-prevent
      variants={isMobile ? menuVariants : undefined}
      initial={
        isMobile && !shouldReduceMotion
          ? "hidden"
          : false
      }
      animate="visible"
      exit={
        isMobile && !shouldReduceMotion
          ? "exit"
          : undefined
      }
    >
      {navigationLinks.map(({ label, path }) => (
        <motion.div
          className="navbar__item"
          key={path}
          variants={
            isMobile && !shouldReduceMotion
              ? linkVariants
              : undefined
          }
          whileTap={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 0.95,
                }
          }
        >
          <NavLink
            to={path}
            onClick={closeMenu}
            onFocus={() => prefetchPage(path)}
            onMouseEnter={() => prefetchPage(path)}
            onPointerDown={() => prefetchPage(path)}
            className={({ isActive }) =>
              `navbar__link ${
                isActive
                  ? "navbar__link--active"
                  : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{t(`navigation.${label.toLowerCase()}`)}</span>

                {isActive && (
                  <motion.span
                    className="navbar__active-indicator"
                    layoutId="navbar-active-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>
      ))}

      {!isMobile && languageButton()}
    </motion.nav>
  );

  return (
    <>
      <motion.header
        className={`navbar ${
          isScrolled ? "navbar--scrolled" : ""
        }`}
        initial={false}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: smoothEase,
        }}
      >
        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.03,
                }
          }
          whileTap={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 0.94,
                }
          }
        >
          <NavLink
            to="/"
            className="navbar__logo"
            onClick={closeMenu}
            aria-label={t("navigation.portfolioHome")}
          >
            <motion.span
              className="navbar__logo-circle"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 0.6,
              }}
            >
              ©
            </motion.span>

            <span>{t("navigation.logo")}</span>
          </NavLink>
        </motion.div>

        {!isMobile && navigation}

        <div className="navbar__mobile-controls">
          {isMobile &&
            languageButton("navbar__language-button--mobile")}

          <motion.button
            type="button"
            className={`menu-button ${
              isMenuOpen
                ? "menu-button--active"
                : ""
            }`}
            onClick={toggleMenu}
            aria-label={
              isMenuOpen
                ? t("navigation.closeMenu")
                : t("navigation.openMenu")
            }
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.86,
                    rotate: isRTL ? -4 : 4,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 22,
            }}
          >
            <span />
            <span />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <>
            <motion.button
              type="button"
              className="navbar__backdrop"
              aria-label={t("navigation.closeMenu")}
              onClick={closeMenu}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
            />

            {navigation}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
