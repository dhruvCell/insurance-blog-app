import BlogCard from "@/components/BlogCard";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import styles from "./page.module.css";

export const revalidate = 10; // ISR: revalidate every 10 seconds

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Latest Blog Posts</h1>
      <div className={styles.blogsGrid}>
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
