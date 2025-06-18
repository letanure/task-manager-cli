import chalk from 'chalk';
import type { ListOptions, Task, TaskStorage } from '../types';

function filterTasks(tasks: Task[], options: ListOptions): Task[] {
  let filtered = tasks;

  if (options.completed) {
    filtered = filtered.filter((task: Task) => task.completed);
  }
  if (options.pending) {
    filtered = filtered.filter((task: Task) => !task.completed);
  }
  if (options.priority) {
    filtered = filtered.filter(
      (task: Task) => task.priority === options.priority
    );
  }

  return filtered;
}

function getPriorityIcon(priority: string): string {
  switch (priority) {
    case 'high':
      return chalk.red('🔴');
    case 'medium':
      return chalk.yellow('🟡');
    case 'low':
      return chalk.green('🟢');
    default:
      return chalk.gray('⚪');
  }
}

function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Pending tasks first
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority]; // High priority first
  });
}

function formatTask(task: Task, index: number): string {
  const status = task.completed ? chalk.green('✓') : chalk.red('✗');
  const taskText = task.completed ? chalk.strikethrough(task.task) : task.task;
  const priorityIcon = getPriorityIcon(task.priority);
  const priorityText = chalk.gray(`[${task.priority.toUpperCase()}]`);

  return `${index + 1}. ${status} ${priorityIcon} ${taskText} ${priorityText} (ID: ${task.id})`;
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

  const sortedTasks = sortTasksByPriority(filteredTasks);

  console.log(chalk.bold('\nTasks:'));
  sortedTasks.forEach((task: Task, index: number) => {
    console.log(formatTask(task, index));
  });
}
