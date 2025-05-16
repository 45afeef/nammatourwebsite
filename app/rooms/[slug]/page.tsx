'use client';

import BannerCard from "@/components/banner-card";
import React, { useEffect, useState } from "react";

export default function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState("");
  useEffect(() => {
    (async () => {
      const p = await params;
      setSlug(p.slug);
    })();
  }, [params]);

  // Example: You can fetch room details based on slug here
  // For now, just use the slug in the title and image

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen max-w-4xl mx-auto">
      <BannerCard
        imageUrl={`/images/rooms/${slug}.webp`}
        title={slug.replace(/-/g, ' ').toUpperCase()}
      />
      <section className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {slug.replace(/-/g, ' ').toUpperCase()}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">#NammaTour Room | Wayanad</p>
        <div className="mb-8">
          <img src={`/images/rooms/${slug}.webp`} alt={slug} className="w-full max-w-2xl rounded shadow mx-auto" />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Room Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            {/* Replace with dynamic room description */}
            Experience comfort and tranquility in our {slug.replace(/-/g, ' ')}. Enjoy modern amenities, beautiful views, and easy access to all attractions in Wayanad.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Amenities</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-base space-y-1">
            <li>Free Wi-Fi</li>
            <li>Attached Bathroom</li>
            <li>24x7 Room Service</li>
            <li>Complimentary Breakfast</li>
            <li>Scenic Balcony</li>
            <li>Air Conditioning</li>
            <li>TV & Entertainment</li>
            <li>Safe Parking</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Book This Room</h2>
          <a
            href={`https://wa.me/918891998005?text=Hi%2C%20I%20am%20interested%20in%20the%20room%20${encodeURIComponent(slug.replace(/-/g, ' '))}.%20Please%20share%20availability%20and%20details.%20Room%20Page:%20${encodeURIComponent(window?.location?.href || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 dark:bg-green-700 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 dark:hover:bg-green-800 transition"
          >
            Enquire &amp; Book on WhatsApp
          </a>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 break-all">
            <span>Room Page: </span>
            <span>{typeof window !== 'undefined' ? window.location.href : ''}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
