"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import styles from "../../create-blog/page.module.css";

interface BlogData {
  title: string;
  headline: string;
  content: string;
  image: string;
  imageType: string;
  slug?: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus !== "true") {
      router.replace("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`);
        if (!response.ok) throw new Error("Failed to load blog data");
        const data = await response.json();
        setBlogData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchBlog();
  }, [params.id]);

  const handleSubmit = async (data: BlogData) => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      router.push("/admin");
    } catch (err: any) {
      alert(`Failed to update blog: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Edit Blog</h1>
        <div className={styles.formWrapper}>
          {blogData && <BlogForm onSubmit={handleSubmit} initialData={blogData} />}
        </div>
      </div>
    </div>
  );
}
