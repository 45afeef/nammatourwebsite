import React from "react";
import BannerCard from "@/components/banner-card";
import BookingForm from "@/components/booking-form";
import { dataService } from "@/lib/data-fetching";
import { TourPackage } from "@/lib/data-fetching/models/tour-package";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div>Package not found.</div>
      </main>
    );
  }
  const tourPackage: TourPackage | null = await dataService.tourPackages.getTourPackageBySlug(slug);
  if (!tourPackage) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div>Package not found.</div>
      </main>
    );
  }

  return (
    <main role="main" className="min-h-screen max-w-11/12 mx-auto">
      <a id="main-content" tabIndex={-1}></a>
      <BannerCard
        imageUrl={tourPackage.bannerImage}
        title={tourPackage.title}
        subtitle="Ready for a break? Book your escape now—your adventure is waiting."
      />
      <section className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-2">
          <div className="sticky top-28 w-full bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 text-center py-2 font-semibold">
            Book now, relax later. Secure your spot—no stress, no FOMO.
          </div>
          {/* Title & Subtitle */}
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {tourPackage.title}
            </h1>
            {tourPackage.subTitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300">{tourPackage.subTitle}</p>
            )}
          </div>
          {/* Package Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {tourPackage.packageInfo?.map((point, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
                {point.icon && <span className="text-2xl">{point.icon}</span>}
                <div>
                  <div className="font-semibold">{point.title}</div>
                  <div>{point.value}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Gallery */}
          <div className="mb-8">
            <div className="font-semibold mb-2 dark:text-gray-100">Gallery</div>
            <div className="flex gap-2 overflow-x-auto">
              {tourPackage.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-48 h-32 object-cover rounded border border-gray-200 dark:border-gray-700"
                />
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {tourPackage.keyPoints?.map((point, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
                {point.icon && <span className="text-3xl">{point.icon}</span>}
                <div>
                  <div className="font-semibold">{point.title}</div>
                  <div>{point.value}</div>
                  {point.image && (
                    <img src={point.image} alt={point.title} className="w-12 h-12 mt-2 rounded" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Overview, Inclusions, Exclusions, Itinerary */}
          <div id="tab-content">
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Overview</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                {tourPackage.overview}
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Inclusions</div>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                {tourPackage.inclusion.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Exclusions</div>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
                {tourPackage.exclusion.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 dark:text-gray-100">Itinerary</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                {tourPackage.itinerary}
              </div>
            </div>
          </div>
        </div>
        {/* Price & Booking Form */}
        <div className="flex-1 space-y-6">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}