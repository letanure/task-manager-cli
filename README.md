# Task Manager CLI

A TypeScript command-line task manager with priority levels and interactive mode.

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd task-manager-cli
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Install globally to use from anywhere:
   ```bash
   npm link
   ```

## Alternative Ways to Run

If you prefer not to install globally, you have several options:

### Development Mode
```bash
# Run directly with npm (no global install needed)
npm run dev

# Run specific commands
npm run dev add "My task"
npm run dev list
```

### Direct Execution
```bash
# Run the built version directly
node dist/index.js

# Run specific commands
node dist/index.js add "My task"
node dist/index.js list
```

## Usage

Once installed, you can use the `task-manager` command from anywhere in your terminal.

### Commands

#### Interactive Mode (Recommended)
```bash
# Start interactive mode (default if no command provided)
task-manager
# or
task-manager interactive
```

#### Add a task
```bash
# Add task with default (medium) priority
task-manager add "Buy groceries"

# Add task with specific priority
task-manager add "Urgent bug fix" --priority high
task-manager add "Code cleanup" --priority low
```

#### List tasks
```bash
# List all tasks (sorted by priority)
task-manager list

# Filter by completion status
task-manager list --completed
task-manager list --pending

# Filter by priority level
task-manager list --priority high
task-manager list --priority medium
task-manager list --priority low
```

#### Mark a task as completed
```bash
task-manager complete <task-id>
```

#### Remove a task
```bash
task-manager remove <task-id>
```

#### Clear all tasks
```bash
task-manager clear
```

#### Show help
```bash
task-manager --help
```

### Priority Levels

Tasks support three priority levels:
- 🔴 **High**: Urgent and important tasks
- 🟡 **Medium**: Standard priority (default)
- 🟢 **Low**: Nice to have tasks

Tasks are automatically sorted by priority (high → medium → low) with pending tasks shown first.

## Example Workflow

```bash
# Add tasks with different priorities
task-manager add "Fix critical bug" --priority high
task-manager add "Write documentation" --priority medium
task-manager add "Refactor old code" --priority low

# List all tasks (shows priority icons and sorting)
task-manager list
# Output:
# 1. ✗ 🔴 Fix critical bug [HIGH] (ID: 123...)
# 2. ✗ 🟡 Write documentation [MEDIUM] (ID: 124...)
# 3. ✗ 🟢 Refactor old code [LOW] (ID: 125...)

# Complete a task (use the ID shown in the list)
task-manager complete 123...

# List only high priority tasks
task-manager list --priority high

# Use interactive mode for easier navigation
task-manager
# This opens an interactive menu with all options
```

## Data Storage

Tasks are stored in a `tasks.json` file in your current working directory. Each task includes:
- Unique ID
- Task description
- Priority level (high, medium, low)
- Completion status
- Created timestamp
- Completed timestamp (when applicable)

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build

# Lint and format code
npm run lint:fix

# Run specific commands in development
npm run dev add "Test task" --priority high
npm run dev list
```

## Requirements

- Node.js (v16 or higher)
- npm