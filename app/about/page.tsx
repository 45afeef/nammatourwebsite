
export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <section className="mb-8">
        <p className="mb-4 text-lg text-gray-700">NammaTour is your trusted partner for unforgettable travel experiences in Wayanad and beyond. Our mission is to make every journey memorable, comfortable, and tailored to your needs.</p>
        <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Expertly curated tour packages for families, couples, and groups</li>
          <li>Handpicked stays and reliable transport options</li>
          <li>Local expertise and personalized service</li>
          <li>Transparent pricing and flexible policies</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Our Story</h2>
        <p className="text-gray-700">Founded by passionate travelers, NammaTour was born out of a love for Kerala’s natural beauty and a desire to share it with the world. We believe travel should be easy, safe, and inspiring. Join us and discover the difference!</p>
      </section>
    </main>
  );
}
