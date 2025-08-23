import EnquiryForm from "@/components/enquiry-form";
import PackageList from "@/components/packages";
import Testimonials from "@/components/testimonials";
import { PackageCategoryRepository } from "@/lib/data-fetching/repositories/package-repository";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const groups = await new PackageCategoryRepository().getGroups();

  {/* Testimonials Data */ }
  const testimonials = [
    {
      name: "Anjali Menon",
      location: "Kochi, India",
      image: "/testimonials/person-1.png",
      message:
        "Our Wayanad trip was seamless and memorable. The team took care of every detail and made us feel at home. Highly recommended!",
    },
    {
      name: "Rahul Sharma",
      location: "Bangalore, India",
      image: "/testimonials/male.png",
      message:
        "From booking to sightseeing, everything was perfectly organized. The local insights made our experience truly special.",
    },
    {
      name: "Suresh Kumar",
      location: "Hyderabad, India",
      image: "/testimonials/male.png",
      message:
        "The itinerary was well planned and the team was always available for support. Will book again!",
    },
    {
      name: "Priya Nair",
      location: "Chennai, India",
      image: "/testimonials/person-3.png",
      message:
        "Loved the handpicked stays and personalized service. We explored hidden gems we wouldn't have found otherwise!",
    },
    {
      name: "Meera Joshi",
      location: "Mumbai, India",
      image: "/testimonials/female.png",
      message:
        "A wonderful experience from start to finish. The local food recommendations were spot on.",
    },
    {
      name: "Vikram Singh",
      location: "Delhi, India",
      image: "/testimonials/person-2.png",
      message:
        "Our family had a great time. The kids loved the adventure activities. Thank you for the memories!",
    },
    {
      name: "Lakshmi R",
      location: "Trivandrum, India",
      image: "/testimonials/female.png",
      message:
        "Professional and friendly team. The stays were comfortable and the sightseeing was breathtaking.",
    },
    {
      name: "Arjun Pillai",
      location: "Pune, India",
      image: "/testimonials/male.png",
      message:
        "Highly recommended for anyone looking to explore Wayanad. Hassle-free and enjoyable.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Content */}
      <section className="relative h-[70vh] md:h-[80vh] ">
        <Image
          src="/hero-image.jpg"
          alt="Wayanad Landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green to-brand-yellow opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0">
          <div className="container h-full mx-auto flex flex-col justify-end items-center px-2">
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-4 text-center">
              Discover Wayanad
            </h1>
            <button className="bg-brand-green text-white px-4 py-2 rounded-lg text-xl hover:bg-brand-yellow hover:text-foreground transition">
              Explore Packages
            </button>
            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4 text-white">
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
      <section className="py-8">
        <div className="container mx-auto px-2">
          <h2 className="text-4xl font-bold text-center mb-2 text-brand-green">What we offer in Wayanad</h2>
          <p className="text-center mb-4 text-foreground/80">
            Leaf through most memorable activities that are awaiting for you in wayanad
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Resorts', icon: "🏠", link: "/rooms" },
              { title: 'Camping', icon: "⛺", },
              { title: 'Sightseeing', icon: "🚞", },
              { title: 'Treks & Hikes', icon: "🛠️", },
              { title: 'Cab Services', icon: "🚕", link: "/cabs" },
              { title: 'Tickets', icon: "🎟️", },
            ].map((item) => {
              var element = <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-5xl">
                  {item.icon}
                </div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              return item.link ? <Link key={item.title} href={item.link}>{element}</Link> : element;
            })}
          </div>
        </div>
      </section>
      {/* Packages Section */}

      <div className="mx-auto px-2 max-w-11/12"><PackageList groups={groups} /></div>
      {/* Testimonials Section */}

      <Testimonials testimonials={testimonials} />

      {/* Why Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:max-w-11/12">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Raqlin?</h2>
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
