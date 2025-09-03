"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  id: string;
  title: string;
  headline: string;
  imageId: string;
  createdAt: string;
  viewCount?: number;
}

export default function BlogCard({ id, title, headline, imageId, createdAt, viewCount = 0 }: BlogCardProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("adminAuthenticated");
    setIsAdmin(adminStatus === "true");
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Blog deleted successfully!");
          window.location.reload(); // Refresh the page to update the list
        } else {
          alert("Failed to delete blog");
        }
      } catch (error) {
        alert("Error deleting blog");
      }
    }
  };

  return (
    <div className={styles.card}>
      {/* Left: Image */}
      <div className={styles.cardImageContainer}>
        <img src={typeof imageId === 'string' && imageId.startsWith('data:') ? imageId : `/api/images/${imageId}`} alt={title} className={styles.cardImage} />
      </div>

      {/* Right: Content */}
      <div className={styles.cardContent}>
        <Link href={`/blogs/${id}`} className={styles.cardOverlay} aria-label={`Read more about ${title}`}>{title}</Link>
        <p className={styles.cardExcerpt}>{headline}</p>

        <div className={styles.cardMeta}>
          <span className={styles.cardDate}>
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

            <div className={styles.adminActions}>
              <div className={styles.viewCount}>
                <span className={styles.viewIcon}>👁️</span>
                <span className={styles.viewText}>{viewCount} views</span>
              </div>
          {isAdmin && (
              <div className={styles.actionButtons}>
                <Link href={`/edit-blog/${id}`} className={styles.editButton}>
                  Edit
                </Link>
                <button onClick={handleDelete} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
          )}
            </div>
        </div>
      </div>
    </div>
  );
}
