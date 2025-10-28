import { NextResponse } from "next/server";

// get all todos
export async function GET() {
  return NextResponse.json({ message: "OK" });
}

// create todo
export async function POST() {
  return NextResponse.json({ message: "OK" });
}
