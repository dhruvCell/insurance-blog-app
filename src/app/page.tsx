'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import styles from "./page.module.css";

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

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        const blogsWithStringId = data
          .filter((blog: any) => blog._id && blog.imageId)
          .slice(0, 3)
          .map((blog: any) => ({
            ...blog,
            _id: blog._id.toString(),
            imageId: blog.imageId.toString(),
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
          }));
        setFeaturedBlogs(blogsWithStringId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <div className={styles.hero}>
        <main className="container mx-auto px-6 py-20">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Insurance Awareness Blog
            </h1>
            <p className={styles.heroSubtitle}>
              Empowering you with knowledge about insurance policies, coverage options, and financial protection strategies for a secure future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/blogs"
              className={styles.ctaButton}
            >
              Explore Blogs
            </Link>
            <Link
              href="/create-blog"
              className={styles.secondaryButton}
            >
              Share Your Knowledge
            </Link>
          </div>
        </main>
      </div>

      {/* Featured Articles Section */}
      <section className={styles.featuredSection}>
        <div className="container mx-auto px-6 py-16">
          <h2 className={styles.sectionTitle}>Featured Articles</h2>
          <p className={styles.sectionSubtitle}>Discover our latest insurance insights and guides</p>

          {loading ? (
            <div className="text-center py-8">
              <p>Loading featured articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p>Error loading articles: {error}</p>
            </div>
          ) : featuredBlogs.length > 0 ? (
            <div className={styles.articlesGrid}>
              {featuredBlogs.map((blog) => (
                <div key={blog._id} className={styles.articleCard}>
                  <div className={styles.articleImage}>
                    <img
                      src={typeof blog.imageId === 'string' && blog.imageId.startsWith('data:') ? blog.imageId : `/api/images/${blog.imageId}`}
                      alt={blog.title}
                      className={styles.articleImageTag}
                    />
                  </div>
                  <Link href={`/blogs/${blog._id}`} className={styles.articleTitleLink}>
                    <h3 className={styles.articleTitle}>{blog.title}</h3>
                  </Link>
                  <p className={styles.articleExcerpt}>{blog.headline}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No featured articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Insurance Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container mx-auto px-6 py-16">
          <h2 className={styles.sectionTitle}>Insurance Categories</h2>
          <p className={styles.sectionSubtitle}>Explore different types of insurance coverage</p>
          
          <div className={styles.categoriesGrid}>
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>🏥</div>
              <h3 className={styles.categoryTitle}>Health Insurance</h3>
              <p className={styles.categoryDescription}>Understanding medical coverage, premiums, and benefits for individuals and families.</p>
            </div>
            
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>🚗</div>
              <h3 className={styles.categoryTitle}>Auto Insurance</h3>
              <p className={styles.categoryDescription}>Coverage options, liability, collision, and comprehensive protection for vehicles.</p>
            </div>
            
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>🏠</div>
              <h3 className={styles.categoryTitle}>Home Insurance</h3>
              <p className={styles.categoryDescription}>Protecting your property against damage, theft, and natural disasters.</p>
            </div>
            
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>👨‍👩‍👧‍👦</div>
              <h3 className={styles.categoryTitle}>Life Insurance</h3>
              <p className={styles.categoryDescription}>Financial security for your loved ones through various life insurance products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Insurance Matters Section */}
      <section className={styles.importanceSection}>
        <div className="container mx-auto px-6 py-16">
          <div className={styles.importanceContent}>
            <div className={styles.importanceText}>
              <h2 className={styles.sectionTitle}>Why Insurance Matters</h2>
              <p className={styles.importanceDescription}>
                Insurance is a critical component of financial planning that provides protection against unexpected events. 
                Without proper coverage, a single accident, illness, or natural disaster could lead to financial ruin.
              </p>
              
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <h4 className={styles.statNumber}>40%</h4>
                  <p className={styles.statLabel}>of Americans can't cover a $400 emergency expense</p>
                </div>
                
                <div className={styles.statItem}>
                  <h4 className={styles.statNumber}>25%</h4>
                  <p className={styles.statLabel}>of families deplete their savings due to medical crises</p>
                </div>
                
                <div className={styles.statItem}>
                  <h4 className={styles.statNumber}>60%</h4>
                  <p className={styles.statLabel}>of homeowners are underinsured for disaster recovery</p>
                </div>
              </div>
            </div>
            
            <div className={styles.importanceImage}>
              {/* Placeholder for an illustration */}
              <div className={styles.imagePlaceholder}>
                <img src="/insurance.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className={styles.sectionTitle}>Stay Informed</h2>
          <p className={styles.sectionSubtitle}>Subscribe to our newsletter for the latest insurance insights and tips</p>
          
          <div className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>Subscribe</button>
          </div>
          
          <p className={styles.newsletterDisclaimer}>
            We respect your privacy and will never share your information with third parties.
          </p>
        </div>
      </section>
    </div>
  );
}