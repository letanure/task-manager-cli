"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAllTasks = clearAllTasks;
const chalk_1 = __importDefault(require("chalk"));
function clearAllTasks(storage) {
    storage.saveTasks([]);
    console.log(chalk_1.default.green('✓ All tasks cleared!'));
}
//# sourceMappingURL=clear.js.map