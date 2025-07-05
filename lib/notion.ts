import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getAllPosts() {
    notion.blocks
  const response = await notion.databases.query({
    database_id: databaseId!,
    // filter: { property: 'Published', checkbox: { equals: true } },
    // sorts: [{ property: 'Date', direction: 'descending' }],
  });
  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Name.title[0]?.plain_text || '',
    // slug: page.properties.Slug.rich_text[0]?.plain_text || '',
    // date: page.properties.Date.date.start,
    // cover: page.cover?.external?.url || page.cover?.file?.url || '',
    // excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
  }));
}

export async function getPostById(id: string) {
  const response = await notion.databases.query({
    database_id: databaseId!,
    // filter: {
    //   and: [
    //     { property: 'Slug', rich_text: { equals: slug } },
    //     { property: 'Published', checkbox: { equals: true } },
    //   ],
    // },
  });
  const page = response.results[0];
  if (!page) return null;
  return page;
  return {
    id: page.id,
    // title: page.properties.Name.title[0]?.plain_text || '',
    // slug: page.properties.Slug.rich_text[0]?.plain_text || '',
    // date: page.properties.Date.date.start,
    // cover: page.cover?.external?.url || page.cover?.file?.url || '',
    // excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
  };
}

export async function getPostBlocks(postId: string) {
  const blocks = await notion.blocks.children.list({ block_id: postId });
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
