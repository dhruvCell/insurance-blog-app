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
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setBlogData(data);
        } else {
          setError("Failed to load blog data");
        }
      } catch (err) {
        setError("Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const handleSubmit = async (data: {
    title: string;
    headline: string;
    content: string;
    image: string;
    imageType: string;
  }) => {
    const response = await fetch(`/api/blogs/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      const errorData = await response.json();
      alert(`Failed to update blog: ${errorData.error || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <p>Loading blog data...</p>
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
