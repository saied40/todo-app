import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      status: "ok",
      message: "Connected to MongoDB",
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message || String(error) },
      { status: 500 }
    );
  }
}
