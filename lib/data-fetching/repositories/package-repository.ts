import { PackageCollection } from '../adapters/package-json-adapter';
import { PackageJsonAdapter } from '../adapters/package-json-adapter';

export class PackageRepository {
  private adapter: PackageJsonAdapter;

  constructor(adapter?: PackageJsonAdapter) {
    this.adapter = adapter || new PackageJsonAdapter();
  }

  async getAllCollections(): Promise<PackageCollection[]> {
    return this.adapter.getAllCollections();
  }

  async getCollectionBySlug(slug: string): Promise<PackageCollection | undefined> {
    return this.adapter.getCollectionBySlug(slug);
  }

  async getGroups(): Promise<string[]> {
    return this.adapter.getGroups();
  }
}
