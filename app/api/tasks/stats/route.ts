import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

// GET /api/tasks/stats - Get task statistics
export async function GET() {
  try {
    const stats = storage.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get task statistics" },
      { status: 500 }
    );
  }
}