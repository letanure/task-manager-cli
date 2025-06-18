"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTask = removeTask;
const chalk_1 = __importDefault(require("chalk"));
function findTaskIndexById(tasks, id) {
    return tasks.findIndex((task) => task.id === id);
}
function removeTask(storage, id) {
    const tasks = storage.loadTasks();
    const taskIndex = findTaskIndexById(tasks, id);
    if (taskIndex === -1) {
        console.log(chalk_1.default.red('Task not found.'));
        return;
    }
    tasks.splice(taskIndex, 1);
    storage.saveTasks(tasks);
    console.log(chalk_1.default.green('✓ Task removed successfully!'));
}
//# sourceMappingURL=remove.js.map