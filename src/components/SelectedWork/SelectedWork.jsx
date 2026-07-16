import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../../animation/Reveal";
import SplitText from "../../animation/SplitText";
import ProjectReveal from "../../animation/ProjectReveal";
import { smoothEase } from "../../animation/variants";
import projects from "../../data/projects";
import OptimizedImage from "../common/OptimizedImage";
import "./SelectedWork.css";

const selectedProjects = projects.filter((project) => project.id === 4);

const SelectedWork = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="selected-work__header">
        <div>
          <Reveal direction="up">
            <p className="selected-work__eyebrow">Portfolio</p>
          </Reveal>

          <h2
            id="selected-work-title"
            className="selected-work__heading"
          >
            <SplitText text="Selected work" />
          </h2>
        </div>

        <motion.div
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
                }
          }
        >
          <Link
            to="/projects"
            className="selected-work__all-link"
          >
            View all work ↗
          </Link>
        </motion.div>
      </div>

      <div className="selected-work__list">
        {selectedProjects.map((project, projectIndex) => (
          <article className="project" key={project.id}>
            <ProjectReveal>
              <motion.a
                className="project__image-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.975,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <div className="project__image-wrapper">
                  <OptimizedImage
                    className="project__image"
                    src={project.image}
                    alt={`${project.title} preview`}
                    width="1600"
                    height="900"
                    loading="lazy"
                  />

                  <motion.span
                    className="project__open"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.5,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.5,
                    }}
                    transition={{
                      delay: 0.55,
                      duration: 0.6,
                      ease: smoothEase,
                    }}
                  >
                    Visit site ↗
                  </motion.span>
                </div>
              </motion.a>
            </ProjectReveal>

            <motion.div
              className="project__details"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: smoothEase,
              }}
            >
              <div className="project__title-group">
                <span className="project__number">
                  {project.number}
                </span>

                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>

              <motion.ul
                className="project__technologies"
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                variants={{
                  hidden: {},

                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren:
                        0.25 + projectIndex * 0.05,
                    },
                  },
                }}
              >
                {project.technologies.map((technology) => (
                  <motion.li
                    key={technology}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 15,
                        scale: 0.9,
                      },

                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,

                        transition: {
                          duration: 0.45,
                          ease: smoothEase,
                        },
                      },
                    }}
                  >
                    {technology}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
