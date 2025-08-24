// app/api/delete-blog/[id]/route.js
import connectToDB from "@/database/connection";
import BlogModel from "@/database/models/Blog";
import { NextResponse } from "next/server";

export async function DELETE(_req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Missing blog ID" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", blog: deletedBlog },
      { status: 200 }
    );

    
  } catch (err) {
    console.error("Delete Blog Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
