Task Manager - TrialBridge Assignment
A modern task management application built with Next.js 16, React 19, and TypeScript. This application demonstrates full-stack development capabilities with CRUD operations, responsive design, and clean architecture.

Features

Core Functionality
- Create Tasks - Add new tasks with title and description
- View Tasks - Display all tasks in a clean, organized interface
- Update Tasks - Edit existing task details
- Delete Tasks - Remove tasks permanently
- Toggle Status - Mark tasks as pending or completed

User Experience
- Dark/Light Theme - Toggle between themes with persistent preference
- Responsive Design - Works seamlessly on desktop and mobile
- Task Filtering - Filter by All, Pending, or Completed tasks
- Clean UI - Modern interface using Tailwind CSS

Technical Features
- Next.js 16 App Router - Latest routing and server components
- File-based Storage - JSON data persistence
- REST API - Clean API endpoints for all operations
- TypeScript - Type-safe development
- Tailwind CSS - Utility-first styling

Tech Stack

- Framework: Next.js 16.0.5
- Frontend: React 19.2.0, TypeScript
- Styling: Tailwind CSS 4
- Data Storage: File-based JSON
- Development: ESLint, PostCSS

Project Structure

```
task-manager/
├── app/
│   ├── page.tsx 
│   ├── layout.tsx          
│   ├── globals.css           
│   ├── new/
│   │   └── page.tsx        
│   ├── edit/
│   │   └── [id]/page.tsx   
│   └── api/
│       └── tasks/
│           ├── route.ts     
│           └── [id]/route.ts
├── data/
│   └── tasks.json        
└── public/                  
```

API Endpoints

Tasks Collection
- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task

Individual Tasks
- `GET /api/tasks/[id]` - Get specific task
- `PUT /api/tasks/[id]` - Update task title/description
- `PATCH /api/tasks/[id]` - Toggle task status
- `DELETE /api/tasks/[id]` - Delete task

Getting Started

1. Install Dependencies
   ```bash
   npm install
   ```

2. Run Development Server
   ```bash
   npm run dev
   ```

3. Open Application
   Navigate to [http://localhost:3000](http://localhost:3000)

Usage

Creating Tasks
1. Click "Add New Task" on the main dashboard
2. Fill in the task title (required) and description (optional)
3. Click "Create Task" to save

Managing Tasks
- Toggle Status: Click the status button to mark as pending/completed
- Edit: Click "Edit" to modify task details
- Delete: Click "Delete" to remove the task permanently

Filtering
Use the filter buttons to view:
- All: Show all tasks
- Pending: Show only incomplete tasks  
- Completed: Show only finished tasks

Theme Toggle
Click the theme button in the top right to switch between dark and light modes.

Build & Deploy

```bash
npm run build

npm start

npm run lint
```

Development Notes

This project showcases:
- Modern React patterns with hooks and server components
- Clean API design with proper HTTP methods
- Responsive CSS using Tailwind utilities
- File-based data persistence
- Error handling and form validation
- Theme management with CSS custom properties

Assignment Completion

This task manager fulfills all requirements for the TrailBridge recruitment assignment, demonstrating:
- Full-stack development capabilities
- Modern JavaScript/TypeScript proficiency
- Clean code architecture
- User experience design
- API development
- Responsive web design

---
