import PackageList from "@/components/packages";
import Image from "next/image";


export default function Home() {
  return (

    <main className="min-h-screen">


      {/* Hero Content */}
      <div className="relative h-screen">
        <Image
          src="/hero-image.jpg"
          alt="Wayanad Landscape"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-green-500 opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0">
          <div className="container h-full mx-auto flex flex-col justify-end items-center px-4">
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 text-center">
              Discover Wayanad
            </h1>
            <button className="bg-primary text-white px-8 py-4 rounded-lg text-xl hover:bg-primary-dark transition">
              Explore Packages
            </button>

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">20+</div>
                <div className="text-sm">Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm">Handpicked Stays</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">50000+</div>
                <div className="text-sm">Happy Visitors</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Inclusions Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">What we offer in Wayanad</h2>
          <p className="text-center mb-16">
            Leaf through most memorable activities that are awaiting for you in wayanad
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Resorts', 'Camping', 'Sightseeing', 'Treks & Hikes', 'Cab Services', 'Tickets'].map((item) => (
              <div key={item} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  {/* SVG icons will go here */}
                </div>
                <h3 className="font-medium">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <PackageList />

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-2xl shadow-foreground/50">
                <div className="flex items-center mb-4 w-full h-20">
                  <Image
                    src={`/testimonials/person-${index}.png`}
                    alt="Reviewer"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-gray-600">Bangalore, India</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">
                  "Amazing experience with NammaTour. The team was professional and the trip was well organized."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NammaTour Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose NammaTour?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                We know Wayanad like the back of our hand, ensuring you get authentic experiences
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Personalized Service</h3>
              <p className="text-gray-600">
                Every trip is tailored to your preferences and requirements
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600">
                Get the best value for your money without compromising on quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Plan Your Trip</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg border"
              />
              <textarea
                placeholder="Tell us about your requirements"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border"
              />
              <button
                type="submit"
                className="w-full bg-background text-white py-4 rounded-lg text-xl hover:bg-primary-dark transition"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>


    </main>
  );
}
