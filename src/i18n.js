import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";
import translationES from "./locales/es/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationIT from "./locales/it/translation.json";
import translationJA from "./locales/ja/translation.json";
import translationNL from "./locales/nl/translation.json";
import translationPL from "./locales/pl/translation.json";
import translationPT from "./locales/pt/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationZH from "./locales/zh/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },

  de: {
    translation: translationDE,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  it: {
    translation: translationIT,
  },
  ja: {
    translation: translationJA,
  },
  nl: {
    translation: translationNL,
  },
  pl: {
    translation: translationPL,
  },
  ru: {
    translation: translationRU,
  },
  pt: {
    translation: translationPT,
  },
  zh: {
    translation: translationZH,
  },
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("yearnfinewLang").toLowerCase() || "en",
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
