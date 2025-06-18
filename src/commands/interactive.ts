import * as clack from '@clack/prompts';
import chalk from 'chalk';
import type { Priority, Task, TaskStorage } from '../types';
import { formatDate, isOverdue } from '../utils/dateUtils';
import { addTask } from './add';
import { clearAllTasks } from './clear';
import { completeTask } from './complete';
import { listTasks } from './list';
import { removeTask } from './remove';

interface ActionChoice {
  value: string;
  label: string;
  hint?: string;
}

const ACTIONS: ActionChoice[] = [
  { value: 'list', label: 'List tasks', hint: 'Show all tasks' },
  { value: 'add', label: 'Add task', hint: 'Create a new task' },
  { value: 'complete', label: 'Complete task', hint: 'Mark task as done' },
  { value: 'remove', label: 'Remove task', hint: 'Delete a task' },
  { value: 'clear', label: 'Clear all tasks', hint: 'Remove all tasks' },
  { value: 'exit', label: 'Exit', hint: 'Close the application' },
];

const FILTER_OPTIONS: ActionChoice[] = [
  { value: 'all', label: 'All tasks' },
  { value: 'pending', label: 'Pending tasks only' },
  { value: 'completed', label: 'Completed tasks only' },
  { value: 'overdue', label: 'Overdue tasks only' },
  { value: 'high', label: 'High priority tasks only' },
  { value: 'medium', label: 'Medium priority tasks only' },
  { value: 'low', label: 'Low priority tasks only' },
];

const PRIORITY_OPTIONS: ActionChoice[] = [
  { value: 'high', label: '🔴 High', hint: 'Urgent and important' },
  { value: 'medium', label: '🟡 Medium', hint: 'Standard priority' },
  { value: 'low', label: '🟢 Low', hint: 'Nice to have' },
];

const DUE_DATE_OPTIONS: ActionChoice[] = [
  { value: 'none', label: 'No due date' },
  { value: 'today', label: '📅 Today' },
  { value: 'tomorrow', label: '📅 Tomorrow' },
  { value: '3', label: '📅 In 3 days' },
  { value: '7', label: '📅 In 1 week' },
  { value: 'custom', label: '📅 Custom date' },
];

function getPriorityIcon(priority: Priority): string {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
}

function getTaskChoices(tasks: Task[]): ActionChoice[] {
  return tasks.map((task) => {
    let taskLabel = `${getPriorityIcon(task.priority)} ${task.completed ? chalk.strikethrough(task.task) : task.task}`;

    // Add overdue indicator for overdue tasks
    if (task.dueDate && !task.completed && isOverdue(task.dueDate)) {
      taskLabel = chalk.red(taskLabel);
    }

    let hint = `${task.priority.toUpperCase()}`;
    if (task.dueDate) {
      const formatted = formatDate(task.dueDate);
      const overdue = !task.completed && isOverdue(task.dueDate);
      hint += overdue
        ? ` - Due: ${formatted} (OVERDUE)`
        : ` - Due: ${formatted}`;
    }
    hint += ` - ID: ${task.id}`;

    return {
      value: task.id,
      label: taskLabel,
      hint,
    };
  });
}

async function handleListTasks(storage: TaskStorage): Promise<void> {
  const filterChoice = await clack.select({
    message: 'Which tasks would you like to see?',
    options: FILTER_OPTIONS,
  });

  if (clack.isCancel(filterChoice)) {
    return;
  }

  const options: {
    completed?: boolean;
    pending?: boolean;
    priority?: Priority;
    overdue?: boolean;
  } = {
    ...(filterChoice === 'completed' && { completed: true }),
    ...(filterChoice === 'pending' && { pending: true }),
    ...(filterChoice === 'overdue' && { overdue: true }),
    ...(['high', 'medium', 'low'].includes(filterChoice) && {
      priority: filterChoice as Priority,
    }),
  };

  listTasks(storage, options);
}

async function handleAddTask(storage: TaskStorage): Promise<void> {
  const taskDescription = await clack.text({
    message: 'Enter task description:',
    placeholder: 'e.g., Buy groceries',
    validate: (value) => {
      if (!value.trim()) {
        return 'Task description cannot be empty';
      }
      return undefined;
    },
  });

  if (clack.isCancel(taskDescription)) {
    return;
  }

  const priority = await clack.select({
    message: 'Select task priority:',
    options: PRIORITY_OPTIONS,
  });

  if (clack.isCancel(priority)) {
    return;
  }

  const dueDateChoice = await clack.select({
    message: 'Set due date:',
    options: DUE_DATE_OPTIONS,
  });

  if (clack.isCancel(dueDateChoice)) {
    return;
  }

  let dueDate: string | undefined;
  if (dueDateChoice === 'custom') {
    const customDate = await clack.text({
      message: 'Enter due date (today, tomorrow, 3d, 2024-12-25, etc.):',
      placeholder: 'e.g., tomorrow, 3d, 2024-12-25',
    });

    if (clack.isCancel(customDate)) {
      return;
    }

    dueDate = customDate;
  } else if (dueDateChoice !== 'none') {
    dueDate = dueDateChoice;
  }

  addTask(storage, taskDescription, priority as Priority, dueDate);
}

async function handleCompleteTask(storage: TaskStorage): Promise<void> {
  const tasks = storage.loadTasks().filter((task) => !task.completed);

  if (tasks.length === 0) {
    console.log(chalk.yellow('No pending tasks found.'));
    return;
  }

  const taskId = await clack.select({
    message: 'Which task would you like to complete?',
    options: getTaskChoices(tasks),
  });

  if (clack.isCancel(taskId)) {
    return;
  }

  completeTask(storage, taskId);
}

async function handleRemoveTask(storage: TaskStorage): Promise<void> {
  const tasks = storage.loadTasks();

  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks found.'));
    return;
  }

  const taskId = await clack.select({
    message: 'Which task would you like to remove?',
    options: getTaskChoices(tasks),
  });

  if (clack.isCancel(taskId)) {
    return;
  }

  removeTask(storage, taskId);
}

async function handleClearTasks(storage: TaskStorage): Promise<void> {
  const confirmed = await clack.confirm({
    message: 'Are you sure you want to clear all tasks?',
  });

  if (clack.isCancel(confirmed) || !confirmed) {
    console.log(chalk.yellow('Operation cancelled.'));
    return;
  }

  clearAllTasks(storage);
}

export async function runInteractiveMode(storage: TaskStorage): Promise<void> {
  clack.intro(chalk.blue('📋 Task Manager CLI'));

  while (true) {
    const action = await clack.select({
      message: 'What would you like to do?',
      options: ACTIONS,
    });

    if (clack.isCancel(action) || action === 'exit') {
      clack.outro(chalk.green('Goodbye! 👋'));
      break;
    }

    console.log(); // Add spacing

    switch (action) {
      case 'list':
        await handleListTasks(storage);
        break;
      case 'add':
        await handleAddTask(storage);
        break;
      case 'complete':
        await handleCompleteTask(storage);
        break;
      case 'remove':
        await handleRemoveTask(storage);
        break;
      case 'clear':
        await handleClearTasks(storage);
        break;
    }

    console.log(); // Add spacing after action
  }
}
