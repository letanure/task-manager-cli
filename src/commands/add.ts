import chalk from 'chalk';
import type { Priority, Task, TaskStorage } from '../types';

export function addTask(
  storage: TaskStorage,
  taskDescription: string,
  priority: Priority = 'medium'
): void {
  const tasks = storage.loadTasks();
  const newTask: Task = {
    id: storage.generateId(),
    task: taskDescription,
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  storage.saveTasks(tasks);
  console.log(chalk.green('✓ Task added successfully!'));
}
