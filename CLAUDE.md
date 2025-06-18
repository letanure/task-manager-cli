# Task Manager CLI - Development Instructions

## Overview
A modular TypeScript command-line task manager using functional code style and full type safety.

## Project Structure
```
src/
├── index.ts          # Main CLI entry point
├── types.ts          # Shared TypeScript types
├── storage/
│   └── file.ts       # File-based task storage
├── commands/
│   ├── add.ts
│   ├── list.ts
│   ├── complete.ts
│   ├── remove.ts
│   └── clear.ts
└── utils/            # Optional helpers
```

## Coding Guidelines

### TypeScript
- Use explicit types (avoid `any`)
- Keep types in `types.ts`
- Use Zod or custom guards for validation
- Enable strict mode in `tsconfig.json`

### Code Style
- Use pure functions and small modules
- Prefer factory functions over classes
- Keep business logic stateless
- Pass dependencies directly (no DI containers)

### Execution
- Development: `npm run dev` (ts-node)
- Build: `npm run build` (lints + compiles to `dist/`)
- Run compiled: `npm run start`
- Lint: `npm run lint` (check only)
- Lint + Fix: `npm run lint:fix` (auto-fix issues)
- Format: `npm run format` (format code)

## Dependencies

- **Runtime**: `commander`, `chalk@4` (CommonJS)
- **Dev**: `typescript`, `ts-node`, `@types/node`, `@biomejs/biome`

## Test Commands

```bash
npm run build
npm run dev add "Test task"
npm run dev list
npm run dev complete <id>
npm run dev remove <id>
npm run dev clear
```

## Architecture Notes

### Storage Layer
- Exposed via factory functions (e.g. `createFileTaskManager`)
- Easy to swap out for future database or cloud storage

### Commands
- Each command is a standalone function (e.g. `addTask`)
- No classes, no shared state
- Easy to add new commands

### Type Safety
- All logic is typed
- No use of `any`
- Use type guards and functional patterns

## For Users

1. Install dependencies: `npm install`
2. Build TypeScript: `npm run build`
3. Link globally: `npm link`
4. Use CLI anywhere: `task-manager <command>`

### Alternative Running Methods

No permission issues with the current setup:

1. **Global install**: `npm link` (works without chmod)
2. **Dev mode**: `npm run dev <command>`
3. **Direct execution**: `node dist/index.js <command>`

## Development Workflow

1. Edit files in `src/`
2. Test with `npm run dev <command>`
3. **ALWAYS run `npm run lint:fix` before finishing tasks**
4. Build with `npm run build` (includes linting)
5. Run with `npm run start <command>`

## Code Quality

### Biome Configuration
- **Linter**: Enforces recommended rules + strict TypeScript
- **Formatter**: 2-space indents, single quotes, trailing commas
- **Auto-fix**: Most issues resolved automatically
- **Build integration**: Linting runs before compilation

### Required Commands
- `npm run lint:fix` - **Run before completing any task**
- `npm run build` - Includes linting check
- Never commit code that fails linting