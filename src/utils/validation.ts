import type { TaskInput } from '../types/task';
import { categories, priorities, statuses } from './taskOptions';

export type TaskErrors = Partial<Record<keyof TaskInput, string>>;

export function validateTask(input: TaskInput): TaskErrors {
  const errors: TaskErrors = {};
  if (input.title.trim().length < 3) errors.title = 'Informe um título com pelo menos 3 caracteres.';
  if (input.description.trim().length < 5) errors.description = 'Informe uma descrição com pelo menos 5 caracteres.';
  if (!statuses.includes(input.status)) errors.status = 'Selecione um status válido.';
  if (!priorities.includes(input.priority)) errors.priority = 'Selecione uma prioridade válida.';
  if (!categories.includes(input.category)) errors.category = 'Selecione uma categoria válida.';
  return errors;
}
