import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothEase } from "../animation/variants";
import { projectFilters } from "../config/site";
import projects from "../data/projects";
import OptimizedImage from "../components/common/OptimizedImage";
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
    opacity: 0,
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

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.group === activeFilter);
  }, [activeFilter]);

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <motion.div
          className="projects-hero__content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
        >
          <p className="projects-hero__eyebrow">Selected projects</p>

          <h1 className="projects-hero__title">
            Projects built with
            <span> purpose and precision.</span>
          </h1>

          <div className="projects-hero__bottom">
            <p>
              A collection of frontend, full-stack, API and progressive web
              applications designed to solve practical problems and create
              enjoyable digital experiences.
            </p>

            <span className="projects-hero__count">
              {String(projects.length).padStart(2, "0")} Projects
            </span>
          </div>
        </motion.div>
      </section>

      <section className="projects-list">
        <div className="projects-list__container">
          <motion.div
            className="projects-filters"
            initial={{ opacity: 0, y: 25 }}
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
                {filter}
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
              {filteredProjects.map((project) => (
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
                    aria-label={`Open ${project.title}`}
                    whileTap={{ scale: 0.985 }}
                  >
                    <motion.div
                      className="project-card__image-wrapper"
                      initial={{
                        opacity: 0,
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
                        alt={`${project.title} preview`}
                        className="project-card__image"
                        width="1600"
                        height="900"
                        loading="lazy"
                      />

                      <div className="project-card__overlay">
                        <span>View live site</span>
                        <span aria-hidden="true">↗</span>
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
                          {project.category}
                        </p>

                        <h2>{project.title}</h2>
                      </div>

                      <span className="project-card__year">{project.year}</span>
                    </header>

                    <p className="project-card__description">
                      {project.description}
                    </p>

                    <div className="project-card__meta">
                      <div>
                        <span className="project-card__label">My role</span>

                        <p>{project.role}</p>
                      </div>
                    </div>

                    <ul className="project-card__features">
                      {project.features.slice(0, 4).map((feature) => (
                        <li key={feature}>
                          <span aria-hidden="true">↗</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <ul className="project-card__technologies">
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
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
                      <span>Explore project</span>
                      <span aria-hidden="true">↗</span>
                    </motion.a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="projects-empty">
              No projects are available in this category yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Projects;
