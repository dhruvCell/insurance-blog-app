'use client';

import BlogSearch from "@/components/BlogSearch";
import styles from "./page.module.css";

export default function BlogsPage() {
  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Latest Blog Posts</h1>
      <BlogSearch />
    </main>
  );
}
