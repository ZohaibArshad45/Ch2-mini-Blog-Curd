import Link from "next/link";
import connectToDB from "@/database/connection";
import BlogModel from "@/database/models/Blog";

export default async function BlogPage({ params }) {
  await connectToDB();
  const blog = await BlogModel.findById(params.id).lean();

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500 text-lg">
        Blog not found.
        <div className="mt-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to Blogs
        </Link>
      </div>

      <article className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 break-words">
          {blog.title}
        </h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
          {blog.des}
        </p>
      </article>
    </div>
  );
}
