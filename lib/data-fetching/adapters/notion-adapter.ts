import { IDataSource } from '../interfaces/i-data-source';
import { Client } from '@notionhq/client';

export class NotionAdapter implements IDataSource<any, string> {
    private notion: Client;
    private databaseId: string;

    constructor(apiKey: string, databaseId: string) {
        this.notion = new Client({ auth: apiKey });
        this.databaseId = databaseId;
    }

    async fetchOne(id: string): Promise<any | null> {
        // unimplemented in this adapter
        throw new Error('fetchOne is not implemented in NotionAdapter. Use fetchBySlug instead.');
    }

    async fetchAll(params?: Record<string, any>): Promise<any[]> {
        const response = await this.notion.databases.query({
            database_id: this.databaseId,
            filter: { property: 'Published', checkbox: { equals: true } },
            sorts: [{ property: 'PublishedDate', direction: 'descending' }],
            ...params,
        });
        return response.results;
    }

    async fetchBySlug(slug: string): Promise<any | null> {
        const response = await this.notion.databases.query({
            database_id: this.databaseId!,
            filter: {
                and: [
                    { property: 'Slug', rich_text: { equals: slug } },
                    { property: 'Published', checkbox: { equals: true } },
                ],
            },
            page_size: 1,
        });
        if (response.results.length === 0) return null;
        return response.results[0];
    }

    private async fetchBlockChildren(blockId: string) {
        const blocks: any[] = [];
        let cursor: string | undefined = undefined;
        do {
            const response = await this.notion.blocks.children.list({
                block_id: blockId,
                start_cursor: cursor,
                page_size: 100,
            });
            blocks.push(...response.results);
            cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
        } while (cursor);
        return blocks;
    }

    async fetchBlockTree(blockId: string): Promise<any[]> {
        const blocks = await this.fetchBlockChildren(blockId);
        return Promise.all(
            blocks.map(async (block) => {
                if (block.has_children) {
                    // Special handling for column_list and column
                    if (block.type === 'column_list') {
                        const columns = await this.fetchBlockChildren(block.id);
                        const columnsWithChildren = await Promise.all(
                            columns.map(async (col: any) => {
                                const colChildren = await this.fetchBlockTree(col.id);
                                return { ...col, children: colChildren };
                            })
                        );
                        return { ...block, children: columnsWithChildren };
                    } else if (block.type === 'column') {
                        const colChildren = await this.fetchBlockTree(block.id);
                        return { ...block, children: colChildren };
                    } else if (block.type === 'toggle') {
                        const toggleChildren = await this.fetchBlockTree(block.id);
                        return { ...block, toggle: { ...block.toggle, children: toggleChildren } };
                    } else if (block.type === 'synced_block') {
                        const syncedChildren = await this.fetchBlockTree(block.id);
                        return { ...block, synced_block: { ...block.synced_block, children: syncedChildren } };
                        // } else {
                        //   const children = await this.fetchBlockTree(block.id);
                        //   return { ...block, children };
                    }
                }
                return block;
            })
        );
    }
}

