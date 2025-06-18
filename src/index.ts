#!/usr/bin/env node

import { Command } from 'commander';
import { addTask } from './commands/add';
import { clearAllTasks } from './commands/clear';
import { completeTask } from './commands/complete';
import { listTasks } from './commands/list';
import { removeTask } from './commands/remove';
import { createFileTaskStorage } from './storage/file';
import type { ListOptions } from './types';

const program = new Command();
const storage = createFileTaskStorage();

program
  .name('task-manager-cli')
  .description('A simple CLI task manager')
  .version('1.0.0');

program
  .command('add <task>')
  .description('Add a new task')
  .action((task: string) => {
    addTask(storage, task);
  });

program
  .command('list')
  .description('List all tasks')
  .option('-c, --completed', 'Show only completed tasks')
  .option('-p, --pending', 'Show only pending tasks')
  .action((options: ListOptions) => {
    listTasks(storage, options);
  });

program
  .command('complete <id>')
  .description('Mark a task as completed')
  .action((id: string) => {
    completeTask(storage, id);
  });

program
  .command('remove <id>')
  .description('Remove a task')
  .action((id: string) => {
    removeTask(storage, id);
  });

program
  .command('clear')
  .description('Clear all tasks')
  .action(() => {
    clearAllTasks(storage);
  });

program.parse();
