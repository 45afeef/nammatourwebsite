import { getAllBlogPosts, getBlogPostBySlug, getBlockTree } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import { Metadata } from "next";

export async function generateStaticParams() {
    const blogPosts = await getAllBlogPosts();
    return blogPosts.map((blogPost: any) => ({ slug: blogPost.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blogPost = await getBlogPostBySlug(slug);
    return {
        title: blogPost?.title || "Blog Post",
        description: blogPost?.excerpt || "Read this blog post on NammaTour.",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!slug) return <div>Not found</div>;

    const blogPost = await getBlogPostBySlug(slug);
    if (!blogPost) return <div>Not found</div>;
    // Use getBlockTree for full SSG hydration
    const blocks = await getBlockTree(blogPost.id);
    return (
        <article className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden pb-10 mt-10">
            {blogPost.cover && (
                <div className="w-full h-[350px] bg-gray-100 overflow-hidden relative">
                    <img src={blogPost.cover} alt={blogPost.title} className="w-full h-full object-cover border-b border-gray-200" />
                </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-2 px-8 text-gray-900 leading-tight">{blogPost.title}</h1>
            <p className="text-gray-500 text-base px-8 mb-6">
                {new Date(blogPost.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                })}
            </p>
            <NotionRenderer blocks={blocks} />
        </article>
    );
}
