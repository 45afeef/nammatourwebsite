import styles from './bloglist.module.css';

import Link from "next/link";
import { BlogPost } from "@/types/notion";

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    return (
        <div className={styles['blog-list-container']}>
            <h1 className={styles['blog-list-title']}>Blog</h1>
            <div className={styles['blog-cards-grid']}>
                {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className={styles['blog-card-link']}>
                        <div className={`${styles['blog-card']}${post.featured ? ' ' + styles['blog-card-featured'] : ''}`}>
                            {post.cover && (
                                <div className={styles['blog-card-image-wrapper']}>
                                    <img
                                        src={post.cover}
                                        alt={post.title}
                                        width={400}
                                        height={220}
                                        className={styles['blog-card-image']}
                                    />
                                    {post.featured && <span className={styles['blog-card-featured-badge']}>Featured</span>}
                                </div>
                            )}
                            <div className={styles['blog-card-content']}>
                                <div className={styles['blog-card-meta']}>
                                    <div className={styles['blog-card-author']}>
                                        {post.authorAvatar && (
                                            <img src={post.authorAvatar} alt={post.author} width={32} height={32} className={styles['blog-card-author-avatar']} />
                                        )}
                                        <span>{post.author}</span>
                                    </div>
                                    <span className={styles['blog-card-date']}>
                                        {new Date(post.date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                        }).replace(/ /g, ' ')}
                                    </span>
                                    <span className={styles['blog-card-reading-time']}>{post.readingTime}</span>
                                </div>
                                <h2 className={styles['blog-card-title']}>{post.title}</h2>
                                <p className={styles['blog-card-excerpt']}>{post.excerpt}</p>
                                <div className={styles['blog-card-tags']}>
                                    {post.tags.map((tag) => (
                                        <span key={tag} className={styles['blog-card-tag']}>{tag}</span>
                                    ))}
                                </div>
                                <div className={styles['blog-card-engagement']}>
                                    <span>👁️ {post.views ?? 0}</span>
                                    <span>❤️ {post.likes ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
