# Life Notes 📝

> Notes & Todos app - Part of the Life-Sync ecosystem

## Features

### 📝 Notes
- Quick note creation with color coding
- Pin important notes
- Tags and categories
- Search functionality
- Bulk import/export

### ✅ Todos
- Task management with priorities (Low/Medium/High)
- Due dates with overdue tracking
- Categories (Personal, Work, Shopping, Health, Finance, Other)
- Calendar view
- Status filters (All/Active/Completed)
- Bulk import/export

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **State**: Redux Toolkit + Redux Persist
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the app directory
cd apps/life-notes

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at [http://localhost:3001](http://localhost:3001)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
life-notes/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Home page
│   │   ├── notes/
│   │   │   └── page.tsx    # Notes page
│   │   └── todos/
│   │       └── page.tsx    # Todos page
│   ├── components/
│   │   ├── Navigation.tsx  # Top navigation bar
│   │   └── BulkImport.tsx  # Import modal
│   ├── store/
│   │   ├── index.ts        # Redux store configuration
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   ├── ReduxProvider.tsx
│   │   └── slices/
│   │       ├── notesSlice.ts
│   │       └── todosSlice.ts
│   └── hooks/
├── public/
├── package.json
└── tsconfig.json
```

## Data Persistence

Data is stored in browser localStorage using Redux Persist. Your notes and todos will persist across browser sessions.

## Part of Life-Sync Ecosystem

This app is part of the Life-Sync Personal Operating System:

- 💰 **Wealth Pulse** - Finance & expense tracking
- 📝 **Life Notes** - Notes & todos (this app)
- 🤖 **Personal Assistant** - Coming soon

## License

Private - Part of Life-Sync 2.0 project
