"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCommands = void 0;
const chalk_1 = __importDefault(require("chalk"));
class TaskCommands {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }
    addTask(taskDescription) {
        const tasks = this.taskManager.loadTasks();
        const newTask = {
            id: this.taskManager.generateId(),
            task: taskDescription,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        this.taskManager.saveTasks(tasks);
        console.log(chalk_1.default.green("✓ Task added successfully!"));
    }
    listTasks(options) {
        const tasks = this.taskManager.loadTasks();
        if (tasks.length === 0) {
            console.log(chalk_1.default.yellow("No tasks found."));
            return;
        }
        let filteredTasks = tasks;
        if (options.completed) {
            filteredTasks = tasks.filter((task) => task.completed);
        }
        else if (options.pending) {
            filteredTasks = tasks.filter((task) => !task.completed);
        }
        if (filteredTasks.length === 0) {
            console.log(chalk_1.default.yellow("No tasks match the filter."));
            return;
        }
        console.log(chalk_1.default.bold("\nTasks:"));
        filteredTasks.forEach((task, index) => {
            const status = task.completed ? chalk_1.default.green("✓") : chalk_1.default.red("✗");
            const taskText = task.completed
                ? chalk_1.default.strikethrough(task.task)
                : task.task;
            console.log(`${index + 1}. ${status} ${taskText} (ID: ${task.id})`);
        });
    }
    completeTask(id) {
        const tasks = this.taskManager.loadTasks();
        const task = tasks.find((t) => t.id === id);
        if (!task) {
            console.log(chalk_1.default.red("Task not found."));
            return;
        }
        if (task.completed) {
            console.log(chalk_1.default.yellow("Task is already completed."));
            return;
        }
        task.completed = true;
        task.completedAt = new Date().toISOString();
        this.taskManager.saveTasks(tasks);
        console.log(chalk_1.default.green("✓ Task marked as completed!"));
    }
    removeTask(id) {
        const tasks = this.taskManager.loadTasks();
        const taskIndex = tasks.findIndex((t) => t.id === id);
        if (taskIndex === -1) {
            console.log(chalk_1.default.red("Task not found."));
            return;
        }
        tasks.splice(taskIndex, 1);
        this.taskManager.saveTasks(tasks);
        console.log(chalk_1.default.green("✓ Task removed successfully!"));
    }
    clearAllTasks() {
        this.taskManager.saveTasks([]);
        console.log(chalk_1.default.green("✓ All tasks cleared!"));
    }
}
exports.TaskCommands = TaskCommands;
//# sourceMappingURL=commands.js.map