import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
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
          <p className={styles.sectionSubtitle}>Discover our most popular insurance guides and resources</p>
          
          <div className={styles.articlesGrid}>
            <div className={styles.articleCard}>
              <div className={styles.articleImage}>
                <div className={styles.categoryBadge}>Health Insurance</div>
              </div>
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>Understanding Your Health Insurance Options</h3>
                <p className={styles.articleExcerpt}>Learn how to choose the right health insurance plan for your family's needs and budget.</p>
                <Link href="/blog/health-insurance-options" className={styles.readMoreLink}>Read More →</Link>
              </div>
            </div>
            
            <div className={styles.articleCard}>
              <div className={styles.articleImage}>
                <div className={styles.categoryBadge}>Life Insurance</div>
              </div>
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>Life Insurance: Term vs. Whole Life</h3>
                <p className={styles.articleExcerpt}>Compare term and whole life insurance policies to determine which is right for your financial goals.</p>
                <Link href="/blog/term-vs-whole-life" className={styles.readMoreLink}>Read More →</Link>
              </div>
            </div>
            
            <div className={styles.articleCard}>
              <div className={styles.articleImage}>
                <div className={styles.categoryBadge}>Auto Insurance</div>
              </div>
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>How to Lower Your Auto Insurance Premiums</h3>
                <p className={styles.articleExcerpt}>Practical tips and strategies to reduce your car insurance costs without sacrificing coverage.</p>
                <Link href="/blog/lower-auto-insurance" className={styles.readMoreLink}>Read More →</Link>
              </div>
            </div>
          </div>
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
              <div className={styles.imagePlaceholder}></div>
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