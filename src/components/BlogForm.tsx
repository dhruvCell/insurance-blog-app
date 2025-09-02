"use client";

import { useState } from "react";
import styles from "./BlogForm.module.css";

interface BlogFormProps {
  onSubmit: (data: {
    title: string;
    headline: string;
    content: string;
    image: string;
    imageType: string;
  }) => Promise<void>;
  initialData?: {
    title: string;
    headline: string;
    content: string;
    image: string;
    imageType: string;
  };
}

export default function BlogForm({ onSubmit, initialData }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [headline, setHeadline] = useState(initialData?.headline || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [imageType, setImageType] = useState(initialData?.imageType || "");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        setImageType(file.type);
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ title, headline, content, image, imageType });
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Create New Blog</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="headline" className={styles.formLabel}>
          Headline
        </label>
        <input
          type="text"
          id="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.formLabel}>
          Blog Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.formFile}
          required={!initialData}
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className={styles.imagePreview}
          />
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.formLabel}>
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className={styles.formTextarea}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
