import { useTranslation } from 'react-i18next';

const LANGUAGE_MAP = {
  en: 'English',
  hi: 'हिंदी',
  te: 'తెలుగు',
};

export default function useLanguage() {
  const { i18n } = useTranslation();
  const language = i18n.language?.slice(0, 2) || 'en';

  const changeLanguage = async (nextLanguage) => {
    await i18n.changeLanguage(nextLanguage);
    window.localStorage.setItem('votewise-lang', nextLanguage);
  };

  return {
    language,
    languageName: LANGUAGE_MAP[language] || LANGUAGE_MAP.en,
    changeLanguage,
    options: LANGUAGE_MAP,
  };
}
