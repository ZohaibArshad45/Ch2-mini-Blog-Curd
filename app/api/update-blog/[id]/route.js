import connectToDB from "@/database/connection";
import BlogModel from "@/database/models/Blog";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const { title, des } = await req.json();

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, des },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating blog" }, { status: 500 });
  }
}
