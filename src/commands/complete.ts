import chalk from 'chalk';
import type { Task, TaskStorage } from '../types';

function findTaskById(tasks: Task[], id: string): Task | undefined {
  return tasks.find((task: Task) => task.id === id);
}

export function completeTask(storage: TaskStorage, id: string): void {
  const tasks = storage.loadTasks();
  const task = findTaskById(tasks, id);

  if (!task) {
    console.log(chalk.red('Task not found.'));
    return;
  }

  if (task.completed) {
    console.log(chalk.yellow('Task is already completed.'));
    return;
  }

  task.completed = true;
  task.completedAt = new Date().toISOString();
  storage.saveTasks(tasks);
  console.log(chalk.green('✓ Task marked as completed!'));
}
