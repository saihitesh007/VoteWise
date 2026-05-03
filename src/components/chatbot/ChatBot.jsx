import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { askVoteBot } from '../../services/gemini';
import { updateUserStats } from '../../services/firestoreService';
import ChatMessage from './ChatMessage';

const suggestions = [
  'How do I register to vote?',
  'What is EVM?',
  'What is NOTA?',
  'How are votes counted?',
];

const formatTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

const sanitizeMessage = (value) => value.replace(/\s+/g, ' ').trim().slice(0, 500);

export default function ChatBot() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentAt, setLastSentAt] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  const history = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
      })),
    [messages]
  );

  const handleSend = async (seedMessage) => {
    const raw = typeof seedMessage === 'string' ? seedMessage : input;
    const message = sanitizeMessage(raw);

    if (!message || isLoading) return;

    const now = Date.now();
    if (now - lastSentAt < 2000) return; // rate limit: 1 request per 2s

    setLastSentAt(now);
    setIsLoading(true);
    setInput('');

    const nextMessages = [
      ...messages,
      { role: 'user', text: message, timestamp: formatTime() },
    ];
    setMessages(nextMessages);

    // Track message in Firestore (fire-and-forget — non-blocking)
    updateUserStats();

    const reply = await askVoteBot(message, history);
    setMessages((current) => [
      ...current,
      { role: 'model', text: reply, timestamp: formatTime() },
    ]);
    setIsLoading(false);
  };

  return (
    <section className="flex h-[78vh] min-h-[42rem] flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-surface-card shadow-soft dark:border-white/10 dark:bg-surface-darkCard">
      <div className="border-b border-gray-200 px-6 py-5 dark:border-white/10">
        <h1 className="text-2xl font-bold">{t('chat.title')}</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Neutral, language-aware election guidance for Indian citizens.
        </p>
      </div>

      <div ref={containerRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 text-5xl" aria-hidden="true">🤖</div>
            <p className="max-w-md text-gray-600 dark:text-gray-300">
              Ask about voter registration, EVMs, NOTA, polling booths, or how results are declared.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {suggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSend(question)}
                  className="focus-ring rounded-full border border-gray-200 px-4 py-2 text-sm hover:-translate-y-0.5 hover:border-brand-orange hover:text-brand-orange dark:border-gray-700 dark:hover:border-brand-orange dark:hover:text-brand-saffron"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={`${message.timestamp}-${index}`} message={message} />
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 dark:bg-brand-navyDeep/40">
              🤖
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-700 dark:bg-surface-darkCard">
              <div className="flex items-center gap-1" aria-label={t('chat.thinking')}>
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-2.5 w-2.5 rounded-full bg-brand-orange"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4 dark:border-white/10">
        <label htmlFor="chat-input" className="sr-only">
          {t('chat.placeholder')}
        </label>
        <div className="flex items-end gap-3">
          <textarea
            id="chat-input"
            rows={2}
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, 500))}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder={t('chat.placeholder')}
            className="focus-ring input-shell min-h-[56px] flex-1 resize-none bg-white text-sm dark:bg-surface-darkCard"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            aria-label={t('chat.send')}
            className="btn-primary rounded-2xl px-6 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
          >
            {t('chat.send')}
          </button>
        </div>
      </div>
    </section>
  );
}
