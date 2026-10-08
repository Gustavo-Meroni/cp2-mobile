import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Treatment } from '../types/user';

export type ThemeMode = 'light' | 'dark';
export interface Palette {
  background: string; surface: string; surfaceAlt: string; text: string; muted: string;
  border: string; primary: string; onPrimary: string; accent: string; danger: string;
  pending: string; progress: string; done: string; low: string; medium: string; high: string;
}

const palettes: Record<ThemeMode, Palette> = {
  light: { background: '#F4F8F8', surface: '#FFFFFF', surfaceAlt: '#E8F3F1', text: '#123A39', muted: '#45625F', border: '#B6D0CC', primary: '#087E75', onPrimary: '#FFFFFF', accent: '#C45B19', danger: '#B4232D', pending: '#8A5717', progress: '#195D9B', done: '#176C50', low: '#176C50', medium: '#8A5717', high: '#B4232D' },
  dark: { background: '#0E1C1E', surface: '#17282B', surfaceAlt: '#203B3E', text: '#F0FAF8', muted: '#C1D6D2', border: '#456463', primary: '#5DDBCC', onPrimary: '#0E2524', accent: '#FFAD73', danger: '#FF9399', pending: '#F4C078', progress: '#9BCBFF', done: '#82DFB7', low: '#82DFB7', medium: '#F4C078', high: '#FF9399' },
};

interface ThemeContextValue {
  mode: ThemeMode; colors: Palette; treatment: Treatment | null; loading: boolean;
  error: string | null; toggleTheme: () => Promise<void>; setTreatment: (value: Treatment) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_KEY = '@taskflow/theme';
const TREATMENT_KEY = '@taskflow/treatment';

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [treatment, setTreatmentState] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function hydrate(): Promise<void> {
      try {
        const [storedMode, storedTreatment] = await Promise.all([AsyncStorage.getItem(THEME_KEY), AsyncStorage.getItem(TREATMENT_KEY)]);
        if (active) {
          if (storedMode === 'light' || storedMode === 'dark') setMode(storedMode);
          if (storedTreatment === 'Sr.' || storedTreatment === 'Sra.' || storedTreatment === 'Srta.') setTreatmentState(storedTreatment);
        }
      } catch {
        if (active) setError('Não foi possível carregar suas preferências.');
      } finally { if (active) setLoading(false); }
    }
    void hydrate();
    return () => { active = false; };
  }, []);

  async function toggleTheme(): Promise<void> {
    const next = mode === 'light' ? 'dark' : 'light';
    setError(null);
    try { await AsyncStorage.setItem(THEME_KEY, next); setMode(next); }
    catch { setError('Não foi possível salvar o tema. Tente novamente.'); throw new Error('Não foi possível salvar o tema.'); }
  }

  async function setTreatment(value: Treatment): Promise<void> {
    setError(null);
    try { await AsyncStorage.setItem(TREATMENT_KEY, value); setTreatmentState(value); }
    catch { setError('Não foi possível salvar o tratamento. Tente novamente.'); throw new Error('Não foi possível salvar o tratamento.'); }
  }

  return <ThemeContext.Provider value={{ mode, colors: palettes[mode], treatment, loading, error, toggleTheme, setTreatment }}>{children}</ThemeContext.Provider>;
}
