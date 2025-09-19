"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./page.module.css";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string;

if (!ADMIN_PASSWORD) {
  throw new Error("NEXT_PUBLIC_ADMIN_PASSWORD environment variable is not set");
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [blogStats, setBlogStats] = useState({ totalBlogs: 0 });
  const [loading, setLoading] = useState(false);
  interface RecentBlog {
    id: string;
    title: string;
    createdAt: string;
    timeAgo: string;
  }

  interface TopViewedBlog {
    id: string;
    title: string;
    viewCount: number;
  }

  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [topViewedBlogs, setTopViewedBlogs] = useState<TopViewedBlog[]>([]);
  const [topViewedLoading, setTopViewedLoading] = useState(false);
  const [blogs, setBlogs] = useState<TopViewedBlog[]>([]);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [isManagingBlogs, setIsManagingBlogs] = useState(false);

  useEffect(() => {
    // Check if already authenticated from localStorage
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchBlogStats();
      fetchRecentBlogs();
      fetchTopViewedBlogs();
    }
  }, []);

  const fetchBlogStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs/stats');
      if (response.ok) {
        const data = await response.json();
        setBlogStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch blog stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      setRecentLoading(true);
      const response = await fetch('/api/blogs/recent');
      if (response.ok) {
        const data = await response.json();
        setRecentBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch recent blogs:', error);
    } finally {
      setRecentLoading(false);
    }
  };

  const fetchTopViewedBlogs = async () => {
    try {
      setTopViewedLoading(true);
      const response = await fetch('/api/blogs/top-viewed');
      if (response.ok) {
        const data = await response.json();
        setTopViewedBlogs(data);
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch top viewed blogs:', error);
    } finally {
      setTopViewedLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setError("");
      fetchBlogStats();
      fetchRecentBlogs();
      fetchTopViewedBlogs();
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
    <div className={styles.page1}>
      <div className={styles.dashboard}>
        {/* Header Section */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
              <p className={styles.headerSubtitle}>Manage your blog content and monitor performance</p>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <button
                  className={styles.actionCard}
                  onClick={() => {
                    setIsCreatingBlog(true);
                    router.push("/create-blog");
                  }}
                  disabled={isCreatingBlog}
                >
                  <div className={styles.actionIcon}>✏️</div>
                  <div className={styles.actionContent}>
                    <h3 className={styles.actionTitle}>Create New Blog</h3>
                    <p className={styles.actionDescription}>Write and publish a new blog post to engage your audience</p>
                  </div>
                  {isCreatingBlog && (
                    <div className="loadingOverlay">
                      <LoadingSpinner size="small" />
                      Creating...
                    </div>
                  )}
                </button>

                <button
                  className={styles.actionCard}
                  onClick={() => {
                    setIsManagingBlogs(true);
                    router.push("/blogs");
                  }}
                  disabled={isManagingBlogs}
                >
                  <div className={styles.actionIcon}>📝</div>
                  <div className={styles.actionContent}>
                    <h3 className={styles.actionTitle}>Manage Blogs</h3>
                    <p className={styles.actionDescription}>Edit, delete, or review existing blog posts</p>
                  </div>
                  {isManagingBlogs && (
                    <div className="loadingOverlay">
                      <LoadingSpinner size="small" />
                      Loading...
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.recentActivity}>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <div className={styles.activityList}>
                {recentLoading ? (
                  <div className="text-center py-4">
                    <LoadingSpinner size="medium" />
                    <p className="mt-2 text-gray-600">Loading recent activity...</p>
                  </div>
                ) : recentBlogs.length > 0 ? (
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>📝</div>
                    <div className={styles.activityContent}>
                      <Link href={`/blogs/${recentBlogs[0].id}`} className={styles.activityText}>
                        {recentBlogs[0].title}
                      </Link>
                      <p className={styles.activityTime}>{recentBlogs[0].timeAgo}</p>
                    </div>
                  </div>
                ) : (
                  <p>No recent blog posts available.</p>
                )}
              </div>
            </div>

            {/* Top Viewed Blogs */}
            <div className={styles.recentActivity}>
              <h2 className={styles.sectionTitle}>Top Viewed Blogs</h2>
              <div className={styles.activityList}>
                {topViewedLoading ? (
                  <div className="text-center py-4">
                    <LoadingSpinner size="medium" />
                    <p className="mt-2 text-gray-600">Loading top viewed blogs...</p>
                  </div>
                ) : topViewedBlogs.length > 0 ? (
                  topViewedBlogs.map((blog) => (
                    <div key={blog.id} className={styles.activityItem}>
                      <div className={styles.activityIcon}>👁️</div>
                      <div className={styles.activityContent}>
                        <Link href={`/blogs/${blog.id}`} className={styles.activityText}>
                          {blog.title}
                        </Link>
                        <p className={styles.activityTime}>{blog.viewCount} views</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No viewed blogs available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
