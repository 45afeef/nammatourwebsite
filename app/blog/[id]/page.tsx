import { getAllPosts, getPostById, getBlockTree } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import { Metadata } from "next";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: any) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const post = await getPostById(id);
    return {
        title: post?.title || "Blog Post",
        description: post?.excerpt || "Read this blog post on NammaTour.",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) return <div>Not found</div>;

    const post = await getPostById(id);
    if (!post) return <div>Not found</div>;
    // Use getBlockTree for full SSG hydration
    const blocks = await getBlockTree(post.id);
    return (
        <article className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden pb-10 mt-10">
            {post.cover && (
                <div className="w-full h-[350px] bg-gray-100 overflow-hidden relative">
                    <img src={post.cover} alt={post.title} className="w-full h-full object-cover border-b border-gray-200" />
                </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-2 px-8 text-gray-900 leading-tight">{post.title}</h1>
            <p className="text-gray-500 text-base px-8 mb-6">
                {new Date(post.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                })}
            </p>
                <NotionRenderer blocks={blocks} />
        </article>
    );
}
