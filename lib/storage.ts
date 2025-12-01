// In-memory storage for tasks - Vercel compatible
export interface TaskData {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
  type: string;
  subtaskIds?: string[];
}

class InMemoryStorage {
  private tasks: TaskData[] = [
    {
      id: "1764418499159",
      title: "Sample Task 1",
      description: "This is a sample task to get you started",
      status: "completed",
      createdAt: "2025-11-29T12:14:59.159Z",
      type: "simple"
    },
    {
      id: "1764418511456",
      title: "Sample Task 2",
      description: "Another sample task",
      status: "pending",
      createdAt: "2025-11-29T12:15:11.456Z",
      type: "simple"
    },
    {
      id: "1764418525454",
      title: "Sample Task 3",
      description: "A third sample task",
      status: "pending",
      createdAt: "2025-11-29T12:15:25.454Z",
      type: "simple"
    }
  ];

  getAllTasks(): TaskData[] {
    return [...this.tasks];
  }

  getTask(id: string): TaskData | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: TaskData): void {
    this.tasks.push(task);
  }

  updateTask(id: string, updates: Partial<TaskData>): TaskData | null {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return null;
    
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length < initialLength;
  }

  toggleTaskStatus(id: string): TaskData | null {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return null;
    
    task.status = task.status === "pending" ? "completed" : "pending";
    return task;
  }

  getStats() {
    return {
      total: this.tasks.length,
      pending: this.tasks.filter(task => task.status === "pending").length,
      completed: this.tasks.filter(task => task.status === "completed").length
    };
  }
}

// Global instance for the entire application
export const storage = new InMemoryStorage();