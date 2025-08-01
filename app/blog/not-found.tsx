import Link from 'next/link';
import styles from '../notfound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>📰</div>
      <h1 className={styles.title}>Blog Not Found</h1>
      <p className={styles.description}>
        Sorry, the blog post you’re looking for doesn’t exist or has been removed.<br />
        Discover more stories or return to the blog home.
      </p>
      <Link href="/blog" className={styles.homeLink}>
        Go to Blog Home
      </Link>
    </div>
  );
}
