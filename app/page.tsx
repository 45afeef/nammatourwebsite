import EnquiryForm from "@/components/enquiry-form";
import PackageList from "@/components/packages";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Content */}
      <section className="relative h-screen">
        <Image
          src="/hero-image.jpg"
          alt="Wayanad Landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green to-brand-yellow opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0">
          <div className="container h-full mx-auto flex flex-col justify-end items-center px-4">
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 text-center">
              Discover Wayanad
            </h1>
            <button className="bg-brand-green text-white px-8 py-4 rounded-lg text-xl hover:bg-brand-yellow hover:text-foreground transition">
              Explore Packages
            </button>
            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16 text-white">
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
      </section>
      {/* Inclusions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-brand-green">What we offer in Wayanad</h2>
          <p className="text-center mb-16 text-foreground/80">
            Leaf through most memorable activities that are awaiting for you in wayanad
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { title: 'Resorts', icon: "🏠", },
              { title: 'Camping', icon: "⛺", },
              { title: 'Sightseeing', icon: "🚞", },
              { title: 'Treks & Hikes', icon: "🛠️", },
              { title: 'Cab Services', icon: "🚕", },
              { title: 'Tickets', icon: "🎟️", },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-5xl">
                  {item.icon}
                </div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Packages Section */}
      <PackageList />
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:max-w-11/12">
          <h2 className="text-4xl font-bold text-center mb-16 text-brand-yellow">What Our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4 w-full h-20">
                  <Image
                    src={`/testimonials/person-${index}.png`}
                    alt="Reviewer"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-foreground">John Doe</h4>
                    <p className="text-sm text-foreground/70">Bangalore, India</p>
                  </div>
                </div>
                <div className="flex text-brand-yellow mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/80">
                  "Amazing experience! Highly recommend NammaTour for your next trip."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NammaTour Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:max-w-11/12">
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
      <EnquiryForm />
    </main>
  );
}
