export interface TourPackage {
    id: string;
    title: string;
    inclusion: string;
    exclusion: string;
    price: number;
    startDate: Date;
    endDate: Date;
    images: string[]; // Array of image URLs or IDs
    description: string;
    itinerary: string; // Reference to another model, e.g., Itinerary ID
    activities: string[]; // List of activities
    typeOfTrip: string; // e.g., "Adventure", "Relaxation"
    duration: string; // e.g., "3 days", "1 week"
}

