import BlogList from "@/components/BlogList";
import { dataService } from "@/lib/data-fetching";
import { Metadata } from "next";

// We are using unstable_cache to cache the blog posts for 1 hour.
// This is achieved by the `getAllBlogs` method in the BlogRepository.

export const metadata: Metadata = {
    title: "Blog | Raqlin",
    description: "Read our latest travel stories and tips.",
};

export default async function BlogPage() {
    const blogPosts = await dataService.blogRepo.getAllBlogs();

    return <BlogList blogPosts={blogPosts} />;
}
