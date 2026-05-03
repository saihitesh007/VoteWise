import { useTranslation } from 'react-i18next';
import useTTS from '../../hooks/useTTS';

export default function TTSButton({ text }) {
  const { t } = useTranslation();
  const { speak, stop, isSpeaking } = useTTS();

  return (
    <button
      type="button"
      aria-label={isSpeaking ? 'Stop reading' : 'Listen to this content'}
      title={isSpeaking ? t('tts.stop') : t('tts.listen')}
      onClick={() => (isSpeaking ? stop() : speak(text))}
      className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-700 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      <span aria-hidden="true">{isSpeaking ? '⏹' : '🔊'}</span>
    </button>
  );
}
