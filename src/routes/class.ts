import { NextResponse } from "next/server";
import { classService } from "../services/class-router";
// import { classService } from "@/services/class.service"; // adjust path if needed

// GET All Classes
export async function GET() {
  try {
    const classes = await classService.getAllClasses();
    return NextResponse.json(classes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST Create Class
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newClass = await classService.createClass(body);
    return NextResponse.json(newClass, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}