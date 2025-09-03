import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch the top 3 viewed blog posts (excluding 0 views)
    const topViewedBlogs = await Blog.find({ viewCount: { $gt: 0 } })
      .sort({ viewCount: -1 })
      .limit(3)
      .select('title viewCount')
      .lean();

    // Format the data for the frontend
    const formattedBlogs = topViewedBlogs.map(blog => ({
      id: blog._id.toString(),
      title: blog.title,
      viewCount: blog.viewCount
    }));

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error('Error fetching top viewed blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top viewed blogs' },
      { status: 500 }
    );
  }
}
