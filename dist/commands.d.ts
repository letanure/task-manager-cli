import type { ListOptions, TaskManager } from "./types";
export declare class TaskCommands {
    private taskManager;
    constructor(taskManager: TaskManager);
    addTask(taskDescription: string): void;
    listTasks(options: ListOptions): void;
    completeTask(id: string): void;
    removeTask(id: string): void;
    clearAllTasks(): void;
}
//# sourceMappingURL=commands.d.ts.map