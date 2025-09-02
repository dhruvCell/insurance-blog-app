import BlogCard from "@/components/BlogCard";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export const revalidate = 10; // ISR: revalidate every 10 seconds

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog: any) => (
          <BlogCard
            key={blog._id.toString()}
            id={blog._id.toString()}
            title={blog.title}
            headline={blog.headline}
            image={blog.image}
            createdAt={blog.createdAt.toISOString()}
          />
        ))}
      </div>
    </main>
  );
}
