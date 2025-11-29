import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const file_path = path.join(process.cwd(), "data", "tasks.json");

async function readTasks() {
  const data = await fs.readFile(file_path, "utf-8");
  return JSON.parse(data).tasks;
}

async function writeTasks(tasks) {
  const data = { tasks };
  await fs.writeFile(file_path, JSON.stringify(data, null, 2));
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);

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

export async function PUT(request, { params }) {
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

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title.trim(),
      description: description?.trim() || "",
    };

    await writeTasks(tasks);
    return NextResponse.json(tasks[taskIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    task.status = task.status === "pending" ? "completed" : "pending";
    await writeTasks(tasks);

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const tasks = await readTasks();
    const newTasks = tasks.filter((t) => t.id !== id);

    if (tasks.length === newTasks.length) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    await writeTasks(newTasks);
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}