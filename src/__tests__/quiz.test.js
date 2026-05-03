import { describe, expect, it } from 'vitest';
import { questions } from '../data/quizQuestions';
import { applyScore, nextQuestionOnTimeout, shuffleQuestions } from '../components/quiz/QuizGame';

describe('quiz helpers', () => {
  it('shuffling questions returns the same 15 questions', () => {
    const shuffled = shuffleQuestions(questions);
    expect(shuffled).toHaveLength(15);
    expect(shuffled.map((item) => item.id).sort((a, b) => a - b)).toEqual(
      questions.map((item) => item.id).sort((a, b) => a - b)
    );
  });

  it('score increments correctly on correct answer', () => {
    expect(applyScore(4, true)).toBe(5);
    expect(applyScore(4, false)).toBe(4);
  });

  it('timer reaching 0 moves to next question', () => {
    expect(nextQuestionOnTimeout(6)).toBe(7);
  });
});
