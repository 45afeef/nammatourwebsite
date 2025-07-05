import Link from "next/link";
import Image from "next/image";
import { NotionPost } from "@/types/notion";

interface BlogListProps {
    // posts: NotionPost[];
    posts: any[]; // Adjusted to allow any type for flexibility
}

export default function BlogList({ posts }: BlogListProps) {
    return (
        <div className="medium-blog">
            <h1>Blog</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: "2.5rem" }}>
                        <Link href={`/blog/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {post.cover && (
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    width={700}
                                    height={350}
                                    className="blog-cover"
                                />
                            )}
                            <h2>{post.title}</h2>
                            <p style={{ color: "#888", fontSize: "0.95em" }}>{new Date(post.date).toLocaleDateString()}</p>
                            <p>{post.excerpt}</p>

                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
