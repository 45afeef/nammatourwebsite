import { IDataSource } from '../interfaces/i-data-source';
import { TourPackage } from '../models/tour-package';

/**
 * A concrete implementation of IDataSource for fetching data from a REST API.
 * This adapter is responsible for API-specific logic (e.g., fetch, headers, base URL).
 */
export class ApiAdapter<T, K = string> implements IDataSource<T, K> {
    private baseUrl: string;
    private endpoint: string;
    
    /**
     * Creates an instance of ApiAdapter.
     * @param baseUrl - The base URL of the API.
     * @param endpoint - The specific endpoint for the resource.
     */
    constructor(baseUrl: string, endpoint: string) {
        this.baseUrl = baseUrl;
        this.endpoint = endpoint;
    }

    private getUrl(id?: K, params?: Record<string, any>): string {
        let url = `${this.baseUrl}/${this.endpoint}`;
        if (id) {
            url += `/${id}`;
        }
        if (params) {
            const query = new URLSearchParams(params).toString();
            if (query) {
                url += `?${query}`;
            }
        }
        return url;
    }

    async fetchOne(id: K): Promise<T | null> {
        try {
            const response = await fetch(this.getUrl(id));
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error(`API error: ${response.statusText}`);
            }
            const data: T = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching from API (${this.endpoint}/${id}):`, error);
            throw error; // Re-throw or handle as appropriate for your application
        }
    }

    async fetchAll(params?: Record<string, any>): Promise<T[]> {
        try {
            const response = await fetch(this.getUrl(undefined, params));
            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }
            const data: T[] = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching all from API (${this.endpoint}):`, error);
            throw error;
        }
    }

    // You could add create, update, delete here if your API supports them
    // async create(data: Partial<T>): Promise<T> { ... }
}