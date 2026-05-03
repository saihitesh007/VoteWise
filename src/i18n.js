import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const testResources = {
  en: {
    translation: {
      nav: { home: 'Home', learn: 'Learn', quiz: 'Quiz', chat: 'Ask AI', glossary: 'Glossary' },
      hero: { title: 'Learn How India Votes', subtitle: 'Understand the election process, your rights, and how to participate', cta: 'Start Learning' },
      journey: { title: 'Your Voter Journey', step: 'Step' },
      quiz: { title: 'Test Your Knowledge', start: 'Start Quiz', next: 'Next', score: 'Your Score', restart: 'Try Again' },
      chat: { title: 'Ask VoteBot', placeholder: 'Ask anything about elections...', send: 'Send', thinking: 'Thinking...' },
      glossary: { title: 'Election Glossary', search: 'Search terms...' },
      evm: { title: 'How the EVM Works' },
      tts: { listen: 'Listen', stop: 'Stop' },
    },
  },
};

const backend = {
  type: 'backend',
  read(language, namespace, callback) {
    fetch(`/locales/${language}/${namespace}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load ${language}/${namespace}`);
        }
        return response.json();
      })
      .then((data) => callback(null, data))
      .catch((error) => callback(error, false));
  },
};

const baseConfig = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'hi', 'te'],
  load: 'languageOnly',
  nonExplicitSupportedLngs: true,
  ns: ['translation'],
  defaultNS: 'translation',
  detection: {
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: 'votewise-lang',
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

if (import.meta.env.MODE === 'test') {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    ...baseConfig,
    resources: testResources,
  });
} else {
  i18n.use(backend).use(LanguageDetector).use(initReactI18next).init(baseConfig);
}

export default i18n;
