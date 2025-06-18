#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const add_1 = require("./commands/add");
const clear_1 = require("./commands/clear");
const complete_1 = require("./commands/complete");
const list_1 = require("./commands/list");
const remove_1 = require("./commands/remove");
const file_1 = require("./storage/file");
const program = new commander_1.Command();
const storage = (0, file_1.createFileTaskStorage)();
program
    .name('task-manager-cli')
    .description('A simple CLI task manager')
    .version('1.0.0');
program
    .command('add <task>')
    .description('Add a new task')
    .action((task) => {
    (0, add_1.addTask)(storage, task);
});
program
    .command('list')
    .description('List all tasks')
    .option('-c, --completed', 'Show only completed tasks')
    .option('-p, --pending', 'Show only pending tasks')
    .action((options) => {
    (0, list_1.listTasks)(storage, options);
});
program
    .command('complete <id>')
    .description('Mark a task as completed')
    .action((id) => {
    (0, complete_1.completeTask)(storage, id);
});
program
    .command('remove <id>')
    .description('Remove a task')
    .action((id) => {
    (0, remove_1.removeTask)(storage, id);
});
program
    .command('clear')
    .description('Clear all tasks')
    .action(() => {
    (0, clear_1.clearAllTasks)(storage);
});
program.parse();
//# sourceMappingURL=index.js.map