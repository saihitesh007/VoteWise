import { useEffect, useState } from 'react';

const STORAGE_KEY = 'votewise-theme';
const THEME_EVENT = 'votewise-theme-change';

export function getPreferredTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function initializeTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  return theme;
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => initializeTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.type === 'storage') {
        setTheme(event.newValue || getPreferredTheme());
        return;
      }

      setTheme(event.detail || getPreferredTheme());
    };

    window.addEventListener('storage', syncTheme);
    window.addEventListener(THEME_EVENT, syncTheme);

    return () => {
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener(THEME_EVENT, syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: nextTheme }));
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
}
