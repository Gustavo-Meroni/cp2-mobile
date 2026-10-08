import React, { createContext, useEffect, useRef, useState } from 'react';
import type { Task, TaskInput } from '../types/task';
import { loadStoredTasks, saveStoredTasks } from '../services/taskStorage';
import { categoryIcons } from '../utils/taskOptions';
import { generateId } from '../utils/generateId';
import { validateTask } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';

interface TaskContextValue {
  tasks: Task[]; loading: boolean; saving: boolean; error: string | null;
  reload: () => Promise<void>;
  createTask: (input: TaskInput) => Promise<Task>;
  updateTask: (id: string, input: TaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const tasksRef = useRef<Task[]>([]);
  const operationRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [storageReady, setStorageReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload(): Promise<void> {
    setLoading(true); setError(null);
    try { const saved = await loadStoredTasks(); tasksRef.current = saved; setAllTasks(saved); setStorageReady(true); }
    catch { setStorageReady(false); setError('Não foi possível carregar as tarefas. Toque em tentar novamente.'); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    let active = true;
    async function hydrate(): Promise<void> {
      try {
        const saved = await loadStoredTasks();
        if (active) { tasksRef.current = saved; setAllTasks(saved); setStorageReady(true); }
      } catch {
        if (active) { setStorageReady(false); setError('Não foi possível carregar as tarefas. Toque em tentar novamente.'); }
      } finally { if (active) setLoading(false); }
    }
    void hydrate();
    return () => { active = false; };
  }, []);

  async function commit(next: Task[]): Promise<void> {
    if (loading || !storageReady) throw new Error('As tarefas ainda não foram carregadas. Tente novamente.');
    if (operationRef.current) throw new Error('Aguarde a operação atual terminar.');
    operationRef.current = true; setSaving(true); setError(null);
    try { await saveStoredTasks(next); tasksRef.current = next; setAllTasks(next); }
    catch { throw new Error('Não foi possível salvar as tarefas. Tente novamente.'); }
    finally { operationRef.current = false; setSaving(false); }
  }

  async function createTask(input: TaskInput): Promise<Task> {
    if (!user) throw new Error('Faça login para criar tarefas.');
    if (Object.keys(validateTask(input)).length) throw new Error('Revise os campos da tarefa.');
    const now = new Date().toISOString();
    let id = generateId();
    while (tasksRef.current.some(task => task.id === id)) id = generateId();
    const task: Task = { id, userId: user.id, title: input.title.trim(), description: input.description.trim(), status: input.status, priority: input.priority, category: input.category, categoryIcon: categoryIcons[input.category], createdAt: now, updatedAt: now };
    await commit([...tasksRef.current, task]);
    return task;
  }

  async function updateTask(id: string, input: TaskInput): Promise<void> {
    if (!user) throw new Error('Faça login para editar tarefas.');
    if (Object.keys(validateTask(input)).length) throw new Error('Revise os campos da tarefa.');
    const current = tasksRef.current.find(task => task.id === id && task.userId === user.id);
    if (!current) throw new Error('Tarefa não encontrada ou sem permissão.');
    const next = tasksRef.current.map(task => task.id === id && task.userId === user.id ? { ...task, title: input.title.trim(), description: input.description.trim(), status: input.status, priority: input.priority, category: input.category, categoryIcon: categoryIcons[input.category], updatedAt: new Date().toISOString() } : task);
    await commit(next);
  }

  async function deleteTask(id: string): Promise<void> {
    if (!user) throw new Error('Faça login para excluir tarefas.');
    if (!tasksRef.current.some(task => task.id === id && task.userId === user.id)) throw new Error('Tarefa não encontrada ou sem permissão.');
    await commit(tasksRef.current.filter(task => !(task.id === id && task.userId === user.id)));
  }

  const tasks = allTasks.filter(task => task.userId === user?.id);
  return <TaskContext.Provider value={{ tasks, loading, saving, error, reload, createTask, updateTask, deleteTask }}>{children}</TaskContext.Provider>;
}
