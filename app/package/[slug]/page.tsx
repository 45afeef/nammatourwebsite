import React from "react";
import { notFound } from "next/navigation";

import BannerCard from "@/components/banner-card";
import BookingForm from "@/components/booking-form";
import { TourPackage } from "@/lib/data-fetching/models/tour-package";
import { dataService } from "@/lib/data-fetching";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// export async function generateStaticParams() {
//   const allPackages = await dataService.tourPackagesRepo.getAllTourPackages();
//   return allPackages.map((pkg: TourPackage) => ({ slug: pkg.slug }));
// }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tourPackage: TourPackage | null = await dataService.tourPackagesRepo.getTourPackageBySlug(slug);
  if (!tourPackage) return notFound();

  return (
    <main className="min-h-screen max-w-11/12 mx-auto">
      <a id="main-content" tabIndex={-1}></a>
      <BannerCard
        imageUrl={tourPackage.bannerImage}
        title={tourPackage.title}
        subtitle="Ready for a break? Book your escape now—your adventure is waiting."
      />
      <section className="container mx-auto px-2 py-2 flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-2">
          <div className="sticky top-0 w-full bg-yellow-100 text-yellow-900 text-center py-1 font-semibold">
            Book now, relax later. Secure your spot—no stress, no FOMO.
          </div>
          {/* Title & Subtitle */}
          <div className="mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              {tourPackage.title}
            </h1>
            {tourPackage.subTitle && (
              <p className="text-lg text-gray-600">{tourPackage.subTitle}</p>
            )}
          </div>
          {/* Package Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            {tourPackage.packageInfo?.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded shadow">
                {point.icon && <span className="text-2xl">{point.icon}</span>}
                <div>
                  <div className="font-semibold">{point.title}</div>
                  <div>{point.value}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Gallery */}
          <div className="mb-2">
            <div className="font-semibold mb-1">Gallery</div>
            <div className="flex gap-1 overflow-x-auto">
              {tourPackage.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-48 h-32 object-cover rounded border border-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {tourPackage.keyPoints?.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded shadow">
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
            {
              tourPackage.overview &&
              <div>
                <div className="font-semibold text-lg mb-1">Overview</div>
                <div className="text-gray-700 text-sm markdown prose prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    urlTransform={(url) => url} // override default URL handling to support tel: // unawre of potential issues
                  >
                    {tourPackage.overview}
                  </ReactMarkdown>
                </div>
              </div>
            }
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {tourPackage.inclusion && (
                <div className="md:w-1/2">
                  <div className="font-bold text-3xl mb-1 text-green-500">Inclusions</div>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {tourPackage.inclusion.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tourPackage.exclusion && (
                <div className="md:w-1/2">
                  <div className="font-bold text-3xl mb-1 text-red-500">Exclusions</div>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {tourPackage.exclusion.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {
              tourPackage.itinerary &&
              <div>
                <div className="font-semibold text-lg mb-1">Itinerary</div>
                <div className="text-gray-700 text-sm">
                  {tourPackage.itinerary}
                </div>
              </div>
            }
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