# Advanced Editable Data Table (React.js)

This project is a solution for the **Frontend Technical Task: Advanced Editable Data Table**.

## Implemented Features

- Inline editable cells for text and numeric fields
- Row-level actions:
  - **Save**
  - **Cancel**
  - **Undo** (revert to previously saved state)
- Large dataset support with **12,000 generated rows**
- Performance optimization via **virtual scrolling** (`react-window`)
- **Pagination fallback** mode
- Multi-column sorting:
  - Click header to toggle `asc → desc → none`
  - Use **Shift + Click** for multi-sort
- Text and numeric filtering + **Clear filters** button
- CSV export of the currently filtered/sorted result
- Unsaved changes tracking + browser leave prompt
- Context-based state management for table data

## Tech Stack

- React (Vite)
- react-window
- styled-components
- Context API + hooks

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

## Build & Lint

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
  components/
    TableToolbar.jsx
    VirtualizedEditableTable.jsx
  constants/
    columns.js
  context/
    TableContext.jsx
  data/
    generateRows.js
  hooks/
    useBeforeUnloadPrompt.js
  App.jsx
  main.jsx
  index.css
```
