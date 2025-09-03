'use client';

import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import LoadingSpinner from './LoadingSpinner';
import BlogCardSkeleton from './BlogCardSkeleton';
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
  viewCount: number;
}

export default function BlogSearch() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        const blogsWithStringId = data
          .filter((blog: any) => blog._id && blog.imageId)
          .map((blog: any) => ({
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
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.createdAt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
    setDisplayedCount(10);
  }, [searchQuery, blogs]);

  if (loading) {
    return (
      <div>
        <div className="text-center py-8">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
        <BlogCardSkeleton count={6} />
      </div>
    );
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
          filteredBlogs.slice(0, displayedCount).map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              headline={blog.headline}
              imageId={blog.imageId}
              createdAt={blog.createdAt}
              viewCount={blog.viewCount || 0}
              onDelete={(id) => {
                setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
                setFilteredBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
              }}
            />
          ))
        ) : (
          <p>No blogs found matching your search.</p>
        )}
      </div>
      {filteredBlogs.length > displayedCount && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {loadingMore ? (
            <div className="flex flex-col items-center">
              <LoadingSpinner size="medium" />
              <p className="mt-2 text-gray-600">Loading more blogs...</p>
            </div>
          ) : (
            <button
              onClick={() => {
                setLoadingMore(true);
                setTimeout(() => {
                  setDisplayedCount(prev => prev + 10);
                  setLoadingMore(false);
                }, 500);
              }}
              disabled={loadingMore}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#2E86AB',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
