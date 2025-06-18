"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
const chalk_1 = __importDefault(require("chalk"));
function addTask(storage, taskDescription) {
    const tasks = storage.loadTasks();
    const newTask = {
        id: storage.generateId(),
        task: taskDescription,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    storage.saveTasks(tasks);
    console.log(chalk_1.default.green('✓ Task added successfully!'));
}
//# sourceMappingURL=add.js.map