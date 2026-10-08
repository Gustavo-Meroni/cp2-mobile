import React, { createContext, useEffect, useState } from 'react';
import type { User } from '../types/user';
import { clearSession, loadSession, saveSession } from '../services/authStorage';

const users = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user', password: '123', role: 'user', name: 'Usuário Comum' },
] as const;

interface AuthContextValue {
  user: User | null; loading: boolean; error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function hydrate(): Promise<void> {
      try { const saved = await loadSession(); if (active) setUser(saved); }
      catch { if (active) setError('Não foi possível recuperar sua sessão. Entre novamente.'); }
      finally { if (active) setLoading(false); }
    }
    void hydrate();
    return () => { active = false; };
  }, []);

  async function login(username: string, password: string): Promise<void> {
    setError(null);
    const match = users.find(item => item.username === username.trim().toLowerCase() && item.password === password);
    if (!match) { setError('Usuário ou senha inválidos.'); throw new Error('Usuário ou senha inválidos.'); }
    const next: User = { id: match.id, username: match.username, role: match.role, name: match.name };
    try { await saveSession(next); setUser(next); }
    catch { setError('Não foi possível salvar a sessão. Tente novamente.'); throw new Error('Não foi possível salvar a sessão.'); }
  }

  async function logout(): Promise<void> {
    setError(null);
    try { await clearSession(); setUser(null); }
    catch { setError('Não foi possível sair. Tente novamente.'); throw new Error('Não foi possível sair.'); }
  }

  return <AuthContext.Provider value={{ user, loading, error, login, logout }}>{children}</AuthContext.Provider>;
}
