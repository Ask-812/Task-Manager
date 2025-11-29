import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Database service for stats
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

  async getStats() {
    const tasks = await this.readTasks();
    return {
      total: tasks.length,
      pending: tasks.filter(task => task.status === "pending").length,
      completed: tasks.filter(task => task.status === "completed").length
    };
  }
}

const dbService = new TaskDatabaseService();

// GET /api/tasks/stats - Get task statistics
export async function GET() {
  try {
    const stats = await dbService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get task statistics" },
      { status: 500 }
    );
  }
}