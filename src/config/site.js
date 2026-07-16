export const siteContact = {
  email: "basilsyam070@gmail.com",
  phoneDisplay: "+972 599 982 722",
  phone: "+972599982722",
  location: "Gaza, Palestine",
};

export const siteLinks = {
  email: `mailto:${siteContact.email}`,
  phone: `tel:${siteContact.phone}`,
  whatsapp: `https://wa.me/${siteContact.phone.replace(/\D/g, "")}`,
  github: "https://github.com/basilsyam",
  linkedin: "https://www.linkedin.com/in/basel-seyam-1387b2379",
  facebook: "https://www.facebook.com/share/1CtJvJdB9p/",
  instagram: "https://www.instagram.com/basilsyam",
};

export const navigationLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export const projectFilters = ["All", "Frontend", "Full-Stack", "API", "PWA"];
