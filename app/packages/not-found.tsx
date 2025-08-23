import styles from '../notfound.module.css';
import PackageList from '../../components/packages';
import { dataService } from '@/lib/data-fetching';

export default async function NotFound() {
    const groups = await dataService.categoryRepo.getGroups();

    return (
        <div className={styles.container}>
            <div className={styles.emoji}>🎁</div>
            <p className={styles.description}>
                Sorry, we couldn’t find the package you’re looking for.<br />
                Browse all our available packages here 👇👇👇.
            </p>
            <PackageList groups={groups} />
        </div>
    );
}
