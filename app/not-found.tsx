import Link from 'next/link';
import styles from './notfound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>😕</div>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you’re looking for doesn’t exist or has been moved.<br />
        Try searching or go back to the homepage.
      </p>
      <Link href="/" className={styles.homeLink}>
        Go Home
      </Link>
    </div>
  );
}
