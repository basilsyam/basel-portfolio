import { siteContact } from "../config/site";
import projects from "./projects";
import { calculateAge, profile } from "./profile";
import services from "./services";

export const quickQuestions = [
  { label: "About Basel", message: "Tell me about Basel" },
  { label: "Services", message: "What services do you offer?" },
  { label: "Projects", message: "Show me your projects" },
  { label: "Contact", message: "How can I contact you?" },
];

const normalizeText = (value) =>
  value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u064b-\u065f\u0670]/g, "")
    .trim();

const includesAny = (text, keywords) =>
  keywords.some((keyword) => text.includes(normalizeText(keyword)));

const list = (items) => items.join(", ");
const isArabicText = (text) => /[\u0600-\u06ff]/.test(text);

const findService = (text) =>
  services.find((service) => {
    const searchable = [
      service.title,
      service.shortDescription,
      ...service.features,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return service.title
      .toLocaleLowerCase()
      .split(" ")
      .some((word) => word.length > 3 && text.includes(word)) ||
      searchable.includes(text);
  });

const findProject = (text) =>
  projects.find((project) =>
    project.title
      .toLocaleLowerCase()
      .split(" ")
      .some((word) => word.length > 3 && text.includes(word))
  );

export const getBotResponse = (message) => {
  const text = normalizeText(message);
  const isArabic = isArabicText(message);
  const matchedProject = findProject(text);
  const matchedService = findService(text);

  if (matchedProject) {
    return isArabic
      ? `${matchedProject.title}: ${matchedProject.description} استخدم باسل فيه ${list(matchedProject.technologies)}. يمكنك فتحه من صفحة Projects.`
      : `${matchedProject.title}: ${matchedProject.description} Basel built it with ${list(matchedProject.technologies)}. You can open it from the Projects page.`;
  }

  if (matchedService) {
    return isArabic
      ? `خدمة ${matchedService.title}: ${matchedService.description} وتشمل ${list(matchedService.features)}.`
      : `${matchedService.title}: ${matchedService.description} It includes ${list(matchedService.features)}.`;
  }

  if (includesAny(text, ["hello", "hi", "hey", "مرحبا", "السلام", "اهلا", "هلا"])) {
    return isArabic
      ? `أهلًا بك 👋 أنا مساعد ${profile.shortName}. اسألني عن خبرته، خدماته، مشاريعه أو طريقة التواصل معه.`
      : `Hello! 👋 I’m ${profile.shortName}’s assistant. Ask me about his experience, services, projects, or contact details.`;
  }

  if (includesAny(text, ["about", "who", "experience", "background", "نبذة", "من هو", "مين", "خبرة", "سنوات", "عمر"])) {
    const age = calculateAge(profile.birthDate);
    return isArabic
      ? `${profile.name}، عمره ${age} عامًا، ${list(profile.roles)} من ${profile.location}. لديه ${profile.experience.years} سنوات من الخبرة وأكثر من ${profile.experience.projects} مشروعًا.`
      : `${profile.name} is a ${age}-year-old ${list(profile.roles)} based in ${profile.location}, with ${profile.experience.years} years of experience and more than ${profile.experience.projects} projects.`;
  }

  if (includesAny(text, ["service", "offer", "build", "develop", "خدمة", "خدمات", "تقدم", "تطوير", "تصميم", "موقع"])) {
    const serviceNames = services.map(({ title }) => title);
    return isArabic
      ? `يقدم باسل: ${list(serviceNames)}. اكتب اسم أي خدمة لأعطيك تفاصيلها.`
      : `Basel offers: ${list(serviceNames)}. Ask about any service by name for more details.`;
  }

  if (includesAny(text, ["project", "portfolio", "work", "مشروع", "مشاريع", "اعمال", "أعمال"])) {
    const projectNames = projects.map(({ title }) => title);
    return isArabic
      ? `من مشاريع باسل: ${list(projectNames)}. اكتب اسم أي مشروع لمعرفة تفاصيله.`
      : `Basel’s projects include: ${list(projectNames)}. Ask about any project by name for details.`;
  }

  if (includesAny(text, ["skill", "technology", "stack", "language", "مهارة", "مهارات", "تقنيات", "لغة", "react", "php"])) {
    return isArabic
      ? `مهارات باسل التقنية: ${list(profile.skills)}.`
      : `Basel’s technical skills include ${list(profile.skills)}.`;
  }

  if (includesAny(text, ["available", "hire", "job", "freelance", "remote", "متاح", "توظيف", "وظيفة", "عمل حر", "عن بعد"])) {
    return isArabic
      ? `باسل متاح لـ: ${list(profile.availability)}. يمكنك إرسال تفاصيل الفرصة من صفحة Contact أو واتساب.`
      : `Basel is available for ${list(profile.availability)}. Send the opportunity details through Contact or WhatsApp.`;
  }

  if (includesAny(text, ["study", "education", "university", "دراسة", "جامعة", "تخصص", "تعليم"])) {
    return isArabic
      ? `يدرس باسل ${profile.education.major} في ${profile.education.university}، ومتوقع تخرجه عام ${profile.education.graduationYear}.`
      : `Basel studies ${profile.education.major} at ${profile.education.university} and expects to graduate in ${profile.education.graduationYear}.`;
  }

  if (includesAny(text, ["certificate", "training", "شهادة", "شهادات", "تدريب"])) {
    const certificates = profile.certificates.map(
      ({ title, provider }) => `${title} — ${provider}`
    );
    return isArabic
      ? `شهادات وتدريبات باسل: ${list(certificates)}.`
      : `Basel’s certificates and training include ${list(certificates)}.`;
  }

  if (includesAny(text, ["contact", "email", "whatsapp", "phone", "تواصل", "ايميل", "إيميل", "واتس", "رقم", "اتصل"])) {
    return isArabic
      ? `يمكنك التواصل مع باسل عبر ${siteContact.email} أو الرقم ${siteContact.phoneDisplay}، أو استخدام زر واتساب أسفل المحادثة.`
      : `Contact Basel at ${siteContact.email} or ${siteContact.phoneDisplay}, or use the WhatsApp button below.`;
  }

  if (includesAny(text, ["location", "where", "based", "مكان", "وين", "أين", "بلد"])) {
    return isArabic
      ? `باسل موجود في ${profile.location} ومتاح للعمل عن بُعد.`
      : `Basel is based in ${profile.location} and is available for remote work.`;
  }

  if (includesAny(text, ["price", "cost", "budget", "quote", "سعر", "تكلفة", "ميزانية", "كم"])) {
    return isArabic
      ? "تُحدد التكلفة حسب نوع المشروع، الميزات المطلوبة وموعد التسليم. أرسل وصف المشروع والميزانية المتوقعة عبر صفحة Contact للحصول على تقدير مناسب."
      : "Pricing depends on the project type, required features, and timeline. Send the project description and expected budget through Contact for an estimate.";
  }

  return isArabic
    ? "أستطيع مساعدتك بمعلومات باسل الموجودة في الموقع. اسألني عن نبذته، الخدمات، المشاريع، المهارات، الدراسة، الأسعار أو التواصل."
    : "I can help with the information available on Basel’s portfolio. Ask about his profile, services, projects, skills, education, pricing, or contact details.";
};
