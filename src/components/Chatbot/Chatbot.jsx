import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaComments, FaPaperPlane, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { siteLinks } from "../../config/site";
import { getBotResponse, quickQuestions } from "../../data/chatbot";
import "./Chatbot.css";

const createMessage = (sender, text) => ({
  id: `${Date.now()}-${Math.random()}`,
  sender,
  text,
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    createMessage(
      "bot",
      "Hello! 👋 I’m Basel’s assistant. You can chat with me in English or العربية."
    ),
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const replyTimerRef = useRef(null);
  const pendingMessageRef = useRef("");

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
            aria-label="Basel virtual assistant"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <header className="chatbot__header">
              <div className="chatbot__identity">
                <span className="chatbot__avatar">B</span>
                <div>
                  <strong>Basel Assistant</strong>
                  <span><i /> Online · عربي / English</span>
                </div>
              </div>
              <motion.button
                type="button"
                className="chatbot__close"
                onClick={closeChatbot}
                aria-label="Close chatbot"
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
                  {message.text}
                </div>
              ))}
              {isTyping && (
                <div
                  className="chatbot__message chatbot__message--bot chatbot__typing"
                  aria-label="Assistant is typing"
                >
                  <span /><span /><span />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot__questions" aria-label="Suggested questions">
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
                placeholder="Ask me anything... اسألني"
                aria-label="Chat message"
                autoComplete="off"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
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
              <FaWhatsapp /> Talk directly with Basel
            </a>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`chatbot__toggle ${isOpen ? "chatbot__toggle--open" : ""}`}
        onClick={toggleChatbot}
        aria-label={isOpen ? "Close chatbot" : "Chat with Basel assistant"}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.92 }}
      >
        <span className="chatbot__toggle-icon">
          {isOpen ? <FaXmark /> : <FaComments />}
        </span>
        {!isOpen && (
          <span className="chatbot__toggle-label">
            <strong>Chatbot</strong>
          </span>
        )}
        {!isOpen && <span className="chatbot__notification">1</span>}
      </motion.button>
    </div>
  );
};

export default Chatbot;
