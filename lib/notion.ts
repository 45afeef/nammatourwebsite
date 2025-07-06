import { Client } from '@notionhq/client';
import { BlogPost } from '@/types/notion';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

function pageToBlogPost(page: any): BlogPost {
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

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: databaseId!,
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'PublishedDate', direction: 'descending' }],
  });
  return response.results.map(pageToBlogPost);
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const page: any = await notion.pages.retrieve({ page_id: id });
    if (
      page.properties?.Published &&
      page.properties.Published.checkbox !== true
    ) {
      return null;
    }
    return pageToBlogPost(page);
  } catch (error) {
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await notion.databases.query({
    database_id: databaseId!,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Published', checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });
  if (response.results.length === 0) return null;
  return pageToBlogPost(response.results[0]);
}

export async function getBlogPostBlocks(blogPostId: string) {
  const blocks = await notion.blocks.children.list({ block_id: blogPostId });
  return blocks.results;
}

export async function getBlockChildren(blockId: string) {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...response.results);
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return blocks;
}

export async function getBlockTree(blockId: string): Promise<any[]> {
  const blocks = await getBlockChildren(blockId);
  return Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        // Special handling for column_list and column
        if (block.type === 'column_list') {
          const columns = await getBlockChildren(block.id);
          const columnsWithChildren = await Promise.all(
            columns.map(async (col: any) => {
              const colChildren = await getBlockTree(col.id);
              return { ...col, children: colChildren };
            })
          );
          return { ...block, children: columnsWithChildren };
        } else if (block.type === 'column') {
          const colChildren = await getBlockTree(block.id);
          return { ...block, children: colChildren };
        } else if (block.type === 'toggle') {
          const toggleChildren = await getBlockTree(block.id);
          return { ...block, toggle: { ...block.toggle, children: toggleChildren } };
        } else if (block.type === 'synced_block') {
          const syncedChildren = await getBlockTree(block.id);
          return { ...block, synced_block: { ...block.synced_block, children: syncedChildren } };
          // } else {
          //   const children = await getBlockTree(block.id);
          //   return { ...block, children };
        }
      }
      return block;
    })
  );
}
