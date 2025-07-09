import { assert } from 'console';
import { IDataSource } from '../interfaces/i-data-source';
import { BlogPost } from '../models/blog_post';
import { NotionAdapter } from '../adapters/notion-adapter';

export class BlogRepository {

    /**
     * A repository specifically for BlogPost entities.
     * It uses an IDataSource internally but provides a more domain-specific interface
     * for blog-related operations.
     */

    // I restrict the datasource for blogpost to NotionAdapter only, for now.
    // This repository can be extended to support other data sources in the future.
    // For example, if you want to support Contentful or other CMS, you can create
    private dataSource: NotionAdapter; //IDataSource<BlogPost, string>;

    constructor(dataSource: IDataSource<BlogPost, string>) {
        // Ensure that the data source is an instance of NotionAdapter
        // This is because BlogPost is tightly coupled with Notion's data structure.
        // If you want to support other data sources, you can remove this check. and create new UI Components
        // that can handle the different data structures.
        if (dataSource.constructor.name !== 'NotionAdapter') {
            throw new Error('BlogRepository now only supports NotionAdapter as the data source. Because BlogPost is tightly coupled with Notion\'s data structure inside UI component.');
        }
        this.dataSource = dataSource as NotionAdapter; // Cast to NotionAdapter
    }

    async getBlogById(id: string): Promise<BlogPost | null> {
        return this.dataSource.fetchOne(id);
    }

    async getAllBlogs(params?: Record<string, any>): Promise<BlogPost[]> {
        const response = await this.dataSource.fetchAll(params);
        if (!response || response.length === 0) {
            return []; // No blog posts found
        }
        return response.map(this.pageToBlogPost.bind(this)); // Bind 'this' to ensure correct context for pageToBlogPost
    }

    async getBlogBySlug(slug: string): Promise<any | null> {
        // slug is a field so we need to filter the data source by it
        const response = await this.dataSource.fetchBySlug(slug);
        if (!response || response.length === 0) {
            return null; // No blog post found with the given slug
        }

        const blogPost = this.pageToBlogPost(response);

        const notionBlogBlocks = await this.dataSource.fetchBlockTree(blogPost.id);

        return [blogPost, notionBlogBlocks];
    }

    private pageToBlogPost(page: any): BlogPost {
        return {
            id: page.id,
            title: page.properties.Name.title[0]?.plain_text || '',
            slug: page.properties.Slug?.rich_text[0]?.plain_text || '',
            date: page.properties.PublishedDate?.date?.start || '',
            cover: page.cover?.external?.url || page.cover?.file?.url || '',
            excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
            author: page.properties.Author?.people[0]?.name || '',
            authorAvatar: page.properties.Author?.people[0]?.avatar_url || '',
            tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) || [],
            readingTime: page.properties.ReadingTime?.rich_text[0]?.plain_text || '',
            featured: page.properties.Featured?.checkbox || false,
            views: page.properties.Views?.number || 0,
            likes: page.properties.Likes?.number || 0,
        };
    }
}
