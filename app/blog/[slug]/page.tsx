import { getAllPosts, getPostById, getPostBlocks, getBlockTree } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: any) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const post = await getPostById(params.id);
    return {
        title: 'title',
        description: 'description',
    }
    //   return {
    //     title: post?.title || "Blog Post",
    //     description: post?.excerpt || "Read this blog post on NammaTour.",
    //   };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
    const post = await getPostById(params.id);
    if (!post) return <div>Not found</div>;
    // Use getBlockTree for full SSG hydration
    const blocks = await getBlockTree(post.id);
    return (
        <article>
            {/* {post.cover && (
                <Image src={post.cover} alt={post.title} width={700} height={350} className="blog-cover" />
            )}
            <h1>{post.title}</h1>
            <p style={{ color: "#888", fontSize: "0.95em" }}>{new Date(post.date).toLocaleDateString()}</p> */}
            <NotionRenderer blocks={blocks} />
        </article>
    );
}
