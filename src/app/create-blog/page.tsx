"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/components/BlogForm";

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
      router.push("/blogs");
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
      <BlogForm onSubmit={handleSubmit} />
    </main>
  );
}
