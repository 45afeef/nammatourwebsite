import { getAllBlogPosts } from "@/lib/notion";
import BlogList from "@/components/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | NammaTour",
    description: "Read our latest travel stories and tips.",
};

export default async function BlogPage() {
    const blogPosts = await getAllBlogPosts();
    return <BlogList blogPosts={blogPosts} />;
}
