'use client';

import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import styles from '../app/blogs/page.module.css';

interface Blog {
  _id: string;
  title: string;
  headline: string;
  content: string;
  imageId: string;
  imageType: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function BlogSearch() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        const blogsWithStringId = data.map((blog: any) => ({
          ...blog,
          _id: blog._id.toString(),
          imageId: blog.imageId.toString(),
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
        }));
        setBlogs(blogsWithStringId);
        setFilteredBlogs(blogsWithStringId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search blogs by title, headline, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.blogsGrid}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              headline={blog.headline}
              imageId={blog.imageId}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <p>No blogs found matching your search.</p>
        )}
      </div>
    </div>
  );
}
