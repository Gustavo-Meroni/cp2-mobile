import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '../types/task';
import { categories, priorities, statuses } from '../utils/taskOptions';

const KEY = '@taskflow/tasks';

export async function loadStoredTasks(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error('Os dados de tarefas salvos são inválidos.');
  if (!value.every(isTask)) throw new Error('Uma ou mais tarefas salvas são inválidas.');
  return value;
}

function isTask(item: unknown): item is Task {
  if (typeof item !== 'object' || item === null) return false;
  const task = item as Partial<Task>;
  return typeof task.id === 'string' && task.id.length > 0 &&
    (task.userId === 1 || task.userId === 2) &&
    typeof task.title === 'string' && typeof task.description === 'string' &&
    statuses.some(status => status === task.status) &&
    priorities.some(priority => priority === task.priority) &&
    categories.some(category => category === task.category) &&
    typeof task.categoryIcon === 'string' &&
    typeof task.createdAt === 'string' && !Number.isNaN(Date.parse(task.createdAt)) &&
    typeof task.updatedAt === 'string' && !Number.isNaN(Date.parse(task.updatedAt));
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
}
