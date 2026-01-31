# Blackboard

A realistic blackboard drawing app with chalk, duster tools and memory.

# Demo

https://suryanox.github.io/blackboard/

## Features

- Infinite canvas that expands as you draw
- Realistic chalk texture with natural strokes
- Eraser tool
- Clear board and download as PNG
- Keyboard shortcuts (C for chalk, D for duster)
- Auto-save to localStorage (your drawing persists across sessions)

## Architecture
**Features:**
- Saves canvas as base64 PNG with dimensions
- Auto-saves after each stroke (debounced)
- Loads previous drawing on app startup
- Clears saved data when board is cleared

## Getting Started

```bash
yarn install
yarn dev
```

Open http://localhost:5173

## Tech Stack

React, TypeScript, Vite, MUI, Vitest

## License

MIT. See `LICENSE`.
