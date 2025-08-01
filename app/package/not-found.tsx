import Link from 'next/link';
import styles from '../notfound.module.css';
import PackageList from '../../components/packages';

import { PackageRepository } from '@/lib/data-fetching/repositories/package-repository';

export default async function NotFound() {
  const groups = await new PackageRepository().getGroups();

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>🎒</div>
      <h1 className={styles.title}>Tour Package Not Found</h1>
      <p className={styles.description}>
        Sorry, this tour package doesn’t exist or is no longer available.<br />
        Explore our other packages or bellow 👇👇👇.
      </p>
      <div style={{ marginTop: '2rem', width: '100%' }}>
        <PackageList groups={groups} />
      </div>
    </div>
  );
}
