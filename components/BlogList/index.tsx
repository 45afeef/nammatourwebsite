import { BlogPost } from '@/lib/data-fetching/models/blog_post';
import styles from './bloglist.module.css';

import Link from "next/link";

interface BlogListProps {
    blogPosts: BlogPost[];
}

export default function BlogList({ blogPosts }: BlogListProps) {
    return (
        <div className={styles['blog-list-container']}>
            <h1 className={styles['blog-list-title']}>Blog</h1>
            <div className={styles['blog-cards-grid']}>
                {blogPosts.map((blogPost) => (
                    <Link key={blogPost.id} href={`/blog/${blogPost.slug}`} className={styles['blog-card-link']}>
                        <div className={`${styles['blog-card']}${blogPost.featured ? ' ' + styles['blog-card-featured'] : ''}`}>
                            {blogPost.cover && (
                                <div className={styles['blog-card-image-wrapper']}>
                                    <img
                                        src={blogPost.cover}
                                        alt={blogPost.title}
                                        width={400}
                                        height={220}
                                        className={styles['blog-card-image']}
                                    />
                                    {blogPost.featured && <span className={styles['blog-card-featured-badge']}>Featured</span>}
                                </div>
                            )}
                            <div className={styles['blog-card-content']}>
                                <div className={styles['blog-card-meta']}>
                                    <div className={styles['blog-card-author']}>
                                        {blogPost.authorAvatar && (
                                            <img src={blogPost.authorAvatar} alt={blogPost.author} width={32} height={32} className={styles['blog-card-author-avatar']} />
                                        )}
                                        <span>{blogPost.author}</span>
                                    </div>
                                    <span className={styles['blog-card-date']}>
                                        {new Date(blogPost.date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                        }).replace(/ /g, ' ')}
                                    </span>
                                    <span className={styles['blog-card-reading-time']}>{blogPost.readingTime}</span>
                                </div>
                                <h2 className={styles['blog-card-title']}>{blogPost.title}</h2>
                                <p className={styles['blog-card-excerpt']}>{blogPost.excerpt}</p>
                                <div className={styles['blog-card-tags']}>
                                    {blogPost.tags.map((tag) => (
                                        <span key={tag} className={styles['blog-card-tag']}>{tag}</span>
                                    ))}
                                </div>
                                <div className={styles['blog-card-engagement']}>
                                    <span>👁️ {blogPost.views ?? 0}</span>
                                    <span>❤️ {blogPost.likes ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
