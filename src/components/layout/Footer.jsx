import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from '../common/DarkModeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';

const footerLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/learn', label: 'nav.learn' },
  { to: '/quiz', label: 'nav.quiz' },
  { to: '/chat', label: 'nav.chat' },
  { to: '/glossary', label: 'nav.glossary' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-white/10 dark:bg-[#010409]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="text-lg font-black text-gray-900 dark:text-white">VoteWise</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">VoteWise — Empowering voters through education</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Data sourced from Election Commission of India (eci.gov.in)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Not affiliated with ECI or any political party</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Pages</p>
            <div className="flex flex-wrap gap-2">
              {footerLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `focus-ring rounded-full border px-3 py-1.5 text-sm no-underline ${
                      isActive
                        ? 'border-brand-saffron bg-orange-50 text-brand-saffron dark:border-brand-saffron dark:bg-orange-950/20'
                        : 'border-gray-200 text-gray-600 hover:-translate-y-0.5 hover:border-brand-orange hover:text-brand-orange dark:border-white/10 dark:text-gray-400 dark:hover:text-brand-saffron'
                    }`
                  }
                >
                  {t(label)}
                </NavLink>
              ))}
            </div>
          </nav>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Preferences</p>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <DarkModeToggle />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 dark:border-white/10">
          <p className="text-xs text-gray-400 dark:text-gray-500">© {new Date().getFullYear()} VoteWise. Built to educate every Indian voter.</p>
        </div>
      </div>
    </footer>
  );
}
