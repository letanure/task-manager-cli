import chalk from 'chalk';
import type { ListOptions, Task, TaskStorage } from '../types';
import { formatDate, getDaysUntilDue, isOverdue } from '../utils/dateUtils';

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

function sortTasksByPriorityAndDueDate(tasks: Task[]): Task[] {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return tasks.sort((a, b) => {
    // Completed vs pending
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // For pending tasks, sort by overdue status first
    if (!a.completed && !b.completed) {
      const aOverdue = a.dueDate ? isOverdue(a.dueDate) : false;
      const bOverdue = b.dueDate ? isOverdue(b.dueDate) : false;

      if (aOverdue !== bOverdue) {
        return aOverdue ? -1 : 1; // Overdue tasks first
      }

      // Then by due date (sooner first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate && !b.dueDate) return -1; // Tasks with due dates first
      if (!a.dueDate && b.dueDate) return 1;
    }

    // Finally by priority
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

function formatTask(task: Task, index: number, searchTerm: string): string {
  const status = task.completed ? chalk.green('✓') : chalk.red('✗');
  let taskText = task.completed ? chalk.strikethrough(task.task) : task.task;

  // Highlight search term in task text
  if (searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    taskText = taskText.replace(regex, chalk.bgYellow.black('$1'));
  }

  const priorityIcon = getPriorityIcon(task.priority);
  const priorityText = chalk.gray(`[${task.priority.toUpperCase()}]`);

  // Handle due date display
  let dueDateText = '';
  if (task.dueDate) {
    const formatted = formatDate(task.dueDate);
    const overdue = !task.completed && isOverdue(task.dueDate);

    if (overdue) {
      dueDateText = chalk.red(`📅 ${formatted} (OVERDUE)`);
      // Make the entire task text red if overdue
      taskText = chalk.red(taskText);
    } else {
      const daysUntil = getDaysUntilDue(task.dueDate);
      if (daysUntil === 0) {
        dueDateText = chalk.yellow(`📅 ${formatted}`);
      } else if (daysUntil <= 3) {
        dueDateText = chalk.yellow(`📅 ${formatted}`);
      } else {
        dueDateText = chalk.gray(`📅 ${formatted}`);
      }
    }
  }

  const parts = [
    `${index + 1}.`,
    status,
    priorityIcon,
    taskText,
    priorityText,
    dueDateText,
    chalk.gray(`(ID: ${task.id})`),
  ].filter(Boolean);

  return parts.join(' ');
}

export function searchTasks(
  storage: TaskStorage,
  searchTerm: string,
  options: ListOptions = {}
): void {
  const tasks = storage.loadTasks();

  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks found.'));
    return;
  }

  // Filter tasks that match the search term
  const matchedTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (matchedTasks.length === 0) {
    console.log(chalk.yellow(`No tasks found matching "${searchTerm}".`));
    return;
  }

  // Apply additional filters if provided
  let filteredTasks = matchedTasks;

  if (options.completed) {
    filteredTasks = filteredTasks.filter((task: Task) => task.completed);
  }
  if (options.pending) {
    filteredTasks = filteredTasks.filter((task: Task) => !task.completed);
  }
  if (options.priority) {
    filteredTasks = filteredTasks.filter(
      (task: Task) => task.priority === options.priority
    );
  }
  if (options.overdue) {
    filteredTasks = filteredTasks.filter(
      (task: Task) => !task.completed && task.dueDate && isOverdue(task.dueDate)
    );
  }

  if (filteredTasks.length === 0) {
    console.log(
      chalk.yellow(
        `No tasks found matching "${searchTerm}" with the applied filters.`
      )
    );
    return;
  }

  const sortedTasks = sortTasksByPriorityAndDueDate(filteredTasks);

  console.log(
    chalk.bold(
      `\nSearch results for "${searchTerm}" (${sortedTasks.length} found):`
    )
  );
  sortedTasks.forEach((task: Task, index: number) => {
    console.log(formatTask(task, index, searchTerm));
  });
}
