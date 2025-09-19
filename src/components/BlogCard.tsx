"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./BlogCard.module.css";
import adminStyles from "./AdminActions.module.css";
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";

interface BlogCardProps {
  id: string;
  title: string;
  headline: string;
  imageId: string;
  createdAt: string;
  viewCount?: number;
  onDelete?: (id: string) => void;
}

export default function BlogCard({ id, title, headline, imageId, createdAt, viewCount = 0, onDelete }: BlogCardProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("adminAuthenticated");
    setIsAdmin(adminStatus === "true");
  }, []);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Blog deleted successfully!");
        if (onDelete) {
          onDelete(id);
        }
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      alert("Error deleting blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    router.push(`/edit-blog/${id}`);
  };

  return (
    <>
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
            <div className={styles.viewCount}>
              <span className={styles.viewIcon}>👁️</span>
              <span className={styles.viewText}>{viewCount} views</span>
              {isAdmin && (
                <div className={adminStyles.adminActions}>
                  <div className={adminStyles.actionButtons}>
                    <button
                      onClick={handleEdit}
                      disabled={isEditing}
                      className={adminStyles.editButton}
                    >
                      {isEditing ? (
                        <>
                          <LoadingSpinner size="small" className={adminStyles.loadingSpinner} />
                          Editing...
                        </>
                      ) : (
                        "Edit"
                      )}
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={adminStyles.deleteButton}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {showDeleteModal && createPortal(
          <Modal
            title="Confirm Delete"
            message="Are you sure you want to delete this blog? This action cannot be undone."
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            isLoading={isDeleting}
          />,
          document.body
        )}
      </div>
    </>
  );
}
