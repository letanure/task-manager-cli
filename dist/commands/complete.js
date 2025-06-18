"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTask = completeTask;
const chalk_1 = __importDefault(require("chalk"));
function findTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}
function completeTask(storage, id) {
    const tasks = storage.loadTasks();
    const task = findTaskById(tasks, id);
    if (!task) {
        console.log(chalk_1.default.red('Task not found.'));
        return;
    }
    if (task.completed) {
        console.log(chalk_1.default.yellow('Task is already completed.'));
        return;
    }
    task.completed = true;
    task.completedAt = new Date().toISOString();
    storage.saveTasks(tasks);
    console.log(chalk_1.default.green('✓ Task marked as completed!'));
}
//# sourceMappingURL=complete.js.map