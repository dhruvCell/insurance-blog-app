import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch the most recent blog post
    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .select('title createdAt')
      .lean();

    // Format the data for the frontend
    const formattedBlogs = recentBlogs.map(blog => ({
      id: blog._id.toString(),
      title: blog.title,
      createdAt: blog.createdAt,
      timeAgo: getTimeAgo(blog.createdAt)
    }));

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error('Error fetching recent blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent blogs' },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return 'Less than an hour ago';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
}
