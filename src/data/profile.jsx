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
    years: 4,
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

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(`${birthDate}T00:00:00`);

  let age = today.getFullYear() - birth.getFullYear();

  const birthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!birthdayPassed) {
    age -= 1;
  }

  return age;
};
