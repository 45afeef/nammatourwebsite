export interface TourPackage {
    id: string;
    slug: string;
    title: string;
    subTitle?: string;
    packageInfo: {
        icon?: string; // emoji or icon name
        title: string;
        value: string;
    }[];
    inclusion: string[];
    exclusion: string[];
    images: string[]; // Gallery images
    bannerImage: string;
    description: string;
    itinerary: string;
    activities: string[];
    typeOfTrip: string;
    duration: string;
    keyPoints: {
        icon?: string; // emoji or icon name
        title: string;
        value: string;
        image?: string; // optional image for key point
    }[];
    overview: string;
}



export interface TourPackageResponse {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        environment: {
            sys: {
                id: string;
                type: string;
                linkType: string;
            };
        };
    };
    fields: TourPackage;
}