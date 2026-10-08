import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme precisa de ThemeProvider.');
  return value;
}
