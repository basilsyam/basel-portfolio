export const scrollToSection = (sectionId, reduceMotion = false) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
};
