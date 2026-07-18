export const getEmailJsConfig = (environment = process.env) => {
  const serviceId = environment.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = environment.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = environment.REACT_APP_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return null;

  return { serviceId, templateId, publicKey };
};

export const getContactErrorMessage = (
  error,
  fallback = "The message could not be sent. Please try again or use WhatsApp.",
) =>
  error?.text ||
  error?.message ||
  fallback;
