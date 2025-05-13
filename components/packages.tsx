import Image from "next/image";

export default function PackageList() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4">Explore Our Packages</h2>
                <p className="text-center text-foreground/80
                   mb-16">
                    Curated experiences for every type of traveler
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        'Group Packages',
                        'Couple Packages',
                        'Family Packages',
                        'Bangalore to Wayanad Tour packages',
                        'Rooms',
                        'Deep Jungle Treks'
                    ].map((title) => (
                        <div key={title} className="relative overflow-hidden rounded-lg group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                            <Image
                                src={`/packages/${title.toLowerCase().replace(/ /g, '-')}.webp`}
                                alt={title}
                                width={400}
                                height={300}
                                className="w-full h-[300px] object-cover transition ease-in-out group-hover:scale-110"
                            />
                            <h3 className="absolute bottom-6 left-6 text-white text-xl font-bold z-20">{title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
}