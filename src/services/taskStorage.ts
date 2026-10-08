import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '../types/task';

const KEY = '@taskflow/tasks';

export async function loadStoredTasks(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error('Os dados de tarefas salvos são inválidos.');
  return value.filter((item: unknown): item is Task =>
    typeof item === 'object' && item !== null && 'id' in item && typeof item.id === 'string' &&
    'userId' in item && typeof item.userId === 'number' && 'title' in item && typeof item.title === 'string');
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
}
