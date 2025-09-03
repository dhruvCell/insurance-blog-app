import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function GET() {
  try {
    await dbConnect();
    const totalBlogs = await Blog.countDocuments();
    return NextResponse.json({ totalBlogs });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json({ error: "Failed to fetch blog stats" }, { status: 500 });
  }
}
