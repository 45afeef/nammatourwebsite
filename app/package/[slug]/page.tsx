'use client';

import React, { use } from "react";
import { notFound } from "next/navigation";

import BannerCard from "@/components/banner-card";
import BookingForm from "@/components/booking-form";

import { dataService } from "@/lib/data-fetching";
import { TourPackage } from "@/lib/data-fetching/models/tour-package";

interface TourPackagePageProps {
  params: Promise<{
    slug: string;
  }>;
}


export default function Page({ params }: TourPackagePageProps) {

  const { slug } = use(params);

  // let tourPackage: TourPackage | null = null;



  // try {
  //   // This uses the DataService which internally uses the UserRepository
  //   // The UserRepository uses the ApiAdapter for Users (wired up in data-fetching/index.ts)
  //   tourPackage = dataService.tourPackages.getTourPackageBySlug(slug);
  // } catch (error) {
  //   console.error('afeef1');
  //   console.error(`Failed to fetch tour package ${slug}:`, error);
  //   // Handle error, maybe show a generic error page
  // }

  // if (!tourPackage) {
  //   console.error(`Tour package not found for slug: ${slug}`);
  //   notFound(); // Next.js built-in for 404
  // }

  return (
    <main role="main" className="min-h-screen max-w-11/12 mx-auto">
      <a id="main-content" tabIndex={-1}></a>
      {/* Customer Notice */}
      <div className="sticky top-28 w-full bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 text-center py-2 font-semibold">
        Limited-Time Deals! Book now &amp; save BIG!
      </div>

      {/* Banner */}
      <BannerCard
        imageUrl="/packages/2D1N-wayanad-family-common-pool-tour-package.webp"
        title={slug.replace(/-/g, ' ').toUpperCase()}
      />

      <section className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-2">
          {/* Title & Subtitle */}
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              2 Days &amp; 1 Night Wayanad Group Tour Packages
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">#NammaTour Verified | 24x7 Backup &amp; Support</p>
          </div>
          {/* Package Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
              <span className="text-2xl">📅</span>
              <div>
                <div className="font-semibold">Duration</div>
                <div>2 Days &amp; 1 Night</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
              <span className="text-2xl">👍</span>
              <div>
                <div className="font-semibold">#NammaTour</div>
                <div>Verified</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
              <span className="text-2xl">🎧</span>
              <div>
                <div className="font-semibold">24x7</div>
                <div>Backup &amp; Support</div>
              </div>
            </div>
          </div>
          {/* Gallery Placeholder */}
          <div className="mb-8">
            <div className="font-semibold mb-2 dark:text-gray-100">Gallery</div>
            <div className="flex gap-2 overflow-x-auto">
              {/* Replace with dynamic images/videos */}
              <img src="/packages/2D1N-wayanad-family-common-pool-tour-package.webp" alt="Gallery" className="w-48 h-32 object-cover rounded border border-gray-200 dark:border-gray-700" />
              <img src="/packages/2D1N-wayanad-group-tour-package.webp" alt="Gallery" className="w-48 h-32 object-cover rounded border border-gray-200 dark:border-gray-700" />
              <img src="/packages/3D2N-wayanad-group-tour-package.webp" alt="Gallery" className="w-48 h-32 object-cover rounded border border-gray-200 dark:border-gray-700" />
            </div>
          </div>
          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-gray-900 p-4 rounded">
              <img src="/images/rooms/room-1.webp" alt="Pickup" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Pickup &amp; Drop</div>
                <div>Kozhikode or Kalpetta</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-gray-900 p-4 rounded">
              <img src="/images/rooms/room-2.webp" alt="Activities" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Activities</div>
                <div>Sightseeing</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-gray-900 p-4 rounded">
              <img src="/images/rooms/room-3.webp" alt="Meals" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Meals</div>
                <div>Breakfast and Dinner*</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-gray-900 p-4 rounded">
              <img src="/images/rooms/room-4.webp" alt="Railway" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Nearest Railway Station</div>
                <div>Kozhikode</div>
              </div>
            </div>
          </div>
          {/* Overview, Inclusions, Exclusions, Itinerary (Tab Content) */}
          {/* Tabbed content for each package duration. Only 2D1N shown, others can be added similarly. */}
          <div id="tab-content-2d1n">
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Overview</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                Embark on a best-selling two-day Wayanad adventure tour package and experience the charm of this captivating district nestled in the verdant mountains of Kerala, India. Our Wayanad holiday packages by #NammaTour promise an immersive journey that seamlessly combines thrilling activities with the tranquil beauty of nature.
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Inclusions</div>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>Pick &amp; Drop at Kozhikode or Kalpetta</li>
                <li>One Kerala Style Breakfast &amp; Dinner</li>
                <li>Two Days of Wayanad Sight-Seeing</li>
                <li>Private Cabs or Traveller (On Group Size)</li>
                <li>One-Night Forest Stay at Meppadi (Bungla Mount)</li>
                <li>Indoor Games, Circle Time and Fun</li>
                <li>Off-Road Jeep Pick-Up and Drop-Off to Stay*</li>
                <li>Stream Hiking &amp; Trekking with Local Guide</li>
                <li>First Aid and Room Services</li>
                <li>Light Tea &amp; Snacks at the Stay*</li>
                <li>Campfire &amp; Music* (Subject to Weather)</li>
                <li>Experienced Driver, Guide &amp; Crew</li>
                <li>Rooms/Dorms/Tents on Multiple Sharing</li>
                <li>Toll, Parking Fees &amp; Driver Allowances</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Exclusions</div>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>Any Kind of Entry Tickets</li>
                <li>Lunch &amp; Refreshments</li>
                <li>All Personal Expenses</li>
                <li>Things not Mentioned in Inclusions</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Itinerary</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>Day 1:</strong> Pickup, sightseeing (Lakkidi View Point, Pookode Lake, En Ooru Tribal Village), check-in, campfire.<br />
                <strong>Day 2:</strong> Breakfast, sightseeing (Edakkal Caves, Phantom Rock, Karapuzha Dam), drop-off.<br />
                <span className="text-xs text-gray-400 dark:text-gray-500">*Actual schedule may vary. See full details on booking.</span>
              </div>
            </div>
          </div>
          {/* Add similar tab-content divs for 3D2N, 1D, 4D3N with their respective details */}
        </div>
        {/* Price & Booking Form with Tabs */}
        <div className="flex-1 space-y-6">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}