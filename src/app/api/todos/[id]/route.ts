import { NextResponse } from "next/server";

// get single todo
export async function GET() {
  return NextResponse.json({ message: "OK" });
}

// update todo
export async function PATCH() {
  return NextResponse.json({ message: "OK" });
}

// delete todo
export async function DELETE() {
  return NextResponse.json({ message: "OK" });
}
