import { TourPackageRepository } from './repositories/tour-package-repository';
import { DataService } from './services/data-service';
import { TourPackage, TourPackageResponse } from './models/tour-package';
import { ContentfulAdapter } from './adapters/contentful-adapter';


// --- Configuration ---
const API_BASE_URL: string = process.env.NEXT_PUBLIC_CONTENTFUL_API_BASE_URL!;


// --- Instantiate Adapters (Low-level Details) ---
// Using ApiAdapter for User data
// const userApiAdapter = new ApiAdapter<User>(API_BASE_URL, 'users');
// Using CmsAdapter for TourPakcage data (as tourPackages  are managed by CMS)
// const tourPackageCmsAdapter = new CmsAdapter<TourPackage>(CMS_API_URL, 'packagePage');
// Using ContentfulAdapter for TourPakcage data as packages are managed by Contentful
const tourPackageContentfulAdapter = new ContentfulAdapter<TourPackageResponse>('packagePage');

// --- Instantiate Repositories (if using them) ---
export const tourPackageRepository = new TourPackageRepository(tourPackageContentfulAdapter);
// export const productRepository = new ProductRepository(productCmsAdapter); // Assuming you create this


// --- Instantiate High-level Data Service (if using it) ---
// Injecting repositories into the DataService
export const dataService = new DataService(tourPackageRepository /*, productRepository */);

// You can also export individual repositories or adapters directly for simpler use cases
// export { tourPackageCmsAdapter, productCmsAdapter };