export default function ProductCard({
    alt,
    category,
    name,
    price,
    imgUrl,
}: {
    alt: string;
    category: string;
    name: string;
    price: string;
    imgUrl: string;
}) {
    return (
        <div className="shadow-lg rounded-xl overflow-hidden border-0 hover:shadow-xl card-hover-smooth group shadow-foreground/30 ">
            <img
                src={imgUrl}
                alt={alt || name}
                className="w-full h-60 object-cover card-hover-smooth"
            />
            <div className="p-4 flex flex-col h-44">
                <p className="text-sm text-gray-500">{category}</p>
                <h2 className="text-xl font-bold flex-1">{name}</h2>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Starts With</span>
                    <p className="text-lg font-medium">{price}</p>
                </div>
            </div>
        </div>
    );
}