export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  task: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
}

export interface ListOptions {
  completed?: boolean;
  pending?: boolean;
  priority?: Priority;
  overdue?: boolean;
}

export interface TaskStorage {
  loadTasks(): Task[];
  saveTasks(tasks: Task[]): void;
  generateId(): string;
}
