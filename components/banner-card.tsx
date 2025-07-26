export default function BannerCard(
    { imageUrl, title, subtitle, }: { imageUrl: string; title: string; subtitle?: string; }
) {
    return (
        <div
            style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
                backgroundImage: imageUrl ?? `url('${imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className={`
                relative flex flex-col 
                mx-auto my-4
                p-8 
                w-full min-h-56 
                rounded-lg shadow-lg 
                text-center justify-center items-center overflow-clip
            `}
        >
            <div className="absolute inset-0 w-full h-full bg-black opacity-30" />

            <div className="relative z-10 text-white">
                <h1 className="text-3xl font-bold ">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-2 text-sm">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}