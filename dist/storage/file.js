"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileTaskStorage = createFileTaskStorage;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const chalk_1 = __importDefault(require("chalk"));
function generateId() {
    return Date.now().toString();
}
function loadTasksFromFile(tasksFile) {
    if (!fs.existsSync(tasksFile)) {
        return [];
    }
    try {
        const data = fs.readFileSync(tasksFile, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(chalk_1.default.red('Error loading tasks:', errorMessage));
        return [];
    }
}
function saveTasksToFile(tasksFile, tasks) {
    try {
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(chalk_1.default.red('Error saving tasks:', errorMessage));
    }
}
function createFileTaskStorage(workingDirectory = process.cwd()) {
    const tasksFile = path.join(workingDirectory, 'tasks.json');
    return {
        loadTasks: () => loadTasksFromFile(tasksFile),
        saveTasks: (tasks) => saveTasksToFile(tasksFile, tasks),
        generateId,
    };
}
//# sourceMappingURL=file.js.map