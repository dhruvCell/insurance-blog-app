import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
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

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Expert Insights</h3>
            <p className={styles.featureText}>
              Access comprehensive articles written by insurance professionals covering the latest trends, policies, and best practices.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Mobile Friendly</h3>
            <p className={styles.featureText}>
              Enjoy a seamless reading experience across all devices with our fully responsive design optimized for mobile and desktop.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Community Driven</h3>
            <p className={styles.featureText}>
              Join our growing community of insurance enthusiasts. Share your experiences and learn from others in our interactive platform.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
