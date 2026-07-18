export const profile = {
  name: "Basel AbdAlqader Seyam",
  shortName: "Basel Seyam",
  birthDate: "2005-06-04",
  location: "Gaza, Palestine",

  roles: ["Software Engineer", "Frontend Developer"],

  education: {
    university: "Al-Azhar University – Gaza",
    major: "Computer Systems Engineering",
    graduationYear: 2027,
  },

  experience: {
    startDate: "2022-01-01",
    projects: 15,
  },

  certificates: [
    {
      title: "English Language Certificate",
      provider: "Cambridge University Centre",
      description:
        "Advanced English language training and communication skills.",
    },
    {
      title: "Frontend Development Training",
      provider: "Professional Training",
      description:
        "More than 50 hours of practical frontend development training.",
    },
  ],

  languages: [
    {
      name: "Arabic",
      level: "Native",
    },
    {
      name: "English",
      level: "Advanced",
    },
  ],

  availability: [
    "Freelance",
    "Remote Work",
    "Internships",
    "Full-Time Opportunities",
  ],

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Bootstrap",
    "Tailwind CSS",
    "PHP",
    "MySQL",
    "Git",
    "GitHub",
    "JSON",
    "Responsive Design",
  ],
};

const calculateFullYears = (startDate, referenceDate = new Date()) => {
  const start = new Date(`${startDate}T00:00:00`);

  let years = referenceDate.getFullYear() - start.getFullYear();

  const anniversaryPassed =
    referenceDate.getMonth() > start.getMonth() ||
    (referenceDate.getMonth() === start.getMonth() &&
      referenceDate.getDate() >= start.getDate());

  if (!anniversaryPassed) {
    years -= 1;
  }

  return Math.max(0, years);
};

export const calculateAge = (birthDate, referenceDate) =>
  calculateFullYears(birthDate, referenceDate);

export const calculateExperienceYears = (startDate, referenceDate) =>
  calculateFullYears(startDate, referenceDate);
