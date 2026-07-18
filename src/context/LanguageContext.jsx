import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "../i18n/locales/en.json";
import ar from "../i18n/locales/ar.json";

const STORAGE_KEY = "basel-portfolio-language";
const translations = { en, ar };
const LanguageContext = createContext(null);

const getStoredLanguage = () => {
  if (typeof window === "undefined") return "en";

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === "ar" ? "ar" : "en";
};

const getNestedValue = (source, path) =>
  path.split(".").reduce((value, key) => value?.[key], source);

const interpolate = (value, variables) =>
  value.replace(/\{(\w+)\}/g, (match, key) =>
    variables[key] === undefined ? match : String(variables[key])
  );

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getStoredLanguage);
  const isRTL = language === "ar";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = isRTL ? "rtl" : "ltr";
    document.title = translations[language].meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      translations[language].meta.description,
    );
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [isRTL, language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "ar" : "en"
    );
  }, []);

  const t = useCallback(
    (path, variables = {}) => {
      const value =
        getNestedValue(translations[language], path) ??
        getNestedValue(translations.en, path) ??
        path;

      return typeof value === "string"
        ? interpolate(value, variables)
        : value;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, isRTL, setLanguage, t, toggleLanguage }),
    [isRTL, language, t, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};
