import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import type { Task, TaskStorage } from '../types';

function generateId(): string {
  return Date.now().toString();
}

function loadTasksFromFile(tasksFile: string): Task[] {
  if (!fs.existsSync(tasksFile)) {
    return [];
  }

  try {
    const data = fs.readFileSync(tasksFile, 'utf8');
    return JSON.parse(data) as Task[];
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error(chalk.red('Error loading tasks:', errorMessage));
    return [];
  }
}

function saveTasksToFile(tasksFile: string, tasks: Task[]): void {
  try {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error(chalk.red('Error saving tasks:', errorMessage));
  }
}

export function createFileTaskStorage(
  workingDirectory: string = process.cwd()
): TaskStorage {
  const tasksFile = path.join(workingDirectory, 'tasks.json');

  return {
    loadTasks: () => loadTasksFromFile(tasksFile),
    saveTasks: (tasks: Task[]) => saveTasksToFile(tasksFile, tasks),
    generateId,
  };
}
