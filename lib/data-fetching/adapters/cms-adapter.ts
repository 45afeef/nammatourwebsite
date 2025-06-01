import { IDataSource } from '../interfaces/i-data-source';
import { TourPackage } from '../models/tour-package'; // Assuming a Product model

/**
 * A concrete implementation of IDataSource for fetching data from a hypothetical CMS.
 * This would wrap a CMS SDK or specific API calls.
 */
export class CmsAdapter<T, K = string> implements IDataSource<T, K> {
    private cmsApiUrl: string;
    private contentType: string; // e.g., 'products', 'articles'

    constructor(cmsApiUrl: string, contentType: string) {
        this.cmsApiUrl = cmsApiUrl;
        this.contentType = contentType;
    }

    async fetchOne(id: K): Promise<T | null> {
        try {
            // Simulate CMS SDK call or direct API call
            const response = await fetch(`${this.cmsApiUrl}/${this.contentType}/${id}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error(`CMS error: ${response.statusText}`);
            }
            const data: T = await response.json();
            // CMS often return data nested, e.g., { data: { id: ..., attributes: {...} } }
            // You'd need to map it to your T model here
            return this.mapCmsDataToModel(data);
        } catch (error) {
            console.error(`Error fetching from CMS (${this.contentType}/${id}):`, error);
            throw error;
        }
    }

    async fetchAll(params?: Record<string, any>): Promise<T[]> {
        try {
            // Simulate CMS SDK call or direct API call with filters
            const query = params ? `?${new URLSearchParams(params).toString()}` : '';
            const response = await fetch(`${this.cmsApiUrl}/${this.contentType}${query}`);
            if (!response.ok) {
                throw new Error(`CMS error: ${response.statusText}`);
            }
            const data: T[] = await response.json();
            // Map array of CMS data to array of T models
            return data.map(item => this.mapCmsDataToModel(item));
        } catch (error) {
            console.error(`Error fetching all from CMS (${this.contentType}):`, error);
            throw error;
        }
    }

    // Helper to map CMS specific data structure to your application's model
    private mapCmsDataToModel(cmsDataItem: any): T {
        // This is where you would transform CMS-specific fields to your
        // `T` (e.g., `Product`) interface.
        // Example for a hypothetical CMS that returns { id: ..., attributes: { name: ... } }
        if (cmsDataItem.data && cmsDataItem.data.attributes) {
            return {
                id: cmsDataItem.data.id,
                ...cmsDataItem.data.attributes,
            } as T;
        }
        return cmsDataItem as T; // Fallback or more complex mapping
    }
}