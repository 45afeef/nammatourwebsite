import { promises as fs } from 'fs';
import path from 'path';

export interface Package {
  title: string;
  duration: string;
  price: string;
  imageUrl: string;
}

export interface PackageSubGroup {
  name: string;
  imageUrl: string;
}

export interface PackageCollection {
  name: string;
  imageUrl: string;
  packages?: Package[];
  subGroups?: PackageSubGroup[];
}

export interface PackagesData {
  collections: PackageCollection[];
  groups: string[];
}

export class PackageJsonAdapter {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'lib', 'data', 'packages.json');
  }

  async getAllCollections(): Promise<PackageCollection[]> {
    const data = await this.readData();
    return data.collections;
  }

  async getCollectionBySlug(slug: string): Promise<PackageCollection | undefined> {
    const data = await this.readData();
    return data.collections.find(
      (group) => group.name.replace(/\s+/g, "-").toLowerCase() === slug
    );
  }

  async getGroups(): Promise<string[]> {
    const data = await this.readData();
    return data.groups;
  }

  private async readData(): Promise<PackagesData> {
    const file = await fs.readFile(this.dataPath, 'utf-8');
    return JSON.parse(file);
  }
}
