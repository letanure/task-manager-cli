import { Task, TaskManager } from './types';
export declare class FileTaskManager implements TaskManager {
    private readonly tasksFile;
    constructor(workingDirectory?: string);
    loadTasks(): Task[];
    saveTasks(tasks: Task[]): void;
    generateId(): string;
}
//# sourceMappingURL=taskManager.d.ts.map