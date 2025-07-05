import { getAllPosts } from "@/lib/notion";
import BlogList from "@/components/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | NammaTour",
    description: "Read our latest travel stories and tips.",
};

export default async function BlogPage() {
    const posts = await getAllPosts();
    return <BlogList posts={posts} />;
}
