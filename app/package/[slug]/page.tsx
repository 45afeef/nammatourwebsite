import React from "react";
import { notFound } from "next/navigation";

import BannerCard from "@/components/banner-card";
import BookingForm from "@/components/booking-form";
import { TourPackage } from "@/lib/data-fetching/models/tour-package";
import { dataService } from "@/lib/data-fetching";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export async function generateStaticParams() {
  const allPackages = await dataService.tourPackagesRepo.getAllTourPackages();
  return allPackages.map((pkg: TourPackage) => ({ slug: pkg.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let tourPackage: TourPackage | null = await dataService.tourPackagesRepo.getTourPackageBySlug(slug);

  if (!tourPackage) {
    // Generate a realistic mock package using the slug
    // Extract origin city from slug, always set destination as Wayanad
    const knownCities = [
      "mumbai", "kolkata", "delhi", "hyderabad", "chennai", "bangalore"
    ];
    let origin = "Bangalore";
    for (const city of knownCities) {
      if (slug.toLowerCase().includes(city)) {
        origin = city.charAt(0).toUpperCase() + city.slice(1);
        break;
      }
    }
    const location = `${origin} to Wayanad`;
    const types = ["Group", "Family", "Couple", "Adventure", "Luxury", "Budget"];
    const type = types[Math.abs(slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % types.length];
    const durations = [
      "2 Days / 1 Night",
      "3 Days / 2 Nights",
      "4 Days / 3 Nights",
      "5 Days / 4 Nights"
    ];
    const duration = durations[Math.abs(slug.length + slug.charCodeAt(0)) % durations.length];
    const images = [
      "/images/wayanad-bg.jpg",
      "/images/bg-1.webp",
      "/images/rooms/room-1.webp",
      "/images/rooms/room-2.webp",
      "/images/rooms/room-3.webp",
      "/images/rooms/room-4.webp",
      "/images/rooms/room-5.webp",
      "/images/rooms/room-6.webp",
      "/images/rooms/room-7.webp",
      "/images/rooms/room-8.webp",
      "/images/rooms/room-9.webp",
      "/images/rooms/room-10.webp",
      "/images/rooms/room-11.webp",
      "/images/rooms/room-12.webp",
      "/images/rooms/room-13.webp",
      "/images/rooms/room-14.webp",
      "/images/rooms/room-15.webp",
      "/images/rooms/room-16.webp",
      "/images/rooms/room-17.webp",
      "/images/rooms/room-18.webp",
      "/images/rooms/room-19.webp",
      "/images/rooms/room-20.webp",
      "/images/rooms/room-21.webp",
      "/images/rooms/room-22.webp",
      "/images/rooms/room-23.webp",
      "/images/rooms/room-24.webp",
    ];
    const selectedImages = [];
    for (let i = 0; i < images.length && selectedImages.length < 7; i++) {
      // Pick every Nth image based on slug length to vary selection
      if (i % Math.max(1, Math.floor(slug.length / 3)) === 0) {
        selectedImages.push(images[i]);
      }
    }
    while (selectedImages.length < 7) {
      // If not enough, fill from start
      selectedImages.push(images[selectedImages.length % images.length]);
    }
    const highlights = [
      { title: "Scenic landscapes", value: "Enjoy breathtaking views and natural beauty throughout your trip.", icon: "🌄" },
      { title: "Handpicked hotels", value: "Stay at carefully selected premium hotels for your comfort.", icon: "🏨" },
      { title: "Local sightseeing", value: "Explore popular attractions with guided tours.", icon: "🗺️" },
      { title: "Expert guides", value: "Benefit from knowledgeable local guides.", icon: "🧑‍💼" },
      { title: "Flexible itinerary", value: "Customize your travel plans as per your needs.", icon: "📝" },
      { title: "All transfers included", value: "Enjoy hassle-free transfers during your trip.", icon: "🚗" },
      { title: "24/7 support", value: "Get round-the-clock assistance during your journey.", icon: "📞" },
      { title: "Flexible Dates", value: "Choose your own dates!", icon: "📅" },
      { title: "Customizable", value: "Itinerary can be tailored.", icon: "📝" }
    ];

    const shuffledHighlights = highlights.sort(() => 0.5 - Math.random()).slice(0, 3);
    tourPackage = {
      slug,
      title: `${location} ${type} Tour Package`,
      subTitle: `Experience the best of ${location} with our exclusive ${type.toLowerCase()} package.`,
      bannerImage: selectedImages[0],
      images: selectedImages,
      packageInfo: [
        { title: "Duration", value: duration, icon: "⏰" },
        { title: "Location", value: location, icon: "📍" },
        { title: "Type", value: type, icon: "👨‍👩‍👧‍👦" }
      ],
      keyPoints: shuffledHighlights,
      overview: `Discover the wonders of Wayanad with our ${duration} ${type.toLowerCase()} tour package from ${origin}. From breathtaking sights to curated experiences, this package is designed for those who want to make the most of their getaway.\n\n**Highlights:**\n- ${shuffledHighlights.map(h => h.title).join("\n- ")}`,
      inclusion: [
        "Accommodation at premium hotels",
        "Daily breakfast",
        "All transfers and sightseeing by private vehicle",
        "Experienced local guide",
        "Complimentary welcome drink"
      ],
      exclusion: [
        "Personal expenses",
        "Lunch & Dinner unless specified",
        "Entry fees to attractions",
        "Travel insurance"
      ],
      itinerary: `Day 1: Departure from ${origin}, arrival at Wayanad, hotel check-in, and local sightseeing.\nDay 2: Explore top attractions with a guided tour.\n${duration.startsWith('3') || duration.startsWith('4') ? 'Day 3: Leisure day or optional activities.\n' : ''}Departure after breakfast.`,
    } as TourPackage;
  }

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
                    rehypePlugins={[rehypeRaw] as any}
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