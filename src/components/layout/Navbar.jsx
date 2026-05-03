import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from '../common/DarkModeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'nav.home', href: '/' },
    { name: 'nav.learn', href: '/learn' },
    { name: 'nav.quiz', href: '/quiz' },
    { name: 'nav.chat', href: '/chat' },
    { name: 'nav.glossary', href: '/glossary' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-brand-navy text-white backdrop-blur-md dark:border-white/10 dark:bg-[#010409]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <NavLink to="/" className="focus-ring flex items-center gap-2 font-black tracking-tight text-white no-underline" aria-label="VoteWise home">
          <span aria-hidden="true" className="text-2xl">🗳</span>
          <span className="text-xl text-white">VoteWise</span>
        </NavLink>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                `focus-ring relative border-b-2 px-1 py-2 text-sm font-semibold no-underline ${
                  isActive
                    ? 'border-brand-saffron text-brand-saffron'
                    : 'border-transparent text-gray-300 hover:border-brand-orange hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.span whileHover={{ y: -1 }} className="inline-block">
                    {t(link.name)}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-saffron"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="focus-ring rounded-full border border-white/20 p-2.5 text-white hover:border-brand-orange hover:text-brand-saffron md:hidden"
        >
          <span aria-hidden="true" className="block text-base leading-none">
            {mobileOpen ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/10 bg-brand-navy dark:bg-[#010409]"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.href === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `focus-ring block rounded-2xl border-l-4 px-4 py-3 text-base font-bold no-underline ${
                        isActive
                          ? 'border-brand-saffron bg-orange-950/20 text-brand-saffron'
                          : 'border-transparent text-gray-300 hover:border-brand-orange hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {t(link.name)}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <LanguageSwitcher />
                <DarkModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
