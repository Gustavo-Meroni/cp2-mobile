export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';
export type TaskCategory = 'Trabalho' | 'Estudos' | 'Pessoal' | 'Saúde' | 'Outros';

export interface Task {
  id: string;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskInput = Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'category'>;
