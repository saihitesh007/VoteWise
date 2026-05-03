import useLanguage from '../../hooks/useLanguage';

export default function LanguageSwitcher() {
  const { language, languageName, changeLanguage } = useLanguage();

  return (
    <div className="relative">
      <label htmlFor="language-switcher" className="sr-only">
        Select language
      </label>
      <select
        id="language-switcher"
        aria-label="Select language"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        className="focus-ring rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:border-brand-orange dark:border-white/10 dark:bg-white/5"
      >
        <option value="en" className="text-ink-primary">English</option>
        <option value="hi" className="text-ink-primary">हिंदी</option>
        <option value="te" className="text-ink-primary">తెలుగు</option>
      </select>
      <span className="sr-only">{languageName}</span>
    </div>
  );
}
