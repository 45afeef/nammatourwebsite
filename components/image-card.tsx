import Image from "next/image";

export default function ImageCard({ title, imageUrl }: {
    title: string; imageUrl: string;
}) {
    return (
        <div key={title} className="relative overflow-hidden rounded-lg group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover transition ease-in-out group-hover:scale-110"
            />
            <h3 className="absolute bottom-6 left-6 text-white text-xl font-bold z-20">{title}</h3>
        </div>
    );
}