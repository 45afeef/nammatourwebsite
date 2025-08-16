import Link from "next/link";
import ImageCard from "./image-card";
interface Group {
    name: string;
    imageUrl: string;
}

export default async function PackageList({ groups = [] }: { groups: Group[] }) {
    return (
        <section className="container mx-auto py-20">
            <h2 className="text-4xl font-bold text-center mb-4">Explore Our Packages</h2>
            <p className="text-center text-foreground/80 mb-16">
                Curated experiences for every type of traveler
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {groups.map((grp) => (
                    <Link href={`/packages/${encodeURIComponent(grp.name.toLowerCase().replace(/ /g, '-'))}`} key={grp.name}>
                        <ImageCard
                            title={grp.name}
                            imageUrl={grp.imageUrl}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}