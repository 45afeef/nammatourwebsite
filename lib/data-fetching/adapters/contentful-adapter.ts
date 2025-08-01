import { IDataSource } from '../interfaces/i-data-source';
import * as contentful from 'contentful'

/**
 * A concrete implementation of IDataSource for fetching data from a REST API.
 * This adapter is responsible for API-specific logic (e.g., fetch, headers, base URL).
 */
export class ContentfulAdapter<T, K = string> implements IDataSource<T, K> {
    private contentType: string;
    private client: contentful.ContentfulClientApi<undefined>;

    /**
     * Creates an instance of ApiAdapter.
     * @param contentType - The specific endpoint for the resource.
     * @param client - The Contentful client instance.
     */
    constructor(params: contentful.CreateClientParams, contentType: string) {
        this.contentType = contentType;
        this.client = contentful.createClient(params);
    }


    async fetchOne(id: K): Promise<T | null> {
        try {
            const response = await this.client.getEntry(id as string);
            if (!response) {
                return null;
            }
            return response as unknown as T; // Cast to T
        } catch (error) {
            console.error(`Error fetching from Contentful for content type (${this.contentType}/${id}):`, error);
            throw error; // Re-throw or handle as appropriate for your application
        }
    }

    async fetchAll(params?: Record<string, any>): Promise<T[]> {
        try {
            const response = await this.client.getEntries({
                content_type: this.contentType,
                ...params,
            });
            if (!response.items) {
                throw new Error(`API error: No items found for content type ${this.contentType}`);
            }
            return response.items as unknown as T[];
        } catch (error) {
            console.error(`Error fetching all from Contentful for content type (${this.contentType}):`, error);
            throw error;
        }
    }

    // You could add create, update, delete here if your API supports them
    // async create(data: Partial<T>): Promise<T> { ... }
}
