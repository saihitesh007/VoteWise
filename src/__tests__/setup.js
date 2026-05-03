import '@testing-library/jest-dom';
import { vi } from 'vitest';

class MockSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
    this.lang = '';
    this.rate = 1;
    this.pitch = 1;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
  }
}

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        nav: { home: 'Home', learn: 'Learn', quiz: 'Quiz', chat: 'Ask AI', glossary: 'Glossary' },
        hero: { title: 'Learn How India Votes', subtitle: 'Understand the election process, your rights, and how to participate', cta: 'Start Learning' },
        journey: { title: 'Your Voter Journey', step: 'Step' },
        quiz: { title: 'Test Your Knowledge', start: 'Start Quiz', next: 'Next', score: 'Your Score', restart: 'Try Again' },
        chat: { title: 'Ask VoteBot', placeholder: 'Ask anything about elections...', send: 'Send', thinking: 'Thinking...' },
        glossary: { title: 'Election Glossary', search: 'Search terms...' },
        evm: { title: 'How the EVM Works' },
        tts: { listen: 'Listen', stop: 'Stop' },
      }),
  })
);

global.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn((utterance) => {
      utterance.onstart?.();
    }),
    cancel: vi.fn(),
  },
});

await import('../i18n');
