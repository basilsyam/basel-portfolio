import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothEase } from "../animation/variants";
import { projectFilters } from "../config/site";
import projects from "../data/projects";
import OptimizedImage from "../components/common/OptimizedImage";
import TechnicalText from "../components/common/TechnicalText";
import BidiText from "../components/common/BidiText";
import { useLanguage } from "../context/LanguageContext";
import "./Projects.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const projectVariants = {
  hidden: {
    opacity: 1,
    y: 70,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.96,

    transition: {
      duration: 0.25,
    },
  },
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { isRTL, t } = useLanguage();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.group === activeFilter);
  }, [activeFilter]);

  return (
    <div className="projects-page">
      <section className="projects-hero" aria-labelledby="projects-title">
        <motion.div
          className="projects-hero__content"
          initial={{ opacity: 1, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
        >
          <p className="projects-hero__eyebrow">
            {t("projects.eyebrow")}
          </p>

          <h1 id="projects-title" className="projects-hero__title">
            {t("projects.titleStart")}
            <span>{t("projects.titleHighlight")}</span>
          </h1>

          <div className="projects-hero__bottom">
            <BidiText as="p">{t("projects.introduction")}</BidiText>

            <span className="projects-hero__count">
              {t("projects.count", {
                count: String(projects.length).padStart(2, "0"),
              })}
            </span>
          </div>
        </motion.div>
      </section>

      <section
        className="projects-list"
        aria-label={t("projects.portfolioLabel")}
      >
        <div className="projects-list__container">
          <motion.div
            className="projects-filters"
            role="group"
            aria-label={t("projects.filterLabel")}
            initial={{ opacity: 1, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {projectFilters.map((filter) => (
              <motion.button
                key={filter}
                type="button"
                className={`projects-filter ${
                  activeFilter === filter ? "projects-filter--active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
                whileTap={{ scale: 0.94 }}
                aria-pressed={activeFilter === filter}
              >
                <BidiText>{t(`projects.filters.${filter}`)}</BidiText>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const localizedProject = t(
                  `projects.items.${project.id}`,
                );

                return (
                <motion.article
                  key={project.id}
                  className="project-card"
                  variants={projectVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__image-link"
                    aria-label={t("projects.open", {
                      title: localizedProject.title,
                    })}
                    whileTap={{ scale: 0.985 }}
                  >
                    <motion.div
                      className="project-card__image-wrapper"
                      initial={{
                        opacity: 1,
                        scale: 0.95,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: smoothEase,
                      }}
                    >
                      <OptimizedImage
                        src={project.image}
                        alt={localizedProject.title}
                        className="project-card__image"
                        width="1600"
                        height="900"
                        loading="lazy"
                      />

                      <div className="project-card__overlay">
                        <span>{t("projects.viewLive")}</span>
                        <span aria-hidden="true">{isRTL ? "↖" : "↗"}</span>
                      </div>

                      <span className="project-card__number">
                        {project.number}
                      </span>
                    </motion.div>
                  </motion.a>

                  <div className="project-card__content">
                    <header className="project-card__header">
                      <div>
                        <p className="project-card__category">
                          <BidiText>{localizedProject.category}</BidiText>
                        </p>

                        <BidiText as="h2">
                          {localizedProject.title}
                        </BidiText>
                      </div>

                      <TechnicalText
                        as="span"
                        className="project-card__year"
                      >
                        {project.year}
                      </TechnicalText>
                    </header>

                    <p className="project-card__description">
                      <BidiText>{localizedProject.description}</BidiText>
                    </p>

                    <div className="project-card__meta">
                      <div>
                        <span className="project-card__label">
                          {t("projects.role")}
                        </span>

                        <BidiText as="p">
                          {localizedProject.role}
                        </BidiText>
                      </div>
                    </div>

                    <ul className="project-card__features">
                      {localizedProject.features.slice(0, 4).map((feature) => (
                        <li key={feature}>
                          <span aria-hidden="true">{isRTL ? "↖" : "↗"}</span>
                          <BidiText>{feature}</BidiText>
                        </li>
                      ))}
                    </ul>

                    <ul className="project-card__technologies">
                      {project.technologies.map((technology) => (
                        <li key={technology}>
                          <TechnicalText>{technology}</TechnicalText>
                        </li>
                      ))}
                    </ul>

                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__button"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <span>{t("projects.explore")}</span>
                      <span aria-hidden="true">{isRTL ? "↖" : "↗"}</span>
                    </motion.a>
                  </div>
                </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="projects-empty">
              {t("projects.empty")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
