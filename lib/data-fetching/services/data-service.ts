import { TourPackageRepository } from '../repositories/tour-package-repository';
import { BlogRepository } from '../repositories/blog-repository';

// Import other repositories or data sources as needed

/**
 * A high-level service that orchestrates data fetching and might contain
 * application-specific business logic.
 * It depends on repositories, which in turn depend on data sources.
 */
export class DataService {
    public tourPackagesRepo: TourPackageRepository;
    public blogRepo: BlogRepository;

    constructor(
        tourPackageRepo: TourPackageRepository,
        blogRepository: BlogRepository,
    ) {
        this.tourPackagesRepo = tourPackageRepo;
        this.blogRepo = blogRepository;
    }

    // You can add methods here that combine data from multiple repositories
    // or perform complex business logic before returning data.
    // async getDashboardData(tourPackageId: string) {
    //   const tourPackage = await this.tourPackages.getTourPackageById(tourPackage);
    //   const packageItenaries = await this.tourPackages.getItinerariesByTourPackageId(tourPackageId);
    //   retrun { tourcPackage, packageItenaries };
    // }
}