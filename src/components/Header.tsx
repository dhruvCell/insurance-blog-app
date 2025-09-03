import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logo}>
          Insurance Awareness
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/blogs" className={styles.navLink}>
            Blogs
          </Link>
          <Link href="/resources" className={styles.navLink}>
            Resources
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </nav>
        
        {/* Mobile menu button (simplified version) */}
        <button className={styles.mobileMenuButton}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}