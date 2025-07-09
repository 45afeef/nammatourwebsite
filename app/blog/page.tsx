import BlogList from "@/components/BlogList";
import { dataService } from "@/lib/data-fetching";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | NammaTour",
    description: "Read our latest travel stories and tips.",
};

export default async function BlogPage() {
    const blogPosts = await dataService.blogRepo.getAllBlogs();

    return <BlogList blogPosts={blogPosts} />;
}
