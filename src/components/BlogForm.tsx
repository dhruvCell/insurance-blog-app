"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./BlogForm.module.css";

// ✅ Use react-quill-new (React 18 compatible)
const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});
import "react-quill-new/dist/quill.snow.css";

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
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image || null
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list", // covers ordered + bullet
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "script",
    "code-block",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
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
    <div className={styles.pageWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.formTitle}>✍️ Create a New Blog Post</h2>
        <p className={styles.formSubtitle}>
          Fill in the details below and start writing your next article.
        </p>

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
            placeholder="Enter your blog title"
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
            placeholder="Catchy blog headline"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.formLabel}>
            Blog Image
          </label>
          <div className={styles.imageUploadWrapper}>
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
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>
            Content
          </label>
          <div className={styles.editorWrapper}>
            <QuillNoSSRWrapper
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className={styles.quillEditor}
              placeholder="Write your blog content here..."
            />
          </div>
        </div>

        <div className={styles.actionBar}>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Publishing..." : "🚀 Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
