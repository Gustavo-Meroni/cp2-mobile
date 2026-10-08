import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/user';

const KEY = '@taskflow/session';

export async function loadSession(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return null;
  const candidate: unknown = JSON.parse(raw);
  if (typeof candidate !== 'object' || candidate === null || !('id' in candidate) || !('username' in candidate)) return null;
  const user = candidate as Partial<User>;
  if (!((user.id === 1 && user.username === 'admin') || (user.id === 2 && user.username === 'user'))) return null;
  return user.id === 1
    ? { id: 1, username: 'admin', role: 'admin', name: 'Administrador' }
    : { id: 2, username: 'user', role: 'user', name: 'Usuário Comum' };
}

export async function saveSession(user: User): Promise<void> { await AsyncStorage.setItem(KEY, JSON.stringify(user)); }
export async function clearSession(): Promise<void> { await AsyncStorage.removeItem(KEY); }
