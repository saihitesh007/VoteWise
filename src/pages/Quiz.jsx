import QuizGame from '../components/quiz/QuizGame';

export default function Quiz() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-black">Election Quiz</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Test your knowledge with 15 timed questions on EVMs, voter rights, institutions, and election basics.
        </p>
      </section>
      <QuizGame />
    </div>
  );
}
