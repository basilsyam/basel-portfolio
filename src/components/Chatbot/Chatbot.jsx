import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaComments, FaPaperPlane, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { siteLinks } from "../../config/site";
import { getBotResponse } from "../../data/chatbot";
import { useLanguage } from "../../context/LanguageContext";
import BidiText from "../common/BidiText";
import "./Chatbot.css";

const createMessage = (sender, text, kind = "") => ({
  id: `${Date.now()}-${Math.random()}`,
  sender,
  text,
  kind,
});

const Chatbot = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => [
    createMessage("bot", t("chatbot.welcome"), "welcome"),
  ]);
  const quickQuestions = t("chatbot.questions");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const replyTimerRef = useRef(null);
  const pendingMessageRef = useRef("");

  useEffect(() => {
    setMessages((current) =>
      current.map((message) =>
        message.kind === "welcome"
          ? { ...message, text: t("chatbot.welcome") }
          : message,
      ),
    );
  }, [language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => () => clearTimeout(replyTimerRef.current), []);

  const sendMessage = (messageText) => {
    const cleanMessage = messageText.trim();
    if (!cleanMessage || isTyping) return;

    setMessages((current) => [
      ...current,
      createMessage("user", cleanMessage),
    ]);
    setInput("");
    setIsTyping(true);
    pendingMessageRef.current = cleanMessage;

    replyTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        createMessage("bot", getBotResponse(cleanMessage)),
      ]);
      setIsTyping(false);
      pendingMessageRef.current = "";
      replyTimerRef.current = null;
    }, 550);
  };

  const closeChatbot = () => {
    if (replyTimerRef.current && pendingMessageRef.current) {
      clearTimeout(replyTimerRef.current);
      setMessages((current) => [
        ...current,
        createMessage("bot", getBotResponse(pendingMessageRef.current)),
      ]);
      setIsTyping(false);
      pendingMessageRef.current = "";
      replyTimerRef.current = null;
    }

    setIsOpen(false);
  };

  const toggleChatbot = () => {
    if (isOpen) {
      closeChatbot();
    } else {
      setIsOpen(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chatbot">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="chatbot__window"
            role="dialog"
            aria-modal="false"
            aria-label={t("chatbot.windowLabel")}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <header className="chatbot__header">
              <div className="chatbot__identity">
                <span className="chatbot__avatar">B</span>
                <div>
                  <strong>{t("chatbot.assistant")}</strong>
                  <span><i /> {t("chatbot.online")}</span>
                </div>
              </div>
              <motion.button
                type="button"
                className="chatbot__close"
                onClick={closeChatbot}
                aria-label={t("chatbot.close")}
                whileTap={{ scale: 0.9 }}
              >
                <FaXmark />
              </motion.button>
            </header>

            <div className="chatbot__messages" aria-live="polite">
              {messages.map((message) => (
                <div
                  key={message.id}
                  dir="auto"
                  className={`chatbot__message chatbot__message--${message.sender}`}
                >
                  <BidiText>{message.text}</BidiText>
                </div>
              ))}
              {isTyping && (
                <div
                  className="chatbot__message chatbot__message--bot chatbot__typing"
                  aria-label={t("chatbot.typing")}
                >
                  <span /><span /><span />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div
              className="chatbot__questions"
              aria-label={t("chatbot.suggestions")}
            >
              {quickQuestions.map((question) => (
                <motion.button
                  key={question.label}
                  type="button"
                  onClick={() => sendMessage(question.message)}
                  disabled={isTyping}
                  whileTap={{ scale: 0.95 }}
                >
                  {question.label}
                </motion.button>
              ))}
            </div>

            <form className="chatbot__form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("chatbot.placeholder")}
                aria-label={t("chatbot.inputLabel")}
                autoComplete="off"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label={t("chatbot.send")}
                whileTap={{ scale: 0.9 }}
              >
                <FaPaperPlane />
              </motion.button>
            </form>

            <a
              className="chatbot__whatsapp"
              href={siteLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> {t("chatbot.whatsapp")}
            </a>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`chatbot__toggle ${isOpen ? "chatbot__toggle--open" : ""}`}
        onClick={toggleChatbot}
        aria-label={isOpen ? t("chatbot.close") : t("chatbot.open")}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.92 }}
      >
        <span className="chatbot__toggle-icon">
          {isOpen ? <FaXmark /> : <FaComments />}
        </span>
        {!isOpen && (
          <span className="chatbot__toggle-label">
            <strong>{t("chatbot.label")}</strong>
          </span>
        )}
        {!isOpen && <span className="chatbot__notification">1</span>}
      </motion.button>
    </div>
  );
};

export default Chatbot;
