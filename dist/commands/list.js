"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasks = listTasks;
const chalk_1 = __importDefault(require("chalk"));
function filterTasks(tasks, options) {
    if (options.completed) {
        return tasks.filter((task) => task.completed);
    }
    if (options.pending) {
        return tasks.filter((task) => !task.completed);
    }
    return tasks;
}
function formatTask(task, index) {
    const status = task.completed ? chalk_1.default.green('✓') : chalk_1.default.red('✗');
    const taskText = task.completed ? chalk_1.default.strikethrough(task.task) : task.task;
    return `${index + 1}. ${status} ${taskText} (ID: ${task.id})`;
}
function listTasks(storage, options) {
    const tasks = storage.loadTasks();
    if (tasks.length === 0) {
        console.log(chalk_1.default.yellow('No tasks found.'));
        return;
    }
    const filteredTasks = filterTasks(tasks, options);
    if (filteredTasks.length === 0) {
        console.log(chalk_1.default.yellow('No tasks match the filter.'));
        return;
    }
    console.log(chalk_1.default.bold('\nTasks:'));
    filteredTasks.forEach((task, index) => {
        console.log(formatTask(task, index));
    });
}
//# sourceMappingURL=list.js.map