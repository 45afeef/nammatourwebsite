import BannerCard from "@/components/banner-card";

export async function generateStaticParams() {
  // Example static room slugs, replace with dynamic fetch if you have a data source
  return [
    { slug: "deluxe-room" },
    { slug: "suite-room" },
    { slug: "family-room" },
    { slug: "standard-room" },
  ];
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="bg-white min-h-screen max-w-4xl mx-auto">
      <BannerCard
        imageUrl={`/images/rooms/${slug}.webp`}
        title={slug.replace(/-/g, ' ').toUpperCase()}
      />
      <section className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {slug.replace(/-/g, ' ').toUpperCase()}
        </h1>
        <p className="text-lg text-gray-600 mb-6">#NammaTour Room | Wayanad</p>
        <div className="mb-8">
          <img src={`/images/rooms/${slug}.webp`} alt={slug} className="w-full max-w-2xl rounded shadow mx-auto" />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Room Overview</h2>
          <p className="text-gray-700 text-base">
            Experience comfort and tranquility in our {slug.replace(/-/g, ' ')}. Enjoy modern amenities, beautiful views, and easy access to all attractions in Wayanad.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul className="list-disc pl-5 text-gray-700 text-base space-y-1">
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
          <h2 className="text-xl font-semibold mb-2">Book This Room</h2>
          <a
            href={`https://wa.me/918891998005?text=Hi%2C%20I%20am%20interested%20in%20the%20room%20${encodeURIComponent(slug.replace(/-/g, ' '))}.%20Please%20share%20availability%20and%20details.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition"
          >
            Enquire &amp; Book on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
