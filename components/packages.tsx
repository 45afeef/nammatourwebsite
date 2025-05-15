import Link from "next/link";
import ImageCard from "./image-card";

export default function PackageList() {
    return (
        <section className="container mx-auto px-4 py-20 md:max-w-11/12">
            <h2 className="text-4xl font-bold text-center mb-4">Explore Our Packages</h2>
            <p className="text-center text-foreground/80
                   mb-16">
                Curated experiences for every type of traveler
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    'Group Tour Packages',
                    'Couple Tour Packages',
                    'Family Tour Packages',
                    'Bangalore to Wayanad Tour Packages',
                    'Rooms',
                    'Deep Jungle Treks'
                ].map((title) => (
                    <Link href={`/packages/${encodeURIComponent(title.toLowerCase().replace(/ /g, '-'))}`} key={title}>
                        <ImageCard
                            title={title}
                            imageUrl={`/packages/${title.toLowerCase().replace(/ /g, '-')}.webp`}
                        />
                    </Link>
                ))}
            </div>
        </section>

    );
}