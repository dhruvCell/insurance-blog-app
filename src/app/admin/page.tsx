"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string;

if (!ADMIN_PASSWORD) {
  throw new Error("NEXT_PUBLIC_ADMIN_PASSWORD environment variable is not set");
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated from localStorage
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <div className={styles.loginContainer}>
          <h1 className={styles.loginTitle}>Admin Access</h1>
          <p className={styles.loginSubtitle}>Please enter the admin password to access the admin panel.</p>
          <form onSubmit={handlePasswordSubmit} className={styles.loginForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={styles.passwordInput}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Access Admin Panel
            </button>
          </form>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.adminPanel}>
        <h1 className={styles.panelTitle}>Admin Panel</h1>
        <p className={styles.panelSubtitle}>Welcome to the admin dashboard. Here you can manage blogs.</p>
        <div className={styles.buttonGroup}>
          <Link href="/create-blog" className={styles.createButton}>
            Create Blog
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
