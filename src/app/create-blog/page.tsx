"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import styles from "./page.module.css";

export default function CreateBlogPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus !== "true") {
      router.replace("/"); // faster than push for redirects
    }
    setAuthChecked(true);
  }, [router]);

  const handleSubmit = async (data: {
    title: string;
    headline: string;
    content: string;
    image: string;
    imageType: string;
  }) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }

      router.push("/admin");
    } catch (err: any) {
      alert(`Failed to create blog: ${err.message}`);
    }
  };

  if (!authChecked) {
    return (
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Create New Blog</h1>
        <div className={styles.formWrapper}>
          <BlogForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
