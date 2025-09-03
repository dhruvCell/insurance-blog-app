"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminActions from "@/components/AdminActions";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const isAdmin = localStorage.getItem("adminAuthenticated") === "true";

      const res = await fetch(`/api/blogs/${id}`, {
        headers: {
          "x-admin": isAdmin.toString(),
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBlog(data);
      } else {
        // handle error
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

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
          <span className={styles.breadcrumbCurrent}>{blog.slug}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{blog.title}</h1>
          <p className={styles.articleSubtitle}>{blog.headline}</p>
          <div className={styles.articleMeta}>
            <span>
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
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
            src={
              blog.imageId &&
              typeof blog.imageId === "string" &&
              !blog.imageId.startsWith("data:")
                ? `/api/images/${blog.imageId}`
                : blog.image || (blog.imageId ? `/api/images/${blog.imageId}` : "")
            }
            alt={blog.title}
            className={styles.featuredImage}
          />
        </div>

        {/* Article Content */}
        <article className={styles.articleContent}>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* Admin Actions */}
        <AdminActions blogId={blog._id.toString()} viewCount={blog.viewCount || 0} />

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
