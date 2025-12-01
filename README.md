# Task Manager

A modern, responsive task management application built with Next.js 16, React 19, and TypeScript. Features a clean UI with dark/light theme support and full CRUD operations for task management.

## Features

- ✅ Create, read, update, and delete tasks
- 🌓 Dark/Light theme toggle
- 📊 Task statistics dashboard
- 🔍 Filter tasks by status (all, pending, completed)
- 📱 Responsive design
- 🚀 Vercel-ready deployment
- 💾 In-memory storage (perfect for demos and prototypes)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Storage:** In-memory (Vercel compatible)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Task-Manager/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # Main tasks API
│   │       ├── [id]/route.ts     # Individual task operations
│   │       └── stats/route.ts    # Task statistics
│   ├── edit/[id]/
│   │   └── page.tsx              # Edit task page
│   ├── new/
│   │   └── page.tsx              # Create new task page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   └── storage.ts                # In-memory storage service
└── public/                       # Static assets
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task
- `PATCH /api/tasks/[id]` - Toggle task status
- `DELETE /api/tasks/[id]` - Delete a task
- `GET /api/tasks/stats` - Get task statistics

## Deployment to Vercel

This application is optimized for Vercel deployment:

### Option 1: Deploy from GitHub

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts

### Important Notes for Vercel Deployment

- ✅ **No file system dependencies** - Uses in-memory storage
- ✅ **Serverless functions ready** - All API routes are optimized for Vercel
- ✅ **No external database required** - Perfect for demos and prototypes
- ⚠️ **Data persistence** - Data resets on each deployment (by design for demo purposes)

## Environment Variables

No environment variables are required for basic functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).