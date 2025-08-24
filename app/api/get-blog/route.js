import connectToDB from "@/database/connection";
import BlogModel from "@/database/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const blogs = await BlogModel.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json(blogs, { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
