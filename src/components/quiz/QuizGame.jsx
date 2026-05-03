import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { questions } from '../../data/quizQuestions';
import ScoreCard from './ScoreCard';

export const shuffleQuestions = (items) => {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
};

export const applyScore = (score, isCorrect) => (isCorrect ? score + 1 : score);
export const nextQuestionOnTimeout = (currentIndex) => currentIndex + 1;
export const QUESTION_TIME_LIMIT = 15;

export default function QuizGame() {
  const { t } = useTranslation();
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionSet, setQuestionSet] = useState(() => shuffleQuestions(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('votewise-highscore') || 0));
  const [revealed, setRevealed] = useState(false);

  const currentQuestion = questionSet[currentIndex];
  const isFinished = currentIndex >= questionSet.length;

  useEffect(() => {
    if (!quizStarted || revealed || isFinished) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRevealed(true);
          window.setTimeout(() => {
            setSelectedOption(null);
            setRevealed(false);
            setTimeLeft(QUESTION_TIME_LIMIT);
            setCurrentIndex((index) => nextQuestionOnTimeout(index));
          }, 900);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [quizStarted, revealed, isFinished, currentIndex]);

  useEffect(() => {
    const latestHighScore = Math.max(highScore, score);
    if (latestHighScore !== highScore) {
      setHighScore(latestHighScore);
      localStorage.setItem('votewise-highscore', String(latestHighScore));
    }
  }, [score, highScore]);

  const scoreLabel = useMemo(() => `${score}/${questions.length} correct`, [score]);

  const handleAnswer = (optionIndex) => {
    if (revealed) return;
    setSelectedOption(optionIndex);
    setRevealed(true);
    const isCorrect = optionIndex === currentQuestion.answer;
    setScore((current) => applyScore(current, isCorrect));
  };

  const handleNext = () => {
    setSelectedOption(null);
    setRevealed(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setCurrentIndex((index) => index + 1);
  };

  const restartQuiz = () => {
    setQuizStarted(true);
    setQuestionSet(shuffleQuestions(questions));
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setRevealed(false);
  };

  if (!quizStarted) {
    return (
      <section className="rounded-[2rem] border border-gray-200 bg-surface-card p-8 text-center shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
        <h1 className="text-3xl font-bold"> {t('quiz.title')} </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Answer 15 election questions with a 15-second timer on each one.</p>
        <button type="button" onClick={() => setQuizStarted(true)} className="btn-primary mt-8 px-8 py-3.5 font-bold">
          {t('quiz.start')}
        </button>
      </section>
    );
  }

  if (isFinished) {
    return <ScoreCard score={score} total={questions.length} highScore={highScore} onRestart={restartQuiz} />;
  }

  return (
    <section className="rounded-[2rem] border border-gray-200 bg-surface-card p-6 shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-saffron">Quiz Progress</p>
          <h1 className="mt-1 text-2xl font-black">{scoreLabel}</h1>
        </div>
        <div className={`rounded-full px-4 py-2 text-sm font-semibold ${timeLeft <= 5 ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300' : 'bg-gray-100 dark:bg-brand-navyMid text-gray-700 dark:text-gray-200'}`}>
          {timeLeft}s left
        </div>
      </div>

      <div className="mt-6 h-2.5 rounded-full bg-gray-200 dark:bg-brand-navyDeep">
        <div className="h-2.5 rounded-full bg-brand-orange transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion.id} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-ink-mutedDark">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h2 className="mt-3 text-2xl font-bold">{currentQuestion.question}</h2>
          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map((option, optionIndex) => {
              const isCorrect = optionIndex === currentQuestion.answer;
              const isWrongPick = selectedOption === optionIndex && !isCorrect;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(optionIndex)}
                  disabled={revealed}
                  className={`focus-ring rounded-2xl border-2 px-4 py-4 text-left text-sm font-medium ${
                    revealed && isCorrect
                      ? 'border-brand-green bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300'
                      : isWrongPick
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300'
                        : 'bg-white border-gray-200 hover:-translate-y-0.5 hover:border-brand-saffron hover:bg-orange-50 dark:bg-surface-darkCard dark:border-gray-700 dark:hover:bg-surface-darkHover'
                  }`}
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-600 dark:bg-brand-navyMid dark:text-gray-200">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          {revealed && (
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-gray-700 dark:border-brand-orange/40 dark:bg-orange-950/20 dark:text-gray-200">
              {currentQuestion.explanation}
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleNext} disabled={!revealed} className="btn-primary px-6 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50">
              {t('quiz.next')}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
