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
- **Database:** MongoDB Atlas
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository**

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up MongoDB Atlas:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a free account and cluster
   - Get your connection string
   - Create a `.env.local` file in the root directory
   - Add your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

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

- ✅ **MongoDB Atlas integration** - Persistent data storage
- ✅ **Serverless functions ready** - All API routes optimized for Vercel
- ✅ **Environment variables** - Add MONGODB_URI to Vercel project settings
- ✅ **Data persistence** - Tasks are saved permanently in MongoDB

## Environment Variables

Required environment variables:

```bash
MONGODB_URI=your_mongodb_connection_string
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `MONGODB_URI` with your MongoDB Atlas connection string
4. Redeploy your application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).