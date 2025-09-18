"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./AdminActions.module.css";
import Modal from "./Modal";

interface AdminActionsProps {
  blogId: string;
  viewCount: number;
}

export default function AdminActions({ blogId, viewCount }: AdminActionsProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Check if user is authenticated as admin
    const adminAuth = localStorage.getItem("adminAuthenticated");
    setIsAdmin(adminAuth === "true");
  }, []);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Blog deleted successfully!");
        window.location.href = "/blogs";
      } else {
        const error = await response.json();
        alert(`Failed to delete blog: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className={styles.adminActions}>
        <div className={styles.viewCount}>
          <span className={styles.viewIcon}>👁️</span>
          <span className={styles.viewText}>{viewCount} views</span>
        </div>

        <div className={styles.actionButtons}>
          <Link
            href={`/edit-blog/${blogId}`}
            className={styles.editButton}
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={styles.deleteButton}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this blog? This action cannot be undone."
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
