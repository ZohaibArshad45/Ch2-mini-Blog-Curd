"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/get-blog");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/delete-blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        alert("Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">All Blogs</h1>
        <Link
          href="/add-blog"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          + Add Blog
        </Link>
      </div>

      {/* Blog Cards Grid */}
      {blogs.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(({ _id, title, des }) => (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg transition h-64"
            >
              {/* Blog Content */}
              <div>
                <h2 className="font-bold text-lg text-gray-900 mb-2 break-words line-clamp-1">
                  {title}
                </h2>
                <p className="text-gray-700 text-sm mb-4 break-words line-clamp-3">
                  {des}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-auto">
                <Link
                  href={`/blog/${_id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>

                <div className="flex gap-2">
                  {/* <Link
                    href={`/update-blog/${_id}`}
                    className="px-4 py-1.5 rounded-xl text-white text-sm font-medium shadow transition bg-green-500 hover:bg-green-600"
                  >
                    Edit
                  </Link> */}
                  <button
                    onClick={() => handleDelete(_id)}
                    disabled={deletingId === _id}
                    className={`px-4 py-1.5 rounded-xl text-white text-sm font-medium shadow transition ${
                      deletingId === _id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingId === _id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No blogs found.</p>
      )}
    </div>
  );
}
