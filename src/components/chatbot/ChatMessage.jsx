import TTSButton from '../common/TTSButton';

export default function ChatMessage({ message }) {
  const isBot = message.role === 'model';

  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-lg text-brand-orange dark:bg-brand-navyDeep/40 dark:text-brand-saffron">
          🤖
        </div>
      )}
      <div
        className={`max-w-xl border px-4 py-3 shadow-sm ${
          isBot
            ? 'rounded-2xl rounded-bl-sm border-gray-200 bg-gray-100 text-gray-800 dark:border-gray-700 dark:bg-surface-darkCard dark:text-gray-200'
            : 'rounded-2xl rounded-br-sm border-brand-orange bg-brand-orange text-white'
        }`}
      >
        <div className="whitespace-pre-wrap text-sm leading-6">{message.text}</div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className={`text-xs ${isBot ? 'text-gray-500 dark:text-gray-400' : 'text-orange-100'}`}>
            {message.timestamp}
          </span>
          {isBot && <TTSButton text={message.text} />}
        </div>
      </div>
      {!isBot && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg dark:bg-gray-700">
          👤
        </div>
      )}
    </div>
  );
}
