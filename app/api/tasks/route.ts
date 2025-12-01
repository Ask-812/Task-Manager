import { NextRequest, NextResponse } from "next/server";
import { storage, TaskData } from "@/lib/storage";

// Task classes for creating new tasks
abstract class Task {
  protected _description: string = "";
  protected _title: string = "";
  protected _task_id: string = "";
  protected _created_date: Date = new Date();
  protected _status: "pending" | "completed" = "pending";

  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }
  get task_id(): string { return this._task_id; }
  set task_id(value: string) { this._task_id = value; }
  get status(): "pending" | "completed" { return this._status; }
  set status(value: "pending" | "completed") { this._status = value; }

  toJSON(): TaskData {
    return {
      id: this._task_id,
      title: this._title,
      description: this._description,
      status: this._status,
      createdAt: this._created_date.toISOString(),
      type: this.getType()
    };
  }

  abstract getType(): string;
}

class SimpleTask extends Task {
  constructor(title: string = "", description: string = "") {
    super();
    this._title = title;
    this._description = description;
    this._task_id = Date.now().toString();
  }

  getType(): string {
    return "simple";
  }
}

class ComplexTask extends Task {
  private _subtaskIds: string[] = [];

  constructor(title: string = "", description: string = "") {
    super();
    this._title = title;
    this._description = description;
    this._task_id = Date.now().toString();
  }

  get subtaskIds(): string[] { return [...this._subtaskIds]; }
  
  addSubtask(taskId: string): void {
    if (!this._subtaskIds.includes(taskId)) {
      this._subtaskIds.push(taskId);
    }
  }

  removeSubtask(taskId: string): void {
    this._subtaskIds = this._subtaskIds.filter(id => id !== taskId);
  }

  getType(): string {
    return "complex";
  }

  toJSON(): TaskData {
    return {
      ...super.toJSON(),
      subtaskIds: this._subtaskIds
    };
  }
}

// GET /api/tasks - Get all tasks
export async function GET() {
  try {
    // Initialize sample data if needed
    await storage.initializeSampleData();
    const tasks = await storage.getAllTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create new task  
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, type = "simple" } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    let task: Task;
    if (type === "simple") {
      task = new SimpleTask(title.trim(), description?.trim() || "");
    } else {
      task = new ComplexTask(title.trim(), description?.trim() || "");
    }

    const savedTask = await storage.addTask(task.toJSON());
    if (!savedTask) {
      return NextResponse.json(
        { error: "Failed to save task" },
        { status: 500 }
      );
    }
    return NextResponse.json(savedTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

