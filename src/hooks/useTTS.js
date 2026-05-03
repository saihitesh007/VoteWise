import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const getSpeechLang = (language) => {
  if (language === 'hi') return 'hi-IN';
  if (language === 'te') return 'te-IN';
  return 'en-IN';
};

export default function useTTS() {
  const { i18n } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) {
      return undefined;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speak = (text) => {
    if (!window.speechSynthesis || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLang(i18n.language?.slice(0, 2) || 'en');
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return { speak, stop, isSpeaking };
}
