"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import styles from "./page.module.css";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: {
    title: string;
    headline: string;
    content: string;
    image: string;
    imageType: string;
  }) => {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      const errorData = await response.json();
      alert(`Failed to create blog: ${errorData.error || 'Unknown error'}`);
    }
  };

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
