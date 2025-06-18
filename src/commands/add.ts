import chalk from 'chalk';
import type { Priority, Task, TaskStorage } from '../types';
import { parseDate } from '../utils/dateUtils';

export function addTask(
  storage: TaskStorage,
  taskDescription: string,
  priority: Priority = 'medium',
  dueDateInput?: string
): void {
  const tasks = storage.loadTasks();

  let dueDate: string | undefined;
  if (dueDateInput) {
    const parsedDate = parseDate(dueDateInput);
    if (parsedDate) {
      dueDate = parsedDate;
    } else {
      console.log(
        chalk.yellow(
          `⚠️  Invalid date format: "${dueDateInput}". Task created without due date.`
        )
      );
    }
  }

  const newTask: Task = {
    id: storage.generateId(),
    task: taskDescription,
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
    ...(dueDate && { dueDate }),
  };

  tasks.push(newTask);
  storage.saveTasks(tasks);
  console.log(chalk.green('✓ Task added successfully!'));
}
