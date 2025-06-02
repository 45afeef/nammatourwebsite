'use client';

import BannerCard from "@/components/banner-card";
import { dataService } from "@/lib/data-fetching";
import { TourPackage } from "@/lib/data-fetching/models/tour-package";
import { notFound } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

interface TourPackagePageProps {
  params: Promise<{
    slug: string;
  }>;
}


export default function Page({ params }: TourPackagePageProps) {


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


  const [activeTab, setActiveTab] = useState("2d1n");
  const [form, setForm] = useState({
    packageType: "Budget",
    startDate: "",
    endDate: "",
    adults: 2,
    kids: 0,
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fix: get slug from params (async not needed for client component)
  const [slug, setSlug] = useState("");
  useEffect(() => {
    (async () => {
      const p = await params;
      setSlug(p.slug);
    })();
  }, [params]);

  // Helper: get days between two dates
  function getDays(start: string, end: string) {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  }

  // When start or end date changes, update tab
  useEffect(() => {
    if (!form.startDate || !form.endDate) return;
    const days = getDays(form.startDate, form.endDate);
    if (days === 0) setActiveTab("1d");
    else if (days === 1) setActiveTab("2d1n");
    else if (days === 2) setActiveTab("3d2n");
    else if (days === 3) setActiveTab("4d3n");
    // else: do not change
  }, [form.startDate, form.endDate]);

  // When tab changes, update end date if start date is set
  useEffect(() => {
    if (!form.startDate) return;
    let days = 0;
    if (activeTab === "1d") days = 0;
    else if (activeTab === "2d1n") days = 1;
    else if (activeTab === "3d2n") days = 2;
    else if (activeTab === "4d3n") days = 3;
    const s = new Date(form.startDate);
    const e = new Date(s);
    e.setDate(s.getDate() + days);
    const endDate = e.toISOString().slice(0, 10);
    if (form.endDate !== endDate) setForm(f => ({ ...f, endDate }));
  }, [activeTab]);

  const handleTab = (tab: string) => setActiveTab(tab);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "adults" || name === "kids" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    if (new Date(form.startDate) > new Date(form.endDate)) {
      alert("End date must be after start date.");
      return;
    }
    if (form.adults < 1) {
      alert("At least one adult is required.");
      return;
    }
    setSubmitting(true);
    const msg = `Hi, I am interested in the Wayanad package (${form.packageType}). Please check availability for my dates.\nStart: ${form.startDate}\nEnd: ${form.endDate}\nAdults: ${form.adults}\nKids (Below 9): ${form.kids}\nName: ${form.name}\nPage: ${typeof window !== 'undefined' ? window.location.href : ''}`;
    const url = `https://wa.me/918891998005?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitting(false);
  };

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
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded">
              <img src="/images/rooms/room-1.webp" alt="Pickup" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Pickup &amp; Drop</div>
                <div>Kozhikode or Kalpetta</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded">
              <img src="/images/rooms/room-2.webp" alt="Activities" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Activities</div>
                <div>Sightseeing</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded">
              <img src="/images/rooms/room-3.webp" alt="Meals" className="w-12 h-12 rounded" />
              <div>
                <div className="font-semibold">Meals</div>
                <div>Breakfast and Dinner*</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900 p-4 rounded">
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
        <div className="flex-1 space-y-6 sticky top-28">
          {/* Tabs for package durations */}
          <div className="mb-4">
            <div className="flex gap-2">
              <button type="button" onClick={() => handleTab("1d")}
                className={`tab-btn px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === "1d" ? "bg-blue-500 dark:bg-blue-700 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>1D</button>
              <button type="button" onClick={() => handleTab("2d1n")}
                className={`tab-btn px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === "2d1n" ? "bg-blue-500 dark:bg-blue-700 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>2D1N</button>
              <button type="button" onClick={() => handleTab("3d2n")}
                className={`tab-btn px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === "3d2n" ? "bg-blue-500 dark:bg-blue-700 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>3D2N</button>
              <button type="button" onClick={() => handleTab("4d3n")}
                className={`tab-btn px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === "4d3n" ? "bg-blue-500 dark:bg-blue-700 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>4D3N</button>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">₹2,500 <span className="text-base text-gray-400 dark:text-gray-500 line-through ml-2">₹3,500</span></div>
          <form className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Your Name</label>
              <input name="name" type="text" value={form.name || ''} onChange={handleChange} required className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" placeholder="Booking Person Name" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Package Type</label>
              <select name="packageType" value={form.packageType} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
                <option>Budget</option>
                <option>Standard</option>
                <option>Premium</option>
                <option>Platinum</option>
                <option>Adventure</option>
                <option>Private Pool</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Start Date</label>
                <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">End Date</label>
                <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Adults</label>
                <input name="adults" type="number" min={1} max={14} value={form.adults} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Kids (Below 9)</label>
                <input name="kids" type="number" min={0} max={10} value={form.kids} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Quantity</label>
              <input type="number" value={1} readOnly className="w-full border rounded p-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
            </div>
            <button
              type="submit"
              className="bg-green-600 dark:bg-green-700 text-white font-semibold py-2 rounded text-center hover:bg-green-700 dark:hover:bg-green-800 transition mt-2"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Check Availability & Book on WhatsApp"}
            </button>
          </form>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 break-all">
            <span>Package Page: </span>
            <span>{typeof window !== 'undefined' ? window.location.href : ''}</span>
          </div>
        </div>
      </section>
    </main>
  );
}