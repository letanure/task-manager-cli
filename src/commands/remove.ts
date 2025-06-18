import chalk from 'chalk';
import type { Task, TaskStorage } from '../types';

function findTaskIndexById(tasks: Task[], id: string): number {
  return tasks.findIndex((task: Task) => task.id === id);
}

export function removeTask(storage: TaskStorage, id: string): void {
  const tasks = storage.loadTasks();
  const taskIndex = findTaskIndexById(tasks, id);

  if (taskIndex === -1) {
    console.log(chalk.red('Task not found.'));
    return;
  }

  tasks.splice(taskIndex, 1);
  storage.saveTasks(tasks);
  console.log(chalk.green('✓ Task removed successfully!'));
}
