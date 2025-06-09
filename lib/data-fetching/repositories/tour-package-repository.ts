import { IDataSource } from '../interfaces/i-data-source';
import { TourPackage, TourPackageResponse } from '../models/tour-package';

/**
 * A repository specifically for TourPackage entities.
 * It uses an IDataSource internally but provides a more domain-specific interface
 * for tourPackage-related operations.
 */
export class TourPackageRepository {
  private dataSource: IDataSource<TourPackageResponse>;

  constructor(dataSource: IDataSource<TourPackageResponse>) {
    this.dataSource = dataSource; // Dependency Injection!
  }

  async getTourPackageBySlug(slug: string): Promise<TourPackage | null> {

    // slug is a field so we need to filter the data source by it
    // return this.dataSource.fetchOne(id);
    var response = await this.dataSource.fetchAll({ 'fields.slug': slug })

    if (!response || response.length === 0) {
      return null; // No tour package found with the given slug
    }
    // Convert the first response item to TourPackage
    return convertTourPackageFields(response[0].fields);
  }

  async getAllTourPackages(params?: Record<string, any>): Promise<TourPackage[]> {
    return (await this.dataSource.fetchAll(params)).map(item => convertTourPackageFields(item.fields));
  }

  // Add other more tourPackage-specific methods here, which might compose multiple data source calls
  // or apply business logic before returning data.
  // async createTourPackage(tourPackageData: Omit<TourPackage, 'id'>): Promise<TourPackage> { ... }
  // async updateTourPackageProfile(id: string, updates: Partial<TourPackage>): Promise<TourPackage | null> { ... }
}

function extractPlainTextFromRichText(richText: any): string {
  if (!richText || !richText.content) return '';
  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content.map((c: any) => c.value || '').join('');
      }
      return '';
    })
    .join('\n')
    .trim();
}

function extractPackageInfo(packageInfo: string[]): any[] {
  var parsedPackageInformations = packageInfo.map((info: any) => {
    var infoList: string[] = info.split(',');
    return ({
      icon: infoList[0],
      title: infoList[1],
      value: infoList[2],
    })
  });

  return parsedPackageInformations;
}


function extractImageUrl(imageJson: any): string {
  return imageJson.fields.file.url || '';
}

function convertTourPackageFields(fields: any): TourPackage {
  return {
    ...fields,
    images: fields.images.map((i: any) => extractImageUrl(i)),
    packageInfo: extractPackageInfo(fields.packageInfo || []),
    keyPoints:  extractPackageInfo(fields.keyPoints || []),
  };
}