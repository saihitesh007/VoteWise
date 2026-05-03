import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const stats = [
  { value: '900M+', label: 'Eligible voters in India', icon: '👥' },
  { value: '543', label: 'Lok Sabha constituencies', icon: '🏛️' },
  { value: '1950', label: 'Voter helpline number', icon: '📞' },
  { value: '1982', label: 'Year EVMs were introduced', icon: '🗳️' },
];

const features = [
  { icon: '🛤️', title: 'Voter Journey', description: 'Animated stepper walkthrough from eligibility to result declaration.', link: '/learn', badge: 'Journey', badgeClass: 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-700' },
  { icon: '🤖', title: 'AI Election Assistant', description: 'Gemini-powered Q&A focused only on Indian election education.', link: '/chat', badge: 'AI', badgeClass: 'bg-indigo-50 text-indigo-800 border border-indigo-300 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-700' },
  { icon: '🎯', title: 'Test Your Knowledge', description: 'Timed quiz game with 15 questions, explanations, and scoring.', link: '/quiz', badge: 'Quiz', badgeClass: 'bg-green-50 text-green-800 border border-green-300 dark:bg-green-950/30 dark:text-green-300 dark:border-green-700' },
];

const facts = [
  { emoji: '🌍', text: "India has the world's largest democratic election system" },
  { emoji: '🏫', text: 'Over 1 million polling stations are set up across India' },
  { emoji: '🔒', text: 'EVMs are standalone devices — never connected to any network' },
  { emoji: '🖐️', text: 'The ink used on voter fingers takes about 2 weeks to fade' },
  { emoji: '⚖️', text: 'NOTA was introduced in 2013 following a Supreme Court order' },
];

const howItWorks = [
  { step: '1', icon: '📝', title: 'Register', description: 'Fill Form 6 at voters.eci.gov.in to add your name to the electoral roll.' },
  { step: '2', icon: '🗳️', title: 'Vote', description: 'Visit your polling booth, verify identity, and cast your vote on the EVM.' },
  { step: '3', icon: '📊', title: 'Track Results', description: 'Follow counting day and official result declarations from the ECI.' },
];

export default function Home() {
  const { t } = useTranslation();
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFactIndex((current) => (current + 1) % facts.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="space-y-14">
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-14 sm:py-20"
        style={{ background: 'linear-gradient(135deg, rgba(255,153,51,0.18) 0%, #ffffff 48%, rgba(19,136,8,0.16) 100%)' }}
        aria-label="Hero section"
      >
        <div className="pointer-events-none absolute inset-0 hidden rounded-[2.5rem] bg-gradient-to-br from-brand-navy via-surface-dark to-brand-navyMid opacity-90 dark:block" aria-hidden="true" />

        <div className="relative max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/85 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-amber-800 backdrop-blur-sm dark:border-amber-700 dark:bg-amber-950/20 dark:text-amber-300"
          >
            <span>🇮🇳</span> Election Education Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-5xl font-black tracking-tight sm:text-6xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-8 text-ink-secondary dark:text-ink-onDark"
          >
            Understand your rights, the election process, and how every vote matters
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap gap-4">
            <Link to="/learn" className="btn-primary px-7 py-3.5 font-bold no-underline">
              {t('hero.cta')}
            </Link>
            <Link to="/quiz" className="btn-secondary px-7 py-3.5 font-bold no-underline">
              Test Your Knowledge
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section aria-label="Key statistics about Indian elections">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-gray-200 bg-surface-card p-6 shadow-soft dark:border-white/10 dark:bg-surface-darkCard"
            >
              <div className="text-3xl" aria-hidden="true">{stat.icon}</div>
              <p className="mt-3 text-4xl font-black text-brand-orange">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-100">{stat.label}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="explore-heading">
        <h2 id="explore-heading" className="text-3xl font-black">Explore VoteWise</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Everything you need to be an informed voter.</p>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-soft hover:-translate-y-1.5 hover:border-brand-saffron hover:shadow-civic dark:border-gray-700 dark:bg-surface-darkCard dark:hover:border-brand-orange"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl dark:bg-brand-navyMid">
                  <span aria-hidden="true">{feature.icon}</span>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${feature.badgeClass}`}>{feature.badge}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{feature.description}</p>
              <Link to={feature.link} className="btn-primary mt-6 inline-flex self-start px-5 py-2.5 text-sm font-bold no-underline">
                Open
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="facts-heading" className="overflow-hidden rounded-[2rem] border border-gray-200 bg-surface-card shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
        <div className="p-8">
          <h2 id="facts-heading" className="text-3xl font-black">Did You Know?</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Rotating every 5 seconds</p>

          <div className="mt-6 min-h-[96px] rounded-[1.5rem] bg-gradient-to-br from-orange-50 via-white to-green-50 p-6 dark:from-brand-navyMid dark:via-surface-darkCard dark:to-brand-navy">
            <AnimatePresence mode="wait">
              <motion.div
                key={factIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-4"
              >
                <span className="shrink-0 text-4xl" aria-hidden="true">{facts[factIndex].emoji}</span>
                <p className="text-lg font-semibold leading-7 text-gray-800 dark:text-gray-100">{facts[factIndex].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Facts navigation">
            {facts.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === factIndex}
                aria-label={`Fact ${index + 1}`}
                onClick={() => setFactIndex(index)}
                className={`focus-ring h-2 rounded-full ${index === factIndex ? 'w-8 bg-brand-orange' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="rounded-[2rem] border border-gray-200 bg-surface-card p-8 shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
        <h2 id="how-heading" className="text-3xl font-black">How It Works</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">From citizen to informed voter in three simple steps.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {howItWorks.map(({ step, icon, title, description }) => (
            <article key={title} className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-surface-darkHover">
              <span className="inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-black text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                Step {step}
              </span>
              <div className="mt-4 text-3xl" aria-hidden="true">{icon}</div>
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
            </article>
          ))}
        </div>
        <Link to="/learn" className="btn-primary mt-8 inline-flex items-center gap-2 px-6 py-3 font-bold no-underline">
          Start the Full Journey
        </Link>
      </section>
    </div>
  );
}
