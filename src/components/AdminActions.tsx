"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./AdminActions.module.css";
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";

interface AdminActionsProps {
  blogId: string;
  viewCount: number;
}

export default function AdminActions({ blogId, viewCount }: AdminActionsProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
    router.push(`/edit-blog/${blogId}`);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className={styles.adminActions}>
        <div className={styles.actionButtons}>
          <button
            onClick={handleEdit}
            disabled={isEditing}
            className={styles.editButton}
          >
            {isEditing ? (
              <>
                <LoadingSpinner size="small" className={styles.loadingSpinner} />
                Editing...
              </>
            ) : (
              "Edit"
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={styles.deleteButton}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          
        </div>
      </div>
    </>
  );
}
