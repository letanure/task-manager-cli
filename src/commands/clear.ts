import chalk from 'chalk';
import type { TaskStorage } from '../types';

export function clearAllTasks(storage: TaskStorage): void {
  storage.saveTasks([]);
  console.log(chalk.green('✓ All tasks cleared!'));
}
