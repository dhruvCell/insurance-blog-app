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
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

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
      if (file.size > 25 * 1024 * 1024) {
        alert("File size must be less than 25MB");
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

    // Validate required fields
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!headline.trim()) {
      alert("Please enter a headline");
      return;
    }
    if (!content.trim()) {
      alert("Please enter content");
      return;
    }
    if (!image) {
      alert("Please select an image");
      return;
    }
    if (!imageType) {
      alert("Image type is missing. Please re-select your image.");
      return;
    }

    setLoading(true);

    try {
      const data = { title: title.trim(), headline: headline.trim(), content: content.trim(), image, imageType };
      console.log("Submitting data:", data); // Debug log
      await onSubmit(data);
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

          {/* Mode Toggle Buttons */}
          <div className={styles.modeToggle}>
            <button
              type="button"
              onClick={() => {
                setIsPreviewMode(false);
                setIsHtmlMode(false);
              }}
              className={`${styles.modeButton} ${!isPreviewMode && !isHtmlMode ? styles.active : ''}`}
            >
              Rich Text
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPreviewMode(false);
                setIsHtmlMode(true);
              }}
              className={`${styles.modeButton} ${isHtmlMode ? styles.active : ''}`}
            >
              HTML Code
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPreviewMode(true);
                setIsHtmlMode(false);
              }}
              className={`${styles.modeButton} ${isPreviewMode ? styles.active : ''}`}
            >
              Preview
            </button>
          </div>

          <div className={styles.editorWrapper}>
            {isPreviewMode ? (
              <div className={styles.previewContainer}>
                <div
                  className={styles.previewContent}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            ) : isHtmlMode ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.htmlTextarea}
                placeholder="<p>Write your HTML content here...</p>"
                rows={20}
              />
            ) : (
              <QuillNoSSRWrapper
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className={styles.quillEditor}
                placeholder="Write your blog content here..."
              />
            )}
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
