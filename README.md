# Life Notes 📝

> Notes & Todos app - Part of the Life-Sync 2.0 ecosystem

## 🌐 Live URLs

| Environment       | URL                                               |
| ----------------- | ------------------------------------------------- |
| **Production**    | https://balaji-dev.in/life-sync/notes             |
| **Direct Vercel** | https://lyf-notes-todo.vercel.app/life-sync/notes |

## Features

### 📝 Notes

- Quick note creation with color coding
- Pin important notes
- Tags and categories
- Search functionality
- Bulk import/export

### ✅ Todos (7 Types)

| Type              | Purpose                       | Color   |
| ----------------- | ----------------------------- | ------- |
| `project`         | Project tasks                 | Blue    |
| `work`            | Work-related                  | Purple  |
| `personal`        | Personal tasks                | Green   |
| `learning`        | Study/courses                 | Yellow  |
| `essential`       | Critical tasks                | Red     |
| `finance-expense` | Track expenses → Wealth Pulse | Orange  |
| `finance-saving`  | Savings goals → Wealth Pulse  | Emerald |

### Additional Features

- Task management with priorities (Low/Medium/High)
- Due dates with overdue tracking
- Calendar view
- Status filters (All/Active/Completed)
- Bulk import/export

## Tech Stack

| Category      | Technology                      |
| ------------- | ------------------------------- |
| **Framework** | Next.js 15 (App Router)         |
| **UI**        | React 19 + Tailwind CSS 4       |
| **State**     | Redux Toolkit + Redux Persist   |
| **Icons**     | Lucide React                    |
| **Language**  | TypeScript                      |
| **Hosting**   | Vercel                          |
| **Routing**   | Cloudflare Workers (path-based) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/BalajiJ234/life-notes.git
cd life-notes

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at [http://localhost:3001](http://localhost:3001)

### Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start development server on port 3001 |
| `npm run build` | Build for production                  |
| `npm run start` | Start production server               |
| `npm run lint`  | Run ESLint                            |

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
├── next.config.ts          # basePath: /life-sync/notes
├── package.json
└── tsconfig.json
```

## Path-Based Routing Configuration

This app uses `basePath` for path-based routing under the main domain:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  basePath: "/life-sync/notes",
  assetPrefix: "/life-sync/notes",
};
```

## Data Persistence

Data is stored in browser localStorage using Redux Persist. Your notes and todos will persist across browser sessions.

## Part of Life-Sync 2.0 Ecosystem

| App                       | URL                                    | Status     |
| ------------------------- | -------------------------------------- | ---------- |
| 🚀 **Gateway**            | https://balaji-dev.in/life-sync        | ✅ Live    |
| 💰 **Wealth Pulse**       | https://balaji-dev.in/life-sync/wealth | ✅ Live    |
| 📝 **Life Notes**         | https://balaji-dev.in/life-sync/notes  | ✅ Live    |
| 🤖 **Personal Assistant** | Coming Month 4                         | 🔮 Planned |

## Repository

- **GitHub**: [BalajiJ234/life-notes](https://github.com/BalajiJ234/life-notes) (private)

## License

Private - Part of Life-Sync 2.0 project
