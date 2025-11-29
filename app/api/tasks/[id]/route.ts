import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Database service for individual tasks
class TaskDatabaseService {
  private filePath = path.join(process.cwd(), "data", "tasks.json");

  private async readTasks() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data).tasks || [];
    } catch (error) {
      return [];
    }
  }

  private async writeTasks(tasks: any[]) {
    const data = { tasks };
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async getTask(id: string) {
    const tasks = await this.readTasks();
    return tasks.find(task => task.id === id);
  }

  async updateTask(id: string, updates: any) {
    const tasks = await this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    tasks[index] = { ...tasks[index], ...updates };
    await this.writeTasks(tasks);
    return tasks[index];
  }

  async toggleTaskStatus(id: string) {
    const tasks = await this.readTasks();
    const task = tasks.find(task => task.id === id);
    
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    task.status = task.status === "pending" ? "completed" : "pending";
    await this.writeTasks(tasks);
    return task;
  }

  async deleteTask(id: string) {
    const tasks = await this.readTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (tasks.length === filteredTasks.length) {
      throw new Error(`Task with id ${id} not found`);
    }

    await this.writeTasks(filteredTasks);
  }
}

const dbService = new TaskDatabaseService();

// GET /api/tasks/[id] - Get specific task
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const task = await dbService.getTask(id);

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get task" },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id] - Update task
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const updatedTask = await dbService.updateTask(id, {
      title: title.trim(),
      description: description?.trim() || ""
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// PATCH /api/tasks/[id] - Toggle task status
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updatedTask = await dbService.toggleTaskStatus(id);
    return NextResponse.json(updatedTask);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update task status" },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete task
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbService.deleteTask(id);
    
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}