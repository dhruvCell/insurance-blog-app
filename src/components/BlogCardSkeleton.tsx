import styles from './BlogCardSkeleton.module.css';

interface BlogCardSkeletonProps {
  count?: number;
}

export default function BlogCardSkeleton({ count = 1 }: BlogCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
          </div>
        </div>
      ))}
    </>
  );
}
