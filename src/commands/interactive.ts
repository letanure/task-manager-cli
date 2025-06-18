import * as clack from '@clack/prompts';
import chalk from 'chalk';
import type { Task, TaskStorage } from '../types';
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
];

function getTaskChoices(tasks: Task[]): ActionChoice[] {
  return tasks.map((task) => ({
    value: task.id,
    label: task.completed ? chalk.strikethrough(task.task) : task.task,
    hint: `ID: ${task.id}`,
  }));
}

async function handleListTasks(storage: TaskStorage): Promise<void> {
  const filterChoice = await clack.select({
    message: 'Which tasks would you like to see?',
    options: FILTER_OPTIONS,
  });

  if (clack.isCancel(filterChoice)) {
    return;
  }

  const options = {
    completed: filterChoice === 'completed',
    pending: filterChoice === 'pending',
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

  addTask(storage, taskDescription);
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
