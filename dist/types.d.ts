export interface Task {
    id: string;
    task: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
}
export interface ListOptions {
    completed?: boolean;
    pending?: boolean;
}
export interface TaskStorage {
    loadTasks(): Task[];
    saveTasks(tasks: Task[]): void;
    generateId(): string;
}
//# sourceMappingURL=types.d.ts.map