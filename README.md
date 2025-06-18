# Task Manager CLI

A simple command-line task manager built with Node.js.

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
4. Install globally to use from anywhere:
   ```bash
   npm link
   ```

## Usage

Once installed, you can use the `task-manager` command from anywhere in your terminal.

### Commands

#### Add a task
```bash
task-manager add "Buy groceries"
task-manager add "Complete project documentation"
```

#### List all tasks
```bash
task-manager list
```

#### List only completed tasks
```bash
task-manager list --completed
```

#### List only pending tasks
```bash
task-manager list --pending
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

## Example Workflow

```bash
# Add some tasks
task-manager add "Write README file"
task-manager add "Test the CLI application"
task-manager add "Deploy to production"

# List all tasks
task-manager list

# Complete a task (use the ID shown in the list)
task-manager complete 1234567890123

# List only pending tasks
task-manager list --pending

# Remove a task
task-manager remove 1234567890124
```

## Data Storage

Tasks are stored in a `tasks.json` file in your current working directory. Each task includes:
- Unique ID
- Task description
- Completion status
- Created timestamp
- Completed timestamp (when applicable)

## Requirements

- Node.js (v12 or higher)
- npm