import { IDataSource } from '../interfaces/i-data-source';
import { TourPackage } from '../models/tour-package';

/**
 * A repository specifically for TourPackage entities.
 * It uses an IDataSource internally but provides a more domain-specific interface
 * for tourPackage-related operations.
 */
export class TourPackageRepository {
  private dataSource: IDataSource<TourPackage>;

  constructor(dataSource: IDataSource<TourPackage>) {
    this.dataSource = dataSource; // Dependency Injection!
  }

  async getTourPackageBySlug(slug: string): Promise<TourPackage | null> {

    // slug is a field so we need to filter the data source by it
    // return this.dataSource.fetchOne(id);
    var response = await this.dataSource.fetchAll({ 'fields.slug': slug })

    if (!response || response.length === 0) {
      return null; // No tour package found with the given slug
    }
    return response[0];

  }

  async getAllTourPackages(params?: Record<string, any>): Promise<TourPackage[]> {
    return this.dataSource.fetchAll(params);
  }

  // Add other more tourPackage-specific methods here, which might compose multiple data source calls
  // or apply business logic before returning data.
  // async createTourPackage(tourPackageData: Omit<TourPackage, 'id'>): Promise<TourPackage> { ... }
  // async updateTourPackageProfile(id: string, updates: Partial<TourPackage>): Promise<TourPackage | null> { ... }
}