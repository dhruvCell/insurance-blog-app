import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import Link from "next/link";
import styles from "./page.module.css";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 10; // ISR: revalidate every 10 seconds

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = params;
  await dbConnect();
  const blog = await Blog.findById(id).lean();

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <div>
          <h1 className={styles.notFoundTitle}>Blog Not Found</h1>
          <p className={styles.notFoundText}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blogs" className={styles.notFoundButton}>
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const blogData = blog as any;

  return (
    <main className={styles.page}>
      <div className={styles.pageContainer}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/blogs" className={styles.breadcrumbLink}>
            Blogs
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{blogData.title}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{blogData.title}</h1>
          <p className={styles.articleSubtitle}>{blogData.headline}</p>
          <div className={styles.articleMeta}>
            <span>
              Published on{" "}
              {new Date(blogData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.featuredImageContainer}>
          <img
            src={blogData.image}
            alt={blogData.title}
            className={styles.featuredImage}
          />
        </div>

        {/* Article Content */}
        <article className={styles.articleContent}>
          <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
        </article>

        {/* Back to Blogs */}
        <div className={styles.backSection}>
          <Link href="/blogs" className={styles.backButton}>
            <svg
              className={styles.backIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </div>
    </main>
  );
}
