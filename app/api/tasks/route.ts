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

export async function GET() {
  try {
    const tasks = await readTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const tasks = await readTasks();
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

