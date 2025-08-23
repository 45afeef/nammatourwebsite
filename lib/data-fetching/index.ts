import { DataService } from './services/data-service';

import { ContentfulAdapter } from './adapters/contentful-adapter';
import { NotionAdapter } from './adapters/notion-adapter';

import { BlogRepository } from './repositories/blog-repository';
import { TourPackageRepository } from './repositories/tour-package-repository';

import { TourPackageResponse } from './models/tour-package';
import { PackageCategoryRepository } from './repositories/package-repository';


// --- Configuration ---
const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const CONTENTFUL_PARAMS = {
    space: process.env.CONTENTFUL_SPACE_ID!,
    environment: process.env.CONTENTFUL_ENVIRONMENT!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
};

const CONTENTFUL_PACKAGE_CONTENT_TYPE = process.env.CONTENTFUL_PACKAGE_CONTENT_TYPE || 'tourPackages';

// --- Instantiate Adapters (Low-level Details) ---
// Using ContentfulAdapter for TourPakcage data as packages are managed by Contentful
const tourPackageContentfulAdapter = new ContentfulAdapter<TourPackageResponse>(CONTENTFUL_PARAMS, CONTENTFUL_PACKAGE_CONTENT_TYPE,);
// Using NotionAdapter for Blog data as blogs are managed by Notion
const blogsNotionAdapter = new NotionAdapter(NOTION_API_KEY, NOTION_DATABASE_ID);

// --- Instantiate Repositories (if using them) ---
const tourPackageRepository = new TourPackageRepository(tourPackageContentfulAdapter);
const blogRepository = new BlogRepository(blogsNotionAdapter);



// --- Instantiate High-level Data Service (if using it) ---
// Injecting repositories into the DataService
export const dataService = new DataService(
    tourPackageRepository,
    blogRepository,
    new PackageCategoryRepository()
);


// You can also export individual repositories or adapters directly for simpler use cases
// export { tourPackageCmsAdapter, productCmsAdapter };