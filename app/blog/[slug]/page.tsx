import NotionRenderer from "@/components/NotionRenderer";
import { Metadata } from "next";
import { dataService } from "@/lib/data-fetching";

// Next.js will invalidate the cache when a
// request comes in, at most once every week.
export const revalidate = 604800; // 1 week

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
    const blogPosts = await dataService.blogRepo.getAllBlogs();
    return blogPosts.map((blogPost: any) => ({ slug: blogPost.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const [blogPost, blocks] = await dataService.blogRepo.getBlogBySlug(slug);
    return {
        title: blogPost?.title || "Blog Post",
        description: blogPost?.excerpt || "Read this blog post on Raqlin.com",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!slug) return <div>Not found</div>;

    const [blogPost, blocks] = await dataService.blogRepo.getBlogBySlug(slug);

    if (!blogPost) return <div>Not found</div>;
    // Use getBlockTree for full SSG hydration
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
