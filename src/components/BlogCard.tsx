import Link from "next/link";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  id: string;
  title: string;
  headline: string;
  image: string;
  createdAt: string;
}

export default function BlogCard({ id, title, headline, image, createdAt }: BlogCardProps) {
  return (
    <div className={styles.card}>
      {/* Left: Image */}
      <div className={styles.cardImageContainer}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>

      {/* Right: Content */}
      <div className={styles.cardContent}>
        <Link href={`/blogs/${id}`} className={styles.cardOverlay} aria-label={`Read more about ${title}`}>{title}</Link>
        <p className={styles.cardExcerpt}>{headline}</p>

        <div className={styles.cardMeta}>
          <span className={styles.cardDate}>
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

        </div>
      </div>
    </div>
  );
}
