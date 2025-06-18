import chalk from 'chalk';
import type { ListOptions, Task, TaskStorage } from '../types';

function filterTasks(tasks: Task[], options: ListOptions): Task[] {
  if (options.completed) {
    return tasks.filter((task: Task) => task.completed);
  }
  if (options.pending) {
    return tasks.filter((task: Task) => !task.completed);
  }
  return tasks;
}

function formatTask(task: Task, index: number): string {
  const status = task.completed ? chalk.green('✓') : chalk.red('✗');
  const taskText = task.completed ? chalk.strikethrough(task.task) : task.task;
  return `${index + 1}. ${status} ${taskText} (ID: ${task.id})`;
}

export function listTasks(storage: TaskStorage, options: ListOptions): void {
  const tasks = storage.loadTasks();

  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks found.'));
    return;
  }

  const filteredTasks = filterTasks(tasks, options);

  if (filteredTasks.length === 0) {
    console.log(chalk.yellow('No tasks match the filter.'));
    return;
  }

  console.log(chalk.bold('\nTasks:'));
  filteredTasks.forEach((task: Task, index: number) => {
    console.log(formatTask(task, index));
  });
}
