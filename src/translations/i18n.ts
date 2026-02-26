import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en.json";
import translationRU from "./ru.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

const detectionOptions = {
  order: ["localStorage", "navigator", "htmlTag"] as const,

  caches: ["localStorage"] as const,

  lookupLocalStorage: "i18nextLng",

  excludeCacheFor: ["cookie"] as const,

  checkWhitelist: true,

  supportedLngs: ['en', 'ru'] as const
};

const i18nInitPromise = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    detection: detectionOptions,
    interpolation: { escapeValue: false },
  });

export default i18nInitPromise;



