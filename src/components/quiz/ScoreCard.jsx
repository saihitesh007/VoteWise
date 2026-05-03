import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isFirebaseConfigured } from '../../services/firebase';
import { saveQuizScore, getLeaderboard } from '../../services/firestoreService';

export const getGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

const messages = {
  A: 'Excellent work. You are ready to guide others too.',
  B: 'Strong understanding. A quick review will make you even sharper.',
  C: 'Good effort. Revisit a few topics and try again.',
  D: 'You have the basics. Another round will help.',
  F: 'Start again and keep learning. Every attempt improves civic knowledge.',
};

export default function ScoreCard({ score, total, highScore, onRestart }) {
  const { t, i18n } = useTranslation();
  const percentage = Math.round((score / total) * 100);
  const grade = getGrade(percentage);

  // 'idle' | 'saving' | 'saved' | 'error'
  const [saveStatus, setSaveStatus] = useState(isFirebaseConfigured ? 'saving' : 'idle');
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let cancelled = false;

    async function persist() {
      // Save score
      const saved = await saveQuizScore({
        score,
        total,
        percentage,
        language: i18n.language?.slice(0, 2) || 'en',
      });
      if (!cancelled) setSaveStatus(saved ? 'saved' : 'error');

      // Fetch leaderboard regardless of whether save succeeded
      const board = await getLeaderboard();
      if (!cancelled) {
        setLeaderboard(board);
        setLeaderboardLoading(false);
      }
    }

    persist();
    return () => { cancelled = true; };
    // Run once when component mounts (score/total are stable at this point)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">

      {/* ── Score Card ───────────────────────────────────────────── */}
      <div className="rounded-[2rem] border border-gray-200 bg-surface-card p-8 text-center shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-saffron">
          {t('quiz.score')}
        </p>
        <h2 className="mt-3 text-5xl font-black text-brand-orange">{score}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{percentage}% correct</p>

        <div className="mt-6 inline-flex rounded-full border border-amber-300 bg-amber-50 px-5 py-3 text-lg font-bold text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
          Grade {grade}
        </div>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">{messages[grade]}</p>
        <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">
          High score: {highScore}
        </p>

        {/* Firebase save status badge */}
        {saveStatus !== 'idle' && (
          <p
            aria-live="polite"
            className={`mt-3 text-xs font-medium ${
              saveStatus === 'saved'
                ? 'text-green-600 dark:text-green-400'
                : saveStatus === 'error'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {saveStatus === 'saving' && '⏳ Saving score…'}
            {saveStatus === 'saved'  && '✅ Score saved to leaderboard'}
            {saveStatus === 'error'  && '⚠️ Could not save — check Firebase config'}
          </p>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="btn-primary mt-8 px-8 py-3.5 font-bold"
        >
          {t('quiz.restart')}
        </button>
      </div>

      {/* ── Leaderboard ──────────────────────────────────────────── */}
      {isFirebaseConfigured && (
        <section
          aria-labelledby="leaderboard-heading"
          className="rounded-[2rem] border border-gray-200 bg-surface-card p-6 shadow-soft dark:border-white/10 dark:bg-surface-darkCard"
        >
          <h3 id="leaderboard-heading" className="text-xl font-bold">
            🏆 Top 10 Leaderboard
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Best scores from all players
          </p>

          {leaderboardLoading ? (
            <div className="mt-6 flex items-center justify-center py-8">
              <span className="animate-pulse text-sm text-gray-400">
                Loading leaderboard…
              </span>
            </div>
          ) : leaderboard.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              No scores yet — be the first on the board!
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm" aria-label="Quiz leaderboard">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="col" className="pb-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                      Rank
                    </th>
                    <th scope="col" className="pb-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                      Score
                    </th>
                    <th scope="col" className="pb-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                      Percentage
                    </th>
                    <th scope="col" className="pb-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {leaderboard.map((entry, idx) => (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        idx === 0
                          ? 'font-bold text-amber-600 dark:text-amber-400'
                          : idx === 1
                            ? 'font-semibold text-gray-500 dark:text-gray-300'
                            : idx === 2
                              ? 'font-semibold text-orange-600 dark:text-orange-400'
                              : ''
                      }`}
                    >
                      <td className="py-3 pr-4">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </td>
                      <td className="py-3 pr-4">
                        {entry.score}/{entry.total}
                      </td>
                      <td className="py-3 pr-4">{entry.percentage}%</td>
                      <td className="py-3 text-gray-500 dark:text-gray-400">
                        {entry.timestamp?.toDate?.()
                          ? entry.timestamp.toDate().toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
