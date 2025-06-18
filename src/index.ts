import { Command } from 'commander';
import { addTask } from './commands/add';
import { clearAllTasks } from './commands/clear';
import { completeTask } from './commands/complete';
import { runInteractiveMode } from './commands/interactive';
import { listTasks } from './commands/list';
import { removeTask } from './commands/remove';
import { createFileTaskStorage } from './storage/file';
import type { ListOptions, Priority } from './types';

const program = new Command();
const storage = createFileTaskStorage();

program
  .name('task-manager-cli')
  .description('A simple CLI task manager')
  .version('1.0.0');

program
  .command('add <task>')
  .description('Add a new task')
  .option(
    '-p, --priority <priority>',
    'Task priority (high, medium, low)',
    'medium'
  )
  .action((task: string, options: { priority: Priority }) => {
    addTask(storage, task, options.priority);
  });

program
  .command('list')
  .description('List all tasks')
  .option('-c, --completed', 'Show only completed tasks')
  .option('-p, --pending', 'Show only pending tasks')
  .option('--priority <priority>', 'Filter by priority (high, medium, low)')
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

program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode')
  .action(async () => {
    await runInteractiveMode(storage);
  });

// Default to interactive mode if no command provided
if (process.argv.length === 2) {
  runInteractiveMode(storage);
} else {
  program.parse();
}
