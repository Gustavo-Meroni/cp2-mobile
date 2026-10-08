import type { TaskCategory, TaskPriority, TaskStatus } from '../types/task';

export const statuses: readonly TaskStatus[] = ['pendente', 'em_andamento', 'concluida'];
export const priorities: readonly TaskPriority[] = ['baixa', 'media', 'alta'];
export const categories: readonly TaskCategory[] = ['Trabalho', 'Estudos', 'Pessoal', 'Saúde', 'Outros'];

export const statusLabels: Record<TaskStatus, string> = {
  pendente: 'Pendente', em_andamento: 'Em andamento', concluida: 'Concluída',
};
export const priorityLabels: Record<TaskPriority, string> = {
  baixa: 'Baixa', media: 'Média', alta: 'Alta',
};
export const categoryIcons: Record<TaskCategory, string> = {
  Trabalho: 'briefcase-outline', Estudos: 'book-outline', Pessoal: 'person-outline',
  Saúde: 'fitness-outline', Outros: 'grid-outline',
};
