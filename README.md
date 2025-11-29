Task Manager - TrialBridge Assignment

A sophisticated task management application built with Next.js 16, React 19, and TypeScript. This application demonstrates advanced full-stack development capabilities with CRUD operations, object-oriented architecture, and modern design patterns.

Features

Core Functionality
-  Create Tasks - Add new Simple or Complex tasks with title and description
-  View Tasks - Display all tasks in a clean, organized interface with statistics
-  Update Tasks - Edit existing task details
-  Delete Tasks - Remove tasks permanently
-  Toggle Status - Mark tasks as pending or completed
-  Task Statistics - Real-time dashboard showing total, pending, and completed counts

 User Experience
-  Dark/Light Theme - Toggle between themes with persistent preference
-  Responsive Design - Works seamlessly on desktop and mobile
-  Task Filtering - Filter by All, Pending, or Completed tasks
-  Clean UI - Modern interface using Tailwind CSS with smooth animations
-  Statistics Dashboard - Visual overview of task completion progress

 Technical Features
-  Next.js 16 App Router - Latest routing and server components
-  File-based Storage - JSON data persistence
-  REST API - Clean API endpoints for all operations
-  TypeScript - Type-safe development
-  Tailwind CSS - Utility-first styling
-  Object-Oriented Architecture - Abstract classes, inheritance, and design patterns

 System Architecture

This project implements a sophisticated Object-Oriented Design following clean architecture principles:

 Class Structure
```typescript
// Abstract base class with @get/@set patterns
abstract class Task {
  protected _title: string;
  protected _description: string;
  protected _task_id: string;
  protected _status: "pending" | "completed";
  
  // Getters and Setters
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }
  
  abstract getType(): string;
}

// Concrete implementations
class SimpleTask extends Task {
  getType(): string { return "simple"; }
}

class ComplexTask extends Task {
  private _subtaskIds: string[] = [];
  
  addSubtask(taskId: string): void { / logic / }
  removeSubtask(taskId: string): void { / logic / }
  
  getType(): string { return "complex"; }
}
```

 Architecture Layers
- Model Layer: Abstract Task class with inheritance hierarchy
- Service Layer: Database abstraction with multiple implementations
- Controller Layer: Business logic and API endpoint handlers
- Client Layer: Frontend services for API interaction

 Tech Stack

- Framework: Next.js 16.0.5
- Frontend: React 19.2.0, TypeScript
- Styling: Tailwind CSS 4
- Data Storage: File-based JSON
- Development: ESLint, PostCSS
- Architecture: Object-Oriented Programming, SOLID principles

 Project Structure

```
task-manager/
├── app/
│   ├── page.tsx               Main dashboard with statistics
│   ├── layout.tsx             Root layout with theme
│   ├── globals.css            Global styles & theme variables
│   ├── new/
│   │   └── page.tsx           Create task page (Simple/Complex)
│   ├── edit/
│   │   └── [id]/page.tsx      Edit task page
│   └── api/
│       └── tasks/
│           ├── route.ts       Tasks API (GET, POST) with OOP classes
│           ├── stats/route.ts  Statistics endpoint
│           └── [id]/route.ts  Individual task API (GET, PUT, PATCH, DELETE)
├── data/
│   └── tasks.json            Task data storage
└── public/                   Static assets
```

 API Endpoints

 Tasks Collection
- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task (Simple/Complex)

 Individual Tasks
- `GET /api/tasks/[id]` - Get specific task
- `PUT /api/tasks/[id]` - Update task title/description
- `PATCH /api/tasks/[id]` - Toggle task status
- `DELETE /api/tasks/[id]` - Delete task

 Statistics
- `GET /api/tasks/stats` - Get task statistics (total, pending, completed)

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
1. Click "Create Task" on the main dashboard
2. Choose task type: Simple Task or Complex Task (with subtasks)
3. Fill in the task title (required) and description (optional)
4. Click "Create Task" to save

 Managing Tasks
- Toggle Status: Click the status button to mark as pending/completed
- Edit: Click "Edit" to modify task details
- Delete: Click "Delete" to remove the task permanently

 Dashboard Features
- Statistics Cards: View total, pending, and completed task counts
- Filtering: Use filter buttons to view All, Pending, or Completed tasks
- Theme Toggle: Click the theme button (🌙/☀️) to switch modes

 Development Features

 Object-Oriented Programming
- Abstract Classes: Base Task class with protected properties
- Inheritance: SimpleTask and ComplexTask extending base class
- Encapsulation: Private/protected properties with getter/setter methods
- Polymorphism: Different task types with common interface

 Design Patterns
- Factory Pattern: Task creation based on type
- Service Layer Pattern: Database abstraction
- Controller Pattern: API endpoint management
- Observer Pattern: Real-time statistics updates

 Code Quality
- Type Safety: Full TypeScript implementation
- Error Handling: Comprehensive try-catch blocks
- Clean Code: SOLID principles and separation of concerns
- Scalability: Easy to extend with new task types or database services

 Build & Deploy

```bash
 Build for production
npm run build

 Start production server
npm start

 Lint code
npm run lint
```

 Architecture Benefits

This implementation demonstrates:
-  Scalable Architecture: Easy to add new task types or features
-  Maintainability: Clean separation of concerns
-  Testability: Each layer can be tested independently
-  Flexibility: Database service can be easily swapped
-  Performance: Optimized React patterns and Next.js features

 Assignment Completion

This task manager fulfills all requirements for the TrailBridge recruitment assignment, demonstrating:
-  Advanced Full-stack Development capabilities
-  Object-Oriented Programming mastery
-  Modern JavaScript/TypeScript proficiency
-  Clean Architecture implementation
-  System Design expertise
-  User Experience design
-  API Development best practices
-  Responsive Web Design implementation