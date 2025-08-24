import connectToDB from "@/database/connection";
import BlogModel from "@/database/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDB();

    const { title, des } = await request.json();

    if (!title || !des) {
      return new NextResponse("Title and description are required", { status: 400 });
    }

    const newBlog = await BlogModel.create({ title, des });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
