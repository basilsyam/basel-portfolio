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

import "./Contact.css";

const contactMethods = [
  {
    id: 1,
    label: "Email",
    value: siteContact.email,
    href: siteLinks.email,
    icon: <FaEnvelope />,
  },
  {
    id: 2,
    label: "WhatsApp",
    value: siteContact.phoneDisplay,
    href: siteLinks.whatsapp,
    icon: <FaWhatsapp />,
  },
  {
    id: 3,
    label: "Phone",
    value: siteContact.phoneDisplay,
    href: siteLinks.phone,
    icon: <FaPhone />,
  },
  {
    id: 4,
    label: "Location",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSending || !formRef.current) return;

    const emailJsConfig = getEmailJsConfig();

    if (!emailJsConfig) {
      setStatus({
        type: "error",
        message:
          "Email configuration is missing. Please check the .env file.",
      });
      return;
    }

    const formData = new FormData(formRef.current);

    if (formData.get("company")) {
      setStatus({
        type: "success",
        message: "Your message was sent successfully.",
      });
      return;
    }

    setIsSending(true);
    setStatus({
      type: "loading",
      message: "Sending your message...",
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
        message: "Your message was sent successfully!",
      });

      formRef.current.reset();
    } catch (error) {


      setStatus({
        type: "error",
        message: getContactErrorMessage(error),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="contact-page">
      <motion.section
        className="contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact__container">
          <motion.header
            className="contact__header"
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: smoothEase,
            }}
          >
            <p className="contact__eyebrow">Get in touch</p>

            <h1 className="contact__title">
              Let&apos;s build something
              <span> meaningful together.</span>
            </h1>

            <p className="contact__introduction">
              Have a project, opportunity or idea? Send me a message and
              I&apos;ll get back to you as soon as possible.
            </p>
          </motion.header>

          <div className="contact__layout">
            <motion.aside
              className="contact__details"
              initial={{ opacity: 0, x: -45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: smoothEase,
              }}
            >
              <p className="contact__details-label">Contact details</p>

              <div className="contact__methods">
                {contactMethods.map((method) => {
                  const content = (
                    <>
                      <span className="contact__method-icon">
                        {method.icon}
                      </span>

                      <span>
                        <small>{method.label}</small>
                        <strong>{method.value}</strong>
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
              initial={{ opacity: 0, y: 55 }}
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
                  <label htmlFor="user_name">Your name</label>

                  <input
                    id="user_name"
                    type="text"
                    name="user_name"
                    placeholder="Enter your name"
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
                  <label htmlFor="user_email">Your email</label>

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
                  <label htmlFor="service">Service</label>

                  <select id="service" name="service" defaultValue="" required>
                    <option value="" disabled>
                      Choose a service
                    </option>

                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="budget">Estimated budget</label>

                  <input
                    id="budget"
                    type="text"
                    name="budget"
                    placeholder="Example: $500"
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="message">Tell me about your project</label>

                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  placeholder="Write your message here..."
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
                <span>{isSending ? "Sending..." : "Send message"}</span>
                <span aria-hidden="true">{isSending ? "..." : "↗"}</span>
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


    </main>
  );
};

export default Contact;
