export default function BannerCard(
    { imageUrl, title, subtitle, }: { imageUrl: string; title: string; subtitle: string; }
) {
    return (
        <div
            style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className={`
                relative flex flex-col md:mt-44 
                mt-32 w-4/5 mx-auto p-8 
                rounded-lg shadow-lg h-72 
                text-center justify-center items-center overflow-clip
            `}
        >
            <div className="absolute inset-0 w-full h-full bg-black opacity-30" />

            <div className="relative z-10 text-white">
                <h1 className="text-3xl font-bold ">
                    {title}
                </h1>
                <p className="mt-2">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}