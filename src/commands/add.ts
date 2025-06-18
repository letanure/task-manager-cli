import chalk from 'chalk';
import type { Task, TaskStorage } from '../types';

export function addTask(storage: TaskStorage, taskDescription: string): void {
  const tasks = storage.loadTasks();
  const newTask: Task = {
    id: storage.generateId(),
    task: taskDescription,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  storage.saveTasks(tasks);
  console.log(chalk.green('✓ Task added successfully!'));
}
