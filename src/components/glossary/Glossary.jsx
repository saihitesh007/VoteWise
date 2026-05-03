import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { terms } from '../../data/glossaryTerms';
import TTSButton from '../common/TTSButton';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const highlightText = (text, query) => {
  if (!query) return text;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="rounded bg-yellow-200 px-1 text-gray-900">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
};

export default function Glossary() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [openTerm, setOpenTerm] = useState(null);

  const filteredTerms = useMemo(() => {
    const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term));
    if (!search.trim()) return sortedTerms;

    const query = search.toLowerCase();
    return sortedTerms.filter(
      (entry) => entry.term.toLowerCase().includes(query) || entry.definition.toLowerCase().includes(query)
    );
  }, [search]);

  const groupedTerms = useMemo(
    () =>
      alphabet.reduce((groups, letter) => {
        groups[letter] = filteredTerms.filter((entry) => entry.term.toUpperCase().startsWith(letter));
        return groups;
      }, {}),
    [filteredTerms]
  );

  return (
    <section className="rounded-[2rem] border border-gray-200 bg-surface-card p-6 shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('glossary.title')}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{filteredTerms.length} terms</p>
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="glossary-search" className="sr-only">
            {t('glossary.search')}
          </label>
          <input
            id="glossary-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('glossary.search')}
            className="focus-ring input-shell w-full bg-white dark:bg-surface-darkCard"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {alphabet.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="focus-ring rounded-full border border-gray-200 px-3 py-1 text-xs font-bold no-underline hover:border-brand-orange hover:text-brand-orange dark:border-gray-700 dark:hover:border-brand-orange dark:hover:text-brand-saffron"
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {alphabet.map((letter) => {
          const list = groupedTerms[letter];
          if (!list.length) return null;

          return (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="mb-4 text-2xl font-bold">{letter}</h2>
              <div className="space-y-3">
                {list.map((entry) => {
                  const expanded = openTerm === entry.term;
                  return (
                    <article key={entry.term} className="rounded-lg border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-surface-darkCard hover:border-brand-orange hover:bg-orange-50 dark:hover:bg-surface-darkHover">
                      <button
                        type="button"
                        onClick={() => setOpenTerm(expanded ? null : entry.term)}
                        className={`focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left ${expanded ? 'border-l-4 border-brand-orange' : ''}`}
                        aria-expanded={expanded}
                      >
                        <h3 className="text-lg font-semibold">{highlightText(entry.term, search)}</h3>
                        <span aria-hidden="true">{expanded ? '−' : '+'}</span>
                      </button>
                      {expanded && (
                        <div className="border-t border-gray-200 px-5 py-4 dark:border-gray-700">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-sm leading-6 text-gray-700 dark:text-gray-200">
                              {highlightText(entry.definition, search)}
                            </p>
                            <TTSButton text={`${entry.term}. ${entry.definition}`} />
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
