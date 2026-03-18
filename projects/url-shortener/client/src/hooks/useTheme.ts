import { useEffect, useState } from 'react';

const STORAGE_KEY = 'url-shortener-theme';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return storedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  };
}
