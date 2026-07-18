import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { siteContact, siteLinks } from "../config/site";
import services from "../data/services";
import { smoothEase } from "../animation/variants";
import {
  getContactErrorMessage,
  getEmailJsConfig,
} from "../utils/contact";
import { useLanguage } from "../context/LanguageContext";
import TechnicalText from "../components/common/TechnicalText";

import "./Contact.css";

const contactMethods = [
  {
    id: 1,
    labelKey: "contact.email",
    value: siteContact.email,
    href: siteLinks.email,
    icon: <FaEnvelope />,
  },
  {
    id: 2,
    labelKey: "common.whatsapp",
    value: siteContact.phoneDisplay,
    href: siteLinks.whatsapp,
    icon: <FaWhatsapp />,
  },
  {
    id: 3,
    labelKey: "contact.phone",
    value: siteContact.phoneDisplay,
    href: siteLinks.phone,
    icon: <FaPhone />,
  },
  {
    id: 4,
    labelKey: "contact.location",
    value: siteContact.location,
    href: null,
    icon: <FaLocationDot />,
  },
];

const initialStatus = {
  type: "",
  message: "",
};

const synchronizeEmailFields = (form, fieldName, value) => {
  const targetNames =
    fieldName === "user_name"
      ? ["from_name"]
      : ["from_email", "reply_to"];

  targetNames.forEach((targetName) => {
    const target = form.elements.namedItem(targetName);
    if (target) target.value = value;
  });
};

const Contact = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const { isRTL, t } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSending || !formRef.current) return;

    const emailJsConfig = getEmailJsConfig();

    if (!emailJsConfig) {
      setStatus({
        type: "error",
        message: t("contact.missingConfig"),
      });
      return;
    }

    const formData = new FormData(formRef.current);

    if (formData.get("company")) {
      setStatus({
        type: "success",
        message: t("contact.success"),
      });
      return;
    }

    setIsSending(true);
    setStatus({
      type: "loading",
      message: t("contact.statusSending"),
    });

    try {
      await emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        formRef.current,
        {
          publicKey: emailJsConfig.publicKey,
        }
      );

      setStatus({
        type: "success",
        message: t("contact.success"),
      });

      formRef.current.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: isRTL
          ? t("contact.error")
          : getContactErrorMessage(error, t("contact.error")),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-page">
      <motion.section
        className="contact"
        aria-labelledby="contact-title"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact__container">
          <motion.header
            className="contact__header"
            initial={{ opacity: 1, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: smoothEase,
            }}
          >
            <p className="contact__eyebrow">{t("contact.eyebrow")}</p>

            <h1 id="contact-title" className="contact__title">
              {t("contact.titleStart")}
              <span>{t("contact.titleHighlight")}</span>
            </h1>

            <p className="contact__introduction">
              {t("contact.introduction")}
            </p>
          </motion.header>

          <div className="contact__layout">
            <motion.aside
              className="contact__details"
              initial={{ opacity: 1, x: isRTL ? 45 : -45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: smoothEase,
              }}
            >
              <p className="contact__details-label">{t("contact.details")}</p>

              <div className="contact__methods">
                {contactMethods.map((method) => {
                  const content = (
                    <>
                      <span className="contact__method-icon">
                        {method.icon}
                      </span>

                      <span>
                        <small>{t(method.labelKey)}</small>
                        {method.id === 4 ? (
                          <strong>{t("hero.location")}</strong>
                        ) : (
                          <TechnicalText as="strong">
                            {method.value}
                          </TechnicalText>
                        )}
                      </span>
                    </>
                  );

                  return method.href ? (
                    <motion.a
                      key={method.id}
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="contact__method"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <div key={method.id} className="contact__method">
                      {content}
                    </div>
                  );
                })}
              </div>
            </motion.aside>

            <motion.form
              ref={formRef}
              className="contact__form"
              onSubmit={handleSubmit}
              aria-busy={isSending}
              initial={{ opacity: 1, y: 55 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: smoothEase,
              }}
            >
              <div className="contact__honeypot" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <input type="hidden" name="from_name" defaultValue="" />
              <input type="hidden" name="from_email" defaultValue="" />
              <input type="hidden" name="reply_to" defaultValue="" />
              <input
                type="hidden"
                name="to_email"
                value={siteContact.email}
                readOnly
              />

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="user_name">{t("contact.name")}</label>

                  <input
                    id="user_name"
                    type="text"
                    name="user_name"
                    placeholder={t("contact.namePlaceholder")}
                    autoComplete="name"
                    minLength="2"
                    required
                    onInput={(event) => {
                      const form = formRef.current;
                      if (!form) return;
                      synchronizeEmailFields(
                        form,
                        event.currentTarget.name,
                        event.currentTarget.value
                      );
                    }}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="user_email">{t("contact.emailLabel")}</label>

                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                    onInput={(event) => {
                      const form = formRef.current;
                      if (!form) return;
                      synchronizeEmailFields(
                        form,
                        event.currentTarget.name,
                        event.currentTarget.value
                      );
                    }}
                  />
                </div>
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="service">{t("contact.service")}</label>

                  <select id="service" name="service" defaultValue="" required>
                    <option value="" disabled>
                      {t("contact.chooseService")}
                    </option>

                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {t(`services.items.${service.id}.title`)}
                      </option>
                    ))}
                    <option value="Other">{t("contact.other")}</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="budget">{t("contact.budget")}</label>

                  <input
                    id="budget"
                    type="text"
                    name="budget"
                    placeholder={t("contact.budgetPlaceholder")}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="message">{t("contact.message")}</label>

                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  placeholder={t("contact.messagePlaceholder")}
                  minLength="10"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="contact__submit"
                disabled={isSending}
                whileHover={!isSending ? { scale: 1.02 } : undefined}
                whileTap={!isSending ? { scale: 0.97 } : undefined}
              >
                <span>
                  {isSending ? t("contact.sending") : t("contact.send")}
                </span>
                <span aria-hidden="true">
                  {isSending ? "..." : isRTL ? "↖" : "↗"}
                </span>
              </motion.button>

              {status.message && (
                <p
                  className={`contact__status contact__status--${status.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
